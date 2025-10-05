using MediatR;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicyById;

/// <summary>
/// Query to get a specific remote work policy by ID.
/// </summary>
public class GetRemoteWorkPolicyByIdQuery : IRequest<RemoteWorkPolicyDto?>
{
    public long Id { get; set; }
}