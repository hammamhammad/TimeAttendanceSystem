using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorRemoteWorkAssignmentToRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkAssignments_RemoteWorkAssignmentId",
                table: "AttendanceRecords");

            migrationBuilder.DropTable(
                name: "RemoteWorkAssignments");

            migrationBuilder.RenameColumn(
                name: "RemoteWorkAssignmentId",
                table: "AttendanceRecords",
                newName: "RemoteWorkRequestId");

            migrationBuilder.RenameIndex(
                name: "IX_AttendanceRecords_RemoteWorkAssignment",
                table: "AttendanceRecords",
                newName: "IX_AttendanceRecords_RemoteWorkRequest");

            migrationBuilder.CreateTable(
                name: "RemoteWorkRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_RemoteWorkRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_RemoteWorkPolicies_RemoteWorkPolicyId",
                        column: x => x.RemoteWorkPolicyId,
                        principalTable: "RemoteWorkPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_Users_ApprovedByUserId",
                        column: x => x.ApprovedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_ApprovedByUserId",
                table: "RemoteWorkRequests",
                column: "ApprovedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_CreatedByUserId",
                table: "RemoteWorkRequests",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_Employee_Dates",
                table: "RemoteWorkRequests",
                columns: new[] { "EmployeeId", "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_Employee_Status_StartDate",
                table: "RemoteWorkRequests",
                columns: new[] { "EmployeeId", "Status", "StartDate" });

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_EmployeeId",
                table: "RemoteWorkRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_EndDate",
                table: "RemoteWorkRequests",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_IsDeleted",
                table: "RemoteWorkRequests",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_RemoteWorkPolicyId",
                table: "RemoteWorkRequests",
                column: "RemoteWorkPolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_StartDate",
                table: "RemoteWorkRequests",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_Status",
                table: "RemoteWorkRequests",
                column: "Status");

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkRequests_RemoteWorkRequestId",
                table: "AttendanceRecords",
                column: "RemoteWorkRequestId",
                principalTable: "RemoteWorkRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkRequests_RemoteWorkRequestId",
                table: "AttendanceRecords");

            migrationBuilder.DropTable(
                name: "RemoteWorkRequests");

            migrationBuilder.RenameColumn(
                name: "RemoteWorkRequestId",
                table: "AttendanceRecords",
                newName: "RemoteWorkAssignmentId");

            migrationBuilder.RenameIndex(
                name: "IX_AttendanceRecords_RemoteWorkRequest",
                table: "AttendanceRecords",
                newName: "IX_AttendanceRecords_RemoteWorkAssignment");

            migrationBuilder.CreateTable(
                name: "RemoteWorkAssignments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApprovedByManagerId = table.Column<long>(type: "bigint", nullable: true),
                    AssignedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    RemoteWorkPolicyId = table.Column<long>(type: "bigint", nullable: false),
                    ApprovalDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RejectionReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    WorkingDaysCount = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkAssignments_RemoteWorkAssignmentId",
                table: "AttendanceRecords",
                column: "RemoteWorkAssignmentId",
                principalTable: "RemoteWorkAssignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
