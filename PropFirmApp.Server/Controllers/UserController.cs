using Microsoft.AspNetCore.Mvc;
using PropFirm.Dto;
using PropfirmApp.Domain;

namespace PropFirmApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost("Getusers")]
        public IEnumerable<UserDto> GetUser()
        {
            return new List<UserDto>();
        }
    }
}
