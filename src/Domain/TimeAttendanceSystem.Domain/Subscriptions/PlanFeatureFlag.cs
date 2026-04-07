using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Defines granular feature flags within a module entitlement.
/// Examples: "attendance.nfcCheckIn", "payroll.bankTransfer", "analytics.exportPdf".
/// </summary>
public class PlanFeatureFlag : BaseEntity
{
    public long PlanModuleEntitlementId { get; set; }

    /// <summary>
    /// Dot-separated feature key (e.g., "attendance.nfcCheckIn").
    /// </summary>
    public string FeatureKey { get; set; } = string.Empty;

    public string? Name { get; set; }
    public string? NameAr { get; set; }
    public bool IsEnabled { get; set; } = true;

    // Navigation
    public PlanModuleEntitlement PlanModuleEntitlement { get; set; } = null!;
}
