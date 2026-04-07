using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Offboarding;

public class ClearanceChecklist : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public ClearanceStatus OverallStatus { get; set; } = ClearanceStatus.Pending;
    public DateTime? CompletedAt { get; set; }

    // Navigation
    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public ICollection<ClearanceItem> Items { get; set; } = new List<ClearanceItem>();
}

public class ClearanceItem : BaseEntity
{
    public long ClearanceChecklistId { get; set; }
    public ClearanceDepartment Department { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string? ItemNameAr { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public long? CompletedByUserId { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }
    public int DisplayOrder { get; set; }

    // Navigation
    public ClearanceChecklist ClearanceChecklist { get; set; } = null!;
}
