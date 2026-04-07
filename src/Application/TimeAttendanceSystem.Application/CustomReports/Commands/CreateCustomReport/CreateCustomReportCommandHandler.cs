using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Commands.CreateCustomReport;

/// <summary>
/// Handler for creating a new custom report definition.
/// Sets CreatedByUserId from the current authenticated user.
/// </summary>
public class CreateCustomReportCommandHandler : BaseHandler<CreateCustomReportCommand, Result<long>>
{
    public CreateCustomReportCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateCustomReportCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return Result.Failure<long>("Report name is required");
        }

        if (string.IsNullOrWhiteSpace(request.ColumnsJson))
        {
            return Result.Failure<long>("At least one column must be selected");
        }

        if (!CurrentUser.UserId.HasValue)
        {
            return Result.Failure<long>("User must be authenticated to create a report");
        }

        // Validate branch exists if specified
        if (request.BranchId.HasValue)
        {
            var branchExists = await Context.Branches
                .AnyAsync(b => b.Id == request.BranchId.Value, cancellationToken);

            if (!branchExists)
            {
                return Result.Failure<long>("Branch not found");
            }
        }

        var reportDefinition = new CustomReportDefinition
        {
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            Description = request.Description?.Trim(),
            DescriptionAr = request.DescriptionAr?.Trim(),
            DataSource = request.DataSource,
            ColumnsJson = request.ColumnsJson,
            FiltersJson = request.FiltersJson,
            SortingJson = request.SortingJson,
            BranchId = request.BranchId,
            CreatedByUserId = CurrentUser.UserId.Value,
            IsPublic = request.IsPublic,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "System"
        };

        Context.CustomReportDefinitions.Add(reportDefinition);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(reportDefinition.Id);
    }
}
