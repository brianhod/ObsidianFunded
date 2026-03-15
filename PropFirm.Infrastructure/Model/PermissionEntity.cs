using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropFirm.Infrastructure.Model
{

    [Table("Permission")]
    public class PermissionEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Code { get; set; } = "";   // e.g. users.read
        public string Description { get; set; } = "";
    }
}
