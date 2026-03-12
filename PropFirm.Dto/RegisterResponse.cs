using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public record RegisterResponse
    {
        public Guid Id { get; init; }
        public string UserName { get; init; } = default!;
        public string Email { get; init; } = default!;
        public string Message { get; init; } = default!;
    }
}
