using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.CompensatoryOffs.Commands.CreateCompensatoryOff;
using TecAxle.Hrms.Application.CompensatoryOffs.Commands.UpdateCompensatoryOff;
using TecAxle.Hrms.Application.CompensatoryOffs.Commands.CancelCompensatoryOff;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffById;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffs;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetAvailableCompensatoryOffs;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/compensatory-offs")]
[Authorize]
public class CompensatoryOffsController : ControllerBase
{
    private readonly IMediator _mediator;

    public CompensatoryOffsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] long? employeeId,
        [FromQuery] CompensatoryOffStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetCompensatoryOffsQuery(branchId, employeeId, status, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetCompensatoryOffByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("employee/{employeeId}/available")]
    public async Task<IActionResult> GetAvailable(long employeeId)
    {
        var result = await _mediator.Send(new GetAvailableCompensatoryOffsQuery(employeeId));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCompensatoryOffCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateCompensatoryOffCommand command)
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
    public async Task<IActionResult> Cancel(long id)
    {
        var result = await _mediator.Send(new CancelCompensatoryOffCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}
