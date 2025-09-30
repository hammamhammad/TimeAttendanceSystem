using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeVacationsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeVacations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier for vacation assignment"),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false, comment: "Vacation type identifier for categorization"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false, comment: "Start date of vacation period"),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false, comment: "End date of vacation period"),
                    TotalDays = table.Column<int>(type: "int", nullable: false, comment: "Total number of vacation days"),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false, defaultValue: true, comment: "Whether vacation is approved and affects attendance"),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true, comment: "Optional notes about the vacation"),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeVacations", x => x.Id);
                    table.CheckConstraint("CK_EmployeeVacations_PositiveTotalDays", "TotalDays > 0");
                    table.CheckConstraint("CK_EmployeeVacations_ValidDateRange", "EndDate >= StartDate");
                    table.ForeignKey(
                        name: "FK_EmployeeVacations_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeVacations_VacationTypes",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_DateRange",
                table: "EmployeeVacations",
                columns: new[] { "StartDate", "EndDate" },
                filter: "IsDeleted = 0 AND IsApproved = 1");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_Employee_EndDate",
                table: "EmployeeVacations",
                columns: new[] { "EmployeeId", "EndDate" },
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_Employee_StartDate",
                table: "EmployeeVacations",
                columns: new[] { "EmployeeId", "StartDate" },
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_EmployeeId",
                table: "EmployeeVacations",
                column: "EmployeeId",
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_IsApproved",
                table: "EmployeeVacations",
                column: "IsApproved",
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_VacationTypeId",
                table: "EmployeeVacations",
                column: "VacationTypeId",
                filter: "IsDeleted = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeVacations");
        }
    }
}
