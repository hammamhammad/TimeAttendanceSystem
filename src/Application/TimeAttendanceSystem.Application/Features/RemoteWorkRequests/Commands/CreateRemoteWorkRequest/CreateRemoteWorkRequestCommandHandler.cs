using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.CreateRemoteWorkRequest;

/// <summary>
/// Handler for creating remote work requests for employees.
/// </summary>
public class CreateRemoteWorkRequestCommandHandler : IRequestHandler<CreateRemoteWorkRequestCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;

    public CreateRemoteWorkRequestCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<long>> Handle(CreateRemoteWorkRequestCommand request, CancellationToken cancellationToken)
    {
        // Validate employee exists and get employee data
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
            throw new NotFoundException("Employee not found");

        // If policy is not provided, get the active policy for the employee's branch
        long policyId;
        if (request.RemoteWorkPolicyId.HasValue)
        {
            policyId = request.RemoteWorkPolicyId.Value;
        }
        else
        {
            // First try to find branch-specific policy, then fall back to company-wide policy (BranchId is null)
            var activePolicy = await _context.RemoteWorkPolicies
                .Where(p => (p.BranchId == employee.BranchId || p.BranchId == null) && p.IsActive)
                .OrderBy(p => p.BranchId.HasValue ? 0 : 1) // Prefer branch-specific over company-wide
                .FirstOrDefaultAsync(cancellationToken);

            if (activePolicy == null)
                throw new NotFoundException($"No active remote work policy found for employee's branch");

            policyId = activePolicy.Id;
        }

        // Validate policy exists and is active
        var policy = await _context.RemoteWorkPolicies
            .FirstOrDefaultAsync(p => p.Id == policyId && p.IsActive, cancellationToken);

        if (policy == null)
            throw new NotFoundException("Active remote work policy not found");

        // Validate dates are allowed by policy (blackout periods)
        var currentDate = request.StartDate;
        while (currentDate <= request.EndDate)
        {
            if (!policy.IsDateAllowed(currentDate))
                throw new ValidationException($"Date {currentDate:yyyy-MM-dd} falls within a blackout period");
            currentDate = currentDate.AddDays(1);
        }

        // Calculate working days (excluding weekends - can be enhanced later with holidays)
        var workingDays = CalculateWorkingDays(request.StartDate, request.EndDate);

        // Check for overlapping requests
        var hasOverlap = await _context.RemoteWorkRequests
            .AnyAsync(a => a.EmployeeId == request.EmployeeId &&
                          (a.Status == RemoteWorkRequestStatus.Approved ||
                           a.Status == RemoteWorkRequestStatus.Pending) &&
                          ((request.StartDate >= a.StartDate && request.StartDate <= a.EndDate) ||
                           (request.EndDate >= a.StartDate && request.EndDate <= a.EndDate) ||
                           (request.StartDate <= a.StartDate && request.EndDate >= a.EndDate)),
                     cancellationToken);

        if (hasOverlap)
            return Result.Failure<long>("Remote work request overlaps with existing request");

        // Check quota limits
        var quotaValidation = await ValidateQuotaLimits(request.EmployeeId, request.StartDate, request.EndDate, workingDays, policy, cancellationToken);
        if (!quotaValidation.IsSuccess)
            return Result.Failure<long>(quotaValidation.Error ?? "Quota validation failed");

        // Create the request with the specified status (defaults to Approved for HR entry)
        var remoteWorkRequest = new RemoteWorkRequest
        {
            EmployeeId = request.EmployeeId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Reason = request.Reason,
            CreatedByUserId = request.CreatedByUserId,
            RemoteWorkPolicyId = policyId,
            WorkingDaysCount = workingDays,
            Status = request.Status,
            ApprovalComments = request.ApprovalComments,
            CreatedAtUtc = DateTime.UtcNow
        };

        // Set approval fields if creating with Approved or Rejected status
        if (request.Status == RemoteWorkRequestStatus.Approved || request.Status == RemoteWorkRequestStatus.Rejected)
        {
            remoteWorkRequest.ApprovedByUserId = request.CreatedByUserId;
            remoteWorkRequest.ApprovedAt = DateTime.UtcNow;
        }

        // Validate the request
        var (isValid, errors) = remoteWorkRequest.ValidateRequest();
        if (!isValid)
            return Result.Failure<long>(string.Join(", ", errors));

        _context.RemoteWorkRequests.Add(remoteWorkRequest);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<long>.Success(remoteWorkRequest.Id);
    }

    private int CalculateWorkingDays(DateOnly startDate, DateOnly endDate)
    {
        var workingDays = 0;
        var currentDate = startDate;

        while (currentDate <= endDate)
        {
            // Count weekdays (Monday to Friday)
            var dayOfWeek = currentDate.DayOfWeek;
            if (dayOfWeek != DayOfWeek.Saturday && dayOfWeek != DayOfWeek.Sunday)
            {
                workingDays++;
            }
            currentDate = currentDate.AddDays(1);
        }

        return workingDays;
    }

    private async Task<Result> ValidateQuotaLimits(long employeeId, DateOnly startDate, DateOnly endDate,
        int requestedDays, RemoteWorkPolicy policy, CancellationToken cancellationToken)
    {
        // Get approved requests for quota checking
        var existingRequests = await _context.RemoteWorkRequests
            .Where(a => a.EmployeeId == employeeId &&
                       a.Status == RemoteWorkRequestStatus.Approved)
            .ToListAsync(cancellationToken);

        // Check weekly quota
        if (policy.MaxDaysPerWeek.HasValue)
        {
            // Get week boundaries
            var weekStart = startDate.AddDays(-(int)startDate.DayOfWeek);
            var weekEnd = weekStart.AddDays(6);

            var weeklyUsed = existingRequests
                .Where(a => a.EndDate >= weekStart && a.StartDate <= weekEnd)
                .Sum(a => CountOverlappingDays(a.StartDate, a.EndDate, weekStart, weekEnd));

            if (weeklyUsed + requestedDays > policy.MaxDaysPerWeek.Value)
                return Result.Failure($"Exceeds weekly quota of {policy.MaxDaysPerWeek.Value} days");
        }

        // Check monthly quota
        if (policy.MaxDaysPerMonth.HasValue)
        {
            var monthStart = new DateOnly(startDate.Year, startDate.Month, 1);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);

            var monthlyUsed = existingRequests
                .Where(a => a.EndDate >= monthStart && a.StartDate <= monthEnd)
                .Sum(a => CountOverlappingDays(a.StartDate, a.EndDate, monthStart, monthEnd));

            if (monthlyUsed + requestedDays > policy.MaxDaysPerMonth.Value)
                return Result.Failure($"Exceeds monthly quota of {policy.MaxDaysPerMonth.Value} days");
        }

        // Check yearly quota
        if (policy.MaxDaysPerYear.HasValue)
        {
            var yearStart = new DateOnly(startDate.Year, 1, 1);
            var yearEnd = new DateOnly(startDate.Year, 12, 31);

            var yearlyUsed = existingRequests
                .Where(a => a.EndDate >= yearStart && a.StartDate <= yearEnd)
                .Sum(a => a.WorkingDaysCount);

            if (yearlyUsed + requestedDays > policy.MaxDaysPerYear.Value)
                return Result.Failure($"Exceeds yearly quota of {policy.MaxDaysPerYear.Value} days");
        }

        return Result.Success();
    }

    private int CountOverlappingDays(DateOnly start1, DateOnly end1, DateOnly start2, DateOnly end2)
    {
        var overlapStart = start1 > start2 ? start1 : start2;
        var overlapEnd = end1 < end2 ? end1 : end2;

        if (overlapStart > overlapEnd)
            return 0;

        return CalculateWorkingDays(overlapStart, overlapEnd);
    }
}