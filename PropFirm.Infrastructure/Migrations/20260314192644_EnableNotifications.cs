using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropFirm.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EnableNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EnableNotifications",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnableNotifications",
                table: "Users");
        }
    }
}
