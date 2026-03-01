using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public record AuthResult(string AccessToken, string RefreshToken);
}
