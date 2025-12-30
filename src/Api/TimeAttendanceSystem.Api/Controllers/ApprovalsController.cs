using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Workflows.Commands.ApproveStep;
using TimeAttendanceSystem.Application.Workflows.Commands.CancelWorkflow;
using TimeAttendanceSystem.Application.Workflows.Commands.CreateDelegation;
using TimeAttendanceSystem.Application.Workflows.Commands.DelegateApproval;
using TimeAttendanceSystem.Application.Workflows.Commands.DeleteDelegation;
using TimeAttendanceSystem.Application.Workflows.Commands.RejectStep;
using TimeAttendanceSystem.Application.Workflows.Queries.GetApprovalHistory;
using TimeAttendanceSystem.Application.Workflows.Queries.GetPendingApprovals;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using System.Security.Claims;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing approvals and approval actions.
/// </summary>
[ApiController]
[Route("api/v1/approvals")]
[Authorize]
public class ApprovalsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ApprovalsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get pending approvals for the current user.
    /// </summary>
    [HttpGet("pending")]
    public async Task<IActionResult> GetPendingApprovals(
        [FromQuery] WorkflowEntityType? entityType = null,
        [FromQuery] bool? isOverdue = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var query = new GetPendingApprovalsQuery
        {
            UserId = userId.Value,
            EntityType = entityType,
            IsOverdue = isOverdue,
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
    /// Get approval history for the current user.
    /// </summary>
    [HttpGet("history")]
    public async Task<IActionResult> GetApprovalHistory(
        [FromQuery] WorkflowEntityType? entityType = null,
        [FromQuery] ApprovalAction? action = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var query = new GetApprovalHistoryQuery
        {
            UserId = userId.Value,
            EntityType = entityType,
            Action = action,
            FromDate = fromDate,
            ToDate = toDate,
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
    /// Approve a workflow step.
    /// </summary>
    [HttpPost("{workflowInstanceId}/approve")]
    public async Task<IActionResult> ApproveStep(long workflowInstanceId, [FromBody] ApprovalActionRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var command = new ApproveStepCommand(workflowInstanceId, userId.Value, request.Comments);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Reject a workflow step.
    /// </summary>
    [HttpPost("{workflowInstanceId}/reject")]
    public async Task<IActionResult> RejectStep(long workflowInstanceId, [FromBody] ApprovalActionRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        if (string.IsNullOrWhiteSpace(request.Comments))
        {
            return BadRequest(new { error = "Comments are required when rejecting a request." });
        }

        var command = new RejectStepCommand(workflowInstanceId, userId.Value, request.Comments);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Delegate a workflow step to another user.
    /// </summary>
    [HttpPost("{workflowInstanceId}/delegate")]
    public async Task<IActionResult> DelegateStep(long workflowInstanceId, [FromBody] DelegateActionRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var command = new DelegateApprovalCommand(
            workflowInstanceId,
            userId.Value,
            request.DelegateToUserId,
            request.Comments
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Cancel a workflow instance.
    /// </summary>
    [HttpPost("{workflowInstanceId}/cancel")]
    public async Task<IActionResult> CancelWorkflow(long workflowInstanceId, [FromBody] CancelWorkflowRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var command = new CancelWorkflowCommand(workflowInstanceId, userId.Value, request.Reason);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    // Delegation Management

    /// <summary>
    /// Create a new approval delegation.
    /// </summary>
    [HttpPost("delegations")]
    public async Task<IActionResult> CreateDelegation([FromBody] CreateDelegationRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var command = new CreateDelegationCommand(
            userId.Value,
            request.DelegateUserId,
            request.EntityTypes ?? new List<WorkflowEntityType>(),
            request.StartDate,
            request.EndDate,
            true // IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { id = result.Value });
    }

    /// <summary>
    /// Delete an approval delegation.
    /// </summary>
    [HttpDelete("delegations/{id}")]
    public async Task<IActionResult> DeleteDelegation(long id)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        // Note: DeleteDelegationCommand only takes Id, validation that user owns the delegation
        // should be done in the handler
        var command = new DeleteDelegationCommand(id);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    private long? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("sub")?.Value
            ?? User.FindFirst("userId")?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out var userId))
        {
            return null;
        }

        return userId;
    }
}

// Request DTOs

public record ApprovalActionRequest(
    string? Comments
);

public record DelegateActionRequest(
    long DelegateToUserId,
    string? Comments
);

public record CancelWorkflowRequest(
    string? Reason
);

public record CreateDelegationRequest(
    long DelegateUserId,
    List<WorkflowEntityType>? EntityTypes,
    DateTime StartDate,
    DateTime EndDate
);
