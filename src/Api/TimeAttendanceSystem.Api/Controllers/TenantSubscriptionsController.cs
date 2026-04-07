using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Subscriptions.Commands.AssignPlan;
using TecAxle.Hrms.Application.Subscriptions.Commands.CancelSubscription;
using TecAxle.Hrms.Application.Subscriptions.Commands.ChangePlan;
using TecAxle.Hrms.Application.Subscriptions.Queries.GetTenantSubscription;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Controller for managing tenant subscriptions.
/// All endpoints require SystemAdmin role.
/// </summary>
[ApiController]
[Route("api/v1/tenants/{tenantId}/subscription")]
[Authorize(Roles = "SystemAdmin")]
public class TenantSubscriptionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TenantSubscriptionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get the active subscription for a tenant.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetTenantSubscription(long tenantId)
    {
        var query = new GetTenantSubscriptionQuery(tenantId);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Assign a subscription plan to a tenant. If the tenant already has an active
    /// subscription, it will be cancelled and replaced with the new one.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AssignPlan(long tenantId, [FromBody] AssignPlanRequest request)
    {
        var command = new AssignPlanCommand(
            tenantId,
            request.PlanId,
            request.BillingCycle,
            request.Notes
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetTenantSubscription), new { tenantId }, new { id = result.Value });
    }

    /// <summary>
    /// Change the subscription plan for a tenant. The current billing period
    /// is reset to start from now with the new plan.
    /// </summary>
    [HttpPut("change-plan")]
    public async Task<IActionResult> ChangePlan(long tenantId, [FromBody] ChangePlanRequest request)
    {
        var command = new ChangePlanCommand(
            tenantId,
            request.NewPlanId,
            request.Notes
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Cancel the active subscription for a tenant. The subscription remains
    /// effective until the end of the current billing period.
    /// </summary>
    [HttpPost("cancel")]
    public async Task<IActionResult> CancelSubscription(long tenantId)
    {
        var command = new CancelSubscriptionCommand(tenantId);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

// ── Request Models ───────────────────────────────────────────────────

public record AssignPlanRequest(
    long PlanId,
    string BillingCycle,
    string? Notes = null
);

public record ChangePlanRequest(
    long NewPlanId,
    string? Notes = null
);
