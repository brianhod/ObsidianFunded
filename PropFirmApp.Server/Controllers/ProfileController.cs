using Microsoft.AspNetCore.Mvc;

namespace PropFirmApp.Server.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
