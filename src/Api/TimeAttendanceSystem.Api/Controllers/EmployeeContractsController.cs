using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.EmployeeContracts.Commands.ActivateEmployeeContract;
using TecAxle.Hrms.Application.EmployeeContracts.Commands.CreateEmployeeContract;
using TecAxle.Hrms.Application.EmployeeContracts.Commands.DeleteEmployeeContract;
using TecAxle.Hrms.Application.EmployeeContracts.Commands.RenewEmployeeContract;
using TecAxle.Hrms.Application.EmployeeContracts.Commands.TerminateEmployeeContract;
using TecAxle.Hrms.Application.EmployeeContracts.Commands.UpdateEmployeeContract;
using TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContractById;
using TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContracts;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-contracts")]
[Authorize]
public class EmployeeContractsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeeContractsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Gets all employee contracts with optional filtering and pagination.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] long? branchId,
        [FromQuery] ContractStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = new GetEmployeeContractsQuery(employeeId, branchId, status, null, page, pageSize);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets a specific employee contract by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetEmployeeContractByIdQuery(id));

        if (result.IsFailure)
            return result.Error == "Contract not found."
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets all contracts for a specific employee.</summary>
    [HttpGet("employees/{employeeId}/contracts")]
    public async Task<IActionResult> GetByEmployee(
        long employeeId,
        [FromQuery] ContractStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = new GetEmployeeContractsQuery(employeeId, null, status, null, page, pageSize);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets contracts expiring within the specified number of days.</summary>
    [HttpGet("expiring")]
    public async Task<IActionResult> GetExpiring(
        [FromQuery] int days = 30,
        [FromQuery] long? branchId = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = new GetEmployeeContractsQuery(null, branchId, null, days, page, pageSize);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Creates a new employee contract.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeContractCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    /// <summary>Updates an existing employee contract (draft only).</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateEmployeeContractRequest request)
    {
        var command = new UpdateEmployeeContractCommand(
            id,
            request.ContractNumber,
            request.ContractType,
            request.StartDate,
            request.EndDate,
            request.RenewalDate,
            request.AutoRenew,
            request.BasicSalary,
            request.Currency,
            request.ProbationPeriodDays,
            request.ProbationEndDate,
            request.ProbationStatus,
            request.NoticePeriodDays,
            request.Terms,
            request.TermsAr,
            request.DocumentUrl,
            request.Notes
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Activates a draft contract.</summary>
    [HttpPost("{id}/activate")]
    public async Task<IActionResult> Activate(long id)
    {
        var result = await _mediator.Send(new ActivateEmployeeContractCommand(id));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Terminates an active contract.</summary>
    [HttpPost("{id}/terminate")]
    public async Task<IActionResult> Terminate(long id, [FromBody] TerminateContractRequest? request = null)
    {
        var result = await _mediator.Send(new TerminateEmployeeContractCommand(id, request?.Reason));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>Renews a contract by creating a new one linked to the previous.</summary>
    [HttpPost("{id}/renew")]
    public async Task<IActionResult> Renew(long id, [FromBody] RenewContractRequest request)
    {
        var command = new RenewEmployeeContractCommand(
            id,
            request.ContractNumber,
            request.StartDate,
            request.EndDate,
            request.BasicSalary,
            request.ContractType,
            request.Notes
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    /// <summary>Deletes a draft contract (soft delete).</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var result = await _mediator.Send(new DeleteEmployeeContractCommand(id));

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }
}

public record UpdateEmployeeContractRequest(
    string ContractNumber,
    ContractType ContractType,
    DateTime StartDate,
    DateTime? EndDate,
    DateTime? RenewalDate,
    bool AutoRenew,
    decimal BasicSalary,
    string? Currency,
    int? ProbationPeriodDays,
    DateTime? ProbationEndDate,
    ProbationStatus ProbationStatus,
    int? NoticePeriodDays,
    string? Terms,
    string? TermsAr,
    string? DocumentUrl,
    string? Notes
);

public record TerminateContractRequest(string? Reason);

public record RenewContractRequest(
    string ContractNumber,
    DateTime StartDate,
    DateTime? EndDate,
    decimal? BasicSalary,
    ContractType? ContractType,
    string? Notes
);
