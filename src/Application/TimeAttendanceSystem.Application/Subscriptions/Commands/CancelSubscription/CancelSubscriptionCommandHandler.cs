using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.CancelSubscription;

public class CancelSubscriptionCommandHandler : BaseHandler<CancelSubscriptionCommand, Result>
{
    private readonly IMasterDbContext _masterContext;
    private readonly IEntitlementService _entitlementService;
    private readonly IModuleDeactivationService _moduleDeactivationService;

    public CancelSubscriptionCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMasterDbContext masterContext,
        IEntitlementService entitlementService,
        IModuleDeactivationService moduleDeactivationService)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
        _entitlementService = entitlementService;
        _moduleDeactivationService = moduleDeactivationService;
    }

    public override async Task<Result> Handle(CancelSubscriptionCommand request, CancellationToken cancellationToken)
    {
        // Verify tenant exists
        var tenantExists = await _masterContext.Tenants
            .AnyAsync(t => t.Id == request.TenantId && !t.IsDeleted, cancellationToken);

        if (!tenantExists)
        {
            return Result.Failure("Tenant not found");
        }

        // Find active subscription with plan details
        var subscription = await _masterContext.TenantSubscriptions
            .Include(s => s.Plan)
                .ThenInclude(p => p.ModuleEntitlements)
            .FirstOrDefaultAsync(s => s.TenantId == request.TenantId &&
                                      (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial),
                                 cancellationToken);

        if (subscription == null)
        {
            return Result.Failure("No active subscription found for this tenant");
        }

        var now = DateTime.UtcNow;

        // Log entitlement change
        var currentModules = subscription.Plan.ModuleEntitlements
            .Where(e => e.IsIncluded && !e.IsDeleted)
            .Select(e => e.Module)
            .ToList();

        _masterContext.EntitlementChangeLogs.Add(new EntitlementChangeLog
        {
            TenantId = request.TenantId,
            ChangeType = EntitlementChangeType.SubscriptionCancelled,
            PreviousValue = JsonSerializer.Serialize(new
            {
                PlanId = subscription.PlanId,
                PlanCode = subscription.Plan.Code,
                Modules = currentModules.Select(m => m.ToString()).OrderBy(m => m)
            }),
            Reason = "Subscription cancelled",
            PerformedByUserId = CurrentUser.UserId,
            CreatedAtUtc = now,
            CreatedBy = CurrentUser.Username
        });

        subscription.Status = SubscriptionStatus.Cancelled;
        subscription.CancelledAt = now;
        // Subscription remains effective until end of current billing period
        subscription.CancellationEffectiveDate = subscription.CurrentPeriodEnd;
        subscription.ModifiedAtUtc = now;
        subscription.ModifiedBy = CurrentUser.Username;

        await _masterContext.SaveChangesAsync(cancellationToken);

        // Invalidate entitlement cache
        _entitlementService.InvalidateCache(request.TenantId);

        // Deactivate all non-Core modules (skip dependency checks — everything goes down)
        var coreModules = ModuleMetadata.GetCoreModules().ToHashSet();
        foreach (var module in currentModules.Where(m => !coreModules.Contains(m)))
        {
            await _moduleDeactivationService.DeactivateModuleAsync(
                request.TenantId,
                module,
                "Subscription cancelled",
                CurrentUser.Username,
                CurrentUser.UserId,
                cancellationToken);
        }

        return Result.Success();
    }
}
