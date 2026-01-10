using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddTimeoutActionToWorkflowStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeoutAction",
                table: "WorkflowSteps",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "Action to take when step times out (0=Expire, 1=Escalate, 2=AutoApprove, 3=AutoReject)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeoutAction",
                table: "WorkflowSteps");
        }
    }
}
