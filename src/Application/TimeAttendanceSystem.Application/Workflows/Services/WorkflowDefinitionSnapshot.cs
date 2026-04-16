using System.Text.Json;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Application.Workflows.Services;

/// <summary>
/// DTO shape persisted into <see cref="WorkflowInstance.DefinitionSnapshotJson"/> at instance creation.
/// Protects running instances from being affected by later edits to the live
/// <see cref="WorkflowDefinition"/>. (v13.6)
/// </summary>
/// <remarks>
/// Includes a <see cref="SchemaVersion"/> field so future schema changes (new step types, new approver
/// types) can be deserialized safely by evolving the deserializer rather than the stored data.
/// </remarks>
public sealed class WorkflowDefinitionSnapshotDto
{
    /// <summary>Format version of this snapshot. Bumped when the shape changes in a breaking way.</summary>
    public int SchemaVersion { get; set; } = 1;

    public long DefinitionId { get; set; }
    public int DefinitionVersion { get; set; }
    public string Name { get; set; } = "";
    public string? NameAr { get; set; }
    public long? BranchId { get; set; }
    public int EntityType { get; set; }
    public List<StepSnapshot> Steps { get; set; } = new();

    public sealed class StepSnapshot
    {
        public long StepId { get; set; }
        public int StepOrder { get; set; }
        public string Name { get; set; } = "";
        public int StepType { get; set; }
        public int ApproverType { get; set; }
        public long? ApproverRoleId { get; set; }
        public long? ApproverUserId { get; set; }
        public string? ConditionJson { get; set; }
        public int? TimeoutHours { get; set; }
        public long? EscalationStepId { get; set; }
        public int TimeoutAction { get; set; }
        public long? OnApproveNextStepId { get; set; }
        public long? OnRejectNextStepId { get; set; }
        public bool AllowDelegation { get; set; } = true;
        public bool NotifyOnAction { get; set; } = true;
        public bool NotifyRequesterOnReach { get; set; }
        public bool RequireCommentsOnApprove { get; set; }
        public bool RequireCommentsOnReject { get; set; } = true;
        public int RoleAssignmentStrategy { get; set; } = 3; // LeastPendingApprovals
        public bool AllowReturnForCorrection { get; set; }
        public string? ValidationRuleCode { get; set; }
        public string? ValidationConfigJson { get; set; }
    }
}

/// <summary>
/// Serializes a live <see cref="WorkflowDefinition"/> into the snapshot JSON format and
/// deserializes the inverse.
/// </summary>
public static class WorkflowDefinitionSnapshot
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = false
    };

    public static string Serialize(WorkflowDefinition definition)
    {
        var dto = new WorkflowDefinitionSnapshotDto
        {
            SchemaVersion = 1,
            DefinitionId = definition.Id,
            DefinitionVersion = definition.Version,
            Name = definition.Name,
            NameAr = definition.NameAr,
            BranchId = definition.BranchId,
            EntityType = (int)definition.EntityType,
            Steps = definition.Steps
                .OrderBy(s => s.StepOrder)
                .Select(s => new WorkflowDefinitionSnapshotDto.StepSnapshot
                {
                    StepId = s.Id,
                    StepOrder = s.StepOrder,
                    Name = s.Name,
                    StepType = (int)s.StepType,
                    ApproverType = (int)s.ApproverType,
                    ApproverRoleId = s.ApproverRoleId,
                    ApproverUserId = s.ApproverUserId,
                    ConditionJson = s.ConditionJson,
                    TimeoutHours = s.TimeoutHours,
                    EscalationStepId = s.EscalationStepId,
                    TimeoutAction = (int)s.TimeoutAction,
                    OnApproveNextStepId = s.OnApproveNextStepId,
                    OnRejectNextStepId = s.OnRejectNextStepId,
                    AllowDelegation = s.AllowDelegation,
                    NotifyOnAction = s.NotifyOnAction,
                    NotifyRequesterOnReach = s.NotifyRequesterOnReach,
                    RequireCommentsOnApprove = s.RequireCommentsOnApprove,
                    RequireCommentsOnReject = s.RequireCommentsOnReject,
                    RoleAssignmentStrategy = (int)s.RoleAssignmentStrategy,
                    AllowReturnForCorrection = s.AllowReturnForCorrection,
                    ValidationRuleCode = s.ValidationRuleCode,
                    ValidationConfigJson = s.ValidationConfigJson
                })
                .ToList()
        };

        return JsonSerializer.Serialize(dto, Options);
    }

    public static WorkflowDefinitionSnapshotDto? Deserialize(string? json)
    {
        if (string.IsNullOrWhiteSpace(json) || json == "{}") return null;
        try
        {
            return JsonSerializer.Deserialize<WorkflowDefinitionSnapshotDto>(json, Options);
        }
        catch (JsonException)
        {
            return null;
        }
    }
}
