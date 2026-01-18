using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Notifications;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Services;

/// <summary>
/// Implementation of the workflow engine for managing approval workflows.
/// Handles workflow lifecycle, step execution, and approval routing.
/// </summary>
public class WorkflowEngine : IWorkflowEngine
{
    private readonly IApplicationDbContext _context;
    private readonly IInAppNotificationService _notificationService;

    public WorkflowEngine(IApplicationDbContext context, IInAppNotificationService notificationService)
    {
        _context = context;
        _notificationService = notificationService;
    }

    /// <inheritdoc />
    public async Task<WorkflowResult<WorkflowInstance>> StartWorkflowAsync(
        WorkflowEntityType entityType,
        long entityId,
        long requestedByUserId,
        long? branchId = null,
        Dictionary<string, object>? contextData = null)
    {
        // Check if workflow already exists for this entity
        var existingWorkflow = await _context.WorkflowInstances
            .FirstOrDefaultAsync(wi => wi.EntityType == entityType && wi.EntityId == entityId && 
                                       (wi.Status != WorkflowStatus.Approved &&
                                        wi.Status != WorkflowStatus.Rejected &&
                                        wi.Status != WorkflowStatus.Cancelled &&
                                        wi.Status != WorkflowStatus.Expired));

        if (existingWorkflow != null)
        {
            return WorkflowResult<WorkflowInstance>.Failure($"Workflow already exists for this {entityType} (ID: {existingWorkflow.Id})");
        }

        // Get the applicable workflow definition
        var workflowDefinition = await GetApplicableWorkflowAsync(entityType, branchId);
        if (workflowDefinition == null)
        {
            return WorkflowResult<WorkflowInstance>.Failure($"No active workflow definition found for {entityType}");
        }

        // Create workflow instance
        var workflowInstance = new WorkflowInstance
        {
            WorkflowDefinitionId = workflowDefinition.Id,
            EntityType = entityType,
            EntityId = entityId,
            Status = WorkflowStatus.Pending,
            RequestedByUserId = requestedByUserId,
            RequestedAt = DateTime.UtcNow,
            ContextJson = contextData != null ? JsonSerializer.Serialize(contextData) : null,
            CreatedBy = requestedByUserId.ToString()
        };

        _context.WorkflowInstances.Add(workflowInstance);
        await _context.SaveChangesAsync();

        // Get the first step
        var firstStep = workflowDefinition.GetFirstStep();
        if (firstStep == null)
        {
            return WorkflowResult<WorkflowInstance>.Failure("Workflow definition has no steps configured");
        }

        // Process the first step
        var processResult = await ProcessStepAsync(workflowInstance, firstStep, requestedByUserId);
        if (!processResult.IsSuccess)
        {
            return WorkflowResult<WorkflowInstance>.Failure(processResult.Error ?? "Failed to process first step");
        }

        // Send notification to requester about request submission
        await SendRequestSubmittedNotificationAsync(workflowInstance, entityType);

        return WorkflowResult<WorkflowInstance>.Success(workflowInstance);
    }

