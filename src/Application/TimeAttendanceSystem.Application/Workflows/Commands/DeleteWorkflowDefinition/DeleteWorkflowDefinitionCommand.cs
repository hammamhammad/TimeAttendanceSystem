using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.DeleteWorkflowDefinition;

/// <summary>
/// CQRS command for soft-deleting a workflow definition.
/// </summary>
public record DeleteWorkflowDefinitionCommand(long Id) : IRequest<Result<bool>>;
