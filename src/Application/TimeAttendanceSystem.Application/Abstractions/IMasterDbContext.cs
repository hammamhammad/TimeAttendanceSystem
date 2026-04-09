using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Domain.Platform;
using TecAxle.Hrms.Domain.Tenants;
using TecAxle.Hrms.Domain.Subscriptions;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Database context for the master (platform-level) database.
/// Contains tenant registry, subscription plans, platform users,
/// and email-to-tenant mappings. Does NOT contain business data.
/// </summary>
public interface IMasterDbContext
{
    // ── Platform Users ──
    DbSet<PlatformUser> PlatformUsers { get; }

    // ── Tenant Registry ──
    DbSet<Tenant> Tenants { get; }
    DbSet<TenantUserEmail> TenantUserEmails { get; }

    // ── Subscription & Entitlements ──
    DbSet<SubscriptionPlan> SubscriptionPlans { get; }
    DbSet<PlanModuleEntitlement> PlanModuleEntitlements { get; }
    DbSet<PlanFeatureFlag> PlanFeatureFlags { get; }
    DbSet<PlanLimit> PlanLimits { get; }
    DbSet<TenantSubscription> TenantSubscriptions { get; }
    DbSet<TenantModuleAddOn> TenantModuleAddOns { get; }
    DbSet<TenantFeatureOverride> TenantFeatureOverrides { get; }
    DbSet<EntitlementChangeLog> EntitlementChangeLogs { get; }

    // ── System Policy Templates (IsSystemTemplate = true only) ──
    DbSet<PolicyTemplate> PolicyTemplates { get; }
    DbSet<PolicyTemplateItem> PolicyTemplateItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
