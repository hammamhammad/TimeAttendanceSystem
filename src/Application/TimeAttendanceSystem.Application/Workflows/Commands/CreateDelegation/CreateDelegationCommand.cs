using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Commands.CreateDelegation;

/// <summary>
/// CQRS command for creating an approval delegation.
/// </summary>
public record CreateDelegationCommand(
    long DelegatorUserId,
    long DelegateUserId,
    List<WorkflowEntityType> EntityTypes,
    DateTime StartDate,
    DateTime EndDate,
    bool IsActive = true
) : IRequest<Result<long>>;
