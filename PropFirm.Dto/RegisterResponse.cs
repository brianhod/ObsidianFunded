using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public record RegisterResponse
    {
        public Guid Id { get; init; }
        public required string UserName { get; init; }
        public required string Email { get; init; }
        public required string Message { get; init; }
    }
}
