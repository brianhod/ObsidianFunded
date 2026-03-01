using PropfirmApp.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PropFirm.Infrastructure.Model
{
    public class RefreshToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public UserEntity User { get; set; } = default!;

        // Store only HASH in DB, never the raw token
        public string TokenHash { get; set; } = default!;

        public DateTime CreatedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }

        public DateTime? RevokedUtc { get; set; }
        public string? ReplacedByTokenHash { get; set; }

        public string? CreatedByIp { get; set; }
        public string? RevokedByIp { get; set; }

        public bool IsExpired => DateTime.UtcNow >= ExpiresUtc;
        public bool IsActive => RevokedUtc == null && !IsExpired;
    }
}
