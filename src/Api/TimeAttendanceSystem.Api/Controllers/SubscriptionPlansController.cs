using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlanById;
using TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlans;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Controller for managing subscription plans.
/// All endpoints require SystemAdmin role.
/// </summary>
[ApiController]
[Route("api/v1/subscription-plans")]
[Authorize(Roles = "SystemAdmin")]
public class SubscriptionPlansController : ControllerBase
{
    private readonly IMediator _mediator;

    public SubscriptionPlansController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// List all subscription plans with module entitlements and limits.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetSubscriptionPlans()
    {
        var query = new GetSubscriptionPlansQuery();
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Get a subscription plan by ID with full details.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubscriptionPlanById(long id)
    {
        var query = new GetSubscriptionPlanByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }
}
