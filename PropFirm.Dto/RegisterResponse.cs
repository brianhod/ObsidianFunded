using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public record RegisterResponse(Guid UserId, string UserName);
}
