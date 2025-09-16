using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;
using TimeAttendanceSystem.Application.Shifts.Queries.GetShiftById;
using TimeAttendanceSystem.Application.Shifts.Commands.CreateShift;
using TimeAttendanceSystem.Application.Shifts.Commands.UpdateShift;
using TimeAttendanceSystem.Application.Shifts.Commands.DeleteShift;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Api.Models;

namespace TimeAttendanceSystem.Api.Controllers;

[ApiController]
[Route("api/v1/shifts")]
[Authorize]
public class ShiftsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ShiftsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetShifts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var query = new GetShiftsQuery(page, pageSize, search);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetShiftById(long id)
    {
        var query = new GetShiftByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        if (result.Value == null)
        {
            return NotFound();
        }

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> CreateShift([FromBody] CreateShiftRequest request)
    {
        var command = new CreateShiftCommand(
            request.Name,
            request.Description,
            request.ShiftType,
            request.RequiredHours,
            request.Status ?? ShiftStatus.Active,
            request.IsCheckInRequired ?? true,
            request.IsAutoCheckOut ?? false,
            request.AllowFlexibleHours ?? false,
            request.FlexMinutesBefore,
            request.FlexMinutesAfter,
            request.GracePeriodMinutes,
            // Extended Business Rules
            request.RequiredWeeklyHours,
            request.HasCoreHours ?? false,
            request.CoreStart,
            request.CoreEnd,
            // Working Days
            request.IsSunday ?? false,
            request.IsMonday ?? true,
            request.IsTuesday ?? true,
            request.IsWednesday ?? true,
            request.IsThursday ?? true,
            request.IsFriday ?? true,
            request.IsSaturday ?? false,
            request.IsNightShift ?? false,
            request.ShiftPeriods?.Select(sp => new CreateShiftPeriodCommand(
                sp.PeriodOrder,
                TimeOnly.Parse(sp.StartTime),
                TimeOnly.Parse(sp.EndTime)
            )).ToList()
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetShiftById), new { id = result.Value }, new { id = result.Value });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShift(long id, [FromBody] UpdateShiftRequest request)
    {
        var command = new UpdateShiftCommand(
            id,
            request.Name,
            request.Description,
            request.ShiftType,
            request.RequiredHours,
            request.Status ?? ShiftStatus.Active,
            request.IsCheckInRequired ?? true,
            request.IsAutoCheckOut ?? false,
            request.AllowFlexibleHours ?? false,
            request.FlexMinutesBefore,
            request.FlexMinutesAfter,
            request.GracePeriodMinutes,
            // Extended Business Rules
            request.RequiredWeeklyHours,
            request.HasCoreHours ?? false,
            string.IsNullOrEmpty(request.CoreStart) ? null : TimeOnly.Parse(request.CoreStart),
            string.IsNullOrEmpty(request.CoreEnd) ? null : TimeOnly.Parse(request.CoreEnd),
            // Working Days
            request.IsSunday ?? false,
            request.IsMonday ?? true,
            request.IsTuesday ?? true,
            request.IsWednesday ?? true,
            request.IsThursday ?? true,
            request.IsFriday ?? true,
            request.IsSaturday ?? false,
            request.IsNightShift ?? false,
            request.ShiftPeriods?.Select(sp => new UpdateShiftPeriodCommand(
                sp.Id,
                sp.PeriodOrder,
                TimeOnly.Parse(sp.StartTime),
                TimeOnly.Parse(sp.EndTime)
            )).ToList()
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShift(long id)
    {
        var command = new DeleteShiftCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

