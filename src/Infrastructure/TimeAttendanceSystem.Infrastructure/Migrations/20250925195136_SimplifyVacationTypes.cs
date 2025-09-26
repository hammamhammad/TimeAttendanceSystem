using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SimplifyVacationTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_AccrualType",
                table: "VacationTypes");

            migrationBuilder.DropCheckConstraint(
                name: "CK_VacationTypes_AccrualRate_NonNegative",
                table: "VacationTypes");

            migrationBuilder.DropCheckConstraint(
                name: "CK_VacationTypes_Color_Format",
                table: "VacationTypes");

            migrationBuilder.DropCheckConstraint(
                name: "CK_VacationTypes_DefaultDaysPerYear_Positive",
                table: "VacationTypes");

            migrationBuilder.DropCheckConstraint(
                name: "CK_VacationTypes_MaxCarryoverDays_Positive",
                table: "VacationTypes");

            migrationBuilder.DropCheckConstraint(
                name: "CK_VacationTypes_MaxDaysPerRequest_Positive",
                table: "VacationTypes");

            migrationBuilder.DropCheckConstraint(
                name: "CK_VacationTypes_MinDaysNotice_NonNegative",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "AccrualRate",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "AccrualType",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "CarryoverAllowed",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "CarryoverExpiryDate",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "DefaultDaysPerYear",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "DescriptionAr",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "MaxCarryoverDays",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "MaxDaysPerRequest",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "MinDaysNotice",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "RequiresApproval",
                table: "VacationTypes");

            migrationBuilder.AlterColumn<long>(
                name: "BranchId",
                table: "VacationTypes",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "BranchId",
                table: "VacationTypes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AccrualRate",
                table: "VacationTypes",
                type: "decimal(5,2)",
                nullable: false,
                defaultValue: 0.00m);

            migrationBuilder.AddColumn<string>(
                name: "AccrualType",
                table: "VacationTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "Annual");

            migrationBuilder.AddColumn<bool>(
                name: "CarryoverAllowed",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CarryoverExpiryDate",
                table: "VacationTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "VacationTypes",
                type: "varchar(7)",
                unicode: false,
                maxLength: 7,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DefaultDaysPerYear",
                table: "VacationTypes",
                type: "int",
                nullable: false,
                defaultValue: 21);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "VacationTypes",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionAr",
                table: "VacationTypes",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxCarryoverDays",
                table: "VacationTypes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxDaysPerRequest",
                table: "VacationTypes",
                type: "int",
                nullable: false,
                defaultValue: 14);

            migrationBuilder.AddColumn<int>(
                name: "MinDaysNotice",
                table: "VacationTypes",
                type: "int",
                nullable: false,
                defaultValue: 7);

            migrationBuilder.AddColumn<bool>(
                name: "RequiresApproval",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_AccrualType",
                table: "VacationTypes",
                column: "AccrualType",
                filter: "IsDeleted = 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_VacationTypes_AccrualRate_NonNegative",
                table: "VacationTypes",
                sql: "[AccrualRate] >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_VacationTypes_Color_Format",
                table: "VacationTypes",
                sql: "[Color] IS NULL OR ([Color] LIKE '#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]')");

            migrationBuilder.AddCheckConstraint(
                name: "CK_VacationTypes_DefaultDaysPerYear_Positive",
                table: "VacationTypes",
                sql: "[DefaultDaysPerYear] > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_VacationTypes_MaxCarryoverDays_Positive",
                table: "VacationTypes",
                sql: "[MaxCarryoverDays] IS NULL OR [MaxCarryoverDays] > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_VacationTypes_MaxDaysPerRequest_Positive",
                table: "VacationTypes",
                sql: "[MaxDaysPerRequest] > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_VacationTypes_MinDaysNotice_NonNegative",
                table: "VacationTypes",
                sql: "[MinDaysNotice] >= 0");
        }
    }
}
