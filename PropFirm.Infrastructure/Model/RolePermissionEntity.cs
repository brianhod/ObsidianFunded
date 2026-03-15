using Microsoft.AspNetCore.Identity;

namespace PropFirm.Infrastructure.Model
{
    public class RolePermissionEntity
    {
        public Guid RoleId { get; set; }
        public IdentityRole<Guid> Role { get; set; } = null!;
        public Guid PermissionId { get; set; }
        public PermissionEntity Permission { get; set; } = null!;
    }
}
