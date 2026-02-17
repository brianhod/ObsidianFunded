using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace PropFirm.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users => Set<User>();
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
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
