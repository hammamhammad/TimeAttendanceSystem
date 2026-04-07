using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetScheduledReports;

/// <summary>
/// Handler for getting all scheduled reports for a specific custom report definition.
/// Validates that the current user has access to the parent report.
/// </summary>
public class GetScheduledReportsQueryHandler : BaseHandler<GetScheduledReportsQuery, Result<List<ScheduledReportDto>>>
{
    public GetScheduledReportsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<List<ScheduledReportDto>>> Handle(GetScheduledReportsQuery request, CancellationToken cancellationToken)
    {
        // Verify the parent report exists and the user has access
        var report = await Context.CustomReportDefinitions
            .FirstOrDefaultAsync(r => r.Id == request.CustomReportDefinitionId && !r.IsDeleted, cancellationToken);

        if (report == null)
        {
            return Result.Failure<List<ScheduledReportDto>>("Custom report not found");
        }

        // Verify access: owner, system admin, or public report in accessible branch
        if (!CurrentUser.IsSystemAdmin &&
            report.CreatedByUserId != CurrentUser.UserId &&
            !(report.IsPublic && (report.BranchId == null || CurrentUser.BranchIds.Contains(report.BranchId.Value))))
        {
            return Result.Failure<List<ScheduledReportDto>>("You do not have access to this report");
        }

        var schedules = await Context.ScheduledReports
            .Where(s => s.CustomReportDefinitionId == request.CustomReportDefinitionId && !s.IsDeleted)
            .OrderByDescending(s => s.CreatedAtUtc)
            .Select(s => new ScheduledReportDto(
                s.Id,
                s.CustomReportDefinitionId,
                report.Name,
                s.CronExpression,
                s.EmailRecipients,
                s.Format,
                s.Format.ToString(),
                s.IsActive,
                s.LastRunAt,
                s.NextRunAt,
                s.LastRunStatus,
                s.CreatedAtUtc,
                s.ModifiedAtUtc
            ))
            .ToListAsync(cancellationToken);

        return Result.Success(schedules);
    }
}
