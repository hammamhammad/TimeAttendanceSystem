using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EnhanceOvertimeCalculation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "OvertimeAmount",
                table: "AttendanceRecords",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "OvertimeCalculationNotes",
                table: "AttendanceRecords",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OvertimeConfigurationId",
                table: "AttendanceRecords",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OvertimeDayType",
                table: "AttendanceRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "OvertimeRate",
                table: "AttendanceRecords",
                type: "decimal(4,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PostShiftOvertimeHours",
                table: "AttendanceRecords",
                type: "decimal(5,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PreShiftOvertimeHours",
                table: "AttendanceRecords",
                type: "decimal(5,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_OvertimeConfiguration",
                table: "AttendanceRecords",
                column: "OvertimeConfigurationId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_OvertimeDayType",
                table: "AttendanceRecords",
                column: "OvertimeDayType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AttendanceRecords_OvertimeConfiguration",
                table: "AttendanceRecords");

            migrationBuilder.DropIndex(
                name: "IX_AttendanceRecords_OvertimeDayType",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "OvertimeAmount",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "OvertimeCalculationNotes",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "OvertimeConfigurationId",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "OvertimeDayType",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "OvertimeRate",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "PostShiftOvertimeHours",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "PreShiftOvertimeHours",
                table: "AttendanceRecords");
        }
    }
}
