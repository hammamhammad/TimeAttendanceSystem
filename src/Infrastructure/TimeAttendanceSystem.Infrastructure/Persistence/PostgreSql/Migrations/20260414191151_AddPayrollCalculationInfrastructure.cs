using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddPayrollCalculationInfrastructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppliesToNationalityCode",
                table: "SocialInsuranceConfigs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CalculationBreakdownJson",
                table: "PayrollRecords",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CalculationVersion",
                table: "PayrollRecords",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "LastRunId",
                table: "PayrollRecords",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LockedAtUtc",
                table: "PayrollRecords",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LockedByUserId",
                table: "PayrollRecords",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LockedAtUtc",
                table: "PayrollPeriods",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LockedByUserId",
                table: "PayrollPeriods",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PayrollCalendarPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    BasisType = table.Column<int>(type: "integer", nullable: false),
                    FixedBasisDays = table.Column<int>(type: "integer", nullable: true),
                    StandardHoursPerDay = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    TreatPublicHolidaysAsPaid = table.Column<bool>(type: "boolean", nullable: false),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollCalendarPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollCalendarPolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PayrollRunAudits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollPeriodId = table.Column<long>(type: "bigint", nullable: false),
                    RunType = table.Column<int>(type: "integer", nullable: false),
                    TriggeredByUserId = table.Column<long>(type: "bigint", nullable: true),
                    TriggeredByUsername = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    StartedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ConfigSnapshotJson = table.Column<string>(type: "jsonb", nullable: true),
                    EmployeesProcessed = table.Column<int>(type: "integer", nullable: false),
                    EmployeesFailed = table.Column<int>(type: "integer", nullable: false),
                    EmployeesSkipped = table.Column<int>(type: "integer", nullable: false),
                    WarningCount = table.Column<int>(type: "integer", nullable: false),
                    WarningsJson = table.Column<string>(type: "jsonb", nullable: true),
                    ErrorsJson = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollRunAudits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollRunAudits_PayrollPeriods_PayrollPeriodId",
                        column: x => x.PayrollPeriodId,
                        principalTable: "PayrollPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PayrollRunAuditItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollRunAuditId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    GrossEarnings = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    NetSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    TaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    SocialInsuranceEmployee = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    OvertimePay = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    AbsenceDeduction = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    WarningsJson = table.Column<string>(type: "jsonb", nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollRunAuditItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollRunAuditItems_PayrollRunAudits_PayrollRunAuditId",
                        column: x => x.PayrollRunAuditId,
                        principalTable: "PayrollRunAudits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PayrollCalendarPolicies_Branch_Active_Effective",
                table: "PayrollCalendarPolicies",
                columns: new[] { "BranchId", "IsActive", "EffectiveFromDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRunAuditItems_Audit_Employee",
                table: "PayrollRunAuditItems",
                columns: new[] { "PayrollRunAuditId", "EmployeeId" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRunAudits_PayrollPeriod_StartedAt",
                table: "PayrollRunAudits",
                columns: new[] { "PayrollPeriodId", "StartedAtUtc" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRunAudits_PayrollPeriodId",
                table: "PayrollRunAudits",
                column: "PayrollPeriodId",
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PayrollCalendarPolicies");

            migrationBuilder.DropTable(
                name: "PayrollRunAuditItems");

            migrationBuilder.DropTable(
                name: "PayrollRunAudits");

            migrationBuilder.DropColumn(
                name: "AppliesToNationalityCode",
                table: "SocialInsuranceConfigs");

            migrationBuilder.DropColumn(
                name: "CalculationBreakdownJson",
                table: "PayrollRecords");

            migrationBuilder.DropColumn(
                name: "CalculationVersion",
                table: "PayrollRecords");

            migrationBuilder.DropColumn(
                name: "LastRunId",
                table: "PayrollRecords");

            migrationBuilder.DropColumn(
                name: "LockedAtUtc",
                table: "PayrollRecords");

            migrationBuilder.DropColumn(
                name: "LockedByUserId",
                table: "PayrollRecords");

            migrationBuilder.DropColumn(
                name: "LockedAtUtc",
                table: "PayrollPeriods");

            migrationBuilder.DropColumn(
                name: "LockedByUserId",
                table: "PayrollPeriods");
        }
    }
}
