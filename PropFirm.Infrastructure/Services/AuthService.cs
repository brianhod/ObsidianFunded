using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PropFirm.Dto;
using PropFirm.Infrastructure.Interface;
using PropFirm.Infrastructure.Model;

namespace PropFirm.Infrastructure.Services
{

    public class AuthService : IAuthService
    {
        private readonly AppDbContext _db;
        private readonly ITokenService _tokens;
        private readonly ILogger<AuthService> _logger;
        private readonly IOptions<JwtSettings> _jwtOptions;

        public AuthService(
            AppDbContext db,
            ITokenService tokens,
            IOptions<JwtSettings> jwtOptions,
            ILogger<AuthService> logger)
        {
            _db = db;
            _tokens = tokens;
            _jwtOptions = jwtOptions;
            _logger = logger;
        }

        public async Task<AuthResult?> LoginAsync(string username, string password, string? ip)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null) return null;

            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
                return null;

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
