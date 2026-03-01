using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PropFirmApp.Server.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpGet("admin-area")]
        public IActionResult AdminArea()
            => Ok("Admins only");

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("admin-policy")]
        public IActionResult AdminPolicy()
            => Ok("Admins only (policy)");
    }
}
