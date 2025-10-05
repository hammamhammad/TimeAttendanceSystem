using MediatR;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.ToggleRemoteWorkPolicyStatus;

/// <summary>
/// Command to toggle the active status of a remote work policy.
/// </summary>
public class ToggleRemoteWorkPolicyStatusCommand : IRequest<Unit>
{
    public long Id { get; set; }
}