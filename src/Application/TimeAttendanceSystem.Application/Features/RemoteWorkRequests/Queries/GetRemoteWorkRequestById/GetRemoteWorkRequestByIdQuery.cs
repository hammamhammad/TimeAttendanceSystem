using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;

/// <summary>
/// Query to get a remote work request by ID.
/// </summary>
public class GetRemoteWorkRequestByIdQuery : IRequest<Result<RemoteWorkRequestDto>>
{
    public long Id { get; set; }
}
