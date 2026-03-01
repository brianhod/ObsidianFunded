using PropFirm.Infrastructure.Model;
using PropfirmApp.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Infrastructure.Interface
{
    public interface ITokenService
    {
        string GenerateAccessToken(UserEntity user);
        (string rawToken, string tokenHash) GenerateRefreshToken();
        string HashToken(string rawToken);
    }
}
