using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOvertimeManagementTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OffDays",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false, comment: "Name/description of the off day configuration"),
                    NameAr = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, comment: "Arabic name of the off day configuration"),
                    OffDayType = table.Column<int>(type: "int", nullable: false, comment: "Type of off day configuration (weekly/custom period)"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, comment: "Whether this off day configuration is currently active"),
                    IsCompanyWide = table.Column<bool>(type: "bit", nullable: false, comment: "Whether this applies to all branches"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Specific branch ID for branch-specific off days"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "Start date for custom period off days"),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "End date for custom period off days"),
                    IsSunday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Sunday is an off day"),
                    IsMonday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Monday is an off day"),
                    IsTuesday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Tuesday is an off day"),
                    IsWednesday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Wednesday is an off day"),
                    IsThursday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Thursday is an off day"),
                    IsFriday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Friday is an off day"),
                    IsSaturday = table.Column<bool>(type: "bit", nullable: false, comment: "Whether Saturday is an off day"),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true, comment: "Description or notes about the off day configuration"),
                    Priority = table.Column<int>(type: "int", nullable: false, comment: "Priority when multiple configurations overlap"),
                    OverridesPublicHolidays = table.Column<bool>(type: "bit", nullable: false, comment: "Whether this off day overrides public holidays"),
                    EffectiveFromDate = table.Column<DateTime>(type: "datetime2", nullable: false, comment: "Date from which this configuration becomes effective"),
                    EffectiveToDate = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "Date until which this configuration is valid"),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OffDays", x => x.Id);
                    table.CheckConstraint("CK_OffDays_BranchSpecific", "([IsCompanyWide] = 1 AND [BranchId] IS NULL) OR ([IsCompanyWide] = 0 AND [BranchId] IS NOT NULL)");
                    table.CheckConstraint("CK_OffDays_CustomPeriodDates", "[OffDayType] != 1 OR ([StartDate] IS NOT NULL AND [EndDate] IS NOT NULL AND [EndDate] > [StartDate])");
                    table.CheckConstraint("CK_OffDays_EffectiveDates", "[EffectiveToDate] IS NULL OR [EffectiveToDate] > [EffectiveFromDate]");
                    table.CheckConstraint("CK_OffDays_Priority", "[Priority] >= 1");
                    table.CheckConstraint("CK_OffDays_WeeklyPattern", "[OffDayType] != 0 OR ([IsSunday] = 1 OR [IsMonday] = 1 OR [IsTuesday] = 1 OR [IsWednesday] = 1 OR [IsThursday] = 1 OR [IsFriday] = 1 OR [IsSaturday] = 1)");
                    table.ForeignKey(
                        name: "FK_OffDays_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OvertimeConfigurations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnablePreShiftOvertime = table.Column<bool>(type: "bit", nullable: false),
                    EnablePostShiftOvertime = table.Column<bool>(type: "bit", nullable: false),
                    NormalDayRate = table.Column<decimal>(type: "decimal(5,2)", nullable: false, comment: "Overtime rate multiplier for normal working days (e.g., 1.5 for 150%)"),
                    PublicHolidayRate = table.Column<decimal>(type: "decimal(5,2)", nullable: false, comment: "Overtime rate multiplier for public holidays (e.g., 2.0 for 200%)"),
                    OffDayRate = table.Column<decimal>(type: "decimal(5,2)", nullable: false, comment: "Overtime rate multiplier for off days/weekends (e.g., 2.5 for 250%)"),
                    MinimumOvertimeMinutes = table.Column<int>(type: "int", nullable: false, comment: "Minimum minutes of overtime before it counts (e.g., 15)"),
                    ConsiderFlexibleTime = table.Column<bool>(type: "bit", nullable: false, comment: "Whether to consider flexible time rules when calculating overtime"),
                    MaxPreShiftOvertimeHours = table.Column<decimal>(type: "decimal(4,2)", nullable: false, comment: "Maximum pre-shift overtime hours allowed per day"),
                    MaxPostShiftOvertimeHours = table.Column<decimal>(type: "decimal(4,2)", nullable: false, comment: "Maximum post-shift overtime hours allowed per day"),
                    RequireApproval = table.Column<bool>(type: "bit", nullable: false, comment: "Whether overtime requires manager approval"),
                    OvertimeGracePeriodMinutes = table.Column<int>(type: "int", nullable: false, comment: "Grace period in minutes before overtime calculation begins"),
                    WeekendAsOffDay = table.Column<bool>(type: "bit", nullable: false, comment: "Whether weekends are automatically considered off days"),
                    RoundingIntervalMinutes = table.Column<int>(type: "int", nullable: false, comment: "Rounding interval for overtime hours (0 = no rounding)"),
                    PolicyNotes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true, comment: "Additional notes about overtime policies"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, comment: "Whether this configuration is currently active"),
                    EffectiveFromDate = table.Column<DateTime>(type: "datetime2", nullable: false, comment: "Date from which this configuration becomes effective"),
                    EffectiveToDate = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "Date until which this configuration is valid (null = indefinite)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OvertimeConfigurations", x => x.Id);
                    table.CheckConstraint("CK_OvertimeConfigurations_EffectiveDates", "[EffectiveToDate] IS NULL OR [EffectiveToDate] > [EffectiveFromDate]");
                    table.CheckConstraint("CK_OvertimeConfigurations_MaxPostShiftOvertimeHours", "[MaxPostShiftOvertimeHours] >= 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_MaxPreShiftOvertimeHours", "[MaxPreShiftOvertimeHours] >= 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_MinimumOvertimeMinutes", "[MinimumOvertimeMinutes] >= 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_NormalDayRate", "[NormalDayRate] > 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_OffDayRate", "[OffDayRate] > 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_OvertimeGracePeriodMinutes", "[OvertimeGracePeriodMinutes] >= 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_PublicHolidayRate", "[PublicHolidayRate] > 0");
                    table.CheckConstraint("CK_OvertimeConfigurations_RoundingIntervalMinutes", "[RoundingIntervalMinutes] >= 0");
                });

            migrationBuilder.CreateTable(
                name: "PublicHolidays",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false, comment: "Name of the public holiday"),
                    NameAr = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, comment: "Arabic name of the public holiday"),
                    SpecificDate = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "Specific date for one-time holidays"),
                    Month = table.Column<int>(type: "int", nullable: true, comment: "Month for recurring holidays (1-12)"),
                    Day = table.Column<int>(type: "int", nullable: true, comment: "Day of month for recurring holidays (1-31)"),
                    HolidayType = table.Column<int>(type: "int", nullable: false, comment: "Type of holiday recurrence pattern"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, comment: "Whether this holiday is currently active"),
                    IsNational = table.Column<bool>(type: "bit", nullable: false, comment: "Whether this holiday applies to all branches"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Specific branch ID for regional holidays"),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true, comment: "Description or notes about the holiday"),
                    EffectiveFromYear = table.Column<int>(type: "int", nullable: true, comment: "Year from which this holiday becomes effective"),
                    EffectiveToYear = table.Column<int>(type: "int", nullable: true, comment: "Year until which this holiday is valid"),
                    DayOfWeek = table.Column<int>(type: "int", nullable: true, comment: "Day of week for floating holidays"),
                    WeekOccurrence = table.Column<int>(type: "int", nullable: true, comment: "Week occurrence for floating holidays (1-5, -1 for last)"),
                    CountryCode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true, comment: "Country code for international holiday support"),
                    Priority = table.Column<int>(type: "int", nullable: false, comment: "Priority when multiple holidays fall on same date"),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicHolidays", x => x.Id);
                    table.CheckConstraint("CK_PublicHolidays_BranchSpecific", "([IsNational] = 1 AND [BranchId] IS NULL) OR ([IsNational] = 0 AND [BranchId] IS NOT NULL)");
                    table.CheckConstraint("CK_PublicHolidays_Day", "[Day] IS NULL OR ([Day] >= 1 AND [Day] <= 31)");
                    table.CheckConstraint("CK_PublicHolidays_EffectiveYears", "[EffectiveToYear] IS NULL OR [EffectiveToYear] > [EffectiveFromYear]");
                    table.CheckConstraint("CK_PublicHolidays_Month", "[Month] IS NULL OR ([Month] >= 1 AND [Month] <= 12)");
                    table.CheckConstraint("CK_PublicHolidays_Priority", "[Priority] >= 1");
                    table.CheckConstraint("CK_PublicHolidays_WeekOccurrence", "[WeekOccurrence] IS NULL OR ([WeekOccurrence] BETWEEN -1 AND 5 AND [WeekOccurrence] != 0)");
                    table.ForeignKey(
                        name: "FK_PublicHolidays_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_BranchId",
                table: "OffDays",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_DateRange",
                table: "OffDays",
                columns: new[] { "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_EffectiveDates",
                table: "OffDays",
                columns: new[] { "EffectiveFromDate", "EffectiveToDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_IsActive",
                table: "OffDays",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_IsCompanyWide",
                table: "OffDays",
                column: "IsCompanyWide");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_OffDayType",
                table: "OffDays",
                column: "OffDayType");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_Priority",
                table: "OffDays",
                column: "Priority");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeConfigurations_EffectiveDates",
                table: "OvertimeConfigurations",
                columns: new[] { "EffectiveFromDate", "EffectiveToDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeConfigurations_IsActive",
                table: "OvertimeConfigurations",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_BranchId",
                table: "PublicHolidays",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_EffectiveYears",
                table: "PublicHolidays",
                columns: new[] { "EffectiveFromYear", "EffectiveToYear" });

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_HolidayType",
                table: "PublicHolidays",
                column: "HolidayType");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_IsActive",
                table: "PublicHolidays",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_IsNational",
                table: "PublicHolidays",
                column: "IsNational");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_MonthDay",
                table: "PublicHolidays",
                columns: new[] { "Month", "Day" });

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_SpecificDate",
                table: "PublicHolidays",
                column: "SpecificDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OffDays");

            migrationBuilder.DropTable(
                name: "OvertimeConfigurations");

            migrationBuilder.DropTable(
                name: "PublicHolidays");
        }
    }
}
