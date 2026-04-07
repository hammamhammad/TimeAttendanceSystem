using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Domain.Configuration;

/// <summary>
/// A named collection of policy configurations that can be applied to quickly set up a tenant.
/// System templates are region-specific (Saudi Standard, UAE Standard, etc.).
/// Tenants can also create custom templates.
/// </summary>
public class PolicyTemplate : BaseEntity
{
    /// <summary>Unique code identifier, e.g. "saudi-standard", "uae-standard".</summary>
    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }

    /// <summary>ISO country code this template targets, e.g. "SA", "AE".</summary>
    public string Region { get; set; } = "SA";

    /// <summary>Industry sector. Null = applicable to all industries.</summary>
    public string? Industry { get; set; }

    /// <summary>True for platform-provided templates, false for tenant-created.</summary>
    public bool IsSystemTemplate { get; set; } = true;

    /// <summary>Owning tenant for custom templates. Null for system templates.</summary>
    public long? TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<PolicyTemplateItem> Items { get; set; } = new List<PolicyTemplateItem>();
}
