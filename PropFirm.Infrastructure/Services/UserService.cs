using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PropFirm.Dto;
using PropFirm.Infrastructure.Interface;
using PropFirm.Infrastructure.Model;
using PropfirmApp.Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PropFirm.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<UserService> _logger;
        private readonly IConfiguration _configuration;
        private readonly UserManager<UserEntity> _userManager;

        public UserService(UserManager<UserEntity> userManager, AppDbContext dbContext, ILogger<UserService> logger, IConfiguration configuration)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task<Result<LoginResponse>> LoginAsync(LoginRequest request)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.UserName == request.UserName);

            if (user == null)
                return Result<LoginResponse>.Fail("Invalid username or password.");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Result<LoginResponse>.Fail("Invalid username or password.");

            var token = GenerateJwtToken(user);

            return Result<LoginResponse>.Ok(new LoginResponse
            {
                AccessToken = token,
                ExpiresIn = 90,
                RefreshToken = token,
                Message = "Login has been Successfull",
                TokenType = "Bearer"
            });
        }

        public async Task<Result<RegisterResponse>> RegisterAsync(RegisterRequest request, string ip)
        {
            var username = request.UserName?.Trim();

            if (string.IsNullOrWhiteSpace(username))
                return Result<RegisterResponse>.Fail("Username is required.");

            if (string.IsNullOrWhiteSpace(request.Password))
                return Result<RegisterResponse>.Fail("Password is required.");

            if (request.Password.Length < 8)
                return Result<RegisterResponse>.Fail("Password must be at least 8 characters.");

            var exists = await _dbContext.Users.AnyAsync(u => u.UserName == username);
            if (exists)
                return Result<RegisterResponse>.Fail("Username already exists.");

            var emailExists = await _dbContext.Users.AnyAsync(email => email.Email == request.Email);
            if (emailExists)
                return Result<RegisterResponse>.Fail("Email already exists.");

            var user = new UserEntity
            {
                UserName = username,
                //PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumberPrefix = request.PhoneNumberPrefix,
                PhoneNumber = request.PhoneNumber,
                Title = request.Title,
                DetailsCorrect = request.DetailsCorrect,
                EmailConfirmed = false,
                DateOfBirth = request.DateofBirth,
                TransactionDateTime = DateTime.UtcNow,
                Over18 = request.Over18,
                RecieveMarketingMaterial = request.RecieveMarketingMaterial,
                ReferalCode = request.ReferalCode,
                RegisterFromIpAddress = ip,


                //Role = "User",          // if you add Role later
                // TenantId = "tenant-1"   // if you add Tenant later
            };


            //using var transaction = await _dbContext.Database.BeginTransactionAsync();


            IdentityResult identityResult = await _userManager.CreateAsync(user, request.Password);

            if (!identityResult.Succeeded)
            {
                StringBuilder sp = new StringBuilder();
                foreach (var item in identityResult.Errors)
                {
                    sp.Append(item.Description);
                }

                var userId = user.Id;
                var profileenty = new ProfileEntity()
                {
                    DateOfBirth = user.DateOfBirth,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName= user.LastName,
                    Title = user.Title,
                    UserId = user.Id
                };

                await _dbContext.Profiles.AddAsync(profileenty);
                await _dbContext.SaveChangesAsync();

                return Result<RegisterResponse>.Fail("Registration Failed : " +  sp.ToString());
            }

           
            _logger.LogInformation("User registered: {UserId} {UserName}", user.Id, user.UserName);

            return Result<RegisterResponse>.Ok(new RegisterResponse
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Message = "Registration successful"
            });
        }
        private string GenerateJwtToken(UserEntity user)
        {
            var jwtSettings = _configuration.GetSection("Jwt").Get<JwtSettings>();

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings.Key));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(jwtSettings.DurationInMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }

}
