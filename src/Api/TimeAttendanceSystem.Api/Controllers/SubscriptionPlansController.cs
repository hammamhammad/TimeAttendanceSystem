using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Subscriptions.Commands.CreatePlan;
using TecAxle.Hrms.Application.Subscriptions.Commands.UpdatePlan;
using TecAxle.Hrms.Application.Subscriptions.Commands.DeletePlan;
using TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlanById;
using TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlans;

namespace TecAxle.Hrms.Api.Controllers;

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

    [HttpGet]
    public async Task<IActionResult> GetSubscriptionPlans()
    {
        var result = await _mediator.Send(new GetSubscriptionPlansQuery());
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubscriptionPlanById(long id)
    {
        var result = await _mediator.Send(new GetSubscriptionPlanByIdQuery(id));
        return result.IsFailure ? NotFound(new { error = result.Error }) : Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSubscriptionPlan([FromBody] CreatePlanRequest request)
    {
        var command = new CreateSubscriptionPlanCommand(
            request.Code, request.Name, request.NameAr,
            request.Description, request.DescriptionAr, request.Tier,
            request.MonthlyPriceUsd, request.AnnualPriceUsd, request.Currency ?? "USD",
            request.Modules ?? new(), request.Limits ?? new(),
            request.IsPublic, request.IsActive, request.SortOrder);

        var result = await _mediator.Send(command);
        return result.IsFailure
            ? BadRequest(new { error = result.Error })
            : CreatedAtAction(nameof(GetSubscriptionPlanById), new { id = result.Value }, new { id = result.Value });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubscriptionPlan(long id, [FromBody] UpdatePlanRequest request)
    {
        var command = new UpdateSubscriptionPlanCommand(
            id, request.Name, request.NameAr,
            request.Description, request.DescriptionAr, request.Tier,
            request.MonthlyPriceUsd, request.AnnualPriceUsd, request.Currency ?? "USD",
            request.Modules ?? new(), request.Limits ?? new(),
            request.IsPublic, request.IsActive, request.SortOrder);

        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(new { message = "Plan updated." });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubscriptionPlan(long id)
    {
        var result = await _mediator.Send(new DeleteSubscriptionPlanCommand(id));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(new { message = "Plan deleted." });
    }
}

public record CreatePlanRequest(
    string Code, string Name, string? NameAr,
    string? Description, string? DescriptionAr, string Tier,
    decimal MonthlyPriceUsd, decimal AnnualPriceUsd, string? Currency,
    List<string>? Modules, Dictionary<string, int>? Limits,
    bool IsPublic = true, bool IsActive = true, int SortOrder = 0);

public record UpdatePlanRequest(
    string Name, string? NameAr,
    string? Description, string? DescriptionAr, string Tier,
    decimal MonthlyPriceUsd, decimal AnnualPriceUsd, string? Currency,
    List<string>? Modules, Dictionary<string, int>? Limits,
    bool IsPublic = true, bool IsActive = true, int SortOrder = 0);
