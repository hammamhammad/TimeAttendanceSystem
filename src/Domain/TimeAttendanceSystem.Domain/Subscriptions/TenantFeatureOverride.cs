using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Per-tenant override for a feature flag, allowing sales/support to grant
/// or restrict features outside the standard plan configuration.
/// </summary>
public class TenantFeatureOverride : BaseEntity
{
    public long TenantSubscriptionId { get; set; }

    /// <summary>
    /// Feature key to override (e.g., "attendance.nfcCheckIn").
    /// </summary>
    public string FeatureKey { get; set; } = string.Empty;

    public bool IsEnabled { get; set; }

    /// <summary>
    /// Reason for the override (e.g., "Sales override", "Beta access", "Custom deal").
    /// </summary>
    public string? Reason { get; set; }

    // Navigation
    public TenantSubscription Subscription { get; set; } = null!;
}
