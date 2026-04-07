using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReportById;

/// <summary>
/// Handler for getting a specific custom report definition by ID.
/// Validates that the current user has access to the report.
/// </summary>
public class GetCustomReportByIdQueryHandler : BaseHandler<GetCustomReportByIdQuery, Result<CustomReportDefinitionDto>>
{
    public GetCustomReportByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<CustomReportDefinitionDto>> Handle(GetCustomReportByIdQuery request, CancellationToken cancellationToken)
    {
        var report = await Context.CustomReportDefinitions
            .Include(r => r.ScheduledReports)
            .Where(r => r.Id == request.Id && !r.IsDeleted)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (report == null)
        {
            return Result.Failure<CustomReportDefinitionDto>("Custom report not found");
        }

        // Verify access: owner, system admin, or public report in accessible branch
        if (!CurrentUser.IsSystemAdmin &&
            report.CreatedByUserId != CurrentUser.UserId &&
            !(report.IsPublic && (report.BranchId == null || CurrentUser.BranchIds.Contains(report.BranchId.Value))))
        {
            return Result.Failure<CustomReportDefinitionDto>("You do not have access to this report");
        }

        return Result.Success(report);
    }
}
