using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <summary>
    /// v13.6 — Workflow Routing Hardening.
    /// Additive-only: every new column carries a default that mirrors pre-v13.6 behavior.
    /// Two new tables for role-assignment cursors and system-action audit trail.
    /// Snapshot backfill SQL populates <c>DefinitionSnapshotJson</c> for every non-terminal
    /// workflow instance so their post-migration behavior is stable even if an HR admin edits
    /// the live definition afterward.
    /// </summary>
    public partial class WorkflowRoutingHardeningV13_6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ---------- Branches.ManagerEmployeeId ----------
            migrationBuilder.AddColumn<long>(
                name: "ManagerEmployeeId",
                table: "Branches",
                type: "bigint",
                nullable: true,
                comment: "FK to designated branch-manager Employee, used by workflow engine for BranchManager approver type (v13.6)");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ManagerEmployeeId",
                table: "Branches",
                column: "ManagerEmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_ManagerEmployee",
                table: "Branches",
                column: "ManagerEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            // ---------- UserRoles.Priority ----------
            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "UserRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "Seniority priority within role; higher wins under FixedPriority strategy (v13.6)");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId_Priority",
                table: "UserRoles",
                columns: new[] { "RoleId", "Priority" });

            // ---------- TenantSettings: 4 workflow-routing fields ----------
            migrationBuilder.AddColumn<string>(
                name: "WorkflowFallbackApproverRole",
                table: "TenantSettings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "HRManager");

            migrationBuilder.AddColumn<long>(
                name: "WorkflowFallbackApproverUserId",
                table: "TenantSettings",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxWorkflowDelegationDepth",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.AddColumn<int>(
                name: "MaxWorkflowResubmissions",
                table: "TenantSettings",
                type: "integer",
                nullable: false,
                defaultValue: 3);

            // ---------- WorkflowSteps: 4 new columns ----------
            migrationBuilder.AddColumn<int>(
                name: "RoleAssignmentStrategy",
                table: "WorkflowSteps",
                type: "integer",
                nullable: false,
                defaultValue: 3, // LeastPendingApprovals
                comment: "1=FirstMatch, 2=RoundRobin, 3=LeastPendingApprovals, 4=FixedPriority (v13.6)");

            migrationBuilder.AddColumn<bool>(
                name: "AllowReturnForCorrection",
                table: "WorkflowSteps",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                comment: "Whether approver can use the non-final Return-for-Correction action (v13.6)");

            migrationBuilder.AddColumn<string>(
                name: "ValidationRuleCode",
                table: "WorkflowSteps",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                comment: "Identifier of the IWorkflowValidationRule to execute on Validation steps (v13.6)");

            migrationBuilder.AddColumn<string>(
                name: "ValidationConfigJson",
                table: "WorkflowSteps",
                type: "jsonb",
                nullable: true,
                comment: "Per-step configuration passed to the validation rule (v13.6)");

            // ---------- WorkflowInstances: 5 new columns ----------
            migrationBuilder.AddColumn<int>(
                name: "DefinitionVersion",
                table: "WorkflowInstances",
                type: "integer",
                nullable: false,
                defaultValue: 1,
                comment: "Snapshotted workflow definition version at instance creation (v13.6)");

            migrationBuilder.AddColumn<string>(
                name: "DefinitionSnapshotJson",
                table: "WorkflowInstances",
                type: "jsonb",
                nullable: false,
                defaultValueSql: "'{}'::jsonb",
                comment: "Frozen snapshot of workflow definition consumed for step transitions (v13.6)");

            migrationBuilder.AddColumn<System.DateTime>(
                name: "ReturnedAtUtc",
                table: "WorkflowInstances",
                type: "timestamp with time zone",
                nullable: true,
                comment: "UTC when an approver returned the workflow for correction (v13.6)");

            migrationBuilder.AddColumn<long>(
                name: "ReturnedByUserId",
                table: "WorkflowInstances",
                type: "bigint",
                nullable: true,
                comment: "Approver who returned the workflow for correction (v13.6)");

            migrationBuilder.AddColumn<int>(
                name: "ResubmissionCount",
                table: "WorkflowInstances",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "Resubmission counter; capped by TenantSettings.MaxWorkflowResubmissions (v13.6)");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkflowInstances_ReturnedByUser",
                table: "WorkflowInstances",
                column: "ReturnedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            // ---------- WorkflowStepExecutions: ValidationDetailsJson ----------
            migrationBuilder.AddColumn<string>(
                name: "ValidationDetailsJson",
                table: "WorkflowStepExecutions",
                type: "jsonb",
                nullable: true,
                comment: "Validation-rule output for Validation steps (v13.6)");

            // ---------- WorkflowRoleAssignmentCursors (new table) ----------
            migrationBuilder.CreateTable(
                name: "WorkflowRoleAssignmentCursors",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<long>(type: "bigint", nullable: false, comment: "Role whose user pool is rotated by this cursor"),
                    LastAssignedUserId = table.Column<long>(type: "bigint", nullable: true, comment: "Most recently assigned user id (null before first rotation)"),
                    LastAssignedAtUtc = table.Column<System.DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp of the last advance — diagnostic only"),
                    CreatedAtUtc = table.Column<System.DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ModifiedAtUtc = table.Column<System.DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowRoleAssignmentCursors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowRoleAssignmentCursors_Roles",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkflowRoleAssignmentCursors_Users",
                        column: x => x.LastAssignedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "UX_WorkflowRoleAssignmentCursors_RoleId",
                table: "WorkflowRoleAssignmentCursors",
                column: "RoleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowRoleAssignmentCursors_LastAssignedUserId",
                table: "WorkflowRoleAssignmentCursors",
                column: "LastAssignedUserId");

            // ---------- WorkflowSystemActionAudits (new table) ----------
            migrationBuilder.CreateTable(
                name: "WorkflowSystemActionAudits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: false),
                    StepExecutionId = table.Column<long>(type: "bigint", nullable: true),
                    ActionType = table.Column<int>(type: "integer", nullable: false),
                    TriggeredAtUtc = table.Column<System.DateTime>(type: "timestamp with time zone", nullable: false),
                    SystemUserId = table.Column<long>(type: "bigint", nullable: false, comment: "Resolved via ISystemUserResolver at the moment the action fired — never 0"),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DetailsJson = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAtUtc = table.Column<System.DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ModifiedAtUtc = table.Column<System.DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowSystemActionAudits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowSystemActionAudits_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkflowSystemActionAudits_StepExecution",
                        column: x => x.StepExecutionId,
                        principalTable: "WorkflowStepExecutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_WorkflowSystemActionAudits_SystemUser",
                        column: x => x.SystemUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_Instance_TriggeredAt",
                table: "WorkflowSystemActionAudits",
                columns: new[] { "WorkflowInstanceId", "TriggeredAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_ActionType",
                table: "WorkflowSystemActionAudits",
                column: "ActionType");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_StepExecutionId",
                table: "WorkflowSystemActionAudits",
                column: "StepExecutionId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_SystemUserId",
                table: "WorkflowSystemActionAudits",
                column: "SystemUserId");

            // ---------- Backfill: populate DefinitionSnapshotJson for in-flight instances ----------
            // Sets DefinitionVersion and DefinitionSnapshotJson on every non-terminal workflow
            // so their post-migration behavior is stable even if the definition is later edited.
            // Terminal instances (Approved/Rejected/Cancelled/Expired/FailedRouting) keep the
            // default ('{}', 1) — they're never read.
            migrationBuilder.Sql(@"
                UPDATE ""WorkflowInstances"" wi
                SET
                    ""DefinitionVersion"" = wd.""Version"",
                    ""DefinitionSnapshotJson"" = (
                        SELECT jsonb_build_object(
                            'schemaVersion', 1,
                            'definitionId', wd2.""Id"",
                            'definitionVersion', wd2.""Version"",
                            'name', wd2.""Name"",
                            'nameAr', wd2.""NameAr"",
                            'branchId', wd2.""BranchId"",
                            'entityType', wd2.""EntityType"",
                            'steps', COALESCE(jsonb_agg(
                                jsonb_build_object(
                                    'stepId', ws.""Id"",
                                    'stepOrder', ws.""StepOrder"",
                                    'name', ws.""Name"",
                                    'stepType', ws.""StepType"",
                                    'approverType', ws.""ApproverType"",
                                    'approverRoleId', ws.""ApproverRoleId"",
                                    'approverUserId', ws.""ApproverUserId"",
                                    'conditionJson', ws.""ConditionJson"",
                                    'timeoutHours', ws.""TimeoutHours"",
                                    'escalationStepId', ws.""EscalationStepId"",
                                    'timeoutAction', ws.""TimeoutAction"",
                                    'onApproveNextStepId', ws.""OnApproveNextStepId"",
                                    'onRejectNextStepId', ws.""OnRejectNextStepId"",
                                    'allowDelegation', ws.""AllowDelegation"",
                                    'notifyOnAction', ws.""NotifyOnAction"",
                                    'notifyRequesterOnReach', ws.""NotifyRequesterOnReach"",
                                    'requireCommentsOnApprove', ws.""RequireCommentsOnApprove"",
                                    'requireCommentsOnReject', ws.""RequireCommentsOnReject"",
                                    'roleAssignmentStrategy', 3,
                                    'allowReturnForCorrection', false,
                                    'validationRuleCode', NULL,
                                    'validationConfigJson', NULL
                                ) ORDER BY ws.""StepOrder""
                            ), '[]'::jsonb)
                        )
                        FROM ""WorkflowDefinitions"" wd2
                        LEFT JOIN ""WorkflowSteps"" ws
                            ON ws.""WorkflowDefinitionId"" = wd2.""Id"" AND ws.""IsDeleted"" = false
                        WHERE wd2.""Id"" = wi.""WorkflowDefinitionId""
                        GROUP BY wd2.""Id"", wd2.""Version"", wd2.""Name"", wd2.""NameAr"",
                                 wd2.""BranchId"", wd2.""EntityType""
                    )
                FROM ""WorkflowDefinitions"" wd
                WHERE wi.""WorkflowDefinitionId"" = wd.""Id""
                  AND wi.""Status"" NOT IN (3, 4, 5, 6, 9) -- exclude Approved/Rejected/Cancelled/Expired/FailedRouting
                  AND wi.""IsDeleted"" = false;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "WorkflowSystemActionAudits");
            migrationBuilder.DropTable(name: "WorkflowRoleAssignmentCursors");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkflowInstances_ReturnedByUser",
                table: "WorkflowInstances");

            migrationBuilder.DropColumn(name: "ValidationDetailsJson", table: "WorkflowStepExecutions");

            migrationBuilder.DropColumn(name: "ResubmissionCount", table: "WorkflowInstances");
            migrationBuilder.DropColumn(name: "ReturnedByUserId", table: "WorkflowInstances");
            migrationBuilder.DropColumn(name: "ReturnedAtUtc", table: "WorkflowInstances");
            migrationBuilder.DropColumn(name: "DefinitionSnapshotJson", table: "WorkflowInstances");
            migrationBuilder.DropColumn(name: "DefinitionVersion", table: "WorkflowInstances");

            migrationBuilder.DropColumn(name: "ValidationConfigJson", table: "WorkflowSteps");
            migrationBuilder.DropColumn(name: "ValidationRuleCode", table: "WorkflowSteps");
            migrationBuilder.DropColumn(name: "AllowReturnForCorrection", table: "WorkflowSteps");
            migrationBuilder.DropColumn(name: "RoleAssignmentStrategy", table: "WorkflowSteps");

            migrationBuilder.DropColumn(name: "MaxWorkflowResubmissions", table: "TenantSettings");
            migrationBuilder.DropColumn(name: "MaxWorkflowDelegationDepth", table: "TenantSettings");
            migrationBuilder.DropColumn(name: "WorkflowFallbackApproverUserId", table: "TenantSettings");
            migrationBuilder.DropColumn(name: "WorkflowFallbackApproverRole", table: "TenantSettings");

            migrationBuilder.DropIndex(name: "IX_UserRoles_RoleId_Priority", table: "UserRoles");
            migrationBuilder.DropColumn(name: "Priority", table: "UserRoles");

            migrationBuilder.DropForeignKey(name: "FK_Branches_ManagerEmployee", table: "Branches");
            migrationBuilder.DropIndex(name: "IX_Branches_ManagerEmployeeId", table: "Branches");
            migrationBuilder.DropColumn(name: "ManagerEmployeeId", table: "Branches");
        }
    }
}
