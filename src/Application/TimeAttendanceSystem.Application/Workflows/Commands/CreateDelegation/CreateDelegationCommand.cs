using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.CreateDelegation;

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
