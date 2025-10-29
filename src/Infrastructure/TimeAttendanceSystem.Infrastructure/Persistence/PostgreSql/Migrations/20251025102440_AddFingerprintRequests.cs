using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddFingerprintRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FingerprintRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    RequestType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IssueDescription = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    AffectedFingers = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    PreferredDate = table.Column<DateTime>(type: "date", nullable: true),
                    PreferredTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    ScheduledDate = table.Column<DateTime>(type: "date", nullable: true),
                    ScheduledTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    TechnicianId = table.Column<long>(type: "bigint", nullable: true),
                    TechnicianNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FingerprintRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FingerprintRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FingerprintRequests_Users_TechnicianId",
                        column: x => x.TechnicianId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_EmployeeId",
                table: "FingerprintRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_EmployeeId_Status",
                table: "FingerprintRequests",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_ScheduledDate",
                table: "FingerprintRequests",
                column: "ScheduledDate");

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_Status",
                table: "FingerprintRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_TechnicianId",
                table: "FingerprintRequests",
                column: "TechnicianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FingerprintRequests");
        }
    }
}
