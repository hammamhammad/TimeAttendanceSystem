using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.CancelRemoteWorkRequest;

/// <summary>
/// Command to cancel a remote work request.
/// </summary>
[RequiresModule(SystemModule.RemoteWork)]
public class CancelRemoteWorkRequestCommand : IRequest<Result>
{
    public long Id { get; set; }
}