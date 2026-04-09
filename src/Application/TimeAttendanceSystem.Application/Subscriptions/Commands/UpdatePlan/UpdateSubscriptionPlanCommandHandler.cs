using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.UpdatePlan;

public class UpdateSubscriptionPlanCommandHandler : BaseHandler<UpdateSubscriptionPlanCommand, Result>
{
    public UpdateSubscriptionPlanCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateSubscriptionPlanCommand request, CancellationToken cancellationToken)
    {
        var plan = await Context.SubscriptionPlans
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);
        if (plan == null)
            return Result.Failure("Plan not found.");

        if (!Enum.TryParse<PlanTier>(request.Tier, true, out var tier))
            return Result.Failure($"Invalid tier: {request.Tier}");

        plan.Name = request.Name;
        plan.NameAr = request.NameAr;
        plan.Description = request.Description;
        plan.DescriptionAr = request.DescriptionAr;
        plan.Tier = tier;
        plan.MonthlyPriceUsd = request.MonthlyPriceUsd;
        plan.AnnualPriceUsd = request.AnnualPriceUsd;
        plan.Currency = request.Currency ?? "USD";
        plan.IsPublic = request.IsPublic;
        plan.IsActive = request.IsActive;
        plan.SortOrder = request.SortOrder;
        plan.ModifiedAtUtc = DateTime.UtcNow;
        plan.ModifiedBy = CurrentUser.Username;

        // Replace module entitlements
        var existingModules = await Context.PlanModuleEntitlements
            .Where(m => m.PlanId == plan.Id).ToListAsync(cancellationToken);
        foreach (var m in existingModules)
            m.IsDeleted = true;

        foreach (var moduleName in request.Modules)
        {
            if (Enum.TryParse<SystemModule>(moduleName, true, out var module))
            {
                var existing = existingModules.FirstOrDefault(m => m.Module == module);
                if (existing != null)
                {
                    existing.IsDeleted = false;
                    existing.IsIncluded = true;
                }
                else
                {
                    Context.PlanModuleEntitlements.Add(new PlanModuleEntitlement
                    {
                        PlanId = plan.Id, Module = module, IsIncluded = true,
                        CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "SYSTEM"
                    });
                }
            }
        }

        // Replace limits
        var existingLimits = await Context.PlanLimits
            .Where(l => l.PlanId == plan.Id).ToListAsync(cancellationToken);
        foreach (var l in existingLimits)
            l.IsDeleted = true;

        foreach (var (key, value) in request.Limits)
        {
            if (Enum.TryParse<LimitType>(key, true, out var limitType))
            {
                var existing = existingLimits.FirstOrDefault(l => l.LimitType == limitType);
                if (existing != null)
                {
                    existing.IsDeleted = false;
                    existing.LimitValue = value;
                }
                else
                {
                    Context.PlanLimits.Add(new PlanLimit
                    {
                        PlanId = plan.Id, LimitType = limitType, LimitValue = value,
                        CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "SYSTEM"
                    });
                }
            }
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
