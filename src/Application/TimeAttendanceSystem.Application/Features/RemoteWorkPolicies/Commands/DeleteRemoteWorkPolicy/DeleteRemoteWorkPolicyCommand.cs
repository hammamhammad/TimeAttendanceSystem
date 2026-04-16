using MediatR;

namespace TecAxle.Hrms.Application.Features.RemoteWorkPolicies.Commands.DeleteRemoteWorkPolicy;

/// <summary>
/// Command to delete (soft delete) a remote work policy.
/// </summary>
public class DeleteRemoteWorkPolicyCommand : IRequest<Unit>
{
    public long Id { get; set; }
}