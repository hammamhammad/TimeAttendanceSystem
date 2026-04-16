using MediatR;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Events;

/// <summary>
/// Published when an approver returns a workflow request to the requester for correction. (v13.6)
/// Consumed by source modules (Vacation / Excuse / RemoteWork / AttendanceCorrection) that want to
/// mark their own entity as editable-again. Modules whose entities cannot be edited after
/// submission can ignore this event.
/// </summary>
public sealed record RequestReturnedForCorrectionEvent(
    long WorkflowInstanceId,
    WorkflowEntityType EntityType,
    long EntityId,
    long RequestedByUserId,
    long ReturnedByUserId,
    string Comments) : INotification;

/// <summary>
/// Published when the requester resubmits a previously returned request. (v13.6)
/// </summary>
public sealed record RequestResubmittedEvent(
    long WorkflowInstanceId,
    WorkflowEntityType EntityType,
    long EntityId,
    long RequestedByUserId,
    string? Comments,
    int ResubmissionCount) : INotification;
