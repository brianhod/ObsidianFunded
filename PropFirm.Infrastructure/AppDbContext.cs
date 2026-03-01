using Microsoft.EntityFrameworkCore;
using PropFirm.Infrastructure.Model;
using PropfirmApp.Domain;

namespace PropFirm.Infrastructure
{
    public class AppDbContext : DbContext
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

        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(x => x.Id);
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasIndex(x => x.TokenHash).IsUnique();

                entity.HasOne(x => x.User)
                      .WithMany() // change to .WithMany(u => u.RefreshTokens) if you add collection nav
                      .HasForeignKey(x => x.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}