using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.ActivateWorkflowDefinition;

/// <summary>
/// CQRS command for activating or deactivating a workflow definition.
/// </summary>
public record ActivateWorkflowDefinitionCommand(long Id, bool IsActive) : IRequest<Result<bool>>;
