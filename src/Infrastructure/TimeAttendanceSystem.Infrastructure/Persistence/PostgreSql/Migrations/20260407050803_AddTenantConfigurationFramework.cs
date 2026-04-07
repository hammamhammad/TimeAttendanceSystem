using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddTenantConfigurationFramework : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BranchSettingsOverrides",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    EnableGpsAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    EnableNfcAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    EnableBiometricAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    EnableManualAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    AutoCheckOutEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    AutoCheckOutTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    LateGracePeriodMinutes = table.Column<int>(type: "integer", nullable: true),
                    EarlyLeaveGracePeriodMinutes = table.Column<int>(type: "integer", nullable: true),
                    TrackBreakTime = table.Column<bool>(type: "boolean", nullable: true),
                    MinimumWorkingHoursForPresent = table.Column<int>(type: "integer", nullable: true),
                    MobileCheckInEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    RequireNfcForMobile = table.Column<bool>(type: "boolean", nullable: true),
                    RequireGpsForMobile = table.Column<bool>(type: "boolean", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchSettingsOverrides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BranchSettingsOverrides_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DepartmentSettingsOverrides",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: false),
                    DefaultShiftId = table.Column<long>(type: "bigint", nullable: true),
                    RequireApprovalComments = table.Column<bool>(type: "boolean", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentSettingsOverrides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DepartmentSettingsOverrides_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentSettingsOverrides_Shifts_DefaultShiftId",
                        column: x => x.DefaultShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PolicyTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Region = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false, defaultValue: "SA"),
                    Industry = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsSystemTemplate = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    TenantId = table.Column<long>(type: "bigint", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PolicyTemplates_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SetupSteps",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenantId = table.Column<long>(type: "bigint", nullable: false),
                    StepKey = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Category = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsCompleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CompletedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedByUserId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SetupSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SetupSteps_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TenantSettings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenantId = table.Column<long>(type: "bigint", nullable: false),
                    FiscalYearStartMonth = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false, defaultValue: "01"),
                    WeekStartDay = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Sunday"),
                    DateFormat = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "dd/MM/yyyy"),
                    TimeFormat = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "HH:mm"),
                    NumberFormat = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "en-US"),
                    EnableGpsAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    EnableNfcAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    EnableBiometricAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    EnableManualAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCheckOutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCheckOutTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    LateGracePeriodMinutes = table.Column<int>(type: "integer", nullable: false),
                    EarlyLeaveGracePeriodMinutes = table.Column<int>(type: "integer", nullable: false),
                    TrackBreakTime = table.Column<bool>(type: "boolean", nullable: false),
                    MinimumWorkingHoursForPresent = table.Column<int>(type: "integer", nullable: false),
                    AllowNegativeLeaveBalance = table.Column<bool>(type: "boolean", nullable: false),
                    RequireAttachmentForSickLeave = table.Column<bool>(type: "boolean", nullable: false),
                    MinDaysBeforeLeaveRequest = table.Column<int>(type: "integer", nullable: false),
                    AllowHalfDayLeave = table.Column<bool>(type: "boolean", nullable: false),
                    AllowLeaveEncashment = table.Column<bool>(type: "boolean", nullable: false),
                    LeaveYearStart = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: true),
                    PayrollCutOffDay = table.Column<int>(type: "integer", nullable: false),
                    PayrollCurrency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    EnableEndOfServiceCalc = table.Column<bool>(type: "boolean", nullable: false),
                    SalaryCalculationBasis = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Calendar"),
                    AutoApproveAfterTimeout = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultApprovalTimeoutHours = table.Column<int>(type: "integer", nullable: false),
                    AllowSelfApproval = table.Column<bool>(type: "boolean", nullable: false),
                    RequireApprovalComments = table.Column<bool>(type: "boolean", nullable: false),
                    EnableEmailNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    EnablePushNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    EnableSmsNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    NotifyManagerOnLeaveRequest = table.Column<bool>(type: "boolean", nullable: false),
                    NotifyEmployeeOnApproval = table.Column<bool>(type: "boolean", nullable: false),
                    DailyAttendanceSummaryEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    MobileCheckInEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    RequireNfcForMobile = table.Column<bool>(type: "boolean", nullable: false),
                    RequireGpsForMobile = table.Column<bool>(type: "boolean", nullable: false),
                    AllowMockLocation = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordExpiryDays = table.Column<int>(type: "integer", nullable: false),
                    MaxLoginAttempts = table.Column<int>(type: "integer", nullable: false),
                    SessionTimeoutMinutes = table.Column<int>(type: "integer", nullable: false),
                    Require2FA = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHistoryCount = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TenantSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TenantSettings_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PolicyTemplateItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PolicyTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    PolicyType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ConfigurationJson = table.Column<string>(type: "jsonb", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyTemplateItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PolicyTemplateItems_PolicyTemplates_PolicyTemplateId",
                        column: x => x.PolicyTemplateId,
                        principalTable: "PolicyTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BranchSettingsOverrides_BranchId",
                table: "BranchSettingsOverrides",
                column: "BranchId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentSettingsOverrides_DefaultShiftId",
                table: "DepartmentSettingsOverrides",
                column: "DefaultShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentSettingsOverrides_DepartmentId",
                table: "DepartmentSettingsOverrides",
                column: "DepartmentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PolicyTemplateItems_PolicyTemplateId",
                table: "PolicyTemplateItems",
                column: "PolicyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyTemplates_Code_TenantId",
                table: "PolicyTemplates",
                columns: new[] { "Code", "TenantId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PolicyTemplates_Region",
                table: "PolicyTemplates",
                column: "Region");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyTemplates_TenantId",
                table: "PolicyTemplates",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SetupSteps_TenantId",
                table: "SetupSteps",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SetupSteps_TenantId_StepKey",
                table: "SetupSteps",
                columns: new[] { "TenantId", "StepKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TenantSettings_TenantId",
                table: "TenantSettings",
                column: "TenantId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchSettingsOverrides");

            migrationBuilder.DropTable(
                name: "DepartmentSettingsOverrides");

            migrationBuilder.DropTable(
                name: "PolicyTemplateItems");

            migrationBuilder.DropTable(
                name: "SetupSteps");

            migrationBuilder.DropTable(
                name: "TenantSettings");

            migrationBuilder.DropTable(
                name: "PolicyTemplates");
        }
    }
}
