using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicies;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicyById;

public class GetExcusePolicyByIdQueryHandler : IRequestHandler<GetExcusePolicyByIdQuery, Result<ExcusePolicyDto>>
{
    private readonly IApplicationDbContext _context;

    public GetExcusePolicyByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<ExcusePolicyDto>> Handle(GetExcusePolicyByIdQuery request, CancellationToken cancellationToken)
    {
        var policy = await _context.ExcusePolicies
            .Include(p => p.Branch)
            .Where(p => p.Id == request.Id && !p.IsDeleted)
            .Select(p => new ExcusePolicyDto
            {
                Id = p.Id,
                BranchId = p.BranchId,
                BranchName = p.Branch != null ? p.Branch.Name : null,
                MaxPersonalExcusesPerMonth = p.MaxPersonalExcusesPerMonth,
                MaxPersonalExcuseHoursPerMonth = p.MaxPersonalExcuseHoursPerMonth,
                MaxPersonalExcuseHoursPerDay = p.MaxPersonalExcuseHoursPerDay,
                MaxHoursPerExcuse = p.MaxHoursPerExcuse,
                RequiresApproval = p.RequiresApproval,
                AllowPartialHourExcuses = p.AllowPartialHourExcuses,
                MinimumExcuseDuration = p.MinimumExcuseDuration,
                IsActive = p.IsActive,
                MaxRetroactiveDays = p.MaxRetroactiveDays,
                AllowSelfServiceRequests = p.AllowSelfServiceRequests,
                CreatedAtUtc = p.CreatedAtUtc,
                CreatedBy = p.CreatedBy,
                ModifiedAtUtc = p.ModifiedAtUtc,
                ModifiedBy = p.ModifiedBy
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (policy == null)
        {
            return Result.Failure<ExcusePolicyDto>("Excuse policy not found");
        }

        return Result.Success(policy);
    }
}
