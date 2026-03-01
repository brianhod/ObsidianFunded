using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PropFirm.Dto;
using PropFirm.Infrastructure.Interface;
using PropFirm.Infrastructure.Model;
using PropfirmApp.Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace PropFirm.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtSettings _jwt;

        public TokenService(IOptions<JwtSettings> jwtOptions)
        {
            _jwt = jwtOptions.Value;
        }

        public string GenerateAccessToken(UserEntity user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

            // Roles (if you have them)
            if (!string.IsNullOrWhiteSpace(user.Role))
                claims.Add(new Claim(ClaimTypes.Role, user.Role));

            // Multi-tenant (if you have it)
            if (!string.IsNullOrWhiteSpace(user.TenantId))
                claims.Add(new Claim("tenant_id", user.TenantId));

            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.AccessTokenMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public (string rawToken, string tokenHash) GenerateRefreshToken()
        {
            // 64 bytes => 512 bits
            var bytes = RandomNumberGenerator.GetBytes(64);
            var raw = Convert.ToBase64String(bytes);

            return (raw, HashToken(raw));
        }

        public string HashToken(string rawToken)
        {
            // SHA-256 is fine since refresh token is already random high entropy
            using var sha = SHA256.Create();
            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(rawToken));
            return Convert.ToBase64String(hash);
        }
    }
}
