using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.MarkFinalSettlementPaid;

public class MarkFinalSettlementPaidCommandHandler : BaseHandler<MarkFinalSettlementPaidCommand, Result>
{
    public MarkFinalSettlementPaidCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(MarkFinalSettlementPaidCommand request, CancellationToken cancellationToken)
    {
        var settlement = await Context.FinalSettlements
            .FirstOrDefaultAsync(f => f.TerminationRecordId == request.TerminationRecordId && !f.IsDeleted, cancellationToken);

        if (settlement == null)
            return Result.Failure("Final settlement not found.");

        if (settlement.Status != SettlementStatus.Approved)
            return Result.Failure("Only approved settlements can be marked as paid.");

        settlement.Status = SettlementStatus.Paid;
        settlement.PaidAt = DateTime.UtcNow;
        settlement.ModifiedAtUtc = DateTime.UtcNow;
        settlement.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
