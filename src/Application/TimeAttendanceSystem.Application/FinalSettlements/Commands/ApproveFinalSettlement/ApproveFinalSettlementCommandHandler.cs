using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.ApproveFinalSettlement;

public class ApproveFinalSettlementCommandHandler : BaseHandler<ApproveFinalSettlementCommand, Result>
{
    public ApproveFinalSettlementCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ApproveFinalSettlementCommand request, CancellationToken cancellationToken)
    {
        var settlement = await Context.FinalSettlements
            .FirstOrDefaultAsync(f => f.TerminationRecordId == request.TerminationRecordId && !f.IsDeleted, cancellationToken);

        if (settlement == null)
            return Result.Failure("Final settlement not found.");

        if (settlement.Status != SettlementStatus.Draft)
            return Result.Failure("Only draft settlements can be approved.");

        settlement.Status = SettlementStatus.Approved;
        settlement.ApprovedByUserId = CurrentUser.UserId;
        settlement.ApprovedAt = DateTime.UtcNow;
        settlement.ModifiedAtUtc = DateTime.UtcNow;
        settlement.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
