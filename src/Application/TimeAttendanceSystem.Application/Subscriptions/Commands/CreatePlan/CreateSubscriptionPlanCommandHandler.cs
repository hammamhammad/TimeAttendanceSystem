using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.CreatePlan;

public class CreateSubscriptionPlanCommandHandler : BaseHandler<CreateSubscriptionPlanCommand, Result<long>>
{
    public CreateSubscriptionPlanCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateSubscriptionPlanCommand request, CancellationToken cancellationToken)
    {
        var codeExists = await Context.SubscriptionPlans
            .AnyAsync(p => p.Code == request.Code.ToLower().Trim() && !p.IsDeleted, cancellationToken);
        if (codeExists)
            return Result.Failure<long>("A plan with this code already exists.");

        if (!Enum.TryParse<PlanTier>(request.Tier, true, out var tier))
            return Result.Failure<long>($"Invalid tier: {request.Tier}");

        var plan = new SubscriptionPlan
        {
            Code = request.Code.ToLower().Trim(),
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Tier = tier,
            MonthlyPriceUsd = request.MonthlyPriceUsd,
            AnnualPriceUsd = request.AnnualPriceUsd,
            Currency = request.Currency ?? "USD",
            IsPublic = request.IsPublic,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.SubscriptionPlans.Add(plan);
        await Context.SaveChangesAsync(cancellationToken);

        // Add module entitlements
        foreach (var moduleName in request.Modules)
        {
            if (Enum.TryParse<SystemModule>(moduleName, true, out var module))
            {
                Context.PlanModuleEntitlements.Add(new PlanModuleEntitlement
                {
                    PlanId = plan.Id,
                    Module = module,
                    IsIncluded = true,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
            }
        }

        // Add limits
        foreach (var (key, value) in request.Limits)
        {
            if (Enum.TryParse<LimitType>(key, true, out var limitType))
            {
                Context.PlanLimits.Add(new PlanLimit
                {
                    PlanId = plan.Id,
                    LimitType = limitType,
                    LimitValue = value,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
            }
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success(plan.Id);
    }
}
