using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Workflows.Validation;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Services;

/// <summary>
/// Workflow engine — orchestrates workflow-instance lifecycle, step dispatch, approver routing,
/// delegation, timeout/escalation, validation steps, and return-for-correction.
///
/// v13.6 rewrite:
/// - Primary approver resolution delegated to <see cref="IApproverResolver"/>.
/// - Tenant fallback chain kicks in when primary resolution fails (no more silent stalls).
/// - Definition snapshotting on instance creation protects running instances from live edits.
/// - Delegation chain has a configurable max depth and cycle detection.
/// - Timeout / escalation actions are recorded to <see cref="WorkflowSystemActionAudit"/>
///   with a real system user id (not "0").
/// - Validation steps fail closed when no rule is registered for the configured code.
/// - Non-final "Return for Correction" action supported per-step.
/// </summary>
public class WorkflowEngine : IWorkflowEngine
{
    private readonly IApplicationDbContext _context;
    private readonly IInAppNotificationService _notificationService;
    private readonly IApproverResolver _approverResolver;
    private readonly ISystemUserResolver _systemUserResolver;
    private readonly IWorkflowValidationRuleRegistry _validationRegistry;
    private readonly INotificationRecipientResolver _notificationRecipients;
    private readonly IFailureAlertService _failureAlerts;
    private readonly ILogger<WorkflowEngine> _logger;

    public WorkflowEngine(
        IApplicationDbContext context,
        IInAppNotificationService notificationService,
        IApproverResolver approverResolver,
        ISystemUserResolver systemUserResolver,
        IWorkflowValidationRuleRegistry validationRegistry,
        INotificationRecipientResolver notificationRecipients,
        IFailureAlertService failureAlerts,
        ILogger<WorkflowEngine> logger)
    {
        _context = context;
        _notificationService = notificationService;
        _approverResolver = approverResolver;
        _systemUserResolver = systemUserResolver;
        _validationRegistry = validationRegistry;
        _notificationRecipients = notificationRecipients;
        _failureAlerts = failureAlerts;
        _logger = logger;
    }

    // =====================================================================
    // StartWorkflowAsync — creates instance + snapshot + processes first step
    // =====================================================================
    public async Task<WorkflowResult<WorkflowInstance>> StartWorkflowAsync(
        WorkflowEntityType entityType,
        long entityId,
        long requestedByUserId,
        long? branchId = null,
        Dictionary<string, object>? contextData = null)
    {
        var existing = await _context.WorkflowInstances
            .FirstOrDefaultAsync(wi => wi.EntityType == entityType && wi.EntityId == entityId &&
                                       wi.Status != WorkflowStatus.Approved &&
                                       wi.Status != WorkflowStatus.Rejected &&
                                       wi.Status != WorkflowStatus.Cancelled &&
                                       wi.Status != WorkflowStatus.Expired &&
                                       wi.Status != WorkflowStatus.FailedRouting);

        if (existing != null)
        {
            return WorkflowResult<WorkflowInstance>.Failure(
                $"Workflow already exists for this {entityType} (ID: {existing.Id})");
        }

        var definition = await GetApplicableWorkflowAsync(entityType, branchId);
        if (definition == null)
        {
            return WorkflowResult<WorkflowInstance>.Failure(
                $"No active workflow definition found for {entityType}");
        }

        var snapshot = WorkflowDefinitionSnapshot.Serialize(definition);

        var instance = new WorkflowInstance
        {
            WorkflowDefinitionId = definition.Id,
            EntityType = entityType,
            EntityId = entityId,
            Status = WorkflowStatus.Pending,
            RequestedByUserId = requestedByUserId,
            RequestedAt = DateTime.UtcNow,
            ContextJson = contextData != null ? JsonSerializer.Serialize(contextData) : null,
            DefinitionVersion = definition.Version,
            DefinitionSnapshotJson = snapshot,
            CreatedBy = requestedByUserId.ToString()
        };

        _context.WorkflowInstances.Add(instance);
        await _context.SaveChangesAsync();

        var firstStep = definition.GetFirstStep();
        if (firstStep == null)
        {
            return WorkflowResult<WorkflowInstance>.Failure("Workflow definition has no steps configured");
        }

        var processResult = await ProcessStepAsync(instance, firstStep, requestedByUserId);
        if (!processResult.IsSuccess)
        {
            return WorkflowResult<WorkflowInstance>.Failure(processResult.Error ?? "Failed to process first step");
        }

        await SendRequestSubmittedNotificationAsync(instance, entityType);
        return WorkflowResult<WorkflowInstance>.Success(instance);
    }

