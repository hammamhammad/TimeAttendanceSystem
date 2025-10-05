using MediatR;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicies;

/// <summary>
/// Query to get all remote work policies with optional filtering.
/// </summary>
public class GetRemoteWorkPoliciesQuery : IRequest<List<RemoteWorkPolicyDto>>
{
    public long? BranchId { get; set; }
    public bool? IsActive { get; set; }
}