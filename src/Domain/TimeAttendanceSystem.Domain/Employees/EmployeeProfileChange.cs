using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeProfileChange : BaseEntity
{
    public long EmployeeId { get; set; }
    public ProfileChangeType ChangeType { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsApplied { get; set; }
    public DateTime? AppliedAt { get; set; }
    public string FieldName { get; set; } = string.Empty;
    public string? OldValue { get; set; }
    public string? NewValue { get; set; }
    public string? OldDisplayValue { get; set; }
    public string? NewDisplayValue { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public bool IsCorrection { get; set; }
    public long? RelatedEntityId { get; set; }
    public string? RelatedEntityType { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
}
