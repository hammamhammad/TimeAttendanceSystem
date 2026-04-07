using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;

/// <summary>
/// Query to get a remote work request by ID.
/// </summary>
[RequiresModule(SystemModule.RemoteWork, AllowReadWhenDisabled = true)]
public class GetRemoteWorkRequestByIdQuery : IRequest<Result<RemoteWorkRequestDto>>
{
    public long Id { get; set; }
}
