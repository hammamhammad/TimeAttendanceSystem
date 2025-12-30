using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.DeleteWorkflowDefinition;

/// <summary>
/// CQRS command for soft-deleting a workflow definition.
/// </summary>
public record DeleteWorkflowDefinitionCommand(long Id) : IRequest<Result<bool>>;
