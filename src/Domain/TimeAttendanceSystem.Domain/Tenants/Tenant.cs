using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Tenants;

/// <summary>
/// Domain entity representing a tenant (company/organization) in the multi-tenant SaaS architecture.
/// Each tenant represents a separate organization using the system with complete data isolation,
/// custom branding, subscription management, and configurable module access.
/// </summary>
public class Tenant : BaseEntity
{
    // ── Discovery & Branding ──────────────────────────────────────

    /// <summary>
    /// Subdomain identifier for tenant discovery (e.g., "acme" for acme.clockn.net).
    /// </summary>
    public string Subdomain { get; set; } = string.Empty;

    /// <summary>
    /// Display name of the tenant organization.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Arabic display name of the tenant organization.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// URL to the tenant's logo image.
    /// </summary>
    public string? LogoUrl { get; set; }

    /// <summary>
    /// Base URL for the tenant's API endpoint used by mobile apps.
    /// </summary>
    public string ApiBaseUrl { get; set; } = string.Empty;

    /// <summary>
    /// Optional custom domain for enterprise tenants (e.g., "hr.acme-corp.com").
    /// </summary>
    public string? CustomDomain { get; set; }

    /// <summary>
    /// Whether the tenant account is active. Inactive tenants cannot access the system.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Database connection string or identifier for database-per-tenant isolation.
    /// </summary>
    public string? DatabaseIdentifier { get; set; }

    // ── Company Information ───────────────────────────────────────

    /// <summary>
    /// Official company registration number (e.g., Saudi CR number).
    /// </summary>
    public string? CompanyRegistrationNumber { get; set; }

    /// <summary>
    /// Tax identification number (e.g., Saudi VAT number).
    /// </summary>
    public string? TaxIdentificationNumber { get; set; }

    /// <summary>
    /// Industry sector (e.g., "Technology", "Healthcare", "Construction").
    /// </summary>
    public string? Industry { get; set; }

    /// <summary>
    /// Country code (ISO 3166-1 alpha-2). Defaults to Saudi Arabia.
    /// </summary>
    public string? Country { get; set; } = "SA";

    /// <summary>
    /// City where the company headquarters is located.
    /// </summary>
    public string? City { get; set; }

    /// <summary>
    /// Company headquarters address.
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// Primary company phone number.
    /// </summary>
    public string? Phone { get; set; }

    /// <summary>
    /// Primary company email address.
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// Company website URL.
    /// </summary>
    public string? Website { get; set; }

    // ── Regional Defaults ─────────────────────────────────────────

    /// <summary>
    /// Default IANA timezone for the tenant (e.g., "Asia/Riyadh").
    /// </summary>
    public string DefaultTimezone { get; set; } = "Asia/Riyadh";

    /// <summary>
    /// Default language code (e.g., "en", "ar").
    /// </summary>
    public string DefaultLanguage { get; set; } = "en";

    /// <summary>
    /// Default currency code (ISO 4217). Defaults to Saudi Riyal.
    /// </summary>
    public string DefaultCurrency { get; set; } = "SAR";

    // ── SaaS Lifecycle ────────────────────────────────────────────

    /// <summary>
    /// Current lifecycle status of the tenant (PendingSetup, Trial, Active, Suspended, Cancelled).
    /// </summary>
    public TenantStatus Status { get; set; } = TenantStatus.Active;

    /// <summary>
    /// Date when the trial period started, if applicable.
    /// </summary>
    public DateTime? TrialStartDate { get; set; }

    /// <summary>
    /// Date when the trial period ends, if applicable.
    /// </summary>
    public DateTime? TrialEndDate { get; set; }

    // ── Navigation Properties ─────────────────────────────────────

    /// <summary>
    /// Branches belonging to this tenant.
    /// </summary>
    public ICollection<Branch> Branches { get; set; } = new List<Branch>();
}
