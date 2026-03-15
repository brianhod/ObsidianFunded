using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PropFirm.Infrastructure.Model;
using PropfirmApp.Domain;

namespace PropFirm.Infrastructure
{

    public class ApplicationUser : IdentityUser
    {
    }

    public sealed class AppDbContext :  IdentityDbContext<UserEntity, IdentityRole<Guid>, Guid>
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
        public DbSet<UserEntity> Users { get; set; } = null!;
        public DbSet<ProfileEntity> Profiles { get; set; } = null!;
        public DbSet<Transaction> TradeTransactions { get; set; } = null!;
        public DbSet<Account> Accounts { get; set; } = null!;
        public DbSet<AccountTransaction> AccountTransactions { get; set; } = null!;
        public DbSet<AccoutType> AccountTypes { get; set; } = null!; 
        public DbSet<AddOn> AddOns { get; set; } = null!;
        public DbSet<Badge> Badges { get; set; } = null!;
        public DbSet<Challenge> Challenges { get; set; } = null!;
        public DbSet<ChallengePhase> ChallengePhases { get; set; } = null!;
        public DbSet<Country> Countries { get; set; } = null!;
        public DbSet<LinkedAccount> LinkedAccounts { get; set; } = null!;
        public DbSet<Phase> Phases { get; set; } = null!;
        public DbSet<UserBadge> UserBadges { get; set; } = null!;
        public DbSet<UserChallenge> UserChallenges { get; set; } = null!;
        public DbSet<AffiliateEarning> AffiliateEarnings { get; set; } = null!;
        public DbSet<PermissionEntity> Permissions { get; set; } = null!;
        public DbSet<RolePermissionEntity> RolePermissions { get; set; } = null!;
        public DbSet<UserPermissionEntity> UserPermissions { get; set; } = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>(entity =>
            {
                entity.ToTable("Users");
                entity.Property(x => x.Id)
                    .HasColumnName("id");
                entity.Property(x => x.Email)
                    .HasColumnName("email");
                entity.Property(x => x.UserName)
                     .HasColumnName("username");
                entity.HasIndex(x => x.Email)
                    .IsUnique()
                    .HasDatabaseName("IX_Users_Email");
                entity.HasIndex(x => x.UserName)
                    .IsUnique()
                    .HasDatabaseName("IX_Users_Username");
            });


            modelBuilder.Entity<IdentityRole<Guid>>(entity =>
            {
                entity.ToTable("Roles");
            });

            modelBuilder.Entity<IdentityUserRole<Guid>>(entity =>
            {
                entity.ToTable("UserRoles");
            });

            modelBuilder.Entity<IdentityUserClaim<Guid>>(entity =>
            {
                entity.ToTable("UserClaims");
            });

            modelBuilder.Entity<IdentityUserLogin<Guid>>(entity =>
            {
                entity.ToTable("UserLogins");
            });

            modelBuilder.Entity<IdentityUserToken<Guid>>(entity =>
            {
                entity.ToTable("UserTokens");
            });

            modelBuilder.Entity<IdentityRoleClaim<Guid>>(entity =>
            {
                entity.ToTable("RoleClaims");
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasIndex(x => x.TokenHash).IsUnique();

                entity.HasOne(x => x.User)
                      .WithMany() // change to .WithMany(u => u.RefreshTokens) if you add collection nav
                      .HasForeignKey(x => x.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<PermissionEntity>(entity =>
            {
                entity.ToTable("Permissions");
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
                entity.Property(x => x.Code).HasMaxLength(100).IsRequired();

                entity.HasIndex(x => x.Code).IsUnique();
            });

            modelBuilder.Entity<RolePermissionEntity>(entity =>
            {
                entity.ToTable("RolePermissions");
                entity.HasKey(x => new { x.RoleId, x.PermissionId });

                entity.HasOne(x => x.Role)
                    .WithMany()
                    .HasForeignKey(x => x.RoleId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.Permission)
                    .WithMany()
                    .HasForeignKey(x => x.PermissionId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<UserPermissionEntity>(entity =>
            {
                entity.ToTable("UserPermissions");
                entity.HasKey(x => new { x.UserId, x.PermissionId });

                entity.HasOne(x => x.User)
                    .WithMany()
                    .HasForeignKey(x => x.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.Permission)
                    .WithMany()
                    .HasForeignKey(x => x.PermissionId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}