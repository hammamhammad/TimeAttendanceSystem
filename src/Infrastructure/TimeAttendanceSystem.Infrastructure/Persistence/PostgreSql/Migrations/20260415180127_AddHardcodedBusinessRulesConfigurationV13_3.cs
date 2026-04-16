using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddHardcodedBusinessRulesConfigurationV13_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContractExpiryAlertDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "30,15,7");

            migrationBuilder.AddColumn<int>(
                name: "DefaultProbationDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 90);

            migrationBuilder.AddColumn<int>(
                name: "ExcuseBackwardWindowDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 365);

            migrationBuilder.AddColumn<int>(
                name: "ExcuseForwardWindowDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 30);

            migrationBuilder.AddColumn<int>(
                name: "FrozenWorkflowCleanupDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 90);

            migrationBuilder.AddColumn<int>(
                name: "LoanRepaymentReminderDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 7);

            migrationBuilder.AddColumn<string>(
                name: "LoginLockoutPolicyJson",
                table: "TenantSettings",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxShiftGracePeriodMinutes",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 120);

            migrationBuilder.AddColumn<int>(
                name: "MaxUploadSizeMb",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 10);

            migrationBuilder.AddColumn<int>(
                name: "MaxVacationDaysPerRequest",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 365);

            migrationBuilder.AddColumn<int>(
                name: "MaxVacationFuturePlanningYears",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.AddColumn<int>(
                name: "OvertimeConfigMaxFutureDays",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 30);

            migrationBuilder.AddColumn<int>(
                name: "PasswordMinLength",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 8);

            migrationBuilder.AddColumn<string>(
                name: "ReviewReminderDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "7,3,1");

            migrationBuilder.AddColumn<string>(
                name: "VisaExpiryAlertDaysCsv",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "90,60,30,15,7");

            migrationBuilder.AddColumn<string>(
                name: "AppliedPolicySnapshotJson",
                table: "EndOfServiceBenefits",
                type: "jsonb",
                nullable: true,
                comment: "JSON snapshot of the policy + tiers at calculation time");

            migrationBuilder.AddColumn<long>(
                name: "EndOfServicePolicyId",
                table: "EndOfServiceBenefits",
                type: "bigint",
                nullable: true,
                comment: "FK to the EOS policy used for this calculation");

            migrationBuilder.CreateTable(
                name: "EndOfServicePolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CountryCode = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MinimumServiceYearsForEligibility = table.Column<decimal>(type: "numeric(5,2)", nullable: false, defaultValue: 0m),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServicePolicies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EndOfServicePolicyTiers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EndOfServicePolicyId = table.Column<long>(type: "bigint", nullable: false),
                    MinYearsInclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    MaxYearsExclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: true),
                    MonthsPerYearMultiplier = table.Column<decimal>(type: "numeric(6,3)", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServicePolicyTiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EndOfServicePolicyTiers_EndOfServicePolicies_EndOfServicePo~",
                        column: x => x.EndOfServicePolicyId,
                        principalTable: "EndOfServicePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EndOfServiceResignationDeductionTiers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EndOfServicePolicyId = table.Column<long>(type: "bigint", nullable: false),
                    MinYearsInclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    MaxYearsExclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: true),
                    DeductionFraction = table.Column<decimal>(type: "numeric(6,4)", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServiceResignationDeductionTiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EndOfServiceResignationDeductionTiers_EndOfServicePolicies_~",
                        column: x => x.EndOfServicePolicyId,
                        principalTable: "EndOfServicePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServiceBenefits_EndOfServicePolicyId",
                table: "EndOfServiceBenefits",
                column: "EndOfServicePolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServicePolicies_Active_Effective_Country",
                table: "EndOfServicePolicies",
                columns: new[] { "IsActive", "EffectiveFromDate", "CountryCode" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServicePolicyTiers_Policy_Sort",
                table: "EndOfServicePolicyTiers",
                columns: new[] { "EndOfServicePolicyId", "SortOrder" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServiceResignationDeductionTiers_Policy_Sort",
                table: "EndOfServiceResignationDeductionTiers",
                columns: new[] { "EndOfServicePolicyId", "SortOrder" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.AddForeignKey(
                name: "FK_EndOfServiceBenefits_EndOfServicePolicies_EndOfServicePolic~",
                table: "EndOfServiceBenefits",
                column: "EndOfServicePolicyId",
                principalTable: "EndOfServicePolicies",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EndOfServiceBenefits_EndOfServicePolicies_EndOfServicePolic~",
                table: "EndOfServiceBenefits");

            migrationBuilder.DropTable(
                name: "EndOfServicePolicyTiers");

            migrationBuilder.DropTable(
                name: "EndOfServiceResignationDeductionTiers");

            migrationBuilder.DropTable(
                name: "EndOfServicePolicies");

            migrationBuilder.DropIndex(
                name: "IX_EndOfServiceBenefits_EndOfServicePolicyId",
                table: "EndOfServiceBenefits");

            migrationBuilder.DropColumn(
                name: "ContractExpiryAlertDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "DefaultProbationDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "ExcuseBackwardWindowDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "ExcuseForwardWindowDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "FrozenWorkflowCleanupDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "LoanRepaymentReminderDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "LoginLockoutPolicyJson",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "MaxShiftGracePeriodMinutes",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "MaxUploadSizeMb",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "MaxVacationDaysPerRequest",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "MaxVacationFuturePlanningYears",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "OvertimeConfigMaxFutureDays",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "PasswordMinLength",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "ReviewReminderDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "VisaExpiryAlertDaysCsv",
                table: "TenantSettings");

            migrationBuilder.DropColumn(
                name: "AppliedPolicySnapshotJson",
                table: "EndOfServiceBenefits");

            migrationBuilder.DropColumn(
                name: "EndOfServicePolicyId",
                table: "EndOfServiceBenefits");
        }
    }
}
