using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;

/// <summary>
/// Query to get a remote work request by ID.
/// </summary>
public class GetRemoteWorkRequestByIdQuery : IRequest<Result<RemoteWorkRequestDto>>
{
    public long Id { get; set; }
}
