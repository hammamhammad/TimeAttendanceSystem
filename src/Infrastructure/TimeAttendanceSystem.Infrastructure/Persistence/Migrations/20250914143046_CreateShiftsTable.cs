using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CreateShiftsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ShiftType = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    RequiredHours = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: true),
                    RequiresCheckInOut = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsAutoCheckOut = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    AllowFlexibleHours = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    FlexMinutesBefore = table.Column<int>(type: "int", nullable: true),
                    FlexMinutesAfter = table.Column<int>(type: "int", nullable: true),
                    GracePeriodMinutes = table.Column<int>(type: "int", nullable: true),
                    RequiredWeeklyHours = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: true),
                    HasCoreHours = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CoreStart = table.Column<TimeOnly>(type: "time", nullable: true),
                    CoreEnd = table.Column<TimeOnly>(type: "time", nullable: true),
                    IsSunday = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsMonday = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsTuesday = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsWednesday = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsThursday = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsFriday = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsSaturday = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsNightShift = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shifts");
        }
    }
}
