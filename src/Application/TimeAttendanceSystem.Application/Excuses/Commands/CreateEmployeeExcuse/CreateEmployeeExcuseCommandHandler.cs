using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.Excuses.Commands.CreateEmployeeExcuse;

/// <summary>
/// Command handler for creating employee excuse requests.
/// Implements comprehensive validation, policy enforcement, and attendance integration.
/// </summary>
public class CreateEmployeeExcuseCommandHandler : IRequestHandler<CreateEmployeeExcuseCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;

    public CreateEmployeeExcuseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the creation of a new employee excuse record with full validation and integration.
    /// </summary>
    /// <param name="request">Command containing excuse details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing the created excuse ID or validation errors</returns>
    public async Task<Result<long>> Handle(CreateEmployeeExcuseCommand request, CancellationToken cancellationToken)
    {
        // Validate employee exists and is active
        var employee = await _context.Employees
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

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

        // Create excuse entity
        var excuse = new EmployeeExcuse
        {
            EmployeeId = request.EmployeeId,
            ExcuseDate = request.ExcuseDate.Date,
            ExcuseType = request.ExcuseType,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Reason = request.Reason,
            AttachmentPath = request.AttachmentPath,
            AffectsSalary = request.AffectsSalary,
            ProcessingNotes = request.ProcessingNotes,
            ApprovalStatus = GetInitialApprovalStatus(request.ExcuseType, policy)
        };

        // Calculate duration using domain method
        excuse.CalculateDuration();

        // If excuse is auto-approved, set approval data to satisfy database constraints
        if (excuse.ApprovalStatus == ApprovalStatus.Approved)
        {
            excuse.ApprovedById = 1; // System auto-approval (assuming system user ID is 1)
            excuse.ApprovedAt = DateTime.UtcNow;

            // Official duties don't affect salary
            if (request.ExcuseType == ExcuseType.OfficialDuty)
            {
                excuse.AffectsSalary = false;
            }
        }
        var duration = (double)excuse.DurationHours;

        // Validate excuse business rules
        var (isValid, errors) = excuse.ValidateExcuse();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Check for overlapping excuses for the same employee on the same date
        var existingExcuses = await _context.EmployeeExcuses
            .Where(ee => ee.EmployeeId == request.EmployeeId)
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

        // If excuse is approved, update attendance records
        if (excuse.ApprovalStatus == ApprovalStatus.Approved)
        {
            await UpdateAttendanceRecordsAsync(excuse, cancellationToken);
        }

        return Result.Success(excuse.Id);
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
    /// Determines the initial approval status based on excuse type and policy.
    /// </summary>
    private static ApprovalStatus GetInitialApprovalStatus(ExcuseType excuseType, ExcusePolicy? policy)
    {
        // Official duties are typically auto-approved
        if (excuseType == ExcuseType.OfficialDuty)
            return ApprovalStatus.Approved;

        // Personal excuses follow policy requirements
        if (policy?.RequiresApproval == true)
            return ApprovalStatus.Pending;

        return ApprovalStatus.Approved;
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