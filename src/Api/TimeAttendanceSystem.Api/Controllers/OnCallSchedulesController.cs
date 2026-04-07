using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.OnCallSchedules.Commands.CreateOnCallSchedule;
using TecAxle.Hrms.Application.OnCallSchedules.Commands.UpdateOnCallSchedule;
using TecAxle.Hrms.Application.OnCallSchedules.Commands.DeleteOnCallSchedule;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallScheduleById;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallSchedules;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.GetCurrentOnCallSchedule;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/on-call-schedules")]
[Authorize]
public class OnCallSchedulesController : ControllerBase
{
    private readonly IMediator _mediator;

    public OnCallSchedulesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] long? employeeId,
        [FromQuery] OnCallType? onCallType,
        [FromQuery] bool? isActive,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetOnCallSchedulesQuery(branchId, employeeId, onCallType, isActive, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetOnCallScheduleByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentOnCall([FromQuery] long? branchId)
    {
        var result = await _mediator.Send(new GetCurrentOnCallScheduleQuery(branchId));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOnCallScheduleCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateOnCallScheduleCommand command)
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var result = await _mediator.Send(new DeleteOnCallScheduleCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}
