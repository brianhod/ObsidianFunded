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
        [ProducesResponseType(typeof(RegisterResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterRequest req)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var result = await _user.RegisterAsync(req, ip);

            if (result is null || result.Data is null)
                return BadRequest(new ErrorResponse { Message = "Registration failed" });

            return Ok(result.Data);
        }
    }
}
