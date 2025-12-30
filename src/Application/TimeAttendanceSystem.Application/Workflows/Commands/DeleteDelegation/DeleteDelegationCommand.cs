using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.DeleteDelegation;

/// <summary>
/// CQRS command for deleting an approval delegation.
/// </summary>
public record DeleteDelegationCommand(long Id) : IRequest<Result<bool>>;
