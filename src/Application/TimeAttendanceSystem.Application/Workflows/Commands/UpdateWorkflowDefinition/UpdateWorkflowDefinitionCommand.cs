using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using TimeAttendanceSystem.Application.Workflows.Commands.CreateWorkflowDefinition;

namespace TimeAttendanceSystem.Application.Workflows.Commands.UpdateWorkflowDefinition;

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
