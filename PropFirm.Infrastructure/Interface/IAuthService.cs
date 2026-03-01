using PropFirm.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Infrastructure.Interface
{
    public interface IAuthService
    {
        Task<AuthResult?> LoginAsync(string username, string password, string? ip);
        Task<AuthResult?> RefreshAsync(string refreshToken, string? ip);
        Task<bool> RevokeAsync(string refreshToken, string? ip);
    }
}
