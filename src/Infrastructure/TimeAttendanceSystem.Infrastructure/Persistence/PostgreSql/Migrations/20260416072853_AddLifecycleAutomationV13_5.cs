using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddLifecycleAutomationV13_5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // v13.5 TenantSettings additions. DB defaults MIRROR the v13.x hardcoded behavior
            // so deploying this migration is observably a no-op until a tenant flips a flag.

            // Master kill-switch — on by default.
            migrationBuilder.AddColumn<bool>(
                name: "LifecycleAutomationEnabled",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            // Offer → onboarding: v13.x always tried to auto-create → default true.
            migrationBuilder.AddColumn<bool>(
                name: "AutoCreateOnboardingOnOfferAcceptance",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<long>(
                name: "DefaultOnboardingTemplateId",
                table: "TenantSettings",
                type: "bigint",
                nullable: true);

            // New pre-hire gate — opt-in, default false preserves v13.x active-on-day-one.
            migrationBuilder.AddColumn<bool>(
                name: "CreateEmployeeInactiveAtOfferAcceptance",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // Onboarding → activation: default false = milestone-only (no state toggle).
            migrationBuilder.AddColumn<bool>(
                name: "AutoActivateEmployeeOnOnboardingComplete",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // v13.x enforced required-task gate — default true.
            migrationBuilder.AddColumn<bool>(
                name: "OnboardingCompletionRequiresAllRequiredTasks",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            // New required-docs gate — default false preserves v13.x.
            migrationBuilder.AddColumn<bool>(
                name: "OnboardingCompletionRequiresAllRequiredDocuments",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // Resignation → termination: new automation, opt-in, default false.
            migrationBuilder.AddColumn<bool>(
                name: "AutoCreateTerminationOnResignationApproved",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // Termination → clearance: v13.x hardcoded → default true.
            migrationBuilder.AddColumn<bool>(
                name: "AutoCreateClearanceOnTermination",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<long>(
                name: "DefaultClearanceTemplateId",
                table: "TenantSettings",
                type: "bigint",
                nullable: true);

            // Termination → suspend (new semantics; replaces immediate IsActive=false).
            // Default true + AutoDeactivateOnFinalSettlementPaid=true = v13.x end-state.
            migrationBuilder.AddColumn<bool>(
                name: "AutoSuspendEmployeeOnTerminationCreated",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            // Clearance → enable settlement: opt-in gate, default false.
            migrationBuilder.AddColumn<bool>(
                name: "RequireClearanceCompleteBeforeFinalSettlement",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // Clearance → auto-calc settlement: opt-in, default false.
            migrationBuilder.AddColumn<bool>(
                name: "AutoEnableFinalSettlementCalcOnClearanceComplete",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // Settlement paid → deactivate: default true (completes v13.x end-state).
            migrationBuilder.AddColumn<bool>(
                name: "AutoDeactivateEmployeeOnFinalSettlementPaid",
                table: "TenantSettings",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            // Contract expired action: default AutoMarkExpired fixes pre-v13.5 "Active past end date" bug.
            migrationBuilder.AddColumn<string>(
                name: "ContractExpiredAction",
                table: "TenantSettings",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "AutoMarkExpired");

            migrationBuilder.AddColumn<bool>(
                name: "IsPreHire",
                table: "Employees",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSuspended",
                table: "Employees",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "OnboardingCompletedAt",
                table: "Employees",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LifecycleAutomationAudits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AutomationType = table.Column<int>(type: "integer", nullable: false),
                    SourceEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SourceEntityId = table.Column<long>(type: "bigint", nullable: false),
                    TargetEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    TargetEntityId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    TriggeredAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TriggeredByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ContextJson = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LifecycleAutomationAudits", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LifecycleAutomationAudits_Source",
                table: "LifecycleAutomationAudits",
                columns: new[] { "SourceEntityType", "SourceEntityId" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_LifecycleAutomationAudits_Source_Type_Status",
                table: "LifecycleAutomationAudits",
                columns: new[] { "SourceEntityType", "SourceEntityId", "AutomationType", "Status" },
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LifecycleAutomationAudits");

            migrationBuilder.DropColumn(
                name: "AutoActivateEmployeeOnOnboardingComplete",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AutoCreateClearanceOnTermination",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AutoCreateOnboardingOnOfferAcceptance",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AutoCreateTerminationOnResignationApproved",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AutoDeactivateEmployeeOnFinalSettlementPaid",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AutoEnableFinalSettlementCalcOnClearanceComplete",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AutoSuspendEmployeeOnTerminationCreated",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "ContractExpiredAction",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "CreateEmployeeInactiveAtOfferAcceptance",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "DefaultClearanceTemplateId",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "DefaultOnboardingTemplateId",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "LifecycleAutomationEnabled",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "OnboardingCompletionRequiresAllRequiredDocuments",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "OnboardingCompletionRequiresAllRequiredTasks",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "RequireClearanceCompleteBeforeFinalSettlement",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "IsPreHire",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "IsSuspended",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OnboardingCompletedAt",
                table: "Employees");
        }
    }
}
