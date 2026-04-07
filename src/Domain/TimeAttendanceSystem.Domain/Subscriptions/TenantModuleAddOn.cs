using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Represents an optional module purchased as an add-on to a tenant's base plan.
/// </summary>
public class TenantModuleAddOn : BaseEntity
{
    public long TenantSubscriptionId { get; set; }
    public SystemModule Module { get; set; }

    public decimal MonthlyPrice { get; set; }
    public DateTime ActivatedAt { get; set; }
    public DateTime? DeactivatedAt { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public TenantSubscription Subscription { get; set; } = null!;
}
