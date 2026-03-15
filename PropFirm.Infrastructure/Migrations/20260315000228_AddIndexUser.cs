using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropFirm.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "username");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "email");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "Users",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Users",
                newName: "Email");
        }
    }
}
