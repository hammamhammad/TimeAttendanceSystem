using MediatR;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicyById;

/// <summary>
/// Query to get a specific remote work policy by ID.
/// </summary>
[RequiresModule(SystemModule.RemoteWork, AllowReadWhenDisabled = true)]
public class GetRemoteWorkPolicyByIdQuery : IRequest<RemoteWorkPolicyDto?>
{
    public long Id { get; set; }
}