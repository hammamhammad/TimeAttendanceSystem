using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.DeleteDelegation;

/// <summary>
/// CQRS command for deleting an approval delegation.
/// </summary>
public record DeleteDelegationCommand(long Id) : IRequest<Result<bool>>;
