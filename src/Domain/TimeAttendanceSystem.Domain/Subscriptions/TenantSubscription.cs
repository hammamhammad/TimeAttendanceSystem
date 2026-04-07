using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Links a tenant to a subscription plan with billing and lifecycle tracking.
/// </summary>
public class TenantSubscription : BaseEntity
{
    public long TenantId { get; set; }
    public long PlanId { get; set; }

    public SubscriptionStatus Status { get; set; }
    public BillingCycle BillingCycle { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime CurrentPeriodStart { get; set; }
    public DateTime CurrentPeriodEnd { get; set; }

    public DateTime? CancelledAt { get; set; }
    public DateTime? CancellationEffectiveDate { get; set; }

    /// <summary>
    /// External payment provider subscription ID (e.g., Stripe subscription ID).
    /// </summary>
    public string? ExternalSubscriptionId { get; set; }

    public string? Notes { get; set; }

    // Navigation
    public Tenant Tenant { get; set; } = null!;
    public SubscriptionPlan Plan { get; set; } = null!;
    public ICollection<TenantModuleAddOn> AddOns { get; set; } = new List<TenantModuleAddOn>();
    public ICollection<TenantFeatureOverride> FeatureOverrides { get; set; } = new List<TenantFeatureOverride>();
}
