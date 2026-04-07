using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Workflows.Enums;
using TecAxle.Hrms.Application.Workflows.Commands.CreateWorkflowDefinition;

namespace TecAxle.Hrms.Application.Workflows.Commands.UpdateWorkflowDefinition;

/// <summary>
/// CQRS command for updating an existing workflow definition.
/// </summary>
public record UpdateWorkflowDefinitionCommand(
    long Id,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    bool IsDefault,
    List<CreateWorkflowStepDto> Steps
) : IRequest<Result<bool>>;
