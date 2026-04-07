using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Defines usage limits for a subscription plan.
/// LimitValue of -1 means unlimited.
/// </summary>
public class PlanLimit : BaseEntity
{
    public long PlanId { get; set; }
    public LimitType LimitType { get; set; }

    /// <summary>
    /// Maximum allowed value. -1 = unlimited.
    /// </summary>
    public int LimitValue { get; set; }

    // Navigation
    public SubscriptionPlan Plan { get; set; } = null!;
}
