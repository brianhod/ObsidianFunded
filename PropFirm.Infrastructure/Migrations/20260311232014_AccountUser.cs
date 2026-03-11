using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropFirm.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AccountUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_account",
                table: "account");

            migrationBuilder.RenameTable(
                name: "account",
                newName: "Account");

            migrationBuilder.AddColumn<string>(
                name: "RegisterFromIpAddress",
                table: "Users",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Account",
                table: "Account",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Account",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "RegisterFromIpAddress",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Account",
                newName: "account");

            migrationBuilder.AddPrimaryKey(
                name: "PK_account",
                table: "account",
                column: "id");
        }
    }
}
