using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.FinalSettlements.Commands.ApproveFinalSettlement;
using TecAxle.Hrms.Application.FinalSettlements.Commands.CalculateFinalSettlement;
using TecAxle.Hrms.Application.FinalSettlements.Commands.MarkFinalSettlementPaid;
using TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlementByTermination;
using TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlements;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/final-settlements")]
[Authorize]
public class FinalSettlementsController : ControllerBase
{
    private readonly IMediator _mediator;

    public FinalSettlementsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] SettlementStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetFinalSettlementsQuery(branchId, status, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{terminationId}")]
    public async Task<IActionResult> GetByTermination(long terminationId)
    {
        var result = await _mediator.Send(new GetFinalSettlementByTerminationQuery(terminationId));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("{terminationId}/calculate")]
    public async Task<IActionResult> Calculate(long terminationId)
    {
        var result = await _mediator.Send(new CalculateFinalSettlementCommand(terminationId));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPost("{terminationId}/approve")]
    public async Task<IActionResult> Approve(long terminationId)
    {
        var result = await _mediator.Send(new ApproveFinalSettlementCommand(terminationId));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{terminationId}/mark-paid")]
    public async Task<IActionResult> MarkPaid(long terminationId)
    {
        var result = await _mediator.Send(new MarkFinalSettlementPaidCommand(terminationId));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}
