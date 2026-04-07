using MediatR;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicies;

/// <summary>
/// Query to get all remote work policies with optional filtering.
/// </summary>
[RequiresModule(SystemModule.RemoteWork, AllowReadWhenDisabled = true)]
public class GetRemoteWorkPoliciesQuery : IRequest<List<RemoteWorkPolicyDto>>
{
    public long? BranchId { get; set; }
    public bool? IsActive { get; set; }
}