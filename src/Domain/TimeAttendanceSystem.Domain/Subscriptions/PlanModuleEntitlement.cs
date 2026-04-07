using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Maps a SystemModule to a SubscriptionPlan, indicating which modules are included.
/// </summary>
public class PlanModuleEntitlement : BaseEntity
{
    public long PlanId { get; set; }
    public SystemModule Module { get; set; }

    /// <summary>
    /// Whether this module is included in the base plan (vs. available as add-on only).
    /// </summary>
    public bool IsIncluded { get; set; } = true;

    // Navigation
    public SubscriptionPlan Plan { get; set; } = null!;
    public ICollection<PlanFeatureFlag> FeatureFlags { get; set; } = new List<PlanFeatureFlag>();
}
