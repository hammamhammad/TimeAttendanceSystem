using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Assets;

public class AssetAssignment : BaseEntity
{
    public long AssetId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime AssignedDate { get; set; }
    public DateTime? ExpectedReturnDate { get; set; }
    public DateTime? ActualReturnDate { get; set; }
    public AssetAssignmentStatus Status { get; set; }
    public string? AssignmentNotes { get; set; }
    public string? ReturnNotes { get; set; }
    public AssetCondition? ReturnCondition { get; set; }
    public long? AssignedByUserId { get; set; }
    public long? ReturnReceivedByUserId { get; set; }

    // Navigation
    public Asset Asset { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
