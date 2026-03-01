using Microsoft.AspNetCore.Mvc;
using PropFirm.Dto;
using PropFirm.Infrastructure.Interface;

namespace PropFirmApp.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;

        public AuthController(IAuthService auth) => _auth = auth;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var result = await _auth.LoginAsync(req.UserName, req.Password, ip);
            return result is null ? Unauthorized() : Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest req)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var result = await _auth.RefreshAsync(req.RefreshToken, ip);
            return result is null ? Unauthorized() : Ok(result);
        }

        [HttpPost("revoke")]
        public async Task<IActionResult> Revoke([FromBody] RevokeRequest req)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var ok = await _auth.RevokeAsync(req.RefreshToken, ip);
            return ok ? Ok() : NotFound();
        }
    }
}
