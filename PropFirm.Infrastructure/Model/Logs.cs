using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropFirm.Infrastructure.Model
{
    [Table("Logs")]
    public class LogsEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int Logtype { get; set; }
        public string LogTypeDescrition { get; set; } = "";
        public string IpAddress { get; set; } = "";
        public string MetaData { get; set; } = "";
        public string Location { get; set; } = "";
        public DateTime DateTimeStamp { get; set; }
    }
}
