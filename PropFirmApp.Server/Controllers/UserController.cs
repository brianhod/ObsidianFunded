using Microsoft.AspNetCore.Mvc;
using PropFirm.Dto;
using PropfirmApp.Domain;

namespace PropFirmApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<UserDto> GetUser()
        {
            return new List<UserDto>();
        }

        [HttpPost("login")]
        public ActionResult<LogonDto> Logon()
        {
            return new LogonDto();
        }

        [HttpPost("register")]
        public ActionResult<UserDto> Register()
        {
            return new UserDto();
        }
    }
}
