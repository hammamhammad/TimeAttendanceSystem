using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AllPendingChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "WorkflowInstanceId",
                table: "RemoteWorkRequests",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "WorkflowInstanceId",
                table: "EmployeeVacations",
                type: "bigint",
                nullable: true,
                comment: "Workflow instance ID for approval tracking");

            migrationBuilder.AddColumn<long>(
                name: "WorkflowInstanceId",
                table: "EmployeeExcuses",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_WorkflowInstanceId",
                table: "RemoteWorkRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_WorkflowInstanceId",
                table: "EmployeeVacations",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_WorkflowInstanceId",
                table: "EmployeeExcuses",
                column: "WorkflowInstanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeExcuses_WorkflowInstances_WorkflowInstanceId",
                table: "EmployeeExcuses",
                column: "WorkflowInstanceId",
                principalTable: "WorkflowInstances",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeVacations_WorkflowInstances",
                table: "EmployeeVacations",
                column: "WorkflowInstanceId",
                principalTable: "WorkflowInstances",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_RemoteWorkRequests_WorkflowInstances_WorkflowInstanceId",
                table: "RemoteWorkRequests",
                column: "WorkflowInstanceId",
                principalTable: "WorkflowInstances",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeExcuses_WorkflowInstances_WorkflowInstanceId",
                table: "EmployeeExcuses");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeVacations_WorkflowInstances",
                table: "EmployeeVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_RemoteWorkRequests_WorkflowInstances_WorkflowInstanceId",
                table: "RemoteWorkRequests");

            migrationBuilder.DropIndex(
                name: "IX_RemoteWorkRequests_WorkflowInstanceId",
                table: "RemoteWorkRequests");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeVacations_WorkflowInstanceId",
                table: "EmployeeVacations");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeExcuses_WorkflowInstanceId",
                table: "EmployeeExcuses");

            migrationBuilder.DropColumn(
                name: "WorkflowInstanceId",
                table: "RemoteWorkRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowInstanceId",
                table: "EmployeeVacations");

            migrationBuilder.DropColumn(
                name: "WorkflowInstanceId",
                table: "EmployeeExcuses");
        }
    }
}
