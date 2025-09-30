using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcuseStatistics;

/// <summary>
/// Query handler for retrieving employee excuse usage statistics.
/// Calculates comprehensive statistics for the specified period.
/// </summary>
public class GetExcuseStatisticsQueryHandler : IRequestHandler<GetExcuseStatisticsQuery, Result<ExcuseStatisticsDto>>
{
    private readonly IApplicationDbContext _context;

    public GetExcuseStatisticsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval and calculation of excuse usage statistics.
    /// </summary>
    /// <param name="request">Query containing employee ID and period parameters</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing comprehensive excuse usage statistics</returns>
    public async Task<Result<ExcuseStatisticsDto>> Handle(GetExcuseStatisticsQuery request, CancellationToken cancellationToken)
    {
        // Validate employee exists
        var employee = await _context.Employees
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<ExcuseStatisticsDto>("Employee not found");
        }

        // Get applicable excuse policy for limits calculation
        var policy = await _context.ExcusePolicies
            .Where(ep => ep.IsActive && (ep.BranchId == employee.BranchId || ep.BranchId == null))
            .OrderBy(ep => ep.BranchId.HasValue ? 0 : 1) // Prefer branch-specific over organization-wide
            .FirstOrDefaultAsync(cancellationToken);

        // Calculate date range
        DateTime startDate, endDate;
        if (request.Month.HasValue)
        {
            // Month-specific statistics
            startDate = new DateTime(request.Year, request.Month.Value, 1);
            endDate = startDate.AddMonths(1).AddDays(-1);
        }
        else
        {
            // Year-specific statistics
            startDate = new DateTime(request.Year, 1, 1);
            endDate = new DateTime(request.Year, 12, 31);
        }

        // Get all excuses for the period
        var excuses = await _context.EmployeeExcuses
            .Where(ee => ee.EmployeeId == request.EmployeeId &&
                        ee.ExcuseDate >= startDate &&
                        ee.ExcuseDate <= endDate)
            .ToListAsync(cancellationToken);

        // Calculate statistics
        var personalExcuses = excuses.Where(e => e.ExcuseType == ExcuseType.PersonalExcuse).ToList();
        var officialDuties = excuses.Where(e => e.ExcuseType == ExcuseType.OfficialDuty).ToList();

        var approvedPersonalExcuses = personalExcuses.Where(e => e.ApprovalStatus == ApprovalStatus.Approved).ToList();
        var pendingPersonalExcuses = personalExcuses.Where(e => e.ApprovalStatus == ApprovalStatus.Pending).ToList();

        var statistics = new ExcuseStatisticsDto
        {
            TotalPersonalExcuses = personalExcuses.Count,
            TotalPersonalExcuseHours = personalExcuses.Sum(e => e.DurationHours),
            TotalOfficialDuties = officialDuties.Count,
            TotalOfficialDutyHours = officialDuties.Sum(e => e.DurationHours),
            ApprovedExcuses = excuses.Count(e => e.ApprovalStatus == ApprovalStatus.Approved),
            PendingExcuses = excuses.Count(e => e.ApprovalStatus == ApprovalStatus.Pending),
            RejectedExcuses = excuses.Count(e => e.ApprovalStatus == ApprovalStatus.Rejected)
        };

        // Calculate remaining allowances if policy exists and we're looking at monthly data
        if (policy != null && request.Month.HasValue)
        {
            // Count approved and pending personal excuses for remaining calculation
            var usedPersonalExcuses = approvedPersonalExcuses.Count + pendingPersonalExcuses.Count;
            var usedPersonalHours = approvedPersonalExcuses.Sum(e => e.DurationHours) + pendingPersonalExcuses.Sum(e => e.DurationHours);

            statistics.RemainingPersonalExcuses = Math.Max(0, policy.MaxPersonalExcusesPerMonth - usedPersonalExcuses);
            statistics.RemainingPersonalExcuseHours = Math.Max(0, policy.MaxPersonalExcuseHoursPerMonth - usedPersonalHours);
        }

        return Result.Success(statistics);
    }
}