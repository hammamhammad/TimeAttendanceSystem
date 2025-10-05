using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries;

/// <summary>
/// DTO for remote work request information.
/// </summary>
public class RemoteWorkRequestDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Reason { get; set; }
    public long CreatedByUserId { get; set; }
    public string? CreatedByUserName { get; set; }
    public RemoteWorkRequestStatus Status { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? ApprovedByUserName { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? RejectionReason { get; set; }
    public long RemoteWorkPolicyId { get; set; }
    public int WorkingDaysCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
}