using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Resignations.Commands.ApproveResignation;
using TecAxle.Hrms.Application.Resignations.Commands.CreateResignationRequest;
using TecAxle.Hrms.Application.Resignations.Commands.RejectResignation;
using TecAxle.Hrms.Application.Resignations.Commands.WithdrawResignation;
using TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequestById;
using TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequests;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/resignation-requests")]
[Authorize]
public class ResignationRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ResignationRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] long? branchId,
        [FromQuery] ResignationStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetResignationRequestsQuery(employeeId, branchId, status, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetResignationRequestByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateResignationRequestCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveResignationRequest? request = null)
    {
        var result = await _mediator.Send(new ApproveResignationCommand(id, request?.Comments));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectResignationRequest request)
    {
        var result = await _mediator.Send(new RejectResignationCommand(id, request.RejectionReason));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/withdraw")]
    public async Task<IActionResult> Withdraw(long id)
    {
        var result = await _mediator.Send(new WithdrawResignationCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public record ApproveResignationRequest(string? Comments);
public record RejectResignationRequest(string RejectionReason);
