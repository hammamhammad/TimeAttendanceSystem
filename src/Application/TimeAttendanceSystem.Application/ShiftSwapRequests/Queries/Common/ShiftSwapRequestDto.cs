using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Queries.Common;

public class ShiftSwapRequestDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public long SwapWithEmployeeId { get; set; }
    public string SwapWithEmployeeName { get; set; } = string.Empty;
    public string? SwapWithEmployeeNameAr { get; set; }
    public DateTime OriginalDate { get; set; }
    public DateTime SwapDate { get; set; }
    public long? OriginalShiftId { get; set; }
    public string? OriginalShiftName { get; set; }
    public long? SwapShiftId { get; set; }
    public string? SwapShiftName { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public ShiftSwapStatus Status { get; set; }
    public string StatusName { get; set; } = string.Empty;
    public string? RejectionReason { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
