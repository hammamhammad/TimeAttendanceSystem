using MediatR;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkPolicies.Commands.ToggleRemoteWorkPolicyStatus;

/// <summary>
/// Command to toggle the active status of a remote work policy.
/// </summary>
[RequiresModule(SystemModule.RemoteWork)]
public class ToggleRemoteWorkPolicyStatusCommand : IRequest<Unit>
{
    public long Id { get; set; }
}