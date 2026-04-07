using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.LeaveEncashments.Commands.ApproveLeaveEncashment;
using TecAxle.Hrms.Application.LeaveEncashments.Commands.CreateLeaveEncashment;
using TecAxle.Hrms.Application.LeaveEncashments.Commands.RejectLeaveEncashment;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.GetEligibleLeaveEncashment;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashmentById;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashments;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/leave-encashments")]
[Authorize]
public class LeaveEncashmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public LeaveEncashmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] long? employeeId,
        [FromQuery] int? year,
        [FromQuery] LeaveEncashmentStatus? status,
        [FromQuery] long? vacationTypeId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetLeaveEncashmentsQuery(branchId, employeeId, year, status, vacationTypeId, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetLeaveEncashmentByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("employee/{employeeId}/eligible")]
    public async Task<IActionResult> GetEligible(long employeeId)
    {
        var result = await _mediator.Send(new GetEligibleLeaveEncashmentQuery(employeeId));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLeaveEncashmentCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var result = await _mediator.Send(new ApproveLeaveEncashmentCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectLeaveEncashmentRequest request)
    {
        var result = await _mediator.Send(new RejectLeaveEncashmentCommand(id, request.Notes));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public class RejectLeaveEncashmentRequest
{
    public string? Notes { get; set; }
}
