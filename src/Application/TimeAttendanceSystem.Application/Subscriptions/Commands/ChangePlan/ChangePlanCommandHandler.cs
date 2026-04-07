using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.ChangePlan;

public class ChangePlanCommandHandler : BaseHandler<ChangePlanCommand, Result>
{
    private readonly IEntitlementService _entitlementService;
    private readonly IModuleDeactivationService _moduleDeactivationService;

    public ChangePlanCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IEntitlementService entitlementService,
        IModuleDeactivationService moduleDeactivationService)
        : base(context, currentUser)
    {
        _entitlementService = entitlementService;
        _moduleDeactivationService = moduleDeactivationService;
    }

    public override async Task<Result> Handle(ChangePlanCommand request, CancellationToken cancellationToken)
    {
        // Verify tenant exists
        var tenantExists = await Context.Tenants
            .AnyAsync(t => t.Id == request.TenantId && !t.IsDeleted, cancellationToken);

        if (!tenantExists)
        {
            return Result.Failure("Tenant not found");
        }

        // Verify new plan exists and is active
        var newPlan = await Context.SubscriptionPlans
            .Include(p => p.ModuleEntitlements)
            .FirstOrDefaultAsync(p => p.Id == request.NewPlanId && p.IsActive && !p.IsDeleted, cancellationToken);

        if (newPlan == null)
        {
            return Result.Failure("New subscription plan not found or inactive");
        }

        // Find active subscription with current plan's module entitlements
        var subscription = await Context.TenantSubscriptions
            .Include(s => s.Plan)
                .ThenInclude(p => p.ModuleEntitlements)
            .FirstOrDefaultAsync(s => s.TenantId == request.TenantId &&
                                      (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial),
                                 cancellationToken);

        if (subscription == null)
        {
            return Result.Failure("No active subscription found for this tenant");
        }

        if (subscription.PlanId == request.NewPlanId)
        {
            return Result.Failure("Tenant is already on this plan");
        }

        // Compute module diff
        var oldModules = subscription.Plan.ModuleEntitlements
            .Where(e => e.IsIncluded && !e.IsDeleted)
            .Select(e => e.Module)
            .ToHashSet();

        var newModules = newPlan.ModuleEntitlements
            .Where(e => e.IsIncluded && !e.IsDeleted)
            .Select(e => e.Module)
            .ToHashSet();

        // Validate dependencies: cannot disable a module that enabled modules depend on
        var removedModules = oldModules.Except(newModules).ToList();
        foreach (var removedModule in removedModules)
        {
            var dependents = ModuleDependencyRules.GetDependentModules(removedModule, newModules);
            if (dependents.Count > 0)
            {
                var dependentNames = string.Join(", ", dependents.Select(d => ModuleMetadata.Get(d).Name));
                return Result.Failure(
                    $"Cannot disable module '{ModuleMetadata.Get(removedModule).Name}' because the following enabled modules depend on it: {dependentNames}");
            }
        }

        var addedModules = newModules.Except(oldModules).ToList();

        // Log entitlement change
        Context.EntitlementChangeLogs.Add(new EntitlementChangeLog
        {
            TenantId = request.TenantId,
            ChangeType = EntitlementChangeType.PlanChanged,
            PreviousValue = JsonSerializer.Serialize(new
            {
                PlanId = subscription.PlanId,
                PlanCode = subscription.Plan.Code,
                Modules = oldModules.Select(m => m.ToString()).OrderBy(m => m)
            }),
            NewValue = JsonSerializer.Serialize(new
            {
                PlanId = request.NewPlanId,
                PlanCode = newPlan.Code,
                Modules = newModules.Select(m => m.ToString()).OrderBy(m => m)
            }),
            Reason = request.Notes,
            PerformedByUserId = CurrentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username
        });

        // Update the subscription to the new plan
        var now = DateTime.UtcNow;
        var previousNotes = subscription.Notes;

        subscription.PlanId = request.NewPlanId;
        subscription.Status = SubscriptionStatus.Active;
        subscription.CurrentPeriodStart = now;
        subscription.CurrentPeriodEnd = subscription.BillingCycle == BillingCycle.Annual
            ? now.AddYears(1)
            : now.AddMonths(1);
        subscription.Notes = string.IsNullOrWhiteSpace(request.Notes)
            ? previousNotes
            : $"{request.Notes} (Plan changed at {now:yyyy-MM-dd HH:mm} UTC. Previous notes: {previousNotes})";
        subscription.ModifiedAtUtc = now;
        subscription.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        // Invalidate entitlement cache
        _entitlementService.InvalidateCache(request.TenantId);

        // Deactivate removed modules (freeze workflows, etc.)
        foreach (var removedModule in removedModules)
        {
            await _moduleDeactivationService.DeactivateModuleAsync(
                request.TenantId,
                removedModule,
                $"Module removed due to plan change to '{newPlan.Code}'",
                CurrentUser.Username,
                CurrentUser.UserId,
                cancellationToken);
        }

        // Reactivate added modules (unfreeze workflows, etc.)
        foreach (var addedModule in addedModules)
        {
            await _moduleDeactivationService.ReactivateModuleAsync(
                request.TenantId,
                addedModule,
                CurrentUser.Username,
                CurrentUser.UserId,
                cancellationToken);
        }

        return Result.Success();
    }
}
