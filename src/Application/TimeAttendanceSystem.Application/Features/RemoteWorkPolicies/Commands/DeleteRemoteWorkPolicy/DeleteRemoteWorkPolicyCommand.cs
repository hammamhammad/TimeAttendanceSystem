using MediatR;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkPolicies.Commands.DeleteRemoteWorkPolicy;

/// <summary>
/// Command to delete (soft delete) a remote work policy.
/// </summary>
[RequiresModule(SystemModule.RemoteWork)]
public class DeleteRemoteWorkPolicyCommand : IRequest<Unit>
{
    public long Id { get; set; }
}