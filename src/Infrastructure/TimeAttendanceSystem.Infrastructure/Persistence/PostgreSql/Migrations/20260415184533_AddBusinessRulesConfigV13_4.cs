using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddBusinessRulesConfigV13_4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssetOverdueReturnAlertDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "1,3,7,14,30");

            migrationBuilder.AddColumn<string>(
                name: "AssetWarrantyExpiryAlertDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "30,15,7,1");

            migrationBuilder.AddColumn<int>(
                name: "AttendanceCorrectionMaxRetroactiveDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 30);

            migrationBuilder.AddColumn<string>(
                name: "DocumentExpiryAlertDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "30,15,7");

            migrationBuilder.AddColumn<string>(
                name: "GrievanceSlaAlertDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "3,1");

            migrationBuilder.AddColumn<string>(
                name: "NotificationRecipientRolesCsv",
                table: "TenantSettings",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "HRManager,SystemAdmin");

            migrationBuilder.AddColumn<string>(
                name: "SuccessionPlanReminderDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "30,7,1");

            migrationBuilder.AddColumn<int>(
                name: "TimesheetSubmissionReminderDaysBefore",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.AddColumn<string>(
                name: "TrainingSessionReminderDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "7,3,1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetOverdueReturnAlertDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AssetWarrantyExpiryAlertDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AttendanceCorrectionMaxRetroactiveDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "DocumentExpiryAlertDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "GrievanceSlaAlertDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "NotificationRecipientRolesCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "SuccessionPlanReminderDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "TimesheetSubmissionReminderDaysBefore",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "TrainingSessionReminderDaysCsv",
                table: "TenantSettings");
        }
    }
}
