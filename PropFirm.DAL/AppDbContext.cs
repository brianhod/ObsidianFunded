using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using PropFirm.Infrastructure.Model;

namespace PropFirm.Infrastructure
{
    public class AppDbContext : DbContext
    {
        private readonly HttpContextAccessor _httpContextAccessor;
        public virtual DbSet<UserEntity> Users {  get; set; }
        public virtual DbSet<Profile> Profile { get; set; }
        public virtual DbSet<Transaction> TradeTransactions { get; set; }
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<AccountTransaction> AccountTransactions { get; set; }
        public virtual DbSet<AccoutType> AccountTypes { get; set; }
        public virtual DbSet<AddOn> AddOns { get; set; }
        public virtual DbSet<AddOn> Badges { get; set; }
        public virtual DbSet<Challenge> Challenges { get; set; }
        public virtual DbSet<ChallengePhase> ChallengePhases { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<LinkedAccount> LinkedAccounts { get; set; }
        public virtual DbSet<Phase> Phases { get; set; }
        public virtual DbSet<UserBadge> UserBadges { get; set; }
        public virtual DbSet<UserChallenge> UserChallenges { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            _httpContextAccessor = new HttpContextAccessor();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

    public class Dbtransaction
    {
        public async Task GetUsers()
        {
            string cs = "Server=localhost;Port=3306;Database=mydb;User=myuser;Password=mypassword;";

            await using var conn = new MySqlConnection(cs);
            await conn.OpenAsync();

            await using var cmd = new MySqlCommand("SELECT NOW()", conn);
            var result = await cmd.ExecuteScalarAsync();

            Console.WriteLine(result);
        }

    }
}
