using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Excuses.Commands.CreateEmployeeExcuse;

/// <summary>
/// Command handler for creating employee excuse requests.
/// Implements comprehensive validation, policy enforcement, and attendance integration.
/// </summary>
public class CreateEmployeeExcuseCommandHandler : IRequestHandler<CreateEmployeeExcuseCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;
    private readonly IWorkflowEngine _workflowEngine;
    private readonly ICurrentUser _currentUser;

    public CreateEmployeeExcuseCommandHandler(
        IApplicationDbContext context,
        IWorkflowEngine workflowEngine,
        ICurrentUser currentUser)
    {
        _context = context;
        _workflowEngine = workflowEngine;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Handles the creation of a new employee excuse record with full validation and integration.
    /// </summary>
    /// <param name="request">Command containing excuse details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing the created excuse ID or validation errors</returns>
    public async Task<Result<long>> Handle(CreateEmployeeExcuseCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = _currentUser.UserId ?? 0;
        var isOnBehalfOf = request.OnBehalfOfEmployeeId.HasValue;
        var targetEmployeeId = request.EmployeeId;

        // If submitting on behalf of another employee, validate manager chain
        if (isOnBehalfOf)
        {
            var isInChain = await IsInManagementChainAsync(currentUserId, request.OnBehalfOfEmployeeId!.Value, cancellationToken);
            if (!isInChain)
            {
                return Result.Failure<long>("You can only submit requests on behalf of employees in your management chain");
            }
            targetEmployeeId = request.OnBehalfOfEmployeeId.Value;
        }

        // Validate employee exists and is active
        var employee = await _context.Employees
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == targetEmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<long>("Employee not found");
        }

        // Get applicable excuse policy (branch-specific or organization-wide) - only for personal excuses
        ExcusePolicy? policy = null;
        if (request.ExcuseType == ExcuseType.PersonalExcuse)
        {
            policy = await GetApplicablePolicyAsync(employee.BranchId, cancellationToken);

            // Check if there is an active excuse policy defined in the system (only required for personal excuses)
            if (policy == null)
            {
                return Result.Failure<long>("No active excuse policy is currently defined in the system. Please contact your administrator to configure excuse policies before creating personal excuse requests.");
            }
        }

        // Create excuse entity - ALWAYS pending workflow approval
        var excuse = new EmployeeExcuse
        {
            EmployeeId = targetEmployeeId,
            ExcuseDate = request.ExcuseDate.Date,
            ExcuseType = request.ExcuseType,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Reason = request.Reason,
            AttachmentPath = request.AttachmentPath,
            AffectsSalary = request.AffectsSalary,
            ProcessingNotes = isOnBehalfOf
                ? $"{request.ProcessingNotes}\n[Submitted on behalf by user ID: {currentUserId}]"
                : request.ProcessingNotes,
            ApprovalStatus = ApprovalStatus.Pending, // Pending workflow approval
            SubmittedByUserId = currentUserId
        };

        // Calculate duration using domain method
        excuse.CalculateDuration();
        var duration = (double)excuse.DurationHours;

        // Validate excuse business rules
        var (isValid, errors) = excuse.ValidateExcuse();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Check for overlapping excuses for the same employee on the same date
        var existingExcuses = await _context.EmployeeExcuses
            .Where(ee => ee.EmployeeId == targetEmployeeId)
            .Where(ee => ee.ExcuseDate == request.ExcuseDate.Date)
            .Where(ee => ee.ApprovalStatus != ApprovalStatus.Rejected)
            .Select(ee => new { ee.StartTime, ee.EndTime })
            .ToListAsync(cancellationToken);

        var hasOverlap = existingExcuses.Any(ee =>
            ee.StartTime < request.EndTime && ee.EndTime > request.StartTime);

        if (hasOverlap)
        {
            return Result.Failure<long>("Excuse time overlaps with existing excuse on the same date");
        }

        // For personal excuses, validate against policy limits
        if (request.ExcuseType == ExcuseType.PersonalExcuse && policy != null)
        {
            var policyValidation = await ValidateAgainstPolicyAsync(request, policy, duration, cancellationToken);
            if (!policyValidation.IsSuccess)
            {
                return policyValidation;
            }
        }

        // Check retroactive limits (only for personal excuses with policy)
        if (request.ExcuseType == ExcuseType.PersonalExcuse && policy != null)
        {
            var daysDiff = (DateTime.Today - request.ExcuseDate.Date).Days;
            if (daysDiff > policy.MaxRetroactiveDays)
            {
                return Result.Failure<long>($"Cannot create excuse more than {policy.MaxRetroactiveDays} days in the past");
            }
        }

        // Add excuse to context
        _context.EmployeeExcuses.Add(excuse);

        // Save changes to get the excuse ID
        await _context.SaveChangesAsync(cancellationToken);

        // Start workflow for approval
        var contextData = new Dictionary<string, object>
        {
            { "durationHours", excuse.DurationHours },
            { "excuseDate", excuse.ExcuseDate.ToString("yyyy-MM-dd") },
            { "excuseType", excuse.ExcuseType.ToString() },
            { "startTime", excuse.StartTime.ToString() },
            { "endTime", excuse.EndTime.ToString() }
        };

        var workflowResult = await _workflowEngine.StartWorkflowAsync(
            WorkflowEntityType.Excuse,
            excuse.Id,
            currentUserId,
            employee.BranchId,
            contextData);

        if (!workflowResult.IsSuccess)
        {
            // Workflow start failed - delete the excuse and return error
            _context.EmployeeExcuses.Remove(excuse);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Failure<long>($"Failed to start approval workflow: {workflowResult.Error}");
        }

        // Update excuse with workflow instance ID
        excuse.WorkflowInstanceId = workflowResult.Value.Id;
        await _context.SaveChangesAsync(cancellationToken);

        // Auto-approve manager's step if submitted on behalf and manager is assigned to current step
        if (isOnBehalfOf && workflowResult.Value.Id > 0)
        {
            var canApprove = await _workflowEngine.CanUserApproveAsync(workflowResult.Value.Id, currentUserId);
            if (canApprove)
            {
                await _workflowEngine.ApproveAsync(
                    workflowResult.Value.Id,
                    currentUserId,
                    "Auto-approved: Request submitted by manager on behalf of employee");
            }
        }

        return Result.Success(excuse.Id);
    }

    /// <summary>
    /// Checks if the current user is in the employee's management chain (recursive).
    /// </summary>
    /// <param name="userId">User ID of the potential manager</param>
    /// <param name="employeeId">Employee ID to check</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if user is in the management chain</returns>
    private async Task<bool> IsInManagementChainAsync(long userId, long employeeId, CancellationToken cancellationToken)
    {
        // Get the employee link for the current user
        var userEmployeeLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == userId, cancellationToken);

        if (userEmployeeLink == null)
            return false;

        var managerEmployeeId = userEmployeeLink.EmployeeId;

        // Get the target employee
        var currentEmployee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

        // Traverse up the management chain
        while (currentEmployee != null)
        {
            if (currentEmployee.ManagerEmployeeId == managerEmployeeId)
                return true;

            if (!currentEmployee.ManagerEmployeeId.HasValue)
                break;

            currentEmployee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == currentEmployee.ManagerEmployeeId, cancellationToken);
        }

        return false;
    }

    /// <summary>
    /// Gets the applicable excuse policy for the employee's branch.
    /// </summary>
    private async Task<ExcusePolicy?> GetApplicablePolicyAsync(long? branchId, CancellationToken cancellationToken)
    {
        // First try to get branch-specific policy
        if (branchId.HasValue)
        {
            var branchPolicy = await _context.ExcusePolicies
                .Where(ep => ep.BranchId == branchId && ep.IsActive)
                .FirstOrDefaultAsync(cancellationToken);

            if (branchPolicy != null)
                return branchPolicy;
        }

        // Fall back to organization-wide policy
        return await _context.ExcusePolicies
            .Where(ep => ep.BranchId == null && ep.IsActive)
            .FirstOrDefaultAsync(cancellationToken);
    }

    /// <summary>
    /// Validates personal excuse against policy limits.
    /// </summary>
    private async Task<Result<long>> ValidateAgainstPolicyAsync(
        CreateEmployeeExcuseCommand request,
        ExcusePolicy policy,
        double duration,
        CancellationToken cancellationToken)
    {
        // Check minimum duration
        if (duration < (double)policy.MinimumExcuseDuration)
        {
            return Result.Failure<long>($"Excuse duration must be at least {policy.MinimumExcuseDuration} hours");
        }

        // Check maximum hours per excuse
        if (duration > (double)policy.MaxHoursPerExcuse)
        {
            return Result.Failure<long>($"Excuse duration cannot exceed {policy.MaxHoursPerExcuse} hours");
        }

        // Check daily limits
        var dailyHours = await _context.EmployeeExcuses
            .Where(ee => ee.EmployeeId == request.EmployeeId)
            .Where(ee => ee.ExcuseDate == request.ExcuseDate.Date)
            .Where(ee => ee.ExcuseType == ExcuseType.PersonalExcuse)
            .Where(ee => ee.ApprovalStatus != ApprovalStatus.Rejected)
            .SumAsync(ee => ee.DurationHours, cancellationToken);

        if (dailyHours + (decimal)duration > policy.MaxPersonalExcuseHoursPerDay)
        {
            return Result.Failure<long>($"Daily personal excuse limit of {policy.MaxPersonalExcuseHoursPerDay} hours would be exceeded");
        }

        // Check monthly limits
        var monthStart = new DateTime(request.ExcuseDate.Year, request.ExcuseDate.Month, 1);
        var monthEnd = monthStart.AddMonths(1).AddDays(-1);

        var monthlyExcuses = await _context.EmployeeExcuses
            .Where(ee => ee.EmployeeId == request.EmployeeId)
            .Where(ee => ee.ExcuseDate >= monthStart && ee.ExcuseDate <= monthEnd)
            .Where(ee => ee.ExcuseType == ExcuseType.PersonalExcuse)
            .Where(ee => ee.ApprovalStatus != ApprovalStatus.Rejected)
            .ToListAsync(cancellationToken);

        var monthlyCount = monthlyExcuses.Count;
        var monthlyHours = monthlyExcuses.Sum(ee => ee.DurationHours);

        if (monthlyCount >= policy.MaxPersonalExcusesPerMonth)
        {
            return Result.Failure<long>($"Monthly personal excuse limit of {policy.MaxPersonalExcusesPerMonth} excuses would be exceeded");
        }

        if (monthlyHours + (decimal)duration > policy.MaxPersonalExcuseHoursPerMonth)
        {
            return Result.Failure<long>($"Monthly personal excuse hours limit of {policy.MaxPersonalExcuseHoursPerMonth} hours would be exceeded");
        }

        return Result.Success(0L);
    }

    /// <summary>
    /// Updates attendance records for the excuse period when excuse is approved.
    /// </summary>
    private async Task UpdateAttendanceRecordsAsync(EmployeeExcuse excuse, CancellationToken cancellationToken)
    {
        // Find existing attendance record for the date
        var attendanceRecord = await _context.AttendanceRecords
            .FirstOrDefaultAsync(ar => ar.EmployeeId == excuse.EmployeeId &&
                                     ar.AttendanceDate.Date == excuse.ExcuseDate.Date,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Update attendance status based on excuse type
            var newStatus = excuse.ExcuseType == ExcuseType.OfficialDuty
                ? AttendanceStatus.OnDuty
                : AttendanceStatus.Excused;

            attendanceRecord.Status = newStatus;
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}