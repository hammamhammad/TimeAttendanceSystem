using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.AssignPlan;

public class AssignPlanCommandHandler : BaseHandler<AssignPlanCommand, Result<long>>
{
    private readonly IMasterDbContext _masterContext;
    private readonly IEntitlementService _entitlementService;

    public AssignPlanCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMasterDbContext masterContext,
        IEntitlementService entitlementService)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
        _entitlementService = entitlementService;
    }

    public override async Task<Result<long>> Handle(AssignPlanCommand request, CancellationToken cancellationToken)
    {
        // Verify tenant exists
        var tenant = await _masterContext.Tenants
            .FirstOrDefaultAsync(t => t.Id == request.TenantId && !t.IsDeleted, cancellationToken);

        if (tenant == null)
        {
            return Result.Failure<long>("Tenant not found");
        }

        // Verify plan exists and is active
        var plan = await _masterContext.SubscriptionPlans
            .FirstOrDefaultAsync(p => p.Id == request.PlanId && p.IsActive && !p.IsDeleted, cancellationToken);

        if (plan == null)
        {
            return Result.Failure<long>("Subscription plan not found or inactive");
        }

        // Parse billing cycle
        if (!Enum.TryParse<BillingCycle>(request.BillingCycle, true, out var billingCycle))
        {
            return Result.Failure<long>("Invalid billing cycle. Must be 'Monthly' or 'Annual'");
        }

        // Check for existing active subscription
        var existingSubscription = await _masterContext.TenantSubscriptions
            .FirstOrDefaultAsync(s => s.TenantId == request.TenantId &&
                                      (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial),
                                 cancellationToken);

        if (existingSubscription != null)
        {
            // Cancel the existing subscription before assigning a new one
            existingSubscription.Status = SubscriptionStatus.Cancelled;
            existingSubscription.CancelledAt = DateTime.UtcNow;
            existingSubscription.CancellationEffectiveDate = DateTime.UtcNow;
            existingSubscription.ModifiedAtUtc = DateTime.UtcNow;
            existingSubscription.ModifiedBy = CurrentUser.Username;
        }

        // Calculate period dates
        var now = DateTime.UtcNow;
        var periodEnd = billingCycle == BillingCycle.Annual
            ? now.AddYears(1)
            : now.AddMonths(1);

        var subscription = new TenantSubscription
        {
            TenantId = request.TenantId,
            PlanId = request.PlanId,
            Status = SubscriptionStatus.Active,
            BillingCycle = billingCycle,
            StartDate = now,
            CurrentPeriodStart = now,
            CurrentPeriodEnd = periodEnd,
            Notes = request.Notes,
            CreatedAtUtc = now,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        _masterContext.TenantSubscriptions.Add(subscription);
        await _masterContext.SaveChangesAsync(cancellationToken);

        // Invalidate entitlement cache
        _entitlementService.InvalidateCache(request.TenantId);

        return Result.Success(subscription.Id);
    }
}
