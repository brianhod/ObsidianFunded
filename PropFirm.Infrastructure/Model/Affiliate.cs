using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PropFirm.Infrastructure.Model
{
    public class Affiliate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; }
        public long AffiliateId { get; set; }
        public string AffiliateCode { get; set; }
        public decimal AffiliateEarning { get; set; }
        public string ReferralCode { get; set; }
        public string ReferralCodeUrl { get; set; }
        public decimal TotalPaidOut { get; set; }
        public decimal AvailableBalance { get; set; }
    }
}
