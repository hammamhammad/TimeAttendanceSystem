using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkflowTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApprovalDelegations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DelegatorUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User delegating their authority"),
                    DelegateUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User receiving delegated authority"),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Start of delegation period"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "End of delegation period"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether delegation is currently active"),
                    EntityTypesJson = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Comma-separated entity types (null = all)"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for delegation"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalDelegations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalDelegations_DelegateUser",
                        column: x => x.DelegateUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApprovalDelegations_DelegatorUser",
                        column: x => x.DelegatorUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowDefinitions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Display name of the workflow definition"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic display name of the workflow definition"),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Description of the workflow purpose"),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Arabic description of the workflow"),
                    EntityType = table.Column<int>(type: "integer", nullable: false, comment: "Type of entity this workflow applies to"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether workflow is active for new requests"),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether this is the default workflow for entity type"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Branch scope (null = organization-wide)"),
                    Version = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Version number incremented on modifications"),
                    Priority = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Priority for workflow selection"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowDefinitions_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowSteps",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowDefinitionId = table.Column<long>(type: "bigint", nullable: false, comment: "Parent workflow definition"),
                    StepOrder = table.Column<int>(type: "integer", nullable: false, comment: "Sequential order within workflow"),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Display name of the step"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic display name"),
                    StepType = table.Column<int>(type: "integer", nullable: false, comment: "Type of workflow step"),
                    ApproverType = table.Column<int>(type: "integer", nullable: false, comment: "How approver is determined"),
                    ApproverRoleId = table.Column<long>(type: "bigint", nullable: true, comment: "Role ID for role-based approval"),
                    ApproverUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User ID for specific user approval"),
                    ConditionJson = table.Column<string>(type: "jsonb", nullable: true, comment: "JSON condition for conditional steps"),
                    TimeoutHours = table.Column<int>(type: "integer", nullable: true, comment: "Hours before escalation"),
                    EscalationStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Step to escalate to on timeout"),
                    OnApproveNextStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Next step on approval"),
                    OnRejectNextStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Next step on rejection"),
                    AllowDelegation = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether step allows delegation"),
                    NotifyOnAction = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Send notifications for actions"),
                    NotifyRequesterOnReach = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Notify requester when step is reached"),
                    ApproverInstructions = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Instructions for approver"),
                    ApproverInstructionsAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Arabic instructions for approver"),
                    RequireCommentsOnApprove = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Require comments when approving"),
                    RequireCommentsOnReject = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Require comments when rejecting"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_EscalationStep",
                        column: x => x.EscalationStepId,
                        principalTable: "WorkflowSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_Roles",
                        column: x => x.ApproverRoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_Users",
                        column: x => x.ApproverUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_WorkflowDefinitions",
                        column: x => x.WorkflowDefinitionId,
                        principalTable: "WorkflowDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowInstances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowDefinitionId = table.Column<long>(type: "bigint", nullable: false, comment: "Workflow definition being executed"),
                    EntityType = table.Column<int>(type: "integer", nullable: false, comment: "Type of entity being processed"),
                    EntityId = table.Column<long>(type: "bigint", nullable: false, comment: "ID of the entity being processed"),
                    CurrentStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Current step in workflow (null if completed)"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Current workflow status"),
                    RequestedByUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who initiated the workflow"),
                    RequestedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When workflow was initiated"),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When workflow was completed"),
                    FinalOutcome = table.Column<int>(type: "integer", nullable: true, comment: "Final outcome of workflow"),
                    ContextJson = table.Column<string>(type: "jsonb", nullable: true, comment: "Runtime context variables"),
                    FinalComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Comments from final action"),
                    CompletedByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User who completed the workflow"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_CompletedByUser",
                        column: x => x.CompletedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_CurrentStep",
                        column: x => x.CurrentStepId,
                        principalTable: "WorkflowSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_RequestedByUser",
                        column: x => x.RequestedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_WorkflowDefinitions",
                        column: x => x.WorkflowDefinitionId,
                        principalTable: "WorkflowDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowStepExecutions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: false, comment: "Parent workflow instance"),
                    StepId = table.Column<long>(type: "bigint", nullable: false, comment: "Workflow step being executed"),
                    AssignedToUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User assigned to approve"),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When step was assigned"),
                    ActionTakenByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User who took the action"),
                    ActionTakenAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When action was taken"),
                    Action = table.Column<int>(type: "integer", nullable: true, comment: "Action taken on this step"),
                    Comments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Comments provided with action"),
                    DelegatedToUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User delegated to"),
                    DueAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Due date for action"),
                    IsDelegated = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether created by delegation"),
                    DelegatedFromExecutionId = table.Column<long>(type: "bigint", nullable: true, comment: "Original execution delegated from"),
                    ReminderSent = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether reminder was sent"),
                    ReminderSentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When reminder was sent"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowStepExecutions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_ActionTakenByUser",
                        column: x => x.ActionTakenByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_AssignedToUser",
                        column: x => x.AssignedToUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_DelegatedFromExecution",
                        column: x => x.DelegatedFromExecutionId,
                        principalTable: "WorkflowStepExecutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_DelegatedToUser",
                        column: x => x.DelegatedToUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_WorkflowSteps",
                        column: x => x.StepId,
                        principalTable: "WorkflowSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_Active_Dates",
                table: "ApprovalDelegations",
                columns: new[] { "DelegatorUserId", "IsActive", "StartDate", "EndDate" },
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_DelegateUserId",
                table: "ApprovalDelegations",
                column: "DelegateUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_DelegatorUserId",
                table: "ApprovalDelegations",
                column: "DelegatorUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_EndDate",
                table: "ApprovalDelegations",
                column: "EndDate",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_StartDate",
                table: "ApprovalDelegations",
                column: "StartDate",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_BranchId",
                table: "WorkflowDefinitions",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_EntityType",
                table: "WorkflowDefinitions",
                column: "EntityType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_EntityType_Active",
                table: "WorkflowDefinitions",
                columns: new[] { "EntityType", "IsActive" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_EntityType_Branch_Default",
                table: "WorkflowDefinitions",
                columns: new[] { "EntityType", "BranchId", "IsDefault" },
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_CompletedByUserId",
                table: "WorkflowInstances",
                column: "CompletedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_CurrentStepId",
                table: "WorkflowInstances",
                column: "CurrentStepId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_EntityType_EntityId",
                table: "WorkflowInstances",
                columns: new[] { "EntityType", "EntityId" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_RequestedAt",
                table: "WorkflowInstances",
                column: "RequestedAt",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_RequestedByUserId",
                table: "WorkflowInstances",
                column: "RequestedByUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_Status",
                table: "WorkflowInstances",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_Status_CurrentStep",
                table: "WorkflowInstances",
                columns: new[] { "Status", "CurrentStepId" },
                filter: "\"IsDeleted\" = false AND \"Status\" = 2");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_WorkflowDefinitionId",
                table: "WorkflowInstances",
                column: "WorkflowDefinitionId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_ActionTakenAt",
                table: "WorkflowStepExecutions",
                column: "ActionTakenAt",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false AND \"ActionTakenAt\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_ActionTakenByUserId",
                table: "WorkflowStepExecutions",
                column: "ActionTakenByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_AssignedTo_Action",
                table: "WorkflowStepExecutions",
                columns: new[] { "AssignedToUserId", "Action" },
                filter: "\"IsDeleted\" = false AND \"Action\" IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_AssignedToUserId",
                table: "WorkflowStepExecutions",
                column: "AssignedToUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_DelegatedFromExecutionId",
                table: "WorkflowStepExecutions",
                column: "DelegatedFromExecutionId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_DelegatedToUserId",
                table: "WorkflowStepExecutions",
                column: "DelegatedToUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_DueAt",
                table: "WorkflowStepExecutions",
                column: "DueAt",
                filter: "\"IsDeleted\" = false AND \"Action\" IS NULL AND \"DueAt\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_StepId",
                table: "WorkflowStepExecutions",
                column: "StepId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_WorkflowInstanceId",
                table: "WorkflowStepExecutions",
                column: "WorkflowInstanceId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_ApproverRoleId",
                table: "WorkflowSteps",
                column: "ApproverRoleId",
                filter: "\"IsDeleted\" = false AND \"ApproverRoleId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_ApproverUserId",
                table: "WorkflowSteps",
                column: "ApproverUserId",
                filter: "\"IsDeleted\" = false AND \"ApproverUserId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_Definition_Order",
                table: "WorkflowSteps",
                columns: new[] { "WorkflowDefinitionId", "StepOrder" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_EscalationStepId",
                table: "WorkflowSteps",
                column: "EscalationStepId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_WorkflowDefinitionId",
                table: "WorkflowSteps",
                column: "WorkflowDefinitionId",
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalDelegations");

            migrationBuilder.DropTable(
                name: "WorkflowStepExecutions");

            migrationBuilder.DropTable(
                name: "WorkflowInstances");

            migrationBuilder.DropTable(
                name: "WorkflowSteps");

            migrationBuilder.DropTable(
                name: "WorkflowDefinitions");
        }
    }
}
