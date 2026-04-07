using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class LinkAllowanceTypeToSalaryComponent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AllowanceTypeId",
                table: "SalaryComponents",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AllowanceTypeId",
                table: "PayrollRecordDetails",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SalaryComponents_AllowanceTypeId",
                table: "SalaryComponents",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecordDetails_AllowanceTypeId",
                table: "PayrollRecordDetails",
                column: "AllowanceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_PayrollRecordDetails_AllowanceTypes",
                table: "PayrollRecordDetails",
                column: "AllowanceTypeId",
                principalTable: "AllowanceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_SalaryComponents_AllowanceTypes_AllowanceTypeId",
                table: "SalaryComponents",
                column: "AllowanceTypeId",
                principalTable: "AllowanceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayrollRecordDetails_AllowanceTypes",
                table: "PayrollRecordDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_SalaryComponents_AllowanceTypes_AllowanceTypeId",
                table: "SalaryComponents");

            migrationBuilder.DropIndex(
                name: "IX_SalaryComponents_AllowanceTypeId",
                table: "SalaryComponents");

            migrationBuilder.DropIndex(
                name: "IX_PayrollRecordDetails_AllowanceTypeId",
                table: "PayrollRecordDetails");

            migrationBuilder.DropColumn(
                name: "AllowanceTypeId",
                table: "SalaryComponents");

            migrationBuilder.DropColumn(
                name: "AllowanceTypeId",
                table: "PayrollRecordDetails");
        }
    }
}
