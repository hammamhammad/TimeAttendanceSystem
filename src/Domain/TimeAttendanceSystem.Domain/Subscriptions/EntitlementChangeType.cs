namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Defines the types of entitlement changes that can occur for a tenant's subscription.
/// Used in EntitlementChangeLog for audit trail and compliance tracking.
/// </summary>
public enum EntitlementChangeType
{
    /// <summary>
    /// A subscription plan was initially assigned to a tenant.
    /// </summary>
    PlanAssigned = 1,

    /// <summary>
    /// A tenant's subscription plan was changed (upgrade or downgrade).
    /// </summary>
    PlanChanged = 2,

    /// <summary>
    /// A tenant's subscription was cancelled.
    /// </summary>
    SubscriptionCancelled = 3,

    /// <summary>
    /// A tenant's subscription was reactivated after cancellation.
    /// </summary>
    SubscriptionReactivated = 4,

    /// <summary>
    /// A module add-on was purchased and activated for a tenant.
    /// </summary>
    ModuleAddOnAdded = 5,

    /// <summary>
    /// A module add-on was deactivated/removed for a tenant.
    /// </summary>
    ModuleAddOnRemoved = 6,

    /// <summary>
    /// A feature flag override was added for a tenant.
    /// </summary>
    FeatureOverrideAdded = 7,

    /// <summary>
    /// A feature flag override was removed for a tenant.
    /// </summary>
    FeatureOverrideRemoved = 8,

    /// <summary>
    /// A usage limit was changed for a tenant.
    /// </summary>
    LimitChanged = 9
}
