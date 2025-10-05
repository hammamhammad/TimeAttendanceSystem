using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRemoteWorkEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "RemoteWorkAssignmentId",
                table: "AttendanceRecords",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkLocation",
                table: "AttendanceRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RemoteWorkPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    MaxDaysPerWeek = table.Column<int>(type: "int", nullable: true),
                    MaxDaysPerMonth = table.Column<int>(type: "int", nullable: true),
                    MaxDaysPerYear = table.Column<int>(type: "int", nullable: true),
                    RequiresManagerApproval = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    AllowConsecutiveDays = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    MaxConsecutiveDays = table.Column<int>(type: "int", nullable: true),
                    MinAdvanceNoticeDays = table.Column<int>(type: "int", nullable: true),
                    BlackoutPeriods = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    CountForOvertime = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    EnforceShiftTimes = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemoteWorkPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemoteWorkPolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RemoteWorkAssignments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AssignedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ApprovedByManagerId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovalDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RejectionReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RemoteWorkPolicyId = table.Column<long>(type: "bigint", nullable: false),
                    WorkingDaysCount = table.Column<int>(type: "int", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemoteWorkAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemoteWorkAssignments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemoteWorkAssignments_RemoteWorkPolicies_RemoteWorkPolicyId",
                        column: x => x.RemoteWorkPolicyId,
                        principalTable: "RemoteWorkPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemoteWorkAssignments_Users_ApprovedByManagerId",
                        column: x => x.ApprovedByManagerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemoteWorkAssignments_Users_AssignedByUserId",
                        column: x => x.AssignedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_RemoteWorkAssignment",
                table: "AttendanceRecords",
                column: "RemoteWorkAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_WorkLocation",
                table: "AttendanceRecords",
                column: "WorkLocation");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_ApprovedByManagerId",
                table: "RemoteWorkAssignments",
                column: "ApprovedByManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_AssignedByUserId",
                table: "RemoteWorkAssignments",
                column: "AssignedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_Employee_Dates",
                table: "RemoteWorkAssignments",
                columns: new[] { "EmployeeId", "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_Employee_Status_StartDate",
                table: "RemoteWorkAssignments",
                columns: new[] { "EmployeeId", "Status", "StartDate" });

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_EmployeeId",
                table: "RemoteWorkAssignments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_EndDate",
                table: "RemoteWorkAssignments",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_IsDeleted",
                table: "RemoteWorkAssignments",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_RemoteWorkPolicyId",
                table: "RemoteWorkAssignments",
                column: "RemoteWorkPolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_StartDate",
                table: "RemoteWorkAssignments",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkAssignments_Status",
                table: "RemoteWorkAssignments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkPolicies_BranchId",
                table: "RemoteWorkPolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkPolicies_BranchId_IsActive_IsDeleted",
                table: "RemoteWorkPolicies",
                columns: new[] { "BranchId", "IsActive", "IsDeleted" },
                filter: "[IsActive] = 1 AND [IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkPolicies_IsActive",
                table: "RemoteWorkPolicies",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkPolicies_IsDeleted",
                table: "RemoteWorkPolicies",
                column: "IsDeleted");

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkAssignments_RemoteWorkAssignmentId",
                table: "AttendanceRecords",
                column: "RemoteWorkAssignmentId",
                principalTable: "RemoteWorkAssignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkAssignments_RemoteWorkAssignmentId",
                table: "AttendanceRecords");

            migrationBuilder.DropTable(
                name: "RemoteWorkAssignments");

            migrationBuilder.DropTable(
                name: "RemoteWorkPolicies");

            migrationBuilder.DropIndex(
                name: "IX_AttendanceRecords_RemoteWorkAssignment",
                table: "AttendanceRecords");

            migrationBuilder.DropIndex(
                name: "IX_AttendanceRecords_WorkLocation",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "RemoteWorkAssignmentId",
                table: "AttendanceRecords");

            migrationBuilder.DropColumn(
                name: "WorkLocation",
                table: "AttendanceRecords");
        }
    }
}
