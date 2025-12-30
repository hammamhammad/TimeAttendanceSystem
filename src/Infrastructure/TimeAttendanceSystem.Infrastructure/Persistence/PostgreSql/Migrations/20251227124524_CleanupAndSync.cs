using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class CleanupAndSync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SubmittedByUserId",
                table: "RemoteWorkRequests",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ScheduledDate",
                table: "FingerprintRequests",
                type: "timestamp",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "PreferredDate",
                table: "FingerprintRequests",
                type: "timestamp",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "SubmittedByUserId",
                table: "EmployeeVacations",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "SubmittedByUserId",
                table: "EmployeeExcuses",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmittedByUserId",
                table: "RemoteWorkRequests");

            migrationBuilder.DropColumn(
                name: "SubmittedByUserId",
                table: "EmployeeVacations");

            migrationBuilder.DropColumn(
                name: "SubmittedByUserId",
                table: "EmployeeExcuses");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ScheduledDate",
                table: "FingerprintRequests",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "PreferredDate",
                table: "FingerprintRequests",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true);
        }
    }
}
