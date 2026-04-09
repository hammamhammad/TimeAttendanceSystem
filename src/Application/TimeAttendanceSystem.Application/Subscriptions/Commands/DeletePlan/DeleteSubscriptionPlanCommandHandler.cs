using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.DeletePlan;

public class DeleteSubscriptionPlanCommandHandler : BaseHandler<DeleteSubscriptionPlanCommand, Result>
{
    public DeleteSubscriptionPlanCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteSubscriptionPlanCommand request, CancellationToken cancellationToken)
    {
        var plan = await Context.SubscriptionPlans
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);
        if (plan == null)
            return Result.Failure("Plan not found.");

        // Check for active subscriptions
        var hasActiveSubs = await Context.TenantSubscriptions
            .AnyAsync(s => s.PlanId == plan.Id && s.Status == Domain.Subscriptions.SubscriptionStatus.Active, cancellationToken);
        if (hasActiveSubs)
            return Result.Failure("Cannot delete a plan with active subscriptions. Change tenant plans first.");

        plan.IsDeleted = true;
        plan.ModifiedAtUtc = DateTime.UtcNow;
        plan.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
