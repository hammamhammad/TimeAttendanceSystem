using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Defines a subscription plan with module entitlements, feature flags, and usage limits.
/// Plans are managed by platform admins and assigned to tenants via TenantSubscription.
/// </summary>
public class SubscriptionPlan : BaseEntity
{
    /// <summary>
    /// Unique plan code (e.g., "starter", "professional", "enterprise").
    /// </summary>
    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }

    public PlanTier Tier { get; set; }

    public decimal MonthlyPriceUsd { get; set; }
    public decimal AnnualPriceUsd { get; set; }
    public string Currency { get; set; } = "USD";

    /// <summary>
    /// Whether this plan is visible on the public pricing page.
    /// </summary>
    public bool IsPublic { get; set; } = true;

    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }

    // Navigation
    public ICollection<PlanModuleEntitlement> ModuleEntitlements { get; set; } = new List<PlanModuleEntitlement>();
    public ICollection<PlanLimit> Limits { get; set; } = new List<PlanLimit>();
    public ICollection<TenantSubscription> Subscriptions { get; set; } = new List<TenantSubscription>();
}
