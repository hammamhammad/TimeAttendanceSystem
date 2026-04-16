using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Workflows.Commands.ActivateWorkflowDefinition;
using TecAxle.Hrms.Application.Workflows.Commands.CreateWorkflowDefinition;
using TecAxle.Hrms.Application.Workflows.Commands.DeleteWorkflowDefinition;
using TecAxle.Hrms.Application.Workflows.Commands.UpdateWorkflowDefinition;
using TecAxle.Hrms.Application.Workflows.Queries.GetWorkflowDefinitionById;
using TecAxle.Hrms.Application.Workflows.Queries.GetWorkflowDefinitions;
using TecAxle.Hrms.Application.Workflows.Queries.GetWorkflowInstance;
using TecAxle.Hrms.Application.Workflows.Validation;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Controller for managing workflow definitions.
/// </summary>
[ApiController]
[Route("api/v1/workflows")]
[Authorize]
public class WorkflowsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _db;
    private readonly IWorkflowValidationRuleRegistry _validationRegistry;

    public WorkflowsController(
        IMediator mediator,
        IApplicationDbContext db,
        IWorkflowValidationRuleRegistry validationRegistry)
    {
        _mediator = mediator;
        _db = db;
        _validationRegistry = validationRegistry;
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

    /// <summary>
    /// v13.6 — List the validation-rule codes registered in this process. Used by the workflow-step
    /// admin form to populate the "Validation Rule" searchable-select dropdown.
    /// </summary>
    [HttpGet("validation-rules")]
    public IActionResult GetValidationRules()
    {
        var rules = _validationRegistry.All()
            .Select(r => new { ruleCode = r.RuleCode, displayName = r.DisplayName })
            .ToList();
        return Ok(rules);
    }

    /// <summary>
    /// v13.6 — Browse the system-action audit trail for a workflow instance.
    /// Replaces the previous pattern where timeouts / escalations / auto-approvals were attributed
    /// to user "0" with no explanatory detail.
    /// </summary>
    [HttpGet("system-actions")]
    public async Task<IActionResult> GetSystemActions(
        [FromQuery] long? workflowInstanceId = null,
        [FromQuery] WorkflowSystemActionType? actionType = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);

        var q = _db.WorkflowSystemActionAudits.AsNoTracking();
        if (workflowInstanceId.HasValue) q = q.Where(a => a.WorkflowInstanceId == workflowInstanceId.Value);
        if (actionType.HasValue) q = q.Where(a => a.ActionType == actionType.Value);
        if (fromDate.HasValue) q = q.Where(a => a.TriggeredAtUtc >= fromDate.Value);
        if (toDate.HasValue) q = q.Where(a => a.TriggeredAtUtc <= toDate.Value);

        var total = await q.CountAsync();
        var items = await q
            .OrderByDescending(a => a.TriggeredAtUtc)
            .Skip((page - 1) * pageSize).Take(pageSize)
            .Select(a => new
            {
                id = a.Id,
                workflowInstanceId = a.WorkflowInstanceId,
                stepExecutionId = a.StepExecutionId,
                actionType = a.ActionType,
                triggeredAtUtc = a.TriggeredAtUtc,
                systemUserId = a.SystemUserId,
                reason = a.Reason,
                detailsJson = a.DetailsJson
            })
            .ToListAsync();

        return Ok(new { total, page, pageSize, items });
    }

    /// <summary>
    /// v13.6 — Snapshot of role-assignment cursor state + least-pending counts for a role.
    /// Used by HR ops to debug why a particular approver keeps winning round-robin rotations.
    /// </summary>
    [HttpGet("role-assignment-stats")]
    public async Task<IActionResult> GetRoleAssignmentStats([FromQuery] long roleId)
    {
        var cursor = await _db.WorkflowRoleAssignmentCursors.AsNoTracking()
            .FirstOrDefaultAsync(c => c.RoleId == roleId);

        var candidates = await _db.UserRoles.AsNoTracking()
            .Where(ur => ur.RoleId == roleId && ur.User.IsActive)
            .Select(ur => new { ur.UserId, ur.Priority, ur.User.Username })
            .ToListAsync();

        var pendingCounts = await _db.WorkflowStepExecutions.AsNoTracking()
            .Where(e => candidates.Select(c => c.UserId).Contains(e.AssignedToUserId) && !e.Action.HasValue)
            .GroupBy(e => e.AssignedToUserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToListAsync();

        return Ok(new
        {
            roleId,
            cursor = cursor == null ? null : new
            {
                cursor.LastAssignedUserId,
                cursor.LastAssignedAtUtc
            },
            candidates = candidates.Select(c => new
            {
                c.UserId,
                c.Username,
                c.Priority,
                pendingCount = pendingCounts.FirstOrDefault(p => p.UserId == c.UserId)?.Count ?? 0
            })
        });
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
    bool RequireCommentsOnReject,
    // v13.6 — Workflow Routing Hardening
    RoleAssignmentStrategy RoleAssignmentStrategy = RoleAssignmentStrategy.LeastPendingApprovals,
    bool AllowReturnForCorrection = false,
    string? ValidationRuleCode = null,
    string? ValidationConfigJson = null
);
