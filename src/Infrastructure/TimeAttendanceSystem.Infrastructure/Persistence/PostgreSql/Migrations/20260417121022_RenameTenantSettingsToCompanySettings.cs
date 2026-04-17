using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class RenameTenantSettingsToCompanySettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Rename TenantSettings → CompanySettings (data-preserving).
            migrationBuilder.RenameTable(
                name: "TenantSettings",
                newName: "CompanySettings");

            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'PK_TenantSettings') THEN
                        ALTER INDEX ""PK_TenantSettings"" RENAME TO ""PK_CompanySettings"";
                    END IF;
                END $$;
            ");

            migrationBuilder.AlterColumn<int>(
                name: "ResubmissionCount",
                table: "WorkflowInstances",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "Resubmission counter; capped by CompanySettings.MaxWorkflowResubmissions (v13.6)",
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 0,
                oldComment: "Resubmission counter; capped by TenantSettings.MaxWorkflowResubmissions (v13.6)");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeductionEndDate",
                table: "SalaryAdvances",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeductionStartDate",
                table: "SalaryAdvances",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutedAtUtc",
                table: "SalaryAdvances",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExecutedByUserId",
                table: "SalaryAdvances",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutionError",
                table: "SalaryAdvances",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExecuted",
                table: "SalaryAdvances",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "FollowThroughProcessedAt",
                table: "PerformanceImprovementPlans",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RelatedResignationRequestId",
                table: "PerformanceImprovementPlans",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutedAtUtc",
                table: "LoanApplications",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExecutedByUserId",
                table: "LoanApplications",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutionError",
                table: "LoanApplications",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExecuted",
                table: "LoanApplications",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ScheduleGenerated",
                table: "LoanApplications",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutedAtUtc",
                table: "LetterRequests",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExecutedByUserId",
                table: "LetterRequests",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutionError",
                table: "LetterRequests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExecuted",
                table: "LetterRequests",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutedAtUtc",
                table: "ExpenseClaims",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExecutedByUserId",
                table: "ExpenseClaims",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutionError",
                table: "ExpenseClaims",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExecuted",
                table: "ExpenseClaims",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ReimbursementMethod",
                table: "ExpenseClaims",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutedAtUtc",
                table: "BenefitEnrollments",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExecutedByUserId",
                table: "BenefitEnrollments",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutionError",
                table: "BenefitEnrollments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExecuted",
                table: "BenefitEnrollments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PayrollDeductionEnabled",
                table: "BenefitEnrollments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutedAtUtc",
                table: "AllowanceRequests",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExecutedByUserId",
                table: "AllowanceRequests",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutionError",
                table: "AllowanceRequests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExecuted",
                table: "AllowanceRequests",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "ResultingAssignmentId",
                table: "AllowanceRequests",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OperationalFailureAlerts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    SourceEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SourceEntityId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    FailureCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Reason = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    ErrorMessage = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Severity = table.Column<int>(type: "integer", nullable: false),
                    FailedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsResolved = table.Column<bool>(type: "boolean", nullable: false),
                    ResolvedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ResolvedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ResolutionNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsRetryable = table.Column<bool>(type: "boolean", nullable: false),
                    RetryCount = table.Column<int>(type: "integer", nullable: false),
                    LastRetryAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MetadataJson = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationalFailureAlerts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OperationalFailureAlerts_Dashboard",
                table: "OperationalFailureAlerts",
                columns: new[] { "IsResolved", "FailedAtUtc" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_OperationalFailureAlerts_Dedup",
                table: "OperationalFailureAlerts",
                columns: new[] { "Category", "SourceEntityType", "SourceEntityId", "FailureCode", "IsResolved" },
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OperationalFailureAlerts");

            migrationBuilder.DropColumn(
                name: "DeductionEndDate",
                table: "SalaryAdvances");

            migrationBuilder.DropColumn(
                name: "DeductionStartDate",
                table: "SalaryAdvances");

            migrationBuilder.DropColumn(
                name: "ExecutedAtUtc",
                table: "SalaryAdvances");

            migrationBuilder.DropColumn(
                name: "ExecutedByUserId",
                table: "SalaryAdvances");

            migrationBuilder.DropColumn(
                name: "ExecutionError",
                table: "SalaryAdvances");

            migrationBuilder.DropColumn(
                name: "IsExecuted",
                table: "SalaryAdvances");

            migrationBuilder.DropColumn(
                name: "FollowThroughProcessedAt",
                table: "PerformanceImprovementPlans");

            migrationBuilder.DropColumn(
                name: "RelatedResignationRequestId",
                table: "PerformanceImprovementPlans");

            migrationBuilder.DropColumn(
                name: "ExecutedAtUtc",
                table: "LoanApplications");

            migrationBuilder.DropColumn(
                name: "ExecutedByUserId",
                table: "LoanApplications");

            migrationBuilder.DropColumn(
                name: "ExecutionError",
                table: "LoanApplications");

            migrationBuilder.DropColumn(
                name: "IsExecuted",
                table: "LoanApplications");

            migrationBuilder.DropColumn(
                name: "ScheduleGenerated",
                table: "LoanApplications");

            migrationBuilder.DropColumn(
                name: "ExecutedAtUtc",
                table: "LetterRequests");

            migrationBuilder.DropColumn(
                name: "ExecutedByUserId",
                table: "LetterRequests");

            migrationBuilder.DropColumn(
                name: "ExecutionError",
                table: "LetterRequests");

            migrationBuilder.DropColumn(
                name: "IsExecuted",
                table: "LetterRequests");

            migrationBuilder.DropColumn(
                name: "ExecutedAtUtc",
                table: "ExpenseClaims");

            migrationBuilder.DropColumn(
                name: "ExecutedByUserId",
                table: "ExpenseClaims");

            migrationBuilder.DropColumn(
                name: "ExecutionError",
                table: "ExpenseClaims");

            migrationBuilder.DropColumn(
                name: "IsExecuted",
                table: "ExpenseClaims");

            migrationBuilder.DropColumn(
                name: "ReimbursementMethod",
                table: "ExpenseClaims");

            migrationBuilder.DropColumn(
                name: "ExecutedAtUtc",
                table: "BenefitEnrollments");

            migrationBuilder.DropColumn(
                name: "ExecutedByUserId",
                table: "BenefitEnrollments");

            migrationBuilder.DropColumn(
                name: "ExecutionError",
                table: "BenefitEnrollments");

            migrationBuilder.DropColumn(
                name: "IsExecuted",
                table: "BenefitEnrollments");

            migrationBuilder.DropColumn(
                name: "PayrollDeductionEnabled",
                table: "BenefitEnrollments");

            migrationBuilder.DropColumn(
                name: "ExecutedAtUtc",
                table: "AllowanceRequests");

            migrationBuilder.DropColumn(
                name: "ExecutedByUserId",
                table: "AllowanceRequests");

            migrationBuilder.DropColumn(
                name: "ExecutionError",
                table: "AllowanceRequests");

            migrationBuilder.DropColumn(
                name: "IsExecuted",
                table: "AllowanceRequests");

            migrationBuilder.DropColumn(
                name: "ResultingAssignmentId",
                table: "AllowanceRequests");

            migrationBuilder.AlterColumn<int>(
                name: "ResubmissionCount",
                table: "WorkflowInstances",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "Resubmission counter; capped by TenantSettings.MaxWorkflowResubmissions (v13.6)",
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 0,
                oldComment: "Resubmission counter; capped by CompanySettings.MaxWorkflowResubmissions (v13.6)");

            // Reverse rename: CompanySettings → TenantSettings (data-preserving).
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'PK_CompanySettings') THEN
                        ALTER INDEX ""PK_CompanySettings"" RENAME TO ""PK_TenantSettings"";
                    END IF;
                END $$;
            ");

            migrationBuilder.RenameTable(
                name: "CompanySettings",
                newName: "TenantSettings");

        }
    }
}
