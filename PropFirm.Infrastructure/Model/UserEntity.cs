using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PropFirm.Infrastructure.Model
{
    [Table("Users")]
    public class UserEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Title { get; set; } = "";
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public string Email { get; set; } = "";
        public string? Role { get; set; }
        public string? TenantId { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumberPrefix { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string ReferalCode { get; set; } = "";
        public bool Over18 { get; set; }
        public bool DetailsCorrect { get; set; }
        public bool RecieveMarketingMaterial { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime EmailConfirmedDateTime { get; set; }
    }
}
