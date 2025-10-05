using MediatR;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequests;

/// <summary>
/// Query to get remote work requests with optional filtering.
/// </summary>
public class GetRemoteWorkRequestsQuery : IRequest<List<RemoteWorkRequestDto>>
{
    public long? EmployeeId { get; set; }
    public RemoteWorkRequestStatus? Status { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
}