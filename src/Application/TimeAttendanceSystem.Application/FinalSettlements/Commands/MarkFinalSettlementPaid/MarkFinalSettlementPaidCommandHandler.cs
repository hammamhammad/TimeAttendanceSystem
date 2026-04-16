using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.MarkFinalSettlementPaid;

public class MarkFinalSettlementPaidCommandHandler : BaseHandler<MarkFinalSettlementPaidCommand, Result>
{
    private readonly ILifecycleEventPublisher _lifecyclePublisher;

    public MarkFinalSettlementPaidCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILifecycleEventPublisher lifecyclePublisher)
        : base(context, currentUser)
    {
        _lifecyclePublisher = lifecyclePublisher;
    }

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

        // v13.5: lifecycle handler will deactivate the employee (gated by
        // AutoDeactivateEmployeeOnFinalSettlementPaid, default true).
        await _lifecyclePublisher.PublishAsync(
            new FinalSettlementPaidEvent(
                settlement.Id,
                settlement.TerminationRecordId,
                settlement.EmployeeId,
                CurrentUser.UserId),
            cancellationToken);

        return Result.Success();
    }
}
