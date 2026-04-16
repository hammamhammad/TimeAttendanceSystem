using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Services;

/// <summary>
/// Consolidated entry point for starting an approval workflow. (v13.6)
///
/// Replaces the 40–50 lines of duplicated "create entity → call <c>StartWorkflowAsync</c> →
/// delete entity on failure → attach <c>WorkflowInstanceId</c> → auto-approve-on-behalf" logic that
/// existed in <c>CreateEmployeeVacationCommandHandler</c>,
/// <c>CreateEmployeeExcuseCommandHandler</c>, <c>CreateRemoteWorkRequestCommandHandler</c>,
/// and <c>CreateAttendanceCorrectionRequestCommandHandler</c>. New request modules must use
/// this service rather than calling <see cref="IWorkflowEngine"/> directly.
/// </summary>
public interface IWorkflowStarter
{
    /// <summary>
    /// Start an approval workflow for the given entity and optionally auto-approve the first step
    /// if the current user is permitted (i.e. "submitted on behalf of" scenarios).
    /// </summary>
    /// <remarks>
    /// On failure, callers should roll back the source entity they just inserted. This service
    /// deliberately does NOT delete the source entity — the caller knows its own schema and
    /// side-effects (e.g. leave-balance reservations) that need unwinding.
    /// </remarks>
    Task<WorkflowResult<WorkflowInstance>> StartApprovalAsync(
        WorkflowEntityType entityType,
        long entityId,
        long requestedByUserId,
        long? branchId,
        IReadOnlyDictionary<string, object>? context = null,
        bool autoApproveCurrentUserStepIfPermitted = false,
        string? autoApproveComment = null,
        CancellationToken ct = default);
}

/// <summary>
/// Default implementation — thin wrapper around <see cref="IWorkflowEngine"/>.
/// Exists primarily for a single stable call signature; the engine still performs the heavy lifting
/// (snapshotting, approver resolution, notifications).
/// </summary>
public sealed class WorkflowStarter : IWorkflowStarter
{
    private readonly IWorkflowEngine _engine;

    public WorkflowStarter(IWorkflowEngine engine) => _engine = engine;

    public async Task<WorkflowResult<WorkflowInstance>> StartApprovalAsync(
        WorkflowEntityType entityType,
        long entityId,
        long requestedByUserId,
        long? branchId,
        IReadOnlyDictionary<string, object>? context = null,
        bool autoApproveCurrentUserStepIfPermitted = false,
        string? autoApproveComment = null,
        CancellationToken ct = default)
    {
        var ctxDict = context != null
            ? new Dictionary<string, object>(context)
            : null;

        var result = await _engine.StartWorkflowAsync(entityType, entityId, requestedByUserId, branchId, ctxDict);
        if (!result.IsSuccess || result.Value is null)
        {
            return result;
        }

        if (autoApproveCurrentUserStepIfPermitted)
        {
            var canApprove = await _engine.CanUserApproveAsync(result.Value.Id, requestedByUserId);
            if (canApprove)
            {
                await _engine.ApproveAsync(
                    result.Value.Id,
                    requestedByUserId,
                    autoApproveComment ?? "Auto-approved: Request submitted on behalf of employee");
            }
        }

        return result;
    }
}
