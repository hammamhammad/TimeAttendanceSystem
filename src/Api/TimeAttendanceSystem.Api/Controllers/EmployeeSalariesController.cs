using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.EmployeeSalaries.Commands.AssignEmployeeSalary;
using TecAxle.Hrms.Application.EmployeeSalaries.Queries.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-salaries")]
[Authorize]
public class EmployeeSalariesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public EmployeeSalariesController(IMediator mediator, IApplicationDbContext context, ICurrentUser currentUser)
    {
        _mediator = mediator;
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Gets the current active salary for an employee.</summary>
    [HttpGet("employees/{employeeId}/current")]
    public async Task<IActionResult> GetCurrentSalary(long employeeId)
    {
        var dto = await _context.EmployeeSalaries
            .Where(s => s.EmployeeId == employeeId && s.IsCurrent && !s.IsDeleted)
            .Select(s => new EmployeeSalaryDto
            {
                Id = s.Id,
                EmployeeId = s.EmployeeId,
                EmployeeName = s.Employee.FirstName + " " + s.Employee.LastName,
                SalaryStructureId = s.SalaryStructureId,
                SalaryStructureName = s.SalaryStructure.Name,
                BaseSalary = s.BaseSalary,
                Currency = s.Currency,
                EffectiveDate = s.EffectiveDate,
                EndDate = s.EndDate,
                IsCurrent = s.IsCurrent,
                Reason = s.Reason,
                CreatedAtUtc = s.CreatedAtUtc,
                Components = s.Components.Where(c => !c.IsDeleted).Select(c => new EmployeeSalaryComponentDto
                {
                    Id = c.Id,
                    ComponentName = c.SalaryComponent.Name,
                    ComponentType = (int)c.SalaryComponent.ComponentType,
                    Amount = c.Amount,
                    OverrideAmount = c.OverrideAmount
                }).ToList(),
                TotalPackage = s.BaseSalary + s.Components.Where(c => !c.IsDeleted).Sum(c => c.OverrideAmount ?? c.Amount)
            })
            .FirstOrDefaultAsync();

        if (dto == null)
            return NotFound(new { error = "No current salary found for this employee." });

        return Ok(dto);
    }

    /// <summary>Gets salary history for an employee.</summary>
    [HttpGet("employees/{employeeId}/history")]
    public async Task<IActionResult> GetSalaryHistory(long employeeId)
    {
        var items = await _context.EmployeeSalaries
            .Where(s => s.EmployeeId == employeeId && !s.IsDeleted)
            .OrderByDescending(s => s.EffectiveDate)
            .Select(s => new EmployeeSalaryDto
            {
                Id = s.Id,
                EmployeeId = s.EmployeeId,
                EmployeeName = s.Employee.FirstName + " " + s.Employee.LastName,
                SalaryStructureId = s.SalaryStructureId,
                SalaryStructureName = s.SalaryStructure.Name,
                BaseSalary = s.BaseSalary,
                Currency = s.Currency,
                EffectiveDate = s.EffectiveDate,
                EndDate = s.EndDate,
                IsCurrent = s.IsCurrent,
                Reason = s.Reason,
                CreatedAtUtc = s.CreatedAtUtc,
                Components = s.Components.Where(c => !c.IsDeleted).Select(c => new EmployeeSalaryComponentDto
                {
                    Id = c.Id,
                    ComponentName = c.SalaryComponent.Name,
                    ComponentType = (int)c.SalaryComponent.ComponentType,
                    Amount = c.Amount,
                    OverrideAmount = c.OverrideAmount
                }).ToList(),
                TotalPackage = s.BaseSalary + s.Components.Where(c => !c.IsDeleted).Sum(c => c.OverrideAmount ?? c.Amount)
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Assigns a new salary to an employee (deactivates current salary).</summary>
    [HttpPost]
    public async Task<IActionResult> Assign([FromBody] AssignSalaryRequest request)
    {
        var command = new AssignEmployeeSalaryCommand(
            request.EmployeeId,
            request.SalaryStructureId,
            request.BaseSalary,
            request.Currency,
            request.EffectiveDate,
            request.Reason,
            request.ComponentOverrides?.Select(o => new ComponentOverrideRequest(o.SalaryComponentId, o.OverrideAmount)).ToList()
        );

        var result = await _mediator.Send(command);
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return CreatedAtAction(nameof(GetCurrentSalary), new { employeeId = request.EmployeeId }, new { id = result.Value });
    }
}

// Request records
public record AssignSalaryRequest(
    long EmployeeId,
    long SalaryStructureId,
    decimal BaseSalary,
    string? Currency,
    DateTime EffectiveDate,
    string? Reason,
    List<ComponentOverrideRequestDto>? ComponentOverrides
);

public record ComponentOverrideRequestDto(
    long SalaryComponentId,
    decimal? OverrideAmount
);
