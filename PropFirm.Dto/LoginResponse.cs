using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public record LoginResponse
    {
        public string AccessToken { get; init; } = default!;
        public string RefreshToken { get; init; } = default!;
        public int ExpiresIn { get; init; }
        public string TokenType { get; init; } = "Bearer";
        public string Message { get; init; } = default!;
    }
}
