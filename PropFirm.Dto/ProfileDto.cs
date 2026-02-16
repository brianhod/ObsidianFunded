using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public class ProfileDto
    {
        public string UserGuid { get; set; }
        public string UserName { get; set; } = string.Empty;    
        public string ProfileName { get; set; } 
        public string Description { get; set; }
    }
}
