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

        public UserService(AppDbContext dbContext,
           ILogger<UserService> logger,
           IConfiguration configuration)
        {

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

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Result<LoginResponse>.Fail("Invalid username or password.");

            var token = GenerateJwtToken(user);

            return Result<LoginResponse>.Ok(new LoginResponse(token));
        }

        public async Task<Result<RegisterResponse>> RegisterAsync(RegisterRequest request)
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

            var user = new UserEntity
            {
                UserName = username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                // Role = "User",          // if you add Role later
                // TenantId = "tenant-1"   // if you add Tenant later
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation("User registered: {UserId} {UserName}", user.Id, user.UserName);

            return Result<RegisterResponse>.Ok(new RegisterResponse(user.Id, user.UserName));
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
