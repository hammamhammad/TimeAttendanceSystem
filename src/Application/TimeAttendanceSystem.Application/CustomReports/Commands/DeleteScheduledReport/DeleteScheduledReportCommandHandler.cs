using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Commands.DeleteScheduledReport;

/// <summary>
/// Handler for soft-deleting a scheduled report.
/// Verifies ownership of the parent report or admin privileges.
/// </summary>
public class DeleteScheduledReportCommandHandler : BaseHandler<DeleteScheduledReportCommand, Result>
{
    public DeleteScheduledReportCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DeleteScheduledReportCommand request, CancellationToken cancellationToken)
    {
        var schedule = await Context.ScheduledReports
            .Include(s => s.CustomReportDefinition)
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (schedule == null)
        {
            return Result.Failure("Scheduled report not found");
        }

        // Verify ownership of parent report or admin
        if (!CurrentUser.IsSystemAdmin && schedule.CustomReportDefinition.CreatedByUserId != CurrentUser.UserId)
        {
            return Result.Failure("You do not have permission to delete this schedule");
        }

        schedule.IsDeleted = true;
        schedule.IsActive = false;
        schedule.ModifiedAtUtc = DateTime.UtcNow;
        schedule.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
