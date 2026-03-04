using Microsoft.AspNetCore.Mvc;
using PropFirm.Dto;
using PropFirm.Infrastructure.Interface;

namespace PropFirmApp.Server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _user;

        public UserController(IUserService user) => _user = user;
    
        [HttpPost("Register")]
        public async Task<IActionResult> Login([FromBody] RegisterRequest req)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var result = await _user.RegisterAsync(req, ip);
            return result is null ? Unauthorized() : Ok(result);
        }
    }
}
