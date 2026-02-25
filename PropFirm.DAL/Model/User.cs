using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PropFirm.Infrastructure.Model
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
    }

    //[Table("user_configuration")]
    //public class UserConfigurationEntity 
    //{

    //    [Key]
    //    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    //    [Column("id")]
    //    public Guid Id { get; set; }

    //    [MaxLength(255)]
    //    [Column("client_id")]
    //    public string ClientId { get; set; }

    //    [MaxLength(255)]
    //    [Column("area")]
    //    public string Area { get; set; }

    //    [MaxLength(255)]
    //    [Column("config_version")]
    //    public string ConfigurationVersion { get; set; }

    //    [Column("configuration")]
    //    public string Configuration { get; set; }

    //}
}
