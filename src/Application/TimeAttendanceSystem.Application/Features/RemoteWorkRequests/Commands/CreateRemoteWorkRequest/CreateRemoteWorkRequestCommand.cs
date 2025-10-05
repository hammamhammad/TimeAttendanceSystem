using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.CreateRemoteWorkRequest;

/// <summary>
/// Command to create a remote work request for an employee.
/// If RemoteWorkPolicyId is not provided, the active policy for the employee's branch will be used automatically.
/// Status defaults to Approved if not specified (for HR entry).
/// </summary>
public class CreateRemoteWorkRequestCommand : IRequest<Result<long>>
{
    public long EmployeeId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Reason { get; set; }
    public long CreatedByUserId { get; set; }
    public long? RemoteWorkPolicyId { get; set; }
    public RemoteWorkRequestStatus Status { get; set; } = RemoteWorkRequestStatus.Approved;
    public string? ApprovalComments { get; set; }
}