using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    /// <summary>
    /// Phase 7 (v14.7): fully retires the legacy <c>SalaryAdvance.DeductionMonth</c> int column.
    ///
    /// The migration is data-preserving: any historical row that only has the legacy YYYYMM
    /// value set (and no date range) is back-filled first, before the column is dropped.
    /// After this migration runs, every row has <c>DeductionStartDate</c> /
    /// <c>DeductionEndDate</c> populated and the payroll matcher relies exclusively on them.
    ///
    /// Also swaps the legacy <c>IX_SalaryAdvances_DeductionMonth</c> index for a new composite
    /// <c>IX_SalaryAdvances_DeductionRange</c> over the date-range columns.
    /// </summary>
    public partial class RemoveDeductionMonth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Step 1: Back-fill DeductionStartDate / DeductionEndDate from any remaining
            // DeductionMonth-only rows. YYYYMM integer → first-of-month / last-of-month UTC.
            // Defensive guards on the integer shape: YYYY ≥ 2000 and 1 ≤ MM ≤ 12. Rows that
            // don't match those guards are left untouched — the executor's date-range default
            // will then fill them on next approval.
            migrationBuilder.Sql(@"
                UPDATE ""SalaryAdvances""
                SET ""DeductionStartDate"" = MAKE_TIMESTAMPTZ(
                        (""DeductionMonth"" / 100)::int,
                        (""DeductionMonth"" % 100)::int,
                        1, 0, 0, 0, 'UTC'),
                    ""DeductionEndDate"" = (MAKE_TIMESTAMPTZ(
                        (""DeductionMonth"" / 100)::int,
                        (""DeductionMonth"" % 100)::int,
                        1, 0, 0, 0, 'UTC') + INTERVAL '1 month' - INTERVAL '1 day')
                WHERE ""DeductionStartDate"" IS NULL
                  AND ""DeductionMonth"" > 0
                  AND (""DeductionMonth"" / 100) >= 2000
                  AND (""DeductionMonth"" % 100) BETWEEN 1 AND 12;
            ");

            // Step 2: drop the legacy index.
            migrationBuilder.DropIndex(
                name: "IX_SalaryAdvances_DeductionMonth",
                table: "SalaryAdvances");

            // Step 3: drop the legacy column.
            migrationBuilder.DropColumn(
                name: "DeductionMonth",
                table: "SalaryAdvances");

            // Step 4: create the replacement composite index over the date-range columns.
            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_DeductionRange",
                table: "SalaryAdvances",
                columns: new[] { "DeductionStartDate", "DeductionEndDate" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SalaryAdvances_DeductionRange",
                table: "SalaryAdvances");

            migrationBuilder.AddColumn<int>(
                name: "DeductionMonth",
                table: "SalaryAdvances",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_DeductionMonth",
                table: "SalaryAdvances",
                column: "DeductionMonth");
        }
    }
}
