using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropFirm.Dto
{
    public record MessageResponse
    {
        public string Message { get; init; } = default!;
    }
}
