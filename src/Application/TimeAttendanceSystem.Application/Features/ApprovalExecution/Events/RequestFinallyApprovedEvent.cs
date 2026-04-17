using MediatR;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution.Events;

/// <summary>
/// Phase 1 (v14.1): Published exactly once by <c>ApproveStepCommandHandler</c> when a
/// <see cref="WorkflowInstance"/> transitions to <c>Approved</c> for one of the Phase 1
/// execution-target entity types. A single subscriber
/// (<see cref="RequestFinallyApprovedHandler"/>) maps to <see cref="ApprovalExecutionTargetType"/>
/// and sends <c>ExecuteApprovalCommand</c>.
///
/// Events for non-target workflow types (e.g. Vacation, Excuse) are ignored by the handler
/// so publishing is safe to do for every Approved workflow; centralizing the dispatch here
/// prevents duplicate execution calls from different paths.
/// </summary>
public sealed record RequestFinallyApprovedEvent(
    WorkflowEntityType EntityType,
    long EntityId,
    long WorkflowInstanceId,
    long? TriggeringUserId) : INotification;
