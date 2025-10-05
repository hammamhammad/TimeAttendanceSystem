using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicies;

/// <summary>
/// Handler for getting all remote work policies.
/// </summary>
public class GetRemoteWorkPoliciesQueryHandler : IRequestHandler<GetRemoteWorkPoliciesQuery, List<RemoteWorkPolicyDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRemoteWorkPoliciesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<RemoteWorkPolicyDto>> Handle(GetRemoteWorkPoliciesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.RemoteWorkPolicies
            .Include(p => p.Branch)
            .AsQueryable();

        if (request.BranchId.HasValue)
            query = query.Where(p => p.BranchId == request.BranchId.Value);

        if (request.IsActive.HasValue)
            query = query.Where(p => p.IsActive == request.IsActive.Value);

        var policies = await query
            .OrderByDescending(p => p.IsActive)
            .ThenByDescending(p => p.CreatedAtUtc)
            .Select(p => new RemoteWorkPolicyDto
            {
                Id = p.Id,
                BranchId = p.BranchId,
                BranchName = p.Branch != null ? p.Branch.Name : null,
                MaxDaysPerWeek = p.MaxDaysPerWeek,
                MaxDaysPerMonth = p.MaxDaysPerMonth,
                MaxDaysPerYear = p.MaxDaysPerYear,
                RequiresManagerApproval = p.RequiresManagerApproval,
                AllowConsecutiveDays = p.AllowConsecutiveDays,
                MaxConsecutiveDays = p.MaxConsecutiveDays,
                MinAdvanceNoticeDays = p.MinAdvanceNoticeDays,
                BlackoutPeriods = p.BlackoutPeriods,
                CountForOvertime = p.CountForOvertime,
                EnforceShiftTimes = p.EnforceShiftTimes,
                IsActive = p.IsActive,
                CreatedAtUtc = p.CreatedAtUtc,
                ModifiedAtUtc = p.ModifiedAtUtc
            })
            .ToListAsync(cancellationToken);

        return policies;
    }
}