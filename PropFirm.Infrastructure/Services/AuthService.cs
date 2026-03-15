using Humanizer.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using PropFirm.Dto;
using PropFirm.Infrastructure.Interface;
using PropFirm.Infrastructure.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PropFirm.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _db;
        private readonly ITokenService _tokens;
        private readonly ILogger<AuthService> _logger;
        private readonly IOptions<JwtSettings> _jwtOptions;
        private readonly IConfiguration _configuration;
        private readonly UserManager<UserEntity> _userManager;

        public AuthService(AppDbContext db,ITokenService tokens,IOptions<JwtSettings> jwtOptions,IConfiguration configuration,  ILogger<AuthService> logger,
            UserManager<UserEntity> userManager)
        {
            _db = db;
            _tokens = tokens;
            _jwtOptions = jwtOptions;
            _logger = logger;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<AuthResult?> LoginAsync(string username, string password, string? ip)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (user is  null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return null;
            }

            //if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            //    return null;
            //===========================================================
            var roles = await _userManager.GetRolesAsync(user);
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = [ 
                        new(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                        new(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email, user.Email!),
                        ..roles.Select(r => new Claim(ClaimTypes.Role, r))
                        ];

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:ExpirationInMinutes")),
                SigningCredentials = credentials,
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var tokenHandler = new JsonWebTokenHandler();
            string accessToken = tokenHandler.CreateToken(tokenDescriptor);

            //===========================================================

            var access = _tokens.GenerateAccessToken(user);

            var (rawRefresh, refreshHash) = _tokens.GenerateRefreshToken();
            var rt = new RefreshToken
            {
                UserId = user.Id,
                TokenHash = refreshHash,
                CreatedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.AddDays(_jwtOptions.Value.RefreshTokenDays),
                CreatedByIp = ip
            };

            _db.RefreshTokens.Add(rt);
            await _db.SaveChangesAsync();

            return new AuthResult(access, rawRefresh);
        }

        public async Task<AuthResult?> RefreshAsync(string refreshToken, string? ip)
        {
            var tokenHash = _tokens.HashToken(refreshToken);

            var existing = await _db.RefreshTokens
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.TokenHash == tokenHash);

            if (existing == null || !existing.IsActive)
                return null;

            // Rotate refresh token
            var user = existing.User;
            var access = _tokens.GenerateAccessToken(user);

            var (newRaw, newHash) = _tokens.GenerateRefreshToken();

            existing.RevokedUtc = DateTime.UtcNow;
            existing.RevokedByIp = ip;
            existing.ReplacedByTokenHash = newHash;

            var newRt = new RefreshToken
            {
                UserId = user.Id,
                TokenHash = newHash,
                CreatedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.AddDays(_jwtOptions.Value.RefreshTokenDays),
                CreatedByIp = ip
            };

            _db.RefreshTokens.Add(newRt);
            await _db.SaveChangesAsync();

            return new AuthResult(access, newRaw);
        }

        public async Task<bool> RevokeAsync(string refreshToken, string? ip)
        {
            var tokenHash = _tokens.HashToken(refreshToken);

            var existing = await _db.RefreshTokens
                .FirstOrDefaultAsync(x => x.TokenHash == tokenHash);

            if (existing == null || existing.RevokedUtc != null)
                return false;

            existing.RevokedUtc = DateTime.UtcNow;
            existing.RevokedByIp = ip;
            await _db.SaveChangesAsync();

            return true;
        }

    }
}