    // =====================================================================
    // ApproveAsync / RejectAsync / CancelAsync
    // =====================================================================
    public async Task<WorkflowResult<bool>> ApproveAsync(long workflowInstanceId, long userId, string? comments = null)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null) return WorkflowResult<bool>.Failure("Workflow instance not found");
        if (instance.IsTerminated()) return WorkflowResult<bool>.Failure("Workflow has already been completed");

        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
            return WorkflowResult<bool>.Failure("You are not authorized to approve this step or no pending action found");

        if (execution.Step.RequireCommentsOnApprove && string.IsNullOrWhiteSpace(comments))
            return WorkflowResult<bool>.Failure("Comments are required for approval");

        execution.Approve(userId, comments);
        await _context.SaveChangesAsync();

        var nextStep = instance.WorkflowDefinition.GetNextStep(execution.Step.StepOrder);
        if (nextStep == null)
        {
            instance.Complete(ApprovalAction.Approved, comments, userId);
            await _context.SaveChangesAsync();
            await SendRequestApprovedNotificationAsync(instance, userId);
            return WorkflowResult<bool>.Success(true);
        }

        await SendIntermediateApprovalNotificationAsync(instance, execution.Step, userId);
        var processResult = await ProcessStepAsync(instance, nextStep, userId);
        return processResult.IsSuccess
            ? WorkflowResult<bool>.Success(true)
            : WorkflowResult<bool>.Failure(processResult.Error ?? "Failed to process next step");
    }

    public async Task<WorkflowResult<bool>> RejectAsync(long workflowInstanceId, long userId, string comments)
    {
        if (string.IsNullOrWhiteSpace(comments))
            return WorkflowResult<bool>.Failure("Comments are required for rejection");

        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null) return WorkflowResult<bool>.Failure("Workflow instance not found");
        if (instance.IsTerminated()) return WorkflowResult<bool>.Failure("Workflow has already been completed");

        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
            return WorkflowResult<bool>.Failure("You are not authorized to reject this step or no pending action found");

        execution.Reject(userId, comments);
        instance.Complete(ApprovalAction.Rejected, comments, userId);
        await _context.SaveChangesAsync();
        await SendRequestRejectedNotificationAsync(instance, userId, comments);
        return WorkflowResult<bool>.Success(true);
    }

    public async Task<WorkflowResult<bool>> CancelAsync(long workflowInstanceId, long userId, string? reason = null)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null) return WorkflowResult<bool>.Failure("Workflow instance not found");
        if (instance.IsTerminated()) return WorkflowResult<bool>.Failure("Workflow has already been completed");

        if (instance.RequestedByUserId != userId)
            return WorkflowResult<bool>.Failure("Only the requester can cancel this workflow");

        instance.Cancel(reason, userId);
        await _context.SaveChangesAsync();
        return WorkflowResult<bool>.Success(true);
    }

    // =====================================================================
    // DelegateAsync — v13.6 hardened: depth + cycle guards, dual notifications
    // =====================================================================
    public async Task<WorkflowResult<bool>> DelegateAsync(long workflowInstanceId, long userId, long delegateToUserId, string? comments = null)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null) return WorkflowResult<bool>.Failure("Workflow instance not found");
        if (instance.IsTerminated()) return WorkflowResult<bool>.Failure("Workflow has already been completed");

        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
            return WorkflowResult<bool>.Failure("You are not authorized to delegate this step or no pending action found");

        if (!execution.Step.AllowDelegation)
            return WorkflowResult<bool>.Failure("This step does not allow delegation");

        if (userId == delegateToUserId)
            return WorkflowResult<bool>.Failure("Cannot delegate to yourself");

        var delegateUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == delegateToUserId && u.IsActive);
        if (delegateUser == null)
            return WorkflowResult<bool>.Failure("Delegate user is inactive or does not exist");

        // v13.6 — bound the chain depth and reject cycles.
        var companySettings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
        var maxDepth = Math.Max(1, companySettings?.MaxWorkflowDelegationDepth ?? 2);

        var (depth, chainUserIds) = await WalkDelegationChainAsync(execution.Id);
        if (depth >= maxDepth)
            return WorkflowResult<bool>.Failure(
                $"Delegation chain exceeds max depth ({maxDepth}). Ask the original approver to delegate or re-route.");

        if (chainUserIds.Contains(delegateToUserId))
            return WorkflowResult<bool>.Failure("Delegation would create a cycle (delegate already in chain).");

        execution.Delegate(userId, delegateToUserId, comments);

        var newExecution = new WorkflowStepExecution
        {
            WorkflowInstanceId = workflowInstanceId,
            StepId = execution.StepId,
            AssignedToUserId = delegateToUserId,
            AssignedAt = DateTime.UtcNow,
            DueAt = execution.Step.CalculateDueDate(DateTime.UtcNow),
            IsDelegated = true,
            DelegatedFromExecutionId = execution.Id,
            CreatedBy = userId.ToString()
        };
        _context.WorkflowStepExecutions.Add(newExecution);
        await _context.SaveChangesAsync();

        await SendDelegationNotificationsAsync(instance, delegateToUserId, userId, comments);
        return WorkflowResult<bool>.Success(true);
    }

    private async Task<(int Depth, HashSet<long> Users)> WalkDelegationChainAsync(long rootExecutionId)
    {
        var users = new HashSet<long>();
        var depth = 0;
        long? cursor = rootExecutionId;
        while (cursor.HasValue)
        {
            var ex = await _context.WorkflowStepExecutions.AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == cursor.Value);
            if (ex == null) break;
            users.Add(ex.AssignedToUserId);
            if (ex.DelegatedFromExecutionId.HasValue)
            {
                depth++;
                cursor = ex.DelegatedFromExecutionId;
            }
            else break;
        }
        return (depth, users);
    }

    // =====================================================================
    // ReturnForCorrectionAsync + ResubmitAsync (v13.6)
    // =====================================================================
    public async Task<WorkflowResult<bool>> ReturnForCorrectionAsync(long workflowInstanceId, long userId, string comments)
    {
        if (string.IsNullOrWhiteSpace(comments))
            return WorkflowResult<bool>.Failure("Comments are required when returning for correction");

        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null) return WorkflowResult<bool>.Failure("Workflow instance not found");
        if (instance.IsTerminated()) return WorkflowResult<bool>.Failure("Workflow has already been completed");
        if (instance.Status == WorkflowStatus.ReturnedForCorrection)
            return WorkflowResult<bool>.Failure("Workflow is already awaiting resubmission");

        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
            return WorkflowResult<bool>.Failure("You are not authorized to return this step for correction or no pending action found");

        if (!execution.Step.AllowReturnForCorrection)
            return WorkflowResult<bool>.Failure("This step does not allow return-for-correction");

        execution.ReturnForCorrection(userId, comments);
        instance.ReturnForCorrection(userId, comments);
        await _context.SaveChangesAsync();

        await SendReturnedForCorrectionNotificationAsync(instance, userId, comments);
        return WorkflowResult<bool>.Success(true);
    }

    public async Task<WorkflowResult<bool>> ResubmitAsync(long workflowInstanceId, long userId, string? comments)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null) return WorkflowResult<bool>.Failure("Workflow instance not found");
        if (instance.Status != WorkflowStatus.ReturnedForCorrection)
            return WorkflowResult<bool>.Failure("Workflow is not awaiting resubmission");

        if (instance.RequestedByUserId != userId)
            return WorkflowResult<bool>.Failure("Only the original requester can resubmit");

        var companySettings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
        var maxResubmits = Math.Max(1, companySettings?.MaxWorkflowResubmissions ?? 3);
        if (instance.ResubmissionCount >= maxResubmits)
        {
            return WorkflowResult<bool>.Failure(
                $"This request has been returned and resubmitted {instance.ResubmissionCount} time(s) " +
                $"(limit {maxResubmits}). Please cancel and create a new request.");
        }

        instance.RecordResubmission();

        // Record a Resubmitted audit entry on the WorkflowStepExecution trail.
        _context.WorkflowStepExecutions.Add(new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = instance.WorkflowDefinition.GetFirstStep()?.Id ?? 0,
            AssignedToUserId = userId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenByUserId = userId,
            ActionTakenAt = DateTime.UtcNow,
            Action = ApprovalAction.Resubmitted,
            Comments = comments,
            CreatedBy = userId.ToString()
        });
        await _context.SaveChangesAsync();

        var firstStep = instance.WorkflowDefinition.GetFirstStep();
        if (firstStep == null)
            return WorkflowResult<bool>.Failure("Workflow definition has no steps configured");

        var result = await ProcessStepAsync(instance, firstStep, userId);
        return result.IsSuccess
            ? WorkflowResult<bool>.Success(true)
            : WorkflowResult<bool>.Failure(result.Error ?? "Failed to resume workflow after resubmission");
    }

    // =====================================================================
    // Queries
    // =====================================================================
    public async Task<WorkflowInstance?> GetWorkflowInstanceAsync(WorkflowEntityType entityType, long entityId)
    {
        return await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition).ThenInclude(wd => wd.Steps)
            .Include(wi => wi.CurrentStep)
            .Include(wi => wi.StepExecutions).ThenInclude(se => se.Step)
            .FirstOrDefaultAsync(wi => wi.EntityType == entityType && wi.EntityId == entityId);
    }

    public async Task<WorkflowStatusInfo?> GetWorkflowStatusAsync(long workflowInstanceId)
    {
        var instance = await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition).ThenInclude(wd => wd.Steps)
            .Include(wi => wi.CurrentStep)
            .Include(wi => wi.StepExecutions).ThenInclude(se => se.Step)
            .Include(wi => wi.StepExecutions).ThenInclude(se => se.AssignedToUser)
            .Include(wi => wi.StepExecutions).ThenInclude(se => se.ActionTakenByUser)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId);

        if (instance == null) return null;

        var pendingExecution = instance.StepExecutions.FirstOrDefault(se => se.IsPending());

        return new WorkflowStatusInfo
        {
            WorkflowInstanceId = instance.Id,
            Status = instance.Status,
            CurrentStepName = instance.CurrentStep?.Name ?? "Completed",
            CurrentStepOrder = instance.CurrentStep?.StepOrder ?? 0,
            TotalSteps = instance.WorkflowDefinition.Steps.Count,
            AssignedToUserName = pendingExecution?.AssignedToUser?.Username,
            RequestedAt = instance.RequestedAt,
            CompletedAt = instance.CompletedAt,
            DueAt = pendingExecution?.DueAt,
            History = instance.StepExecutions
                .Where(se => se.Action.HasValue)
                .OrderBy(se => se.ActionTakenAt)
                .Select(se => new WorkflowStepHistory
                {
                    StepOrder = se.Step.StepOrder,
                    StepName = se.Step.Name,
                    ActionTakenByUserName = se.ActionTakenByUser?.Username,
                    Action = se.Action,
                    ActionTakenAt = se.ActionTakenAt,
                    Comments = se.Comments
                }).ToList()
        };
    }

    public async Task<List<PendingApproval>> GetPendingApprovalsAsync(long userId)
    {
        var directAssignments = await _context.WorkflowStepExecutions
            .Include(se => se.WorkflowInstance).ThenInclude(wi => wi.RequestedByUser)
            .Include(se => se.Step)
            .Include(se => se.DelegatedFromExecution).ThenInclude(e => e!.AssignedToUser)
            .Where(se => se.AssignedToUserId == userId && !se.Action.HasValue && !se.WorkflowInstance.IsDeleted)
            .ToListAsync();

        var activeDelegations = await _context.ApprovalDelegations
            .Where(d => d.DelegateUserId == userId && d.IsActive &&
                        d.StartDate <= DateTime.Today && d.EndDate >= DateTime.Today)
            .ToListAsync();

        var delegatedAssignments = new List<WorkflowStepExecution>();
        foreach (var delegation in activeDelegations)
        {
            var assignments = await _context.WorkflowStepExecutions
                .Include(se => se.WorkflowInstance).ThenInclude(wi => wi.RequestedByUser)
                .Include(se => se.Step)
                .Include(se => se.DelegatedFromExecution).ThenInclude(e => e!.AssignedToUser)
                .Where(se => se.AssignedToUserId == delegation.DelegatorUserId &&
                             !se.Action.HasValue && !se.WorkflowInstance.IsDeleted)
                .ToListAsync();

            if (!string.IsNullOrEmpty(delegation.EntityTypesJson))
            {
                var allowed = delegation.GetEntityTypes();
                assignments = assignments.Where(a => allowed.Contains(a.WorkflowInstance.EntityType)).ToList();
            }
            delegatedAssignments.AddRange(assignments);
        }

        var all = directAssignments.Concat(delegatedAssignments).DistinctBy(x => x.Id).ToList();

        return all.Select(se => new PendingApproval
        {
            WorkflowInstanceId = se.WorkflowInstanceId,
            StepExecutionId = se.Id,
            EntityType = se.WorkflowInstance.EntityType,
            EntityId = se.WorkflowInstance.EntityId,
            EntityDescription = $"{se.WorkflowInstance.EntityType} #{se.WorkflowInstance.EntityId}",
            RequestedByUserName = se.WorkflowInstance.RequestedByUser?.Username ?? "Unknown",
            RequestedAt = se.WorkflowInstance.RequestedAt,
            StepName = se.Step.Name,
            AssignedAt = se.AssignedAt,
            DueAt = se.DueAt,
            IsOverdue = se.IsOverdue(),
            AllowDelegation = se.Step.AllowDelegation,
            AllowReturnForCorrection = se.Step.AllowReturnForCorrection,
            IsDelegated = se.IsDelegated,
            DelegatedFromUserId = se.DelegatedFromExecution?.AssignedToUserId,
            DelegatedFromUserName = se.DelegatedFromExecution?.AssignedToUser?.Username,
            IsReturnedForCorrection = se.WorkflowInstance.Status == WorkflowStatus.ReturnedForCorrection,
            ResubmissionCount = se.WorkflowInstance.ResubmissionCount
        }).ToList();
    }

    public async Task<bool> CanUserApproveAsync(long workflowInstanceId, long userId)
    {
        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        return execution != null;
    }

    public async Task<WorkflowDefinition?> GetApplicableWorkflowAsync(WorkflowEntityType entityType, long? branchId)
    {
        if (branchId.HasValue)
        {
            var branchDefault = await _context.WorkflowDefinitions
                .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
                .FirstOrDefaultAsync(wd => wd.EntityType == entityType && wd.BranchId == branchId &&
                                           wd.IsActive && wd.IsDefault);
            if (branchDefault != null) return branchDefault;

            var branchHighest = await _context.WorkflowDefinitions
                .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
                .Where(wd => wd.EntityType == entityType && wd.BranchId == branchId && wd.IsActive)
                .OrderByDescending(wd => wd.Priority).FirstOrDefaultAsync();
            if (branchHighest != null) return branchHighest;
        }

        var orgDefault = await _context.WorkflowDefinitions
            .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
            .FirstOrDefaultAsync(wd => wd.EntityType == entityType && wd.BranchId == null &&
                                       wd.IsActive && wd.IsDefault);
        if (orgDefault != null) return orgDefault;

        return await _context.WorkflowDefinitions
            .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
            .Where(wd => wd.EntityType == entityType && wd.BranchId == null && wd.IsActive)
            .OrderByDescending(wd => wd.Priority).FirstOrDefaultAsync();
    }

    // =====================================================================
    // ProcessTimeoutsAsync — v13.6: real system actor, audit rows, fallback escalation
    // =====================================================================
    public async Task<int> ProcessTimeoutsAsync()
    {
        var now = DateTime.UtcNow;
        var overdue = await _context.WorkflowStepExecutions
            .Include(se => se.WorkflowInstance).ThenInclude(wi => wi.WorkflowDefinition).ThenInclude(wd => wd.Steps)
            .Include(se => se.Step)
            .Where(se => !se.Action.HasValue && se.DueAt.HasValue && se.DueAt < now &&
                         !se.WorkflowInstance.IsDeleted &&
                         se.WorkflowInstance.Status == WorkflowStatus.InProgress)
            .ToListAsync();

        if (overdue.Count == 0) return 0;

        long systemUserId;
        try { systemUserId = await _systemUserResolver.GetSystemUserIdAsync(); }
        catch (Exception ex)
        {
            _logger.LogError(ex, "WorkflowEngine: cannot resolve system user for timeout processing — aborting run");
            return 0;
        }

        var processed = 0;
        foreach (var execution in overdue)
        {
            execution.MarkTimedOut();
            var auditType = WorkflowSystemActionType.Timeout;
            var reason = $"Step timed out after {execution.Step.TimeoutHours ?? 0}h";

            switch (execution.Step.TimeoutAction)
            {
                case TimeoutAction.AutoApprove:
                {
                    execution.Action = ApprovalAction.AutoApproved;
                    execution.ActionTakenAt = DateTime.UtcNow;
                    execution.ActionTakenByUserId = systemUserId;
                    execution.Comments = "Automatically approved due to timeout";
                    auditType = WorkflowSystemActionType.AutoApprove;

                    var next = execution.WorkflowInstance.WorkflowDefinition.GetNextStep(execution.Step.StepOrder);
                    if (next == null)
                    {
                        execution.WorkflowInstance.Complete(ApprovalAction.AutoApproved,
                            "Automatically approved due to timeout", systemUserId);
                    }
                    else
                    {
                        await ProcessStepAsync(execution.WorkflowInstance, next, systemUserId);
                    }
                    break;
                }

                case TimeoutAction.AutoReject:
                {
                    execution.Action = ApprovalAction.AutoRejected;
                    execution.ActionTakenAt = DateTime.UtcNow;
                    execution.ActionTakenByUserId = systemUserId;
                    execution.Comments = "Automatically rejected due to timeout";
                    execution.WorkflowInstance.Complete(ApprovalAction.AutoRejected,
                        "Automatically rejected due to timeout", systemUserId);
                    auditType = WorkflowSystemActionType.AutoReject;
                    break;
                }

                case TimeoutAction.Escalate:
                {
                    auditType = WorkflowSystemActionType.Escalation;
                    execution.Escalate("Escalated due to timeout");

                    var target = execution.Step.EscalationStepId.HasValue
                        ? await _context.WorkflowSteps.FindAsync(execution.Step.EscalationStepId.Value)
                        : null;

                    if (target != null)
                    {
                        await ProcessStepAsync(execution.WorkflowInstance, target, systemUserId);
                    }
                    else
                    {
                        // No escalation configured — try the tenant fallback chain via a
                        // synthetic role step, or expire if that fails too.
                        _logger.LogWarning(
                            "WorkflowEngine: timeout escalation on step {StepId} has no EscalationStepId — expiring",
                            execution.Step.Id);
                        execution.WorkflowInstance.Status = WorkflowStatus.Expired;
                        execution.WorkflowInstance.CompletedAt = DateTime.UtcNow;
                        execution.WorkflowInstance.FinalOutcome = ApprovalAction.TimedOut;
                        execution.WorkflowInstance.CompletedByUserId = systemUserId;
                        auditType = WorkflowSystemActionType.Expire;
                        reason = "Escalation target missing; workflow expired";
                    }
                    break;
                }

                case TimeoutAction.Expire:
                default:
                {
                    execution.WorkflowInstance.Status = WorkflowStatus.Expired;
                    execution.WorkflowInstance.CompletedAt = DateTime.UtcNow;
                    execution.WorkflowInstance.FinalOutcome = ApprovalAction.TimedOut;
                    execution.WorkflowInstance.CompletedByUserId = systemUserId;
                    auditType = WorkflowSystemActionType.Expire;
                    break;
                }
            }

            _context.WorkflowSystemActionAudits.Add(new WorkflowSystemActionAudit
            {
                WorkflowInstanceId = execution.WorkflowInstanceId,
                StepExecutionId = execution.Id,
                ActionType = auditType,
                TriggeredAtUtc = DateTime.UtcNow,
                SystemUserId = systemUserId,
                Reason = reason,
                DetailsJson = JsonSerializer.Serialize(new
                {
                    timeoutAction = execution.Step.TimeoutAction.ToString(),
                    stepId = execution.Step.Id,
                    stepName = execution.Step.Name,
                    dueAtUtc = execution.DueAt,
                    configuredEscalationStepId = execution.Step.EscalationStepId
                })
            });
            processed++;
        }

        if (processed > 0) await _context.SaveChangesAsync();
        return processed;
    }

    // =====================================================================
    // Private helpers
    // =====================================================================

    private async Task<WorkflowInstance?> GetWorkflowInstanceWithDetailsAsync(long workflowInstanceId)
    {
        return await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition).ThenInclude(wd => wd.Steps)
            .Include(wi => wi.CurrentStep)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId);
    }

    private async Task<WorkflowStepExecution?> GetPendingExecutionForUserAsync(long workflowInstanceId, long userId)
    {
        var direct = await _context.WorkflowStepExecutions
            .Include(se => se.Step)
            .FirstOrDefaultAsync(se => se.WorkflowInstanceId == workflowInstanceId &&
                                       se.AssignedToUserId == userId && !se.Action.HasValue);
        if (direct != null) return direct;

        var instance = await _context.WorkflowInstances.FindAsync(workflowInstanceId);
        if (instance == null) return null;

        var activeDelegations = await _context.ApprovalDelegations
            .Where(d => d.DelegateUserId == userId && d.IsActive &&
                        d.StartDate <= DateTime.Today && d.EndDate >= DateTime.Today)
            .ToListAsync();

        foreach (var delegation in activeDelegations)
        {
            if (!delegation.AppliesToEntityType(instance.EntityType)) continue;

            var delegated = await _context.WorkflowStepExecutions
                .Include(se => se.Step)
                .FirstOrDefaultAsync(se => se.WorkflowInstanceId == workflowInstanceId &&
                                           se.AssignedToUserId == delegation.DelegatorUserId &&
                                           !se.Action.HasValue);
            if (delegated != null) return delegated;
        }
        return null;
    }

    private async Task<WorkflowResult<bool>> ProcessStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        return step.StepType switch
        {
            WorkflowStepType.Approval => await ProcessApprovalStepAsync(instance, step, triggeringUserId),
            WorkflowStepType.Condition => await ProcessConditionStepAsync(instance, step, triggeringUserId),
            WorkflowStepType.Validation => await ProcessValidationStepAsync(instance, step, triggeringUserId),
            WorkflowStepType.Notification => await ProcessNotificationStepAsync(instance, step, triggeringUserId),
            _ => WorkflowResult<bool>.Failure($"Unknown step type: {step.StepType}")
        };
    }

    private async Task<WorkflowResult<bool>> ProcessApprovalStepAsync(
        WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        var resolution = await _approverResolver.ResolveAsync(instance, step, CancellationToken.None);

        if (resolution.UserId is null or 0)
        {
            // Absolute failure — no primary, no fallback. Transition to FailedRouting.
            await RecordFailedRoutingAsync(instance, step, resolution, triggeringUserId);
            return WorkflowResult<bool>.Failure(
                $"Could not determine approver for step '{step.Name}'. Reason: {resolution.Reason}");
        }

        if (resolution.Source is ApproverResolutionSource.FallbackUser or ApproverResolutionSource.FallbackRole)
        {
            // Primary failed — we're routing to fallback. Record that so HR can fix the config.
            long systemUserId;
            try { systemUserId = await _systemUserResolver.GetSystemUserIdAsync(); }
            catch { systemUserId = triggeringUserId > 0 ? triggeringUserId : 0; }

            if (systemUserId > 0)
            {
                _context.WorkflowSystemActionAudits.Add(new WorkflowSystemActionAudit
                {
                    WorkflowInstanceId = instance.Id,
                    ActionType = WorkflowSystemActionType.FallbackRouting,
                    TriggeredAtUtc = DateTime.UtcNow,
                    SystemUserId = systemUserId,
                    Reason = resolution.Reason,
                    DetailsJson = resolution.Details != null
                        ? JsonSerializer.Serialize(resolution.Details)
                        : null
                });
            }
        }

        instance.CurrentStepId = step.Id;
        instance.Status = WorkflowStatus.InProgress;

        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = resolution.UserId.Value,
            AssignedAt = DateTime.UtcNow,
            DueAt = step.CalculateDueDate(DateTime.UtcNow),
            CreatedBy = triggeringUserId.ToString()
        };
        _context.WorkflowStepExecutions.Add(execution);
        await _context.SaveChangesAsync();

        await SendApprovalPendingNotificationAsync(instance, resolution.UserId.Value, step.Name);
        return WorkflowResult<bool>.Success(true);
    }

    private async Task RecordFailedRoutingAsync(
        WorkflowInstance instance, WorkflowStep step,
        ApproverResolution resolution, long triggeringUserId)
    {
        instance.Status = WorkflowStatus.FailedRouting;
        instance.CompletedAt = DateTime.UtcNow;
        instance.FinalOutcome = ApprovalAction.FailedNoApprover;

        long systemUserId;
        try { systemUserId = await _systemUserResolver.GetSystemUserIdAsync(); }
        catch { systemUserId = triggeringUserId > 0 ? triggeringUserId : 0; }

        instance.CompletedByUserId = systemUserId > 0 ? systemUserId : null;

        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = systemUserId > 0 ? systemUserId : triggeringUserId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenAt = DateTime.UtcNow,
            Action = ApprovalAction.FailedNoApprover,
            ActionTakenByUserId = systemUserId > 0 ? systemUserId : null,
            Comments = $"Routing failed: {resolution.Reason}",
            CreatedBy = "System"
        };
        _context.WorkflowStepExecutions.Add(execution);

        if (systemUserId > 0)
        {
            _context.WorkflowSystemActionAudits.Add(new WorkflowSystemActionAudit
            {
                WorkflowInstanceId = instance.Id,
                ActionType = WorkflowSystemActionType.FallbackRouting,
                TriggeredAtUtc = DateTime.UtcNow,
                SystemUserId = systemUserId,
                Reason = resolution.Reason,
                DetailsJson = resolution.Details != null
                    ? JsonSerializer.Serialize(resolution.Details)
                    : null
            });
        }

        await _context.SaveChangesAsync();
        await NotifyRoutingFailureAsync(instance, step, resolution);

        // Phase 1 (v14.1): also raise an OperationalFailureAlert so the HR dashboard
        // at /api/v1/operational-alerts shows this routing failure alongside lifecycle /
        // approval-execution / payroll failures. Deduplicated automatically on
        // (Category, SourceEntityType, SourceEntityId, FailureCode) when the same
        // workflow instance re-enters RecordFailedRoutingAsync (shouldn't happen, but safe).
        try
        {
            await _failureAlerts.RaiseAsync(new RaiseFailureAlertRequest
            {
                Category = OperationalFailureCategory.WorkflowRouting,
                SourceEntityType = "WorkflowInstance",
                SourceEntityId = instance.Id,
                FailureCode = "FailedRouting",
                Reason = $"Workflow {instance.Id} ({instance.EntityType} #{instance.EntityId}) could not resolve an approver at step '{step.Name}'. {resolution.Reason}",
                Severity = OperationalFailureSeverity.Error,
                IsRetryable = false, // HR must fix workflow config / role assignment first
                MetadataJson = JsonSerializer.Serialize(new
                {
                    workflowInstanceId = instance.Id,
                    workflowEntityType = instance.EntityType.ToString(),
                    workflowEntityId = instance.EntityId,
                    stepId = step.Id,
                    stepName = step.Name,
                    resolutionSource = resolution.Source.ToString(),
                    resolutionReason = resolution.Reason,
                    resolutionDetails = resolution.Details
                })
            });
        }
        catch (Exception ex)
        {
            // An alert-system failure must not mask the routing failure itself.
            _logger.LogWarning(ex,
                "Could not persist OperationalFailureAlert for FailedRouting on workflow instance {InstanceId}.",
                instance.Id);
        }
    }

    private async Task NotifyRoutingFailureAsync(WorkflowInstance instance, WorkflowStep step, ApproverResolution resolution)
    {
        try
        {
            var recipients = await _notificationRecipients.GetRecipientUserIdsAsync();
            foreach (var rid in recipients)
            {
                await _notificationService.SendNotificationAsync(new CreateNotificationRequest
                {
                    UserId = rid,
                    Type = NotificationType.RequestEscalated,
                    TitleEn = "Workflow routing failed — manual intervention required",
                    TitleAr = "فشل توجيه طلب سير العمل - يتطلب تدخلاً يدوياً",
                    MessageEn = $"Request #{instance.EntityId} ({instance.EntityType}) could not be routed to an approver at step '{step.Name}'. Reason: {resolution.Reason}",
                    MessageAr = $"تعذر توجيه الطلب #{instance.EntityId} إلى مُعتمد. السبب: {resolution.Reason}",
                    EntityType = instance.EntityType.ToString(),
                    EntityId = instance.EntityId,
                    ActionUrl = $"/workflows/instances/{instance.Id}"
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to notify HR about workflow routing failure for instance {InstanceId}", instance.Id);
        }
    }

    private async Task<WorkflowResult<bool>> ProcessConditionStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        var conditionResult = await EvaluateConditionAsync(instance, step);

        _context.WorkflowStepExecutions.Add(new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = triggeringUserId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenAt = DateTime.UtcNow,
            Action = ApprovalAction.Skipped,
            Comments = $"Condition evaluated to: {conditionResult}",
            CreatedBy = "System"
        });

        WorkflowStep? nextStep;
        if (conditionResult)
        {
            nextStep = step.OnApproveNextStepId.HasValue
                ? await _context.WorkflowSteps.FindAsync(step.OnApproveNextStepId)
                : instance.WorkflowDefinition.GetNextStep(step.StepOrder);
        }
        else
        {
            nextStep = step.OnRejectNextStepId.HasValue
                ? await _context.WorkflowSteps.FindAsync(step.OnRejectNextStepId)
                : null;
        }

        if (nextStep == null)
        {
            instance.Complete(conditionResult ? ApprovalAction.AutoApproved : ApprovalAction.AutoRejected);
            await _context.SaveChangesAsync();
            return WorkflowResult<bool>.Success(true);
        }

        await _context.SaveChangesAsync();
        return await ProcessStepAsync(instance, nextStep, triggeringUserId);
    }

    private async Task<WorkflowResult<bool>> ProcessValidationStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        // v13.6 — fail closed if the step has no ValidationRuleCode or the code isn't registered.
        var rule = _validationRegistry.Find(step.ValidationRuleCode);

        ValidationRuleResult result;
        if (rule == null)
        {
            result = new ValidationRuleResult(
                false,
                string.IsNullOrWhiteSpace(step.ValidationRuleCode)
                    ? "Validation step has no ValidationRuleCode configured (fails closed per v13.6)."
                    : $"Validation rule '{step.ValidationRuleCode}' is not registered (fails closed per v13.6).",
                new Dictionary<string, object?> { ["ruleCode"] = step.ValidationRuleCode });
        }
        else
        {
            IReadOnlyDictionary<string, object?> ctx = new Dictionary<string, object?>();
            if (!string.IsNullOrWhiteSpace(instance.ContextJson))
            {
                try
                {
                    var parsed = JsonSerializer.Deserialize<Dictionary<string, object?>>(instance.ContextJson,
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    if (parsed != null) ctx = parsed;
                }
                catch (JsonException) { /* keep empty ctx */ }
            }

            try
            {
                result = await rule.EvaluateAsync(instance, step, ctx, CancellationToken.None);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "WorkflowEngine: validation rule '{RuleCode}' threw for instance {InstanceId}. Failing closed.",
                    step.ValidationRuleCode, instance.Id);
                result = new ValidationRuleResult(false, $"Validation rule threw: {ex.Message}",
                    new Dictionary<string, object?> { ["ruleCode"] = step.ValidationRuleCode });
            }
        }

        long systemUserId;
        try { systemUserId = await _systemUserResolver.GetSystemUserIdAsync(); }
        catch { systemUserId = triggeringUserId > 0 ? triggeringUserId : 0; }

        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = systemUserId > 0 ? systemUserId : triggeringUserId,
            ActionTakenByUserId = systemUserId > 0 ? systemUserId : null,
            AssignedAt = DateTime.UtcNow,
            CreatedBy = "System"
        };
        execution.RecordValidationOutcome(
            result.Passed,
            result.Reason,
            result.Details != null ? JsonSerializer.Serialize(result.Details) : null);
        _context.WorkflowStepExecutions.Add(execution);

        if (!result.Passed)
        {
            // Return-for-correction takes precedence over AutoReject when the step is so configured.
            if (step.AllowReturnForCorrection)
            {
                instance.ReturnForCorrection(systemUserId > 0 ? systemUserId : triggeringUserId,
                    result.Reason ?? "Validation failed");
            }
            else
            {
                instance.Complete(ApprovalAction.AutoRejected,
                    result.Reason ?? "Automatic validation failed",
                    systemUserId > 0 ? systemUserId : null);
            }
            await _context.SaveChangesAsync();
            return WorkflowResult<bool>.Success(true);
        }

        var next = instance.WorkflowDefinition.GetNextStep(step.StepOrder);
        if (next == null)
        {
            instance.Complete(ApprovalAction.AutoApproved, result.Reason, systemUserId > 0 ? systemUserId : null);
            await _context.SaveChangesAsync();
            return WorkflowResult<bool>.Success(true);
        }

        await _context.SaveChangesAsync();
        return await ProcessStepAsync(instance, next, triggeringUserId);
    }

    private Task<WorkflowResult<bool>> ProcessNotificationStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        _context.WorkflowStepExecutions.Add(new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = triggeringUserId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenAt = DateTime.UtcNow,
            Action = ApprovalAction.Skipped,
            Comments = "Notification sent",
            CreatedBy = "System"
        });

        var next = instance.WorkflowDefinition.GetNextStep(step.StepOrder);
        if (next == null)
        {
            instance.Complete(ApprovalAction.Approved);
            return Task.FromResult(WorkflowResult<bool>.Success(true));
        }

        return ProcessStepAsync(instance, next, triggeringUserId);
    }

    private Task<bool> EvaluateConditionAsync(WorkflowInstance instance, WorkflowStep step)
    {
        if (string.IsNullOrEmpty(step.ConditionJson)) return Task.FromResult(true);
        try
        {
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var condition = JsonSerializer.Deserialize<WorkflowCondition>(step.ConditionJson, options);
            if (condition == null) return Task.FromResult(true);

            var context = !string.IsNullOrEmpty(instance.ContextJson)
                ? JsonSerializer.Deserialize<Dictionary<string, object>>(instance.ContextJson, options)
                : new Dictionary<string, object>();

            var fieldValue = GetValueAsString(context != null && context.ContainsKey(condition.Field)
                ? context[condition.Field] : null);
            var compareValue = GetValueAsString(condition.Value);
            return Task.FromResult(EvaluateComparison(fieldValue, condition.Operator, compareValue));
        }
        catch
        {
            return Task.FromResult(false);
        }
    }

    private static string GetValueAsString(object? value)
    {
        if (value == null) return "0";
        if (value is JsonElement el)
        {
            return el.ValueKind switch
            {
                JsonValueKind.String => el.GetString() ?? string.Empty,
                JsonValueKind.Number => el.GetRawText(),
                JsonValueKind.True => "true",
                JsonValueKind.False => "false",
                _ => el.ToString() ?? string.Empty
            };
        }
        return value.ToString() ?? "0";
    }

    private static bool EvaluateComparison(string left, string op, string right)
    {
        var ci = System.Globalization.CultureInfo.InvariantCulture;
        var ns = System.Globalization.NumberStyles.Any;
        if (decimal.TryParse(left, ns, ci, out var l) && decimal.TryParse(right, ns, ci, out var r))
        {
            return op switch
            {
                ">" => l > r, ">=" => l >= r,
                "<" => l < r, "<=" => l <= r,
                "==" => l == r, "!=" => l != r,
                _ => false
            };
        }
        return op switch
        {
            "==" => left.Equals(right, StringComparison.OrdinalIgnoreCase),
            "!=" => !left.Equals(right, StringComparison.OrdinalIgnoreCase),
            _ => false
        };
    }

    // =====================================================================
    // Notification helpers (unchanged from v13.5 except the new ReturnForCorrection one)
    // =====================================================================
    private string GetEntityTypeDisplayName(WorkflowEntityType entityType, bool ar = false) => entityType switch
    {
        WorkflowEntityType.Vacation => ar ? "طلب إجازة" : "Vacation Request",
        WorkflowEntityType.Excuse => ar ? "طلب استئذان" : "Excuse Request",
        WorkflowEntityType.RemoteWork => ar ? "طلب عمل عن بُعد" : "Remote Work Request",
        _ => ar ? "طلب" : "Request"
    };

    private string GetActionUrl(WorkflowEntityType entityType, long entityId) => entityType switch
    {
        WorkflowEntityType.Vacation => $"/vacation-requests/{entityId}",
        WorkflowEntityType.Excuse => $"/excuse-requests/{entityId}",
        WorkflowEntityType.RemoteWork => $"/remote-work-requests/{entityId}",
        _ => "/employee-dashboard"
    };

    private string GetApprovalActionUrl(WorkflowEntityType entityType, long entityId) => entityType switch
    {
        WorkflowEntityType.Vacation => $"/vacation-requests/{entityId}",
        WorkflowEntityType.Excuse => $"/excuse-requests/{entityId}",
        WorkflowEntityType.RemoteWork => $"/remote-work-requests/{entityId}",
        _ => "/pending-approvals"
    };

    private async Task SendRequestSubmittedNotificationAsync(WorkflowInstance instance, WorkflowEntityType entityType)
    {
        try
        {
            var en = GetEntityTypeDisplayName(entityType);
            var ar = GetEntityTypeDisplayName(entityType, true);
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestSubmitted,
                TitleEn = $"{en} Submitted",
                TitleAr = $"تم تقديم {ar}",
                MessageEn = $"Your {en.ToLower()} has been submitted and is pending approval.",
                MessageAr = $"تم تقديم {ar} وهو في انتظار الموافقة.",
                EntityType = entityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(entityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendRequestSubmittedNotificationAsync failed"); }
    }

    private async Task SendApprovalPendingNotificationAsync(WorkflowInstance instance, long approverId, string stepName)
    {
        try
        {
            var en = GetEntityTypeDisplayName(instance.EntityType);
            var ar = GetEntityTypeDisplayName(instance.EntityType, true);
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = approverId,
                Type = NotificationType.ApprovalPending,
                TitleEn = $"New {en} Pending Your Approval",
                TitleAr = $"{ar} جديد بانتظار موافقتك",
                MessageEn = $"A new {en.ToLower()} requires your approval at step: {stepName}.",
                MessageAr = $"يوجد {ar} جديد يتطلب موافقتك في خطوة: {stepName}.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetApprovalActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendApprovalPendingNotificationAsync failed"); }
    }

    private async Task SendRequestApprovedNotificationAsync(WorkflowInstance instance, long approvedByUserId)
    {
        try
        {
            var en = GetEntityTypeDisplayName(instance.EntityType);
            var ar = GetEntityTypeDisplayName(instance.EntityType, true);
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestApproved,
                TitleEn = $"{en} Approved",
                TitleAr = $"تمت الموافقة على {ar}",
                MessageEn = $"Your {en.ToLower()} has been approved.",
                MessageAr = $"تمت الموافقة على {ar} الخاص بك.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendRequestApprovedNotificationAsync failed"); }
    }

    private async Task SendIntermediateApprovalNotificationAsync(WorkflowInstance instance, WorkflowStep step, long _)
    {
        try
        {
            var en = GetEntityTypeDisplayName(instance.EntityType);
            var ar = GetEntityTypeDisplayName(instance.EntityType, true);
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestApproved,
                TitleEn = $"{en} Progress Update",
                TitleAr = $"تحديث حالة {ar}",
                MessageEn = $"Your {en.ToLower()} has been approved at step: {step.Name}. Pending next approval.",
                MessageAr = $"تمت الموافقة على {ar} في خطوة: {step.Name}. في انتظار الموافقة التالية.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendIntermediateApprovalNotificationAsync failed"); }
    }

    private async Task SendRequestRejectedNotificationAsync(WorkflowInstance instance, long _, string reason)
    {
        try
        {
            var en = GetEntityTypeDisplayName(instance.EntityType);
            var ar = GetEntityTypeDisplayName(instance.EntityType, true);
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestRejected,
                TitleEn = $"{en} Rejected",
                TitleAr = $"تم رفض {ar}",
                MessageEn = $"Your {en.ToLower()} has been rejected. Reason: {reason}",
                MessageAr = $"تم رفض {ar} الخاص بك. السبب: {reason}",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendRequestRejectedNotificationAsync failed"); }
    }

    private async Task SendReturnedForCorrectionNotificationAsync(WorkflowInstance instance, long returnedByUserId, string comments)
    {
        try
        {
            var en = GetEntityTypeDisplayName(instance.EntityType);
            var ar = GetEntityTypeDisplayName(instance.EntityType, true);
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestRejected, // reusing — fallback type for UI badge colour
                TitleEn = $"{en} Returned for Correction",
                TitleAr = $"تم إعادة {ar} للتصحيح",
                MessageEn = $"Your {en.ToLower()} was returned for correction. Comments: {comments}",
                MessageAr = $"تمت إعادة {ar} الخاص بك للتصحيح. الملاحظات: {comments}",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendReturnedForCorrectionNotificationAsync failed"); }
    }

    private async Task SendDelegationNotificationsAsync(WorkflowInstance instance, long delegateToUserId, long delegatedByUserId, string? comments)
    {
        try
        {
            var en = GetEntityTypeDisplayName(instance.EntityType);
            var ar = GetEntityTypeDisplayName(instance.EntityType, true);
            var delegator = await _context.Users.FindAsync(delegatedByUserId);
            var delegatorName = delegator?.Username ?? "User";

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = delegateToUserId,
                Type = NotificationType.DelegationReceived,
                TitleEn = "Approval Delegated to You",
                TitleAr = "تم تفويض موافقة إليك",
                MessageEn = $"{delegatorName} has delegated a {en.ToLower()} approval to you.",
                MessageAr = $"قام {delegatorName} بتفويض موافقة {ar} إليك.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetApprovalActionUrl(instance.EntityType, instance.EntityId)
            });

            // v13.6 — also notify the original delegator so they can track their delegated tasks.
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = delegatedByUserId,
                Type = NotificationType.RequestDelegated,
                TitleEn = "You delegated an approval",
                TitleAr = "لقد قمت بتفويض موافقة",
                MessageEn = $"You delegated a {en.ToLower()} approval. It remains visible in your delegation history.",
                MessageAr = $"قمت بتفويض موافقة {ar}. ستظل مرئية في سجل التفويض.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetApprovalActionUrl(instance.EntityType, instance.EntityId)
            });

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestDelegated,
                TitleEn = $"{en} Delegated",
                TitleAr = $"تم تفويض {ar}",
                MessageEn = $"Your {en.ToLower()} approval has been delegated to another approver.",
                MessageAr = $"تم تفويض موافقة {ar} الخاص بك إلى مُعتمد آخر.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SendDelegationNotificationsAsync failed"); }
    }
}

internal class WorkflowCondition
{
    public string Field { get; set; } = string.Empty;
    public string Operator { get; set; } = "==";
    public object? Value { get; set; }
}
