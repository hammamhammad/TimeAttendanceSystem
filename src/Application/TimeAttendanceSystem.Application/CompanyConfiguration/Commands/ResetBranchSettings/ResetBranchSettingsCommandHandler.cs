using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Commands.ResetBranchSettings;

public class ResetBranchSettingsCommandHandler : BaseHandler<ResetBranchSettingsCommand, Result>
{
    public ResetBranchSettingsCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(ResetBranchSettingsCommand request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId && !b.IsDeleted, cancellationToken);

        if (branch == null)
            return Result.Failure("Branch not found");

        var overrides = await Context.BranchSettingsOverrides
            .FirstOrDefaultAsync(o => o.BranchId == request.BranchId && !o.IsDeleted, cancellationToken);

        if (overrides != null)
        {
            overrides.IsDeleted = true;
            overrides.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            await Context.SaveChangesAsync(cancellationToken);
        }

        return Result.Success();
    }
}
