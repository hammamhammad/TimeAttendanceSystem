using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddAttendanceCorrectionRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "AttendanceRecords",
                type: "integer",
                nullable: false,
                defaultValue: 2,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "AttendanceCorrectionRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CorrectionDate = table.Column<DateTime>(type: "date", nullable: false),
                    CorrectionTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    CorrectionType = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AttachmentPath = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovalStatus = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    ApprovedById = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ProcessingNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedTransactionId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceCorrectionRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendanceCorrectionRequests_AttendanceTransactions_Created~",
                        column: x => x.CreatedTransactionId,
                        principalTable: "AttendanceTransactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_AttendanceCorrectionRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttendanceCorrectionRequests_Users_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_AttendanceCorrectionRequests_WorkflowInstances_WorkflowInst~",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_ApprovalStatus",
                table: "AttendanceCorrectionRequests",
                column: "ApprovalStatus");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_ApprovedById",
                table: "AttendanceCorrectionRequests",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CorrectionDate",
                table: "AttendanceCorrectionRequests",
                column: "CorrectionDate");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CorrectionDate_ApprovalStatus",
                table: "AttendanceCorrectionRequests",
                columns: new[] { "CorrectionDate", "ApprovalStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CorrectionType",
                table: "AttendanceCorrectionRequests",
                column: "CorrectionType");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CreatedTransactionId",
                table: "AttendanceCorrectionRequests",
                column: "CreatedTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_EmployeeId",
                table: "AttendanceCorrectionRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_EmployeeId_CorrectionDate",
                table: "AttendanceCorrectionRequests",
                columns: new[] { "EmployeeId", "CorrectionDate" });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_WorkflowInstanceId",
                table: "AttendanceCorrectionRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "UQ_AttendanceCorrectionRequests_EmployeeId_CorrectionDate_CorrectionType",
                table: "AttendanceCorrectionRequests",
                columns: new[] { "EmployeeId", "CorrectionDate", "CorrectionType" },
                unique: true,
                filter: "\"IsDeleted\" = false AND \"ApprovalStatus\" = 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttendanceCorrectionRequests");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "AttendanceRecords",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 2);
        }
    }
}
