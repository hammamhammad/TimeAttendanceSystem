using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Queries.GetBranches;

public class GetBranchesQueryHandler : BaseHandler<GetBranchesQuery, Result<PagedResult<BranchDto>>>
{
    public GetBranchesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<BranchDto>>> Handle(GetBranchesQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Branches.AsQueryable();

        // Apply search filter
        if (!string.IsNullOrEmpty(request.Search))
        {
            query = query.Where(b => 
                b.Name.Contains(request.Search) ||
                b.Code.Contains(request.Search));
        }

        // Apply active filter
        if (request.IsActive.HasValue)
        {
            query = query.Where(b => b.IsActive == request.IsActive.Value);
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination and projection
        var branches = await query
            .OrderBy(b => b.Name)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(b => new BranchDto
            {
                Id = b.Id,
                Code = b.Code,
                Name = b.Name,
                TimeZone = b.TimeZone,
                IsActive = b.IsActive,
                EmployeeCount = Context.Employees.Count(e => e.BranchId == b.Id && !e.IsDeleted),
                DepartmentCount = Context.Departments.Count(d => d.BranchId == b.Id && !d.IsDeleted),
                CreatedAtUtc = b.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var result = new PagedResult<BranchDto>(
            branches,
            totalCount,
            request.Page,
            request.PageSize
        );

        return Result.Success(result);
    }
}