using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Branches.Queries.GetBranches;

namespace TimeAttendanceSystem.Application.Branches.Queries.GetBranchById;

public class GetBranchByIdQueryHandler : BaseHandler<GetBranchByIdQuery, Result<BranchDto>>
{
    public GetBranchByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<BranchDto>> Handle(GetBranchByIdQuery request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .Where(b => b.Id == request.Id)
            .Select(b => new BranchDto
            {
                Id = b.Id,
                Code = b.Code,
                Name = b.Name,
                TimeZone = b.TimeZone,
                IsActive = b.IsActive,
                EmployeeCount = Context.Employees.Count(e => e.BranchId == b.Id && !e.IsDeleted),
                DepartmentCount = Context.Departments.Count(d => d.BranchId == b.Id && !d.IsDeleted),
                CreatedAtUtc = b.CreatedAtUtc,
                Latitude = b.Latitude,
                Longitude = b.Longitude,
                GeofenceRadiusMeters = b.GeofenceRadiusMeters
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (branch == null)
        {
            return Result.Failure<BranchDto>("Branch not found");
        }

        return Result.Success(branch);
    }
}
