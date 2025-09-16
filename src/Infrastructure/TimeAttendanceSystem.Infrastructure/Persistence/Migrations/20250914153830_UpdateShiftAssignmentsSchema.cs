using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateShiftAssignmentsSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add missing columns to ShiftAssignments table
            migrationBuilder.AddColumn<int>(
                name: "AssignmentType",
                table: "ShiftAssignments",
                type: "int",
                nullable: false,
                defaultValue: 1,
                comment: "Type of assignment: Employee (1), Department (2), or Branch (3)");

            migrationBuilder.AddColumn<long>(
                name: "DepartmentId",
                table: "ShiftAssignments",
                type: "bigint",
                nullable: true,
                comment: "Department ID for department-level assignments (null for employee/branch assignments)");

            migrationBuilder.AddColumn<long>(
                name: "BranchId",
                table: "ShiftAssignments",
                type: "bigint",
                nullable: true,
                comment: "Branch ID for branch-level assignments (null for employee/department assignments)");

            migrationBuilder.AddColumn<DateTime>(
                name: "EffectiveDate",
                table: "ShiftAssignments",
                type: "datetime2",
                nullable: false,
                defaultValue: DateTime.UtcNow,
                comment: "Date when this assignment becomes active");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "ShiftAssignments",
                type: "datetime2",
                nullable: true,
                comment: "Optional end date for temporary assignments");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "ShiftAssignments",
                type: "int",
                nullable: false,
                defaultValue: 10,
                comment: "Assignment priority for conflict resolution (higher values take precedence)");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "ShiftAssignments",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                comment: "Optional notes about the assignment");

            migrationBuilder.AddColumn<long>(
                name: "AssignedByUserId",
                table: "ShiftAssignments",
                type: "bigint",
                nullable: false,
                defaultValue: 1L,
                comment: "ID of the user who created this assignment");

            // Add foreign key constraints
            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_DepartmentId",
                table: "ShiftAssignments",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_BranchId",
                table: "ShiftAssignments",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShiftAssignments_Departments",
                table: "ShiftAssignments",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShiftAssignments_Branches",
                table: "ShiftAssignments",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove foreign key constraints
            migrationBuilder.DropForeignKey(
                name: "FK_ShiftAssignments_Departments",
                table: "ShiftAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_ShiftAssignments_Branches",
                table: "ShiftAssignments");

            // Remove indexes
            migrationBuilder.DropIndex(
                name: "IX_ShiftAssignments_DepartmentId",
                table: "ShiftAssignments");

            migrationBuilder.DropIndex(
                name: "IX_ShiftAssignments_BranchId",
                table: "ShiftAssignments");

            // Remove added columns
            migrationBuilder.DropColumn(
                name: "AssignmentType",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "EffectiveDate",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "ShiftAssignments");

            migrationBuilder.DropColumn(
                name: "AssignedByUserId",
                table: "ShiftAssignments");
        }
    }
}
