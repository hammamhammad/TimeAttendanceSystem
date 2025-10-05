using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicyById;

/// <summary>
/// Handler for getting a remote work policy by ID.
/// </summary>
public class GetRemoteWorkPolicyByIdQueryHandler : IRequestHandler<GetRemoteWorkPolicyByIdQuery, RemoteWorkPolicyDto?>
{
    private readonly IApplicationDbContext _context;

    public GetRemoteWorkPolicyByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<RemoteWorkPolicyDto?> Handle(GetRemoteWorkPolicyByIdQuery request, CancellationToken cancellationToken)
    {
        var policy = await _context.RemoteWorkPolicies
            .Include(p => p.Branch)
            .Where(p => p.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        return policy;
    }
}