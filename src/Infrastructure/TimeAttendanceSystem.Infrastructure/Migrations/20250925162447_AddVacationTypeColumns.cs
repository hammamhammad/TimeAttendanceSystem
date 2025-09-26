using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVacationTypeColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VacationRequests");

            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_Code",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "AffectsAttendance",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "VacationTypes");

            migrationBuilder.RenameColumn(
                name: "MaxDaysPerYear",
                table: "VacationTypes",
                newName: "MaxCarryoverDays");

            migrationBuilder.AlterColumn<bool>(
                name: "RequiresApproval",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<int>(
                name: "MinDaysNotice",
                table: "VacationTypes",
                type: "int",
                nullable: false,
                defaultValue: 7,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPaid",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "VacationTypes",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "VacationTypes",
                type: "varchar(7)",
                unicode: false,
                maxLength: 7,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
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

            migrationBuilder.AddColumn<long>(
                name: "BranchId",
                table: "VacationTypes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

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

            migrationBuilder.AddColumn<int>(
                name: "DefaultDaysPerYear",
                table: "VacationTypes",
                type: "int",
                nullable: false,
                defaultValue: 21);

            migrationBuilder.AddColumn<int>(
                name: "MaxDaysPerRequest",
                table: "VacationTypes",
                type: "int",
                nullable: false,
                defaultValue: 14);

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_AccrualType",
                table: "VacationTypes",
                column: "AccrualType",
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_BranchId",
                table: "VacationTypes",
                column: "BranchId",
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_BranchId_IsActive",
                table: "VacationTypes",
                columns: new[] { "BranchId", "IsActive" },
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_BranchId_Name_Unique",
                table: "VacationTypes",
                columns: new[] { "BranchId", "Name" },
                unique: true,
                filter: "IsDeleted = 0");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_IsActive",
                table: "VacationTypes",
                column: "IsActive",
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

            migrationBuilder.AddForeignKey(
                name: "FK_VacationTypes_Branches_BranchId",
                table: "VacationTypes",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VacationTypes_Branches_BranchId",
                table: "VacationTypes");

            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_AccrualType",
                table: "VacationTypes");

            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_BranchId",
                table: "VacationTypes");

            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_BranchId_IsActive",
                table: "VacationTypes");

            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_BranchId_Name_Unique",
                table: "VacationTypes");

            migrationBuilder.DropIndex(
                name: "IX_VacationTypes_IsActive",
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
                name: "BranchId",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "CarryoverAllowed",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "CarryoverExpiryDate",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "DefaultDaysPerYear",
                table: "VacationTypes");

            migrationBuilder.DropColumn(
                name: "MaxDaysPerRequest",
                table: "VacationTypes");

            migrationBuilder.RenameColumn(
                name: "MaxCarryoverDays",
                table: "VacationTypes",
                newName: "MaxDaysPerYear");

            migrationBuilder.AlterColumn<bool>(
                name: "RequiresApproval",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<int>(
                name: "MinDaysNotice",
                table: "VacationTypes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 7);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPaid",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "VacationTypes",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "VacationTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(7)",
                oldUnicode: false,
                oldMaxLength: 7,
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AffectsAttendance",
                table: "VacationTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "VacationTypes",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "VacationRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CancelledByUserId = table.Column<long>(type: "bigint", nullable: true),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    RejectedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CancellationReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CancelledDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RejectedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RejectionReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RequestedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TotalDays = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacationRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VacationRequests_Users_ApprovedByUserId",
                        column: x => x.ApprovedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VacationRequests_Users_CancelledByUserId",
                        column: x => x.CancelledByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VacationRequests_Users_RejectedByUserId",
                        column: x => x.RejectedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VacationRequests_VacationTypes_VacationTypeId",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_Code",
                table: "VacationTypes",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VacationRequests_ApprovedByUserId",
                table: "VacationRequests",
                column: "ApprovedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_VacationRequests_CancelledByUserId",
                table: "VacationRequests",
                column: "CancelledByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_VacationRequests_EmployeeId_StartDate_EndDate",
                table: "VacationRequests",
                columns: new[] { "EmployeeId", "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_VacationRequests_RejectedByUserId",
                table: "VacationRequests",
                column: "RejectedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_VacationRequests_Status",
                table: "VacationRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_VacationRequests_VacationTypeId",
                table: "VacationRequests",
                column: "VacationTypeId");
        }
    }
}
