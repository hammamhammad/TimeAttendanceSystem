using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.SalaryAdjustments.Commands.ApproveSalaryAdjustment;
using TecAxle.Hrms.Application.SalaryAdjustments.Commands.CancelSalaryAdjustment;
using TecAxle.Hrms.Application.SalaryAdjustments.Commands.CreateSalaryAdjustment;
using TecAxle.Hrms.Application.SalaryAdjustments.Commands.DeleteSalaryAdjustment;
using TecAxle.Hrms.Application.SalaryAdjustments.Commands.RejectSalaryAdjustment;
using TecAxle.Hrms.Application.SalaryAdjustments.Commands.SubmitSalaryAdjustment;
using TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustmentById;
using TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustments;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/salary-adjustments")]
[Authorize]
public class SalaryAdjustmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SalaryAdjustmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Gets all salary adjustments with optional filtering and pagination.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] SalaryAdjustmentStatus? status,
        [FromQuery] SalaryAdjustmentType? adjustmentType,
        [FromQuery] long? branchId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetSalaryAdjustmentsQuery(employeeId, status, adjustmentType, branchId, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets a specific salary adjustment by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetSalaryAdjustmentByIdQuery(id));

        if (result.IsFailure)
            return result.Error == "Salary adjustment not found."
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets all salary adjustments for a specific employee.</summary>
    [HttpGet("employees/{employeeId}/salary-adjustments")]
    public async Task<IActionResult> GetByEmployee(
        long employeeId,
        [FromQuery] SalaryAdjustmentStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetSalaryAdjustmentsQuery(employeeId, status, null, null, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Creates a new salary adjustment (draft).</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSalaryAdjustmentCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    /// <summary>Submits a draft salary adjustment for approval.</summary>
    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(long id)
    {
        var result = await _mediator.Send(new SubmitSalaryAdjustmentCommand(id));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Approves a pending salary adjustment.</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var result = await _mediator.Send(new ApproveSalaryAdjustmentCommand(id));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Rejects a pending salary adjustment.</summary>
    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectSalaryAdjustmentRequest request)
    {
        var result = await _mediator.Send(new RejectSalaryAdjustmentCommand(id, request.RejectionReason));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Cancels a draft or pending salary adjustment.</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var result = await _mediator.Send(new CancelSalaryAdjustmentCommand(id));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Deletes a draft salary adjustment (soft delete).</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var result = await _mediator.Send(new DeleteSalaryAdjustmentCommand(id));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public record RejectSalaryAdjustmentRequest(string RejectionReason);
