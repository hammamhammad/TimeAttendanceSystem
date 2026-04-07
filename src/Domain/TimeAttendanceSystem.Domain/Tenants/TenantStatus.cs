namespace TecAxle.Hrms.Domain.Tenants;

/// <summary>
/// Represents the lifecycle status of a tenant in the SaaS platform.
/// </summary>
public enum TenantStatus
{
    /// <summary>
    /// Tenant account created but initial setup not completed.
    /// </summary>
    PendingSetup = 0,

    /// <summary>
    /// Tenant is on a trial period with limited access.
    /// </summary>
    Trial = 1,

    /// <summary>
    /// Tenant has an active subscription and full access to entitled modules.
    /// </summary>
    Active = 2,

    /// <summary>
    /// Tenant account suspended (e.g., payment failure, policy violation).
    /// Data preserved but access denied.
    /// </summary>
    Suspended = 3,

    /// <summary>
    /// Tenant subscription cancelled. Data retained per retention policy.
    /// </summary>
    Cancelled = 4
}
