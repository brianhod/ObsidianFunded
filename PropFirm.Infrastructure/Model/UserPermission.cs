
namespace PropFirm.Infrastructure.Model
{
    public class UserPermissionEntity
    {
        public Guid UserId { get; set; }
        public UserEntity User { get; set; } = null!;
        public Guid PermissionId { get; set; }
        public PermissionEntity Permission { get; set; } = null!;
        public bool IsGranted { get; set; }
    }
}
