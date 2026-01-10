using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Workflows.Commands.ActivateWorkflowDefinition;
using TimeAttendanceSystem.Application.Workflows.Commands.CreateWorkflowDefinition;
using TimeAttendanceSystem.Application.Workflows.Commands.DeleteWorkflowDefinition;
using TimeAttendanceSystem.Application.Workflows.Commands.UpdateWorkflowDefinition;
using TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowDefinitionById;
using TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowDefinitions;
using TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowInstance;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing workflow definitions.
/// </summary>
[ApiController]
[Route("api/v1/workflows")]
[Authorize]
public class WorkflowsController : ControllerBase
{
    private readonly IMediator _mediator;

    public WorkflowsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all workflow definitions with filtering and pagination.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetWorkflowDefinitions(
        [FromQuery] WorkflowEntityType? entityType = null,
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? searchTerm = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetWorkflowDefinitionsQuery
        {
            EntityType = entityType,
            BranchId = branchId,
            IsActive = isActive,
            SearchTerm = searchTerm,
            Page = page,
            PageSize = pageSize
        };

        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Get a specific workflow definition by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetWorkflowDefinitionById(long id)
    {
        var query = new GetWorkflowDefinitionByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Create a new workflow definition.
    /// </summary>
    [HttpPost]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<IActionResult> CreateWorkflowDefinition([FromBody] CreateWorkflowDefinitionRequest request)
    {
        var steps = request.Steps.Select(s => new CreateWorkflowStepDto(
            s.StepOrder,
            s.Name,
            s.NameAr,
            s.StepType,
            s.ApproverType,
            s.ApproverRoleId,
            s.ApproverUserId,
            s.ConditionJson,
            s.TimeoutHours,
            s.TimeoutAction,
            null, // EscalationStepId
            null, // OnApproveNextStepId
            null, // OnRejectNextStepId
            s.AllowDelegation,
            s.NotifyOnAction,
            s.NotifyRequesterOnReach,
            s.ApproverInstructions,
            s.ApproverInstructionsAr,
            s.RequireCommentsOnApprove,
            s.RequireCommentsOnReject
        )).ToList();

        var command = new CreateWorkflowDefinitionCommand(
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.EntityType,
            request.BranchId,
            request.IsDefault,
            steps
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetWorkflowDefinitionById), new { id = result.Value }, new { id = result.Value });
    }

    /// <summary>
    /// Update an existing workflow definition.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<IActionResult> UpdateWorkflowDefinition(long id, [FromBody] UpdateWorkflowDefinitionRequest request)
    {
        var steps = request.Steps.Select(s => new CreateWorkflowStepDto(
            s.StepOrder,
            s.Name,
            s.NameAr,
            s.StepType,
            s.ApproverType,
            s.ApproverRoleId,
            s.ApproverUserId,
            s.ConditionJson,
            s.TimeoutHours,
            s.TimeoutAction,
            null, // EscalationStepId
            null, // OnApproveNextStepId
            null, // OnRejectNextStepId
            s.AllowDelegation,
            s.NotifyOnAction,
            s.NotifyRequesterOnReach,
            s.ApproverInstructions,
            s.ApproverInstructionsAr,
            s.RequireCommentsOnApprove,
            s.RequireCommentsOnReject
        )).ToList();

        // Note: UpdateWorkflowDefinitionCommand does not include BranchId
        var command = new UpdateWorkflowDefinitionCommand(
            id,
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.IsDefault,
            steps
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Delete a workflow definition.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<IActionResult> DeleteWorkflowDefinition(long id)
    {
        var command = new DeleteWorkflowDefinitionCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Activate a workflow definition.
    /// </summary>
    [HttpPost("{id}/activate")]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<IActionResult> ActivateWorkflowDefinition(long id)
    {
        var command = new ActivateWorkflowDefinitionCommand(id, true);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Deactivate a workflow definition.
    /// </summary>
    [HttpPost("{id}/deactivate")]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<IActionResult> DeactivateWorkflowDefinition(long id)
    {
        var command = new ActivateWorkflowDefinitionCommand(id, false);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Get a workflow instance by ID or by entity reference.
    /// </summary>
    [HttpGet("instances/{id}")]
    public async Task<IActionResult> GetWorkflowInstance(long id)
    {
        var query = new GetWorkflowInstanceQuery { WorkflowInstanceId = id };
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Get a workflow instance by entity type and ID.
    /// </summary>
    [HttpGet("instances")]
    public async Task<IActionResult> GetWorkflowInstanceByEntity(
        [FromQuery] WorkflowEntityType entityType,
        [FromQuery] long entityId)
    {
        var query = new GetWorkflowInstanceQuery
        {
            EntityType = entityType,
            EntityId = entityId
        };
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }
}

// Request DTOs

public record CreateWorkflowDefinitionRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    WorkflowEntityType EntityType,
    long? BranchId,
    bool IsDefault,
    List<WorkflowStepRequest> Steps
);

public record UpdateWorkflowDefinitionRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? BranchId,
    bool IsDefault,
    List<WorkflowStepRequest> Steps
);

public record WorkflowStepRequest(
    int StepOrder,
    string Name,
    string? NameAr,
    WorkflowStepType StepType,
    ApproverType ApproverType,
    long? ApproverRoleId,
    long? ApproverUserId,
    string? ConditionJson,
    int? TimeoutHours,
    TimeoutAction TimeoutAction,
    bool AllowDelegation,
    bool NotifyOnAction,
    bool NotifyRequesterOnReach,
    string? ApproverInstructions,
    string? ApproverInstructionsAr,
    bool RequireCommentsOnApprove,
    bool RequireCommentsOnReject
);
