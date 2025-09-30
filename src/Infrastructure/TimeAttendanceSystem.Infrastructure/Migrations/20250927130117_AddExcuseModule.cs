using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddExcuseModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeExcuses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ExcuseDate = table.Column<DateTime>(type: "date", nullable: false),
                    ExcuseType = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    DurationHours = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false, computedColumnSql: "CAST(DATEDIFF(MINUTE, [StartTime], [EndTime]) AS DECIMAL(5,2)) / 60.0", stored: true),
                    Reason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ApprovalStatus = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
                    ApprovedById = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RejectionReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AttachmentPath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AffectsSalary = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    ProcessingNotes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeExcuses", x => x.Id);
                    table.CheckConstraint("CK_EmployeeExcuses_ApprovalData", "([ApprovalStatus] = 1 AND [ApprovedById] IS NULL AND [ApprovedAt] IS NULL) OR ([ApprovalStatus] IN (2, 3) AND [ApprovedById] IS NOT NULL AND [ApprovedAt] IS NOT NULL)");
                    table.CheckConstraint("CK_EmployeeExcuses_ApprovalStatus", "[ApprovalStatus] IN (1, 2, 3)");
                    table.CheckConstraint("CK_EmployeeExcuses_DurationHours", "[DurationHours] > 0 AND [DurationHours] <= 24");
                    table.CheckConstraint("CK_EmployeeExcuses_EndTimeAfterStartTime", "[EndTime] > [StartTime]");
                    table.CheckConstraint("CK_EmployeeExcuses_ExcuseDate", "[ExcuseDate] >= '2020-01-01' AND [ExcuseDate] <= DATEADD(day, 365, GETDATE())");
                    table.CheckConstraint("CK_EmployeeExcuses_ExcuseType", "[ExcuseType] IN (1, 2)");
                    table.CheckConstraint("CK_EmployeeExcuses_RejectionReason", "([ApprovalStatus] = 3 AND [RejectionReason] IS NOT NULL AND LEN([RejectionReason]) > 0) OR ([ApprovalStatus] IN (1, 2))");
                    table.ForeignKey(
                        name: "FK_EmployeeExcuses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeExcuses_Users_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ExcusePolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    MaxPersonalExcusesPerMonth = table.Column<int>(type: "int", nullable: false, defaultValue: 5),
                    MaxPersonalExcuseHoursPerMonth = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 8.0m),
                    MaxPersonalExcuseHoursPerDay = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 4.0m),
                    MaxHoursPerExcuse = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 2.0m),
                    RequiresApproval = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    AllowPartialHourExcuses = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    MinimumExcuseDuration = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0.5m),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    MaxRetroactiveDays = table.Column<int>(type: "int", nullable: false, defaultValue: 7),
                    AllowSelfServiceRequests = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExcusePolicies", x => x.Id);
                    table.CheckConstraint("CK_ExcusePolicies_DailyVsMonthlyLimits", "[MaxPersonalExcuseHoursPerDay] <= [MaxPersonalExcuseHoursPerMonth]");
                    table.CheckConstraint("CK_ExcusePolicies_MaxHoursPerExcuse", "[MaxHoursPerExcuse] > 0");
                    table.CheckConstraint("CK_ExcusePolicies_MaxPersonalExcuseHoursPerDay", "[MaxPersonalExcuseHoursPerDay] > 0");
                    table.CheckConstraint("CK_ExcusePolicies_MaxPersonalExcuseHoursPerMonth", "[MaxPersonalExcuseHoursPerMonth] > 0");
                    table.CheckConstraint("CK_ExcusePolicies_MaxPersonalExcusesPerMonth", "[MaxPersonalExcusesPerMonth] > 0");
                    table.CheckConstraint("CK_ExcusePolicies_MaxRetroactiveDays", "[MaxRetroactiveDays] >= 0");
                    table.CheckConstraint("CK_ExcusePolicies_MinimumExcuseDuration", "[MinimumExcuseDuration] > 0");
                    table.CheckConstraint("CK_ExcusePolicies_MinimumVsMaximumDuration", "[MinimumExcuseDuration] <= [MaxHoursPerExcuse]");
                    table.CheckConstraint("CK_ExcusePolicies_SingleVsDailyLimits", "[MaxHoursPerExcuse] <= [MaxPersonalExcuseHoursPerDay]");
                    table.ForeignKey(
                        name: "FK_ExcusePolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ApprovalStatus",
                table: "EmployeeExcuses",
                column: "ApprovalStatus");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ApprovedById",
                table: "EmployeeExcuses",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_EmployeeId",
                table: "EmployeeExcuses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_EmployeeId_ExcuseDate",
                table: "EmployeeExcuses",
                columns: new[] { "EmployeeId", "ExcuseDate" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ExcuseDate",
                table: "EmployeeExcuses",
                column: "ExcuseDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ExcuseDate_ApprovalStatus",
                table: "EmployeeExcuses",
                columns: new[] { "ExcuseDate", "ApprovalStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ExcuseType",
                table: "EmployeeExcuses",
                column: "ExcuseType");

            migrationBuilder.CreateIndex(
                name: "UQ_EmployeeExcuses_EmployeeId_ExcuseDate_TimeRange",
                table: "EmployeeExcuses",
                columns: new[] { "EmployeeId", "ExcuseDate", "StartTime", "EndTime" },
                unique: true,
                filter: "[IsDeleted] = 0 AND [ApprovalStatus] IN (1, 2)");

            migrationBuilder.CreateIndex(
                name: "IX_ExcusePolicies_BranchId",
                table: "ExcusePolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ExcusePolicies_BranchId_IsActive",
                table: "ExcusePolicies",
                columns: new[] { "BranchId", "IsActive" });

            migrationBuilder.CreateIndex(
                name: "IX_ExcusePolicies_IsActive",
                table: "ExcusePolicies",
                column: "IsActive");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeExcuses");

            migrationBuilder.DropTable(
                name: "ExcusePolicies");
        }
    }
}
