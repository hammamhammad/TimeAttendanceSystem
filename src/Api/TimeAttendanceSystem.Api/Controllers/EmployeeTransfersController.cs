using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.EmployeeTransfers.Commands.ApproveEmployeeTransfer;
using TecAxle.Hrms.Application.EmployeeTransfers.Commands.CancelEmployeeTransfer;
using TecAxle.Hrms.Application.EmployeeTransfers.Commands.CompleteEmployeeTransfer;
using TecAxle.Hrms.Application.EmployeeTransfers.Commands.CreateEmployeeTransfer;
using TecAxle.Hrms.Application.EmployeeTransfers.Commands.DeleteEmployeeTransfer;
using TecAxle.Hrms.Application.EmployeeTransfers.Commands.RejectEmployeeTransfer;
using TecAxle.Hrms.Application.EmployeeTransfers.Queries.GetEmployeeTransferById;
using TecAxle.Hrms.Application.EmployeeTransfers.Queries.GetEmployeeTransfers;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-transfers")]
[Authorize]
public class EmployeeTransfersController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeeTransfersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] long? branchId,
        [FromQuery] TransferStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetEmployeeTransfersQuery(employeeId, branchId, status, page, pageSize));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetEmployeeTransferByIdQuery(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeTransferCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveTransferRequest? request = null)
    {
        var result = await _mediator.Send(new ApproveEmployeeTransferCommand(id, request?.Comments));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectTransferRequest request)
    {
        var result = await _mediator.Send(new RejectEmployeeTransferCommand(id, request.RejectionReason));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(long id)
    {
        var result = await _mediator.Send(new CompleteEmployeeTransferCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var result = await _mediator.Send(new CancelEmployeeTransferCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var result = await _mediator.Send(new DeleteEmployeeTransferCommand(id));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public record ApproveTransferRequest(string? Comments);
public record RejectTransferRequest(string RejectionReason);
