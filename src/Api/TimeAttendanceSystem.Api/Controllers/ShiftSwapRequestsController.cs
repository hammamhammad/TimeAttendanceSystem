using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CancelShiftSwapRequest;
using TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CreateShiftSwapRequest;
using TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerApproveShiftSwap;
using TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerRejectShiftSwap;
using TecAxle.Hrms.Application.ShiftSwapRequests.Commands.UpdateShiftSwapRequest;
using TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequestById;
using TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequests;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/shift-swap-requests")]
[Authorize]
public class ShiftSwapRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ShiftSwapRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] long? departmentId,
        [FromQuery] long? employeeId,
        [FromQuery] ShiftSwapStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetShiftSwapRequestsQuery(branchId, departmentId, employeeId, status, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetShiftSwapRequestByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateShiftSwapRequestCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateShiftSwapRequestCommand command)
    {
        if (id != command.Id)
            return BadRequest(new { error = "Route id does not match command id." });

        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/partner-approve")]
    public async Task<IActionResult> PartnerApprove(long id)
    {
        var result = await _mediator.Send(new PartnerApproveShiftSwapCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/partner-reject")]
    public async Task<IActionResult> PartnerReject(long id, [FromBody] PartnerRejectRequest request)
    {
        var result = await _mediator.Send(new PartnerRejectShiftSwapCommand(id, request.RejectionReason));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Cancel(long id)
    {
        var result = await _mediator.Send(new CancelShiftSwapRequestCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public class PartnerRejectRequest
{
    public string? RejectionReason { get; set; }
}
