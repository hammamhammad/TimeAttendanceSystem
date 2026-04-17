using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class RemoveLegacyAutoCheckoutSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoCheckOutEnabled",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "AutoCheckOutTime",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "AutoCheckOutEnabled",
                table: "BranchSettingsOverrides");

            migrationBuilder.DropColumn(
                name: "AutoCheckOutTime",
                table: "BranchSettingsOverrides");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AutoCheckOutEnabled",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "AutoCheckOutTime",
                table: "CompanySettings",
                type: "time without time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AutoCheckOutEnabled",
                table: "BranchSettingsOverrides",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "AutoCheckOutTime",
                table: "BranchSettingsOverrides",
                type: "time without time zone",
                nullable: true);
        }
    }
}