    /// <inheritdoc />
    public async Task<WorkflowResult<bool>> ApproveAsync(long workflowInstanceId, long userId, string? comments = null)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null)
        {
            return WorkflowResult<bool>.Failure("Workflow instance not found");
        }

        if (instance.IsTerminated())
        {
            return WorkflowResult<bool>.Failure("Workflow has already been completed");
        }

        // Get the current pending execution for this user
        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
        {
            return WorkflowResult<bool>.Failure("You are not authorized to approve this step or no pending action found");
        }

        // Check if comments are required
        if (execution.Step.RequireCommentsOnApprove && string.IsNullOrWhiteSpace(comments))
        {
            return WorkflowResult<bool>.Failure("Comments are required for approval");
        }

        // Record the approval
        execution.Approve(userId, comments);
        await _context.SaveChangesAsync();

        // Move to next step
        var nextStep = instance.WorkflowDefinition.GetNextStep(execution.Step.StepOrder);
        if (nextStep == null)
        {
            // No more steps - workflow is approved
            instance.Complete(ApprovalAction.Approved, comments, userId);
            await _context.SaveChangesAsync();

            // Send final approval notification to requester
            await SendRequestApprovedNotificationAsync(instance, userId);

            return WorkflowResult<bool>.Success(true);
        }

        // Send intermediate approval notification to requester
        await SendIntermediateApprovalNotificationAsync(instance, execution.Step, userId);

        // Process the next step
        var processResult = await ProcessStepAsync(instance, nextStep, userId);
        return processResult.IsSuccess
            ? WorkflowResult<bool>.Success(true)
            : WorkflowResult<bool>.Failure(processResult.Error ?? "Failed to process next step");
    }

    /// <inheritdoc />
    public async Task<WorkflowResult<bool>> RejectAsync(long workflowInstanceId, long userId, string comments)
    {
        if (string.IsNullOrWhiteSpace(comments))
        {
            return WorkflowResult<bool>.Failure("Comments are required for rejection");
        }

        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null)
        {
            return WorkflowResult<bool>.Failure("Workflow instance not found");
        }

        if (instance.IsTerminated())
        {
            return WorkflowResult<bool>.Failure("Workflow has already been completed");
        }

        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
        {
            return WorkflowResult<bool>.Failure("You are not authorized to reject this step or no pending action found");
        }

        // Record the rejection
        execution.Reject(userId, comments);

        // Complete the workflow as rejected
        instance.Complete(ApprovalAction.Rejected, comments, userId);

        await _context.SaveChangesAsync();

        // Send rejection notification to requester
        await SendRequestRejectedNotificationAsync(instance, userId, comments);

        return WorkflowResult<bool>.Success(true);
    }

    /// <inheritdoc />
    public async Task<WorkflowResult<bool>> DelegateAsync(long workflowInstanceId, long userId, long delegateToUserId, string? comments = null)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null)
        {
            return WorkflowResult<bool>.Failure("Workflow instance not found");
        }

        if (instance.IsTerminated())
        {
            return WorkflowResult<bool>.Failure("Workflow has already been completed");
        }

        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        if (execution == null)
        {
            return WorkflowResult<bool>.Failure("You are not authorized to delegate this step or no pending action found");
        }

        if (!execution.Step.AllowDelegation)
        {
            return WorkflowResult<bool>.Failure("This step does not allow delegation");
        }

        if (userId == delegateToUserId)
        {
            return WorkflowResult<bool>.Failure("Cannot delegate to yourself");
        }

        // Record the delegation
        execution.Delegate(userId, delegateToUserId, comments);

        // Create new execution for the delegate
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

        // Send notifications for delegation
        await SendDelegationNotificationsAsync(instance, delegateToUserId, userId, comments);

        return WorkflowResult<bool>.Success(true);
    }

    /// <inheritdoc />
    public async Task<WorkflowResult<bool>> CancelAsync(long workflowInstanceId, long userId, string? reason = null)
    {
        var instance = await GetWorkflowInstanceWithDetailsAsync(workflowInstanceId);
        if (instance == null)
        {
            return WorkflowResult<bool>.Failure("Workflow instance not found");
        }

        if (instance.IsTerminated())
        {
            return WorkflowResult<bool>.Failure("Workflow has already been completed");
        }

        // Check if user is the requester or has admin rights (simplified check)
        if (instance.RequestedByUserId != userId)
        {
            return WorkflowResult<bool>.Failure("Only the requester can cancel this workflow");
        }

        instance.Cancel(reason, userId);
        await _context.SaveChangesAsync();

        return WorkflowResult<bool>.Success(true);
    }

    /// <inheritdoc />
    public async Task<WorkflowInstance?> GetWorkflowInstanceAsync(WorkflowEntityType entityType, long entityId)
    {
        return await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition)
            .ThenInclude(wd => wd.Steps)
            .Include(wi => wi.CurrentStep)
            .Include(wi => wi.StepExecutions)
            .ThenInclude(se => se.Step)
            .FirstOrDefaultAsync(wi => wi.EntityType == entityType && wi.EntityId == entityId);
    }

    /// <inheritdoc />
    public async Task<WorkflowStatusInfo?> GetWorkflowStatusAsync(long workflowInstanceId)
    {
        var instance = await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition)
            .ThenInclude(wd => wd.Steps)
            .Include(wi => wi.CurrentStep)
            .Include(wi => wi.StepExecutions)
            .ThenInclude(se => se.Step)
            .Include(wi => wi.StepExecutions)
            .ThenInclude(se => se.AssignedToUser)
            .Include(wi => wi.StepExecutions)
            .ThenInclude(se => se.ActionTakenByUser)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId);

        if (instance == null)
        {
            return null;
        }

        var pendingExecution = instance.StepExecutions
            .FirstOrDefault(se => se.IsPending());

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
                })
                .ToList()
        };
    }

    /// <inheritdoc />
    public async Task<List<PendingApproval>> GetPendingApprovalsAsync(long userId)
    {
        // Get direct assignments
        var directAssignments = await _context.WorkflowStepExecutions
            .Include(se => se.WorkflowInstance)
            .ThenInclude(wi => wi.RequestedByUser)
            .Include(se => se.Step)
            .Where(se => se.AssignedToUserId == userId && !se.Action.HasValue && !se.WorkflowInstance.IsDeleted)
            .ToListAsync();

        // Get delegations for this user
        var activeDelegations = await _context.ApprovalDelegations
            .Where(d => d.DelegateUserId == userId &&
                        d.IsActive &&
                        d.StartDate <= DateTime.Today &&
                        d.EndDate >= DateTime.Today)
            .ToListAsync();

        // Get assignments for users who delegated to this user
        var delegatedAssignments = new List<WorkflowStepExecution>();
        foreach (var delegation in activeDelegations)
        {
            var assignments = await _context.WorkflowStepExecutions
                .Include(se => se.WorkflowInstance)
                .ThenInclude(wi => wi.RequestedByUser)
                .Include(se => se.Step)
                .Where(se => se.AssignedToUserId == delegation.DelegatorUserId &&
                            !se.Action.HasValue &&
                            !se.WorkflowInstance.IsDeleted)
                .ToListAsync();

            // Filter by entity type if delegation is restricted
            if (!string.IsNullOrEmpty(delegation.EntityTypesJson))
            {
                var allowedTypes = delegation.GetEntityTypes();
                assignments = assignments.Where(a => allowedTypes.Contains(a.WorkflowInstance.EntityType)).ToList();
            }

            delegatedAssignments.AddRange(assignments);
        }

        var allAssignments = directAssignments.Concat(delegatedAssignments).Distinct().ToList();

        return allAssignments.Select(se => new PendingApproval
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
            AllowDelegation = se.Step.AllowDelegation
        }).ToList();
    }

    /// <inheritdoc />
    public async Task<bool> CanUserApproveAsync(long workflowInstanceId, long userId)
    {
        var execution = await GetPendingExecutionForUserAsync(workflowInstanceId, userId);
        return execution != null;
    }

    /// <inheritdoc />
    public async Task<WorkflowDefinition?> GetApplicableWorkflowAsync(WorkflowEntityType entityType, long? branchId)
    {
        // Priority: Branch-specific default > Branch-specific > Org-wide default > Org-wide highest priority

        // 1. Try branch-specific default
        if (branchId.HasValue)
        {
            var branchDefault = await _context.WorkflowDefinitions
                .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
                .FirstOrDefaultAsync(wd => wd.EntityType == entityType &&
                                          wd.BranchId == branchId &&
                                          wd.IsActive &&
                                          wd.IsDefault);
            if (branchDefault != null) return branchDefault;

            // 2. Try branch-specific highest priority
            var branchHighestPriority = await _context.WorkflowDefinitions
                .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
                .Where(wd => wd.EntityType == entityType &&
                            wd.BranchId == branchId &&
                            wd.IsActive)
                .OrderByDescending(wd => wd.Priority)
                .FirstOrDefaultAsync();
            if (branchHighestPriority != null) return branchHighestPriority;
        }

        // 3. Try org-wide default
        var orgDefault = await _context.WorkflowDefinitions
            .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
            .FirstOrDefaultAsync(wd => wd.EntityType == entityType &&
                                      wd.BranchId == null &&
                                      wd.IsActive &&
                                      wd.IsDefault);
        if (orgDefault != null) return orgDefault;

        // 4. Try org-wide highest priority
        return await _context.WorkflowDefinitions
            .Include(wd => wd.Steps.OrderBy(s => s.StepOrder))
            .Where(wd => wd.EntityType == entityType &&
                        wd.BranchId == null &&
                        wd.IsActive)
            .OrderByDescending(wd => wd.Priority)
            .FirstOrDefaultAsync();
    }

    /// <inheritdoc />
    public async Task<int> ProcessTimeoutsAsync()
    {
        var now = DateTime.UtcNow;
        var overdueExecutions = await _context.WorkflowStepExecutions
            .Include(se => se.WorkflowInstance)
                .ThenInclude(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
            .Include(se => se.Step)
            .Where(se => !se.Action.HasValue &&
                        se.DueAt.HasValue &&
                        se.DueAt < now &&
                        !se.WorkflowInstance.IsDeleted &&
                        se.WorkflowInstance.Status == WorkflowStatus.InProgress)
            .ToListAsync();

        var processedCount = 0;
        foreach (var execution in overdueExecutions)
        {
            // Mark as timed out
            execution.MarkTimedOut();

            // Process based on configured timeout action
            switch (execution.Step.TimeoutAction)
            {
                case TimeoutAction.AutoApprove:
                    // Auto-approve the step
                    execution.Action = ApprovalAction.AutoApproved;
                    execution.ActionTakenAt = DateTime.UtcNow;
                    execution.Comments = "Automatically approved due to timeout";

                    // Move to next step or complete workflow
                    var nextStepAfterApprove = execution.WorkflowInstance.WorkflowDefinition.GetNextStep(execution.Step.StepOrder);
                    if (nextStepAfterApprove == null)
                    {
                        // No more steps - workflow is approved
                        execution.WorkflowInstance.Complete(ApprovalAction.AutoApproved, "Automatically approved due to timeout");
                    }
                    else
                    {
                        // Process next step
                        await ProcessStepAsync(execution.WorkflowInstance, nextStepAfterApprove, 0);
                    }
                    break;

                case TimeoutAction.AutoReject:
                    // Auto-reject the step and complete workflow as rejected
                    execution.Action = ApprovalAction.AutoRejected;
                    execution.ActionTakenAt = DateTime.UtcNow;
                    execution.Comments = "Automatically rejected due to timeout";
                    execution.WorkflowInstance.Complete(ApprovalAction.AutoRejected, "Automatically rejected due to timeout");
                    break;

                case TimeoutAction.Escalate:
                    // Escalate to configured step
                    if (execution.Step.EscalationStepId.HasValue)
                    {
                        var escalationStep = await _context.WorkflowSteps.FindAsync(execution.Step.EscalationStepId);
                        if (escalationStep != null)
                        {
                            await ProcessStepAsync(execution.WorkflowInstance, escalationStep, 0);
                        }
                        else
                        {
                            // Escalation step not found - expire workflow
                            execution.WorkflowInstance.Status = WorkflowStatus.Expired;
                        }
                    }
                    else
                    {
                        // No escalation step configured - expire workflow
                        execution.WorkflowInstance.Status = WorkflowStatus.Expired;
                    }
                    break;

                case TimeoutAction.Expire:
                default:
                    // Default behavior: mark workflow as expired
                    execution.WorkflowInstance.Status = WorkflowStatus.Expired;
                    break;
            }

            processedCount++;
        }

        if (processedCount > 0)
        {
            await _context.SaveChangesAsync();
        }

        return processedCount;
    }

    #region Private Helper Methods

    private async Task<WorkflowInstance?> GetWorkflowInstanceWithDetailsAsync(long workflowInstanceId)
    {
        return await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition)
            .ThenInclude(wd => wd.Steps)
            .Include(wi => wi.CurrentStep)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId);
    }

    private async Task<WorkflowStepExecution?> GetPendingExecutionForUserAsync(long workflowInstanceId, long userId)
    {
        // Direct assignment
        var directExecution = await _context.WorkflowStepExecutions
            .Include(se => se.Step)
            .FirstOrDefaultAsync(se => se.WorkflowInstanceId == workflowInstanceId &&
                                       se.AssignedToUserId == userId &&
                                       !se.Action.HasValue);

        if (directExecution != null) return directExecution;

        // Check for delegations
        var instance = await _context.WorkflowInstances.FindAsync(workflowInstanceId);
        if (instance == null) return null;

        var activeDelegations = await _context.ApprovalDelegations
            .Where(d => d.DelegateUserId == userId &&
                        d.IsActive &&
                        d.StartDate <= DateTime.Today &&
                        d.EndDate >= DateTime.Today)
            .ToListAsync();

        foreach (var delegation in activeDelegations)
        {
            // Check if this delegation covers the entity type
            if (!delegation.AppliesToEntityType(instance.EntityType))
                continue;

            var delegatedExecution = await _context.WorkflowStepExecutions
                .Include(se => se.Step)
                .FirstOrDefaultAsync(se => se.WorkflowInstanceId == workflowInstanceId &&
                                           se.AssignedToUserId == delegation.DelegatorUserId &&
                                           !se.Action.HasValue);

            if (delegatedExecution != null) return delegatedExecution;
        }

        return null;
    }

    private async Task<WorkflowResult<bool>> ProcessStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        switch (step.StepType)
        {
            case WorkflowStepType.Approval:
                return await ProcessApprovalStepAsync(instance, step, triggeringUserId);

            case WorkflowStepType.Condition:
                return await ProcessConditionStepAsync(instance, step, triggeringUserId);

            case WorkflowStepType.Validation:
                return await ProcessValidationStepAsync(instance, step, triggeringUserId);

            case WorkflowStepType.Notification:
                return await ProcessNotificationStepAsync(instance, step, triggeringUserId);

            default:
                return WorkflowResult<bool>.Failure($"Unknown step type: {step.StepType}");
        }
    }

    private async Task<WorkflowResult<bool>> ProcessApprovalStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        // Determine the approver
        var approverId = await DetermineApproverAsync(instance, step);
        if (!approverId.HasValue)
        {
            return WorkflowResult<bool>.Failure($"Could not determine approver for step: {step.Name}");
        }

        // Update instance current step
        instance.CurrentStepId = step.Id;
        instance.Status = WorkflowStatus.InProgress;

        // Create step execution
        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = approverId.Value,
            AssignedAt = DateTime.UtcNow,
            DueAt = step.CalculateDueDate(DateTime.UtcNow),
            CreatedBy = triggeringUserId.ToString()
        };

        _context.WorkflowStepExecutions.Add(execution);
        await _context.SaveChangesAsync();

        // Send notification to the approver about pending approval
        await SendApprovalPendingNotificationAsync(instance, approverId.Value, step.Name);

        return WorkflowResult<bool>.Success(true);
    }

    private async Task<WorkflowResult<bool>> ProcessConditionStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        // Evaluate condition and determine next step
        var conditionResult = await EvaluateConditionAsync(instance, step);

        // Record the conditional step
        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = triggeringUserId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenAt = DateTime.UtcNow,
            Action = ApprovalAction.Skipped,
            Comments = $"Condition evaluated to: {conditionResult}",
            CreatedBy = "System"
        };
        _context.WorkflowStepExecutions.Add(execution);

        // Move to next step based on condition
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
            // No next step - complete workflow based on condition
            instance.Complete(conditionResult ? ApprovalAction.AutoApproved : ApprovalAction.AutoRejected);
            await _context.SaveChangesAsync();
            return WorkflowResult<bool>.Success(true);
        }

        await _context.SaveChangesAsync();
        return await ProcessStepAsync(instance, nextStep, triggeringUserId);
    }

    private async Task<WorkflowResult<bool>> ProcessValidationStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        // Perform automatic validation
        var validationResult = await PerformValidationAsync(instance, step);

        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = triggeringUserId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenAt = DateTime.UtcNow,
            Action = validationResult ? ApprovalAction.AutoApproved : ApprovalAction.AutoRejected,
            Comments = validationResult ? "Validation passed" : "Validation failed",
            CreatedBy = "System"
        };
        _context.WorkflowStepExecutions.Add(execution);

        if (!validationResult)
        {
            instance.Complete(ApprovalAction.AutoRejected, "Automatic validation failed");
            await _context.SaveChangesAsync();
            return WorkflowResult<bool>.Success(true);
        }

        // Move to next step
        var nextStep = instance.WorkflowDefinition.GetNextStep(step.StepOrder);
        if (nextStep == null)
        {
            instance.Complete(ApprovalAction.AutoApproved);
            await _context.SaveChangesAsync();
            return WorkflowResult<bool>.Success(true);
        }

        await _context.SaveChangesAsync();
        return await ProcessStepAsync(instance, nextStep, triggeringUserId);
    }

    private Task<WorkflowResult<bool>> ProcessNotificationStepAsync(WorkflowInstance instance, WorkflowStep step, long triggeringUserId)
    {
        // Notification steps don't block workflow - just record and continue
        // In a full implementation, this would trigger notification sending

        var execution = new WorkflowStepExecution
        {
            WorkflowInstanceId = instance.Id,
            StepId = step.Id,
            AssignedToUserId = triggeringUserId,
            AssignedAt = DateTime.UtcNow,
            ActionTakenAt = DateTime.UtcNow,
            Action = ApprovalAction.Skipped,
            Comments = "Notification sent",
            CreatedBy = "System"
        };
        _context.WorkflowStepExecutions.Add(execution);

        // Move to next step
        var nextStep = instance.WorkflowDefinition.GetNextStep(step.StepOrder);
        if (nextStep == null)
        {
            instance.Complete(ApprovalAction.Approved);
            return Task.FromResult(WorkflowResult<bool>.Success(true));
        }

        return ProcessStepAsync(instance, nextStep, triggeringUserId);
    }

    private async Task<long?> DetermineApproverAsync(WorkflowInstance instance, WorkflowStep step)
    {
        switch (step.ApproverType)
        {
            case ApproverType.SpecificUser:
                return step.ApproverUserId;

            case ApproverType.DirectManager:
                // Get the requesting user's employee record and their manager via EmployeeUserLink
                var employeeLink = await _context.EmployeeUserLinks
                    .Include(eul => eul.Employee)
                        .ThenInclude(e => e.Manager)
                    .FirstOrDefaultAsync(eul => eul.UserId == instance.RequestedByUserId);

                if (employeeLink?.Employee?.ManagerEmployeeId == null)
                    return null;

                // Get the manager's user ID through their EmployeeUserLink
                var managerLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.EmployeeId == employeeLink.Employee.ManagerEmployeeId);
                return managerLink?.UserId;

            case ApproverType.DepartmentHead:
                // Get department head via EmployeeUserLink
                var empLink = await _context.EmployeeUserLinks
                    .Include(eul => eul.Employee)
                        .ThenInclude(e => e.Department)
                    .FirstOrDefaultAsync(eul => eul.UserId == instance.RequestedByUserId);

                if (empLink?.Employee?.Department == null)
                    return null;

                // Find a department head (typically manager with same department)
                // This is a simplified approach - in real systems, departments might have explicit head assignments
                var deptHead = await _context.Employees
                    .Where(e => e.DepartmentId == empLink.Employee.DepartmentId && e.IsActive && e.ManagerEmployeeId == null)
                    .FirstOrDefaultAsync();

                if (deptHead == null)
                    return null;

                var deptHeadLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.EmployeeId == deptHead.Id);
                return deptHeadLink?.UserId;

            case ApproverType.Role:
                // Get any user with the specified role
                if (!step.ApproverRoleId.HasValue) return null;
                var userWithRole = await _context.UserRoles
                    .Include(ur => ur.User)
                    .Where(ur => ur.RoleId == step.ApproverRoleId && ur.User.IsActive)
                    .Select(ur => ur.UserId)
                    .FirstOrDefaultAsync();
                return userWithRole > 0 ? userWithRole : null;

            case ApproverType.System:
                return 0; // System actions don't need a human approver

            default:
                return null;
        }
    }

    private Task<bool> EvaluateConditionAsync(WorkflowInstance instance, WorkflowStep step)
    {
        // Parse and evaluate the condition JSON
        // Format: {"field": "days", "operator": ">", "value": 5}

        if (string.IsNullOrEmpty(step.ConditionJson))
        {
            return Task.FromResult(true);
        }

        try
        {
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var condition = JsonSerializer.Deserialize<WorkflowCondition>(step.ConditionJson, options);
            if (condition == null) return Task.FromResult(true);

            // Get context data
            var contextData = !string.IsNullOrEmpty(instance.ContextJson)
                ? JsonSerializer.Deserialize<Dictionary<string, object>>(instance.ContextJson, options)
                : new Dictionary<string, object>();

            var fieldValue = GetValueAsString(contextData.ContainsKey(condition.Field) ? contextData[condition.Field] : null);
            var compareValue = GetValueAsString(condition.Value);

             // Debug logging
            // Console.WriteLine($"Eval: {fieldValue} {condition.Operator} {compareValue}");

            return Task.FromResult(EvaluateComparison(fieldValue, condition.Operator, compareValue));
        }
        catch
        {
            return Task.FromResult(false); // Default to false on error for safety
        }
    }

    private string GetValueAsString(object? value)
    {
        if (value == null) return "0";
        
        if (value is JsonElement element)
        {
            return element.ValueKind switch
            {
                JsonValueKind.String => element.GetString() ?? string.Empty,
                JsonValueKind.Number => element.GetRawText(),
                JsonValueKind.True => "true",
                JsonValueKind.False => "false",
                _ => element.ToString() ?? string.Empty
            };
        }

        return value.ToString() ?? "0";
    }

    private bool EvaluateComparison(string leftValue, string op, string rightValue)
    {
        // Try numeric comparison first
        if (decimal.TryParse(leftValue, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out var left) && 
            decimal.TryParse(rightValue, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out var right))
        {
            return op switch
            {
                ">" => left > right,
                ">=" => left >= right,
                "<" => left < right,
                "<=" => left <= right,
                "==" => left == right,
                "!=" => left != right,
                _ => false 
            };
        }

        // String comparison fallback
        return op switch
        {
            "==" => leftValue.Equals(rightValue, StringComparison.OrdinalIgnoreCase),
            "!=" => !leftValue.Equals(rightValue, StringComparison.OrdinalIgnoreCase),
             _ => false // Default to false if operator not supported for strings (e.g. >)
        };
    }

    private Task<bool> PerformValidationAsync(WorkflowInstance instance, WorkflowStep step)
    {
        // In a full implementation, this would check business rules
        // For now, always pass validation
        return Task.FromResult(true);
    }

    #endregion

    #region Notification Helper Methods

    private string GetEntityTypeDisplayName(WorkflowEntityType entityType, bool isArabic = false)
    {
        return entityType switch
        {
            WorkflowEntityType.Vacation => isArabic ? "طلب إجازة" : "Vacation Request",
            WorkflowEntityType.Excuse => isArabic ? "طلب استئذان" : "Excuse Request",
            WorkflowEntityType.RemoteWork => isArabic ? "طلب عمل عن بُعد" : "Remote Work Request",
            _ => isArabic ? "طلب" : "Request"
        };
    }

    private string GetActionUrl(WorkflowEntityType entityType, long entityId)
    {
        return entityType switch
        {
            WorkflowEntityType.Vacation => $"/vacation-requests/{entityId}",
            WorkflowEntityType.Excuse => $"/excuse-requests/{entityId}",
            WorkflowEntityType.RemoteWork => $"/remote-work-requests/{entityId}",
            _ => $"/employee-dashboard"
        };
    }

    private async Task SendRequestSubmittedNotificationAsync(WorkflowInstance instance, WorkflowEntityType entityType)
    {
        try
        {
            var entityNameEn = GetEntityTypeDisplayName(entityType, false);
            var entityNameAr = GetEntityTypeDisplayName(entityType, true);

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestSubmitted,
                TitleEn = $"{entityNameEn} Submitted",
                TitleAr = $"تم تقديم {entityNameAr}",
                MessageEn = $"Your {entityNameEn.ToLower()} has been submitted and is pending approval.",
                MessageAr = $"تم تقديم {entityNameAr} وهو في انتظار الموافقة.",
                EntityType = entityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(entityType, instance.EntityId)
            });
        }
        catch
        {
            // Don't fail the workflow if notification fails
        }
    }

    private async Task SendApprovalPendingNotificationAsync(WorkflowInstance instance, long approverId, string stepName)
    {
        try
        {
            var entityNameEn = GetEntityTypeDisplayName(instance.EntityType, false);
            var entityNameAr = GetEntityTypeDisplayName(instance.EntityType, true);

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = approverId,
                Type = NotificationType.ApprovalPending,
                TitleEn = $"New {entityNameEn} Pending Your Approval",
                TitleAr = $"{entityNameAr} جديد بانتظار موافقتك",
                MessageEn = $"A new {entityNameEn.ToLower()} requires your approval at step: {stepName}.",
                MessageAr = $"يوجد {entityNameAr} جديد يتطلب موافقتك في خطوة: {stepName}.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetApprovalActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch
        {
            // Don't fail the workflow if notification fails
        }
    }

    private string GetApprovalActionUrl(WorkflowEntityType entityType, long entityId)
    {
        // For manager approval actions, navigate directly to the entity detail page
        return entityType switch
        {
            WorkflowEntityType.Vacation => $"/vacation-requests/{entityId}",
            WorkflowEntityType.Excuse => $"/excuse-requests/{entityId}",
            WorkflowEntityType.RemoteWork => $"/remote-work-requests/{entityId}",
            _ => $"/pending-approvals"
        };
    }

    private async Task SendRequestApprovedNotificationAsync(WorkflowInstance instance, long approvedByUserId)
    {
        try
        {
            var entityNameEn = GetEntityTypeDisplayName(instance.EntityType, false);
            var entityNameAr = GetEntityTypeDisplayName(instance.EntityType, true);

            // Get approver name for the message
            var approver = await _context.Users.FindAsync(approvedByUserId);
            var approverName = approver?.Username ?? "Approver";

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestApproved,
                TitleEn = $"{entityNameEn} Approved",
                TitleAr = $"تمت الموافقة على {entityNameAr}",
                MessageEn = $"Your {entityNameEn.ToLower()} has been approved.",
                MessageAr = $"تمت الموافقة على {entityNameAr} الخاص بك.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch
        {
            // Don't fail the workflow if notification fails
        }
    }

    private async Task SendIntermediateApprovalNotificationAsync(WorkflowInstance instance, WorkflowStep step, long approvedByUserId)
    {
        try
        {
            var entityNameEn = GetEntityTypeDisplayName(instance.EntityType, false);
            var entityNameAr = GetEntityTypeDisplayName(instance.EntityType, true);

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestApproved,
                TitleEn = $"{entityNameEn} Progress Update",
                TitleAr = $"تحديث حالة {entityNameAr}",
                MessageEn = $"Your {entityNameEn.ToLower()} has been approved at step: {step.Name}. Pending next approval.",
                MessageAr = $"تمت الموافقة على {entityNameAr} في خطوة: {step.Name}. في انتظار الموافقة التالية.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch
        {
            // Don't fail the workflow if notification fails
        }
    }

    private async Task SendRequestRejectedNotificationAsync(WorkflowInstance instance, long rejectedByUserId, string rejectionReason)
    {
        try
        {
            var entityNameEn = GetEntityTypeDisplayName(instance.EntityType, false);
            var entityNameAr = GetEntityTypeDisplayName(instance.EntityType, true);

            // Get rejector name for the message
            var rejector = await _context.Users.FindAsync(rejectedByUserId);
            var rejectorName = rejector?.Username ?? "Approver";

            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestRejected,
                TitleEn = $"{entityNameEn} Rejected",
                TitleAr = $"تم رفض {entityNameAr}",
                MessageEn = $"Your {entityNameEn.ToLower()} has been rejected. Reason: {rejectionReason}",
                MessageAr = $"تم رفض {entityNameAr} الخاص بك. السبب: {rejectionReason}",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch
        {
            // Don't fail the workflow if notification fails
        }
    }

    private async Task SendDelegationNotificationsAsync(WorkflowInstance instance, long delegateToUserId, long delegatedByUserId, string? comments)
    {
        try
        {
            var entityNameEn = GetEntityTypeDisplayName(instance.EntityType, false);
            var entityNameAr = GetEntityTypeDisplayName(instance.EntityType, true);

            // Get delegator name
            var delegator = await _context.Users.FindAsync(delegatedByUserId);
            var delegatorName = delegator?.Username ?? "User";

            // Notify the new delegate about the delegation
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = delegateToUserId,
                Type = NotificationType.DelegationReceived,
                TitleEn = $"Approval Delegated to You",
                TitleAr = $"تم تفويض موافقة إليك",
                MessageEn = $"{delegatorName} has delegated a {entityNameEn.ToLower()} approval to you.",
                MessageAr = $"قام {delegatorName} بتفويض موافقة {entityNameAr} إليك.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetApprovalActionUrl(instance.EntityType, instance.EntityId)
            });

            // Notify the requester about the delegation
            await _notificationService.SendNotificationAsync(new CreateNotificationRequest
            {
                UserId = instance.RequestedByUserId,
                Type = NotificationType.RequestDelegated,
                TitleEn = $"{entityNameEn} Delegated",
                TitleAr = $"تم تفويض {entityNameAr}",
                MessageEn = $"Your {entityNameEn.ToLower()} approval has been delegated to another approver.",
                MessageAr = $"تم تفويض موافقة {entityNameAr} الخاص بك إلى مُعتمد آخر.",
                EntityType = instance.EntityType.ToString(),
                EntityId = instance.EntityId,
                ActionUrl = GetActionUrl(instance.EntityType, instance.EntityId)
            });
        }
        catch
        {
            // Don't fail the workflow if notification fails
        }
    }

    #endregion
}

/// <summary>
/// Condition definition for workflow step evaluation.
/// </summary>
internal class WorkflowCondition
{
    public string Field { get; set; } = string.Empty;
    public string Operator { get; set; } = "==";
    public object? Value { get; set; }
}
