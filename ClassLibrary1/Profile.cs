using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropfirmApp.Domain
{
    public class Profile
    {
        public int MyProperty { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Email { get; set; }
        public string TimeZone { get; set; }
    }
}
