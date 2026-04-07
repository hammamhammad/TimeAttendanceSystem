using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.EmployeePromotions.Commands.ApproveEmployeePromotion;
using TecAxle.Hrms.Application.EmployeePromotions.Commands.CancelEmployeePromotion;
using TecAxle.Hrms.Application.EmployeePromotions.Commands.CreateEmployeePromotion;
using TecAxle.Hrms.Application.EmployeePromotions.Commands.DeleteEmployeePromotion;
using TecAxle.Hrms.Application.EmployeePromotions.Commands.RejectEmployeePromotion;
using TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotionById;
using TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-promotions")]
[Authorize]
public class EmployeePromotionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeePromotionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] long? branchId,
        [FromQuery] PromotionStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetEmployeePromotionsQuery(employeeId, branchId, status, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetEmployeePromotionByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeePromotionCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApprovePromotionRequest? request = null)
    {
        var result = await _mediator.Send(new ApproveEmployeePromotionCommand(id, request?.Comments));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectPromotionRequest request)
    {
        var result = await _mediator.Send(new RejectEmployeePromotionCommand(id, request.RejectionReason));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var result = await _mediator.Send(new CancelEmployeePromotionCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var result = await _mediator.Send(new DeleteEmployeePromotionCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public record ApprovePromotionRequest(string? Comments);
public record RejectPromotionRequest(string RejectionReason);
