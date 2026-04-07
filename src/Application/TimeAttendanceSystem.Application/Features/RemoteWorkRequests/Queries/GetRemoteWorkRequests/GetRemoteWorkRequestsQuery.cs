using MediatR;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequests;

/// <summary>
/// Query to get remote work requests with optional filtering.
/// </summary>
[RequiresModule(SystemModule.RemoteWork, AllowReadWhenDisabled = true)]
public class GetRemoteWorkRequestsQuery : IRequest<List<RemoteWorkRequestDto>>
{
    public long? EmployeeId { get; set; }
    public RemoteWorkRequestStatus? Status { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
}