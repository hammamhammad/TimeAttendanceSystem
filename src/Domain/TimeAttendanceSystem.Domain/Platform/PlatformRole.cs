namespace TecAxle.Hrms.Domain.Platform;

/// <summary>
/// Defines platform-level roles for TecAxle administrators who operate across all tenants.
/// </summary>
public enum PlatformRole
{
    /// <summary>
    /// Full platform administrator — manages tenants, subscriptions, and has SystemAdmin access in all tenant databases.
    /// </summary>
    TecAxleAdmin = 0,

    /// <summary>
    /// Support role — read-only access to tenant data for troubleshooting and customer support.
    /// </summary>
    TecAxleSupport = 1
}
