using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Subscriptions.Queries.GetTenantSubscription;

public class GetTenantSubscriptionQueryHandler : BaseHandler<GetTenantSubscriptionQuery, Result<TenantSubscriptionDto>>
{
    public GetTenantSubscriptionQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<TenantSubscriptionDto>> Handle(GetTenantSubscriptionQuery request, CancellationToken cancellationToken)
    {
        // Verify tenant exists
        var tenantExists = await Context.Tenants
            .AnyAsync(t => t.Id == request.TenantId && !t.IsDeleted, cancellationToken);

        if (!tenantExists)
        {
            return Result.Failure<TenantSubscriptionDto>("Tenant not found");
        }

        var subscription = await Context.TenantSubscriptions
            .AsNoTracking()
            .Include(s => s.Plan)
                .ThenInclude(p => p.ModuleEntitlements)
            .Include(s => s.Plan)
                .ThenInclude(p => p.Limits)
            .Include(s => s.AddOns)
            .Where(s => s.TenantId == request.TenantId &&
                        (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial))
            .FirstOrDefaultAsync(cancellationToken);

        if (subscription == null)
        {
            return Result.Failure<TenantSubscriptionDto>("No active subscription found for this tenant");
        }

        var enabledModules = subscription.Plan.ModuleEntitlements
            .Where(me => me.IsIncluded)
            .Select(me => me.Module.ToString())
            .ToList();

        var limits = subscription.Plan.Limits
            .ToDictionary(l => l.LimitType.ToString(), l => l.LimitValue);

        var addOns = subscription.AddOns
            .Select(a => new TenantAddOnDto
            {
                Id = a.Id,
                Module = a.Module.ToString(),
                MonthlyPrice = a.MonthlyPrice,
                ActivatedAt = a.ActivatedAt,
                DeactivatedAt = a.DeactivatedAt,
                IsActive = a.IsActive
            })
            .ToList();

        var dto = new TenantSubscriptionDto
        {
            Id = subscription.Id,
            PlanId = subscription.PlanId,
            PlanCode = subscription.Plan.Code,
            PlanName = subscription.Plan.Name,
            PlanTier = subscription.Plan.Tier.ToString(),
            Status = subscription.Status.ToString(),
            BillingCycle = subscription.BillingCycle.ToString(),
            StartDate = subscription.StartDate,
            CurrentPeriodStart = subscription.CurrentPeriodStart,
            CurrentPeriodEnd = subscription.CurrentPeriodEnd,
            CancelledAt = subscription.CancelledAt,
            CancellationEffectiveDate = subscription.CancellationEffectiveDate,
            ExternalSubscriptionId = subscription.ExternalSubscriptionId,
            Notes = subscription.Notes,
            EnabledModules = enabledModules,
            Limits = limits,
            AddOns = addOns
        };

        return Result.Success(dto);
    }
}
