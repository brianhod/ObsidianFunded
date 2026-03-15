using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PropFirm.Infrastructure.Model
{
    [Table("Users")]
    public class UserEntity : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Title { get; set; } = "";
        public string? TenantId { get; set; }
        public string PhoneNumberPrefix { get; set; } = "";
        public string ReferalCode { get; set; } = "";
        public DateOnly DateOfBirth { get; set; }
        public DateTime? EmailConfirmedDateTime { get; set; }
        public bool Over18 { get; set; }
        public bool EnableNotifications { get; set; }
        public bool DetailsCorrect { get; set; }
        public bool RecieveMarketingMaterial { get; set; }
        public string RegisterFromIpAddress { get; set; } = "";
        public DateTime TransactionDateTime { get; set; }
    }
}