using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Tenants;

/// <summary>
/// Domain entity representing a tenant in the multi-tenant SaaS architecture.
/// Each tenant represents a separate organization/company using the system
/// with complete data isolation and custom branding capabilities.
/// </summary>
/// <remarks>
/// Multi-Tenant Features:
/// - Subdomain-based tenant identification (e.g., acme.timeattendance.com)
/// - Optional custom domain support for enterprise clients
/// - Tenant-specific branding with logo and display name
/// - API endpoint configuration for distributed deployments
/// 
/// Tenant Discovery Flow:
/// 1. User enters company URL in mobile app
/// 2. App calls tenant discovery endpoint with the URL
/// 3. System returns tenant configuration (API URL, logo, name)
/// 4. App stores configuration and connects to tenant-specific API
/// 
/// Data Isolation:
/// - Each tenant has complete data isolation
/// - All queries are scoped to the current tenant
/// - Cross-tenant data access is prevented at the infrastructure level
/// </remarks>
public class Tenant : BaseEntity
{
    /// <summary>
    /// Gets or sets the subdomain identifier for this tenant.
    /// Used for tenant discovery when accessing via subdomain URLs.
    /// </summary>
    /// <value>Subdomain portion (e.g., "acme" for acme.timeattendance.com)</value>
    public string Subdomain { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the display name of the tenant organization.
    /// Shown in the mobile app UI after tenant discovery.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Arabic display name of the tenant organization.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// Gets or sets the URL to the tenant's logo image.
    /// Displayed on the mobile app login screen.
    /// </summary>
    public string? LogoUrl { get; set; }

    /// <summary>
    /// Gets or sets the base URL for the tenant's API endpoint.
    /// Used by mobile apps to connect to the correct backend.
    /// </summary>
    /// <value>Full URL including protocol (e.g., "https://api.acme.timeattendance.com")</value>
    public string ApiBaseUrl { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets an optional custom domain for enterprise tenants.
    /// Allows organizations to use their own domain for the system.
    /// </summary>
    /// <value>Custom domain (e.g., "hr.acme-corp.com"), null if using subdomain</value>
    public string? CustomDomain { get; set; }

    /// <summary>
    /// Gets or sets whether the tenant account is active.
    /// Inactive tenants cannot access the system.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets the database connection string or identifier for this tenant.
    /// Used in database-per-tenant isolation strategies.
    /// </summary>
    public string? DatabaseIdentifier { get; set; }
}
