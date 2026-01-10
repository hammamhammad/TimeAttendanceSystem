using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowSteps",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowStepExecutions",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowInstances",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowDefinitions",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Users",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Shifts",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ShiftPeriods",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ShiftAssignments",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Roles",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "RefreshTokens",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Permissions",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ExcusePolicies",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "EmployeeVacations",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Employees",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "EmployeeExcuses",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Departments",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Branches",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "AuditLogs",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "AuditChanges",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldDefaultValueSql: "E'\\\\x01'::bytea");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ApprovalDelegations",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[] { 1 },
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true,
                oldComment: "Concurrency control timestamp");

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who receives this notification"),
                    Type = table.Column<int>(type: "integer", nullable: false, comment: "Type of notification"),
                    TitleEn = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Notification title in English"),
                    TitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Notification title in Arabic"),
                    MessageEn = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false, comment: "Notification message in English"),
                    MessageAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false, comment: "Notification message in Arabic"),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether notification has been read"),
                    ReadAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When notification was read"),
                    EntityType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "Type of related entity (e.g., Vacation, Excuse)"),
                    EntityId = table.Column<long>(type: "bigint", nullable: true, comment: "ID of the related entity"),
                    ActionUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "URL to navigate when notification is clicked"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CreatedAtUtc",
                table: "Notifications",
                column: "CreatedAtUtc",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_EntityType_EntityId",
                table: "Notifications",
                columns: new[] { "EntityType", "EntityId" },
                filter: "\"IsDeleted\" = false AND \"EntityType\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Type",
                table: "Notifications",
                column: "Type",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId_IsRead",
                table: "Notifications",
                columns: new[] { "UserId", "IsRead" },
                filter: "\"IsDeleted\" = false AND \"IsRead\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowSteps",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 },
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowStepExecutions",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 },
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowInstances",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 },
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WorkflowDefinitions",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 },
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Users",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Shifts",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ShiftPeriods",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ShiftAssignments",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Roles",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "RefreshTokens",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Permissions",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ExcusePolicies",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "EmployeeVacations",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 },
                oldComment: "Concurrency control timestamp");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Employees",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "EmployeeExcuses",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Departments",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "Branches",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "AuditLogs",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "AuditChanges",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "E'\\\\x01'::bytea",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 });

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "ApprovalDelegations",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                comment: "Concurrency control timestamp",
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldDefaultValue: new byte[] { 1 },
                oldComment: "Concurrency control timestamp");
        }
    }
}
