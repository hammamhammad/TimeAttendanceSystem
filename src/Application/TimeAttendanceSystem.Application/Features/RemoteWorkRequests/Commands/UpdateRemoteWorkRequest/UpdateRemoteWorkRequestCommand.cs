using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.UpdateRemoteWorkRequest;

/// <summary>
/// Command to update an existing remote work request.
/// HR can update dates, reason, status, and approval comments.
/// Employee assignment cannot be changed.
/// </summary>
[RequiresModule(SystemModule.RemoteWork)]
public class UpdateRemoteWorkRequestCommand : IRequest<Result>
{
    public long Id { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Reason { get; set; }
    public RemoteWorkRequestStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public string? ApprovalComments { get; set; }
}
