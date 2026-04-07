using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Commands.UpdateCustomReport;

/// <summary>
/// Handler for updating an existing custom report definition.
/// Verifies ownership or admin privileges before allowing the update.
/// </summary>
public class UpdateCustomReportCommandHandler : BaseHandler<UpdateCustomReportCommand, Result>
{
    public UpdateCustomReportCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateCustomReportCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return Result.Failure("Report name is required");
        }

        if (string.IsNullOrWhiteSpace(request.ColumnsJson))
        {
            return Result.Failure("At least one column must be selected");
        }

        var report = await Context.CustomReportDefinitions
            .FirstOrDefaultAsync(r => r.Id == request.Id && !r.IsDeleted, cancellationToken);

        if (report == null)
        {
            return Result.Failure("Custom report not found");
        }

        // Verify ownership or admin
        if (!CurrentUser.IsSystemAdmin && report.CreatedByUserId != CurrentUser.UserId)
        {
            return Result.Failure("You do not have permission to update this report");
        }

        // Validate branch exists if specified
        if (request.BranchId.HasValue)
        {
            var branchExists = await Context.Branches
                .AnyAsync(b => b.Id == request.BranchId.Value, cancellationToken);

            if (!branchExists)
            {
                return Result.Failure("Branch not found");
            }
        }

        report.Name = request.Name.Trim();
        report.NameAr = request.NameAr?.Trim();
        report.Description = request.Description?.Trim();
        report.DescriptionAr = request.DescriptionAr?.Trim();
        report.DataSource = request.DataSource;
        report.ColumnsJson = request.ColumnsJson;
        report.FiltersJson = request.FiltersJson;
        report.SortingJson = request.SortingJson;
        report.BranchId = request.BranchId;
        report.IsPublic = request.IsPublic;
        report.ModifiedAtUtc = DateTime.UtcNow;
        report.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
