using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.CancelRemoteWorkRequest;

/// <summary>
/// Command to cancel a remote work request.
/// </summary>
public class CancelRemoteWorkRequestCommand : IRequest<Result>
{
    public long Id { get; set; }
}