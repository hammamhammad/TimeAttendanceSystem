using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReports;

/// <summary>
/// Handler for getting a paginated list of custom report definitions.
/// Shows reports created by the current user or public reports visible to the user's branch.
/// </summary>
public class GetCustomReportsQueryHandler : BaseHandler<GetCustomReportsQuery, Result<PagedResult<CustomReportDefinitionDto>>>
{
    public GetCustomReportsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<CustomReportDefinitionDto>>> Handle(GetCustomReportsQuery request, CancellationToken cancellationToken)
    {
        var currentUserId = CurrentUser.UserId;

        var query = Context.CustomReportDefinitions
            .Include(r => r.ScheduledReports)
            .Where(r => !r.IsDeleted)
            .AsQueryable();

        // Show reports created by current user OR public reports in accessible branches
        if (!CurrentUser.IsSystemAdmin)
        {
            query = query.Where(r =>
                r.CreatedByUserId == currentUserId ||
                (r.IsPublic && (r.BranchId == null || CurrentUser.BranchIds.Contains(r.BranchId.Value)))
            );
        }

        // Apply filters
        if (request.BranchId.HasValue)
        {
            query = query.Where(r => r.BranchId == request.BranchId.Value);
        }

        if (request.IsPublic.HasValue)
        {
            query = query.Where(r => r.IsPublic == request.IsPublic.Value);
        }

        if (request.DataSource.HasValue)
        {
            query = query.Where(r => r.DataSource == request.DataSource.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(r => r.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(r => new CustomReportDefinitionDto(
                r.Id,
                r.Name,
                r.NameAr,
                r.Description,
                r.DescriptionAr,
                r.DataSource,
                r.ColumnsJson,
                r.FiltersJson,
                r.SortingJson,
                r.BranchId,
                r.CreatedByUserId,
                Context.Users.Where(u => u.Id == r.CreatedByUserId).Select(u => u.Username).FirstOrDefault() ?? "Unknown",
                r.IsPublic,
                r.IsActive,
                r.ScheduledReports.Count(s => !s.IsDeleted),
                r.CreatedAtUtc,
                r.ModifiedAtUtc
            ))
            .ToListAsync(cancellationToken);

        var result = new PagedResult<CustomReportDefinitionDto>(items, totalCount, request.Page, request.PageSize);
        return Result<PagedResult<CustomReportDefinitionDto>>.Success(result);
    }
}
