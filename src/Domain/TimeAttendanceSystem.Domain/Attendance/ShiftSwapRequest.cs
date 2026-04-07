using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Shifts;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Attendance;

public class ShiftSwapRequest : BaseEntity
{
    public long EmployeeId { get; set; }
    public long SwapWithEmployeeId { get; set; }
    public DateTime OriginalDate { get; set; }
    public DateTime SwapDate { get; set; }
    public long? OriginalShiftId { get; set; }
    public long? SwapShiftId { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public ShiftSwapStatus Status { get; set; } = ShiftSwapStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? WorkflowInstanceId { get; set; }

    // Navigation properties
    public Employee Employee { get; set; } = null!;
    public Employee SwapWithEmployee { get; set; } = null!;
    public Shift? OriginalShift { get; set; }
    public Shift? SwapShift { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
