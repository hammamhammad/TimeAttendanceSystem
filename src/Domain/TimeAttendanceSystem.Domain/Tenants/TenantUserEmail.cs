using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Tenants;

/// <summary>
/// Maps user email addresses to tenant IDs in the master database.
/// Used during login to resolve which tenant database to authenticate against.
/// Supports the case where the same email exists in multiple tenants.
/// </summary>
public class TenantUserEmail : BaseEntity
{
    /// <summary>
    /// Normalized lowercase email address.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// The tenant this email belongs to.
    /// </summary>
    public long TenantId { get; set; }

    public Tenant Tenant { get; set; } = null!;

    /// <summary>
    /// Whether this is the user's primary email for this tenant.
    /// </summary>
    public bool IsPrimary { get; set; } = true;
}
