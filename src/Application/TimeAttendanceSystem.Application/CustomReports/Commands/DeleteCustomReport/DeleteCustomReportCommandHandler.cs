using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Commands.DeleteCustomReport;

/// <summary>
/// Handler for soft-deleting a custom report definition.
/// Verifies ownership or admin privileges before allowing deletion.
/// </summary>
public class DeleteCustomReportCommandHandler : BaseHandler<DeleteCustomReportCommand, Result>
{
    public DeleteCustomReportCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DeleteCustomReportCommand request, CancellationToken cancellationToken)
    {
        var report = await Context.CustomReportDefinitions
            .FirstOrDefaultAsync(r => r.Id == request.Id && !r.IsDeleted, cancellationToken);

        if (report == null)
        {
            return Result.Failure("Custom report not found");
        }

        // Verify ownership or admin
        if (!CurrentUser.IsSystemAdmin && report.CreatedByUserId != CurrentUser.UserId)
        {
            return Result.Failure("You do not have permission to delete this report");
        }

        report.IsDeleted = true;
        report.IsActive = false;
        report.ModifiedAtUtc = DateTime.UtcNow;
        report.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
