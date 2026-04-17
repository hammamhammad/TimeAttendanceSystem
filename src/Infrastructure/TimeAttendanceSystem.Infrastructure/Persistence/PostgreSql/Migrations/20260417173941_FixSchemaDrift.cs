using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class FixSchemaDrift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefaultTimeZoneId",
                table: "CompanySettings",
                type: "text",
                nullable: false,
                defaultValue: "UTC");

            migrationBuilder.AddColumn<int>(
                name: "AttendanceDuplicateSuppressionSeconds",
                table: "CompanySettings",
                type: "integer",
                nullable: false,
                defaultValue: 30);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendanceDuplicateSuppressionSeconds",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "DefaultTimeZoneId",
                table: "CompanySettings");
        }
    }
}
