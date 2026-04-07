using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Domain.Configuration;

/// <summary>
/// Tracks the completion of a configuration step for a tenant.
/// Used to show setup progress and drive the onboarding wizard.
/// </summary>
public class SetupStep : BaseEntity
{
    public long TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;

    /// <summary>
    /// Unique step identifier, e.g. "company_info", "branches", "departments",
    /// "shifts", "vacation_types", "excuse_policies", "workflows", "employees", "payroll".
    /// </summary>
    public string StepKey { get; set; } = string.Empty;

    /// <summary>Grouping category: "Organization", "TimeAttendance", "Leave", "Payroll".</summary>
    public string Category { get; set; } = string.Empty;

    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedAtUtc { get; set; }
    public string? CompletedByUserId { get; set; }

    /// <summary>Whether this step must be completed for the tenant to be considered fully set up.</summary>
    public bool IsRequired { get; set; } = true;

    /// <summary>Display order within the setup wizard.</summary>
    public int SortOrder { get; set; }
}
