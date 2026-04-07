using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Configuration;

/// <summary>
/// A single policy configuration within a template.
/// Each item stores a JSON blob that can be deserialized into the corresponding entity type.
/// </summary>
public class PolicyTemplateItem : BaseEntity
{
    public long PolicyTemplateId { get; set; }
    public PolicyTemplate PolicyTemplate { get; set; } = null!;

    /// <summary>
    /// The type of policy this item represents.
    /// Supported values: "TenantSettings", "ExcusePolicy", "VacationType",
    /// "OvertimeConfiguration", "RemoteWorkPolicy", "Shift", "OffDay",
    /// "PublicHoliday", "WorkflowDefinition".
    /// </summary>
    public string PolicyType { get; set; } = string.Empty;

    /// <summary>JSON blob of the policy property values to apply.</summary>
    public string ConfigurationJson { get; set; } = "{}";

    /// <summary>Display order within the template.</summary>
    public int SortOrder { get; set; }
}
