using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.PayrollPeriods.Commands.CreatePayrollPeriod;
using TecAxle.Hrms.Application.PayrollPeriods.Commands.ProcessPayrollPeriod;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriodById;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriods;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/payroll-periods")]
[Authorize]
public class PayrollPeriodsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public PayrollPeriodsController(IMediator mediator, IApplicationDbContext context, ICurrentUser currentUser)
    {
        _mediator = mediator;
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Gets all payroll periods with optional filtering.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] int? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetPayrollPeriodsQuery(branchId, status, page, pageSize));
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets a payroll period by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetPayrollPeriodByIdQuery(id));
        if (result.IsFailure)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Creates a new payroll period in Draft status.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePayrollPeriodRequest request)
    {
        var command = new CreatePayrollPeriodCommand(
            request.BranchId, request.Name, request.NameAr,
            request.PeriodType, request.StartDate, request.EndDate, request.Notes
        );

        var result = await _mediator.Send(command);
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return CreatedAtAction(nameof(GetById), new { id = result.Value }, new { id = result.Value });
    }

    /// <summary>Processes a Draft payroll period: calculates all employee records.</summary>
    [HttpPost("{id}/process")]
    public async Task<IActionResult> Process(long id)
    {
        var result = await _mediator.Send(new ProcessPayrollPeriodCommand(id));
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value, message = "Payroll period processed successfully." });
    }

    /// <summary>Approves a processed payroll period.</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var period = await _context.PayrollPeriods
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (period == null)
            return NotFound(new { error = "Payroll period not found." });

        if (period.Status != PayrollPeriodStatus.Processed)
            return BadRequest(new { error = "Only Processed payroll periods can be approved." });

        period.Status = PayrollPeriodStatus.Approved;
        period.ApprovedByUserId = _currentUser.UserId;
        period.ApprovedAt = DateTime.UtcNow;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Payroll period approved." });
    }

    /// <summary>Marks an approved payroll period as paid.</summary>
    [HttpPost("{id}/mark-paid")]
    public async Task<IActionResult> MarkPaid(long id)
    {
        var period = await _context.PayrollPeriods
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (period == null)
            return NotFound(new { error = "Payroll period not found." });

        if (period.Status != PayrollPeriodStatus.Approved)
            return BadRequest(new { error = "Only Approved payroll periods can be marked as paid." });

        period.Status = PayrollPeriodStatus.Paid;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = _currentUser.Username;

        // Finalize all records
        var records = await _context.PayrollRecords
            .Where(r => r.PayrollPeriodId == id && !r.IsDeleted)
            .ToListAsync();

        foreach (var r in records)
        {
            r.Status = PayrollRecordStatus.Finalized;
            r.ModifiedAtUtc = DateTime.UtcNow;
            r.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Payroll period marked as paid." });
    }

    /// <summary>Cancels a payroll period (only Draft or Processed).</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var period = await _context.PayrollPeriods
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (period == null)
            return NotFound(new { error = "Payroll period not found." });

        if (period.Status == PayrollPeriodStatus.Paid || period.Status == PayrollPeriodStatus.Cancelled)
            return BadRequest(new { error = "Cannot cancel a paid or already cancelled payroll period." });

        period.Status = PayrollPeriodStatus.Cancelled;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Payroll period cancelled." });
    }

    /// <summary>Gets all payroll records for a period.</summary>
    [HttpGet("{id}/records")]
    public async Task<IActionResult> GetRecords(long id)
    {
        var periodExists = await _context.PayrollPeriods
            .AnyAsync(p => p.Id == id && !p.IsDeleted);

        if (!periodExists)
            return NotFound(new { error = "Payroll period not found." });

        var records = await _context.PayrollRecords
            .Where(r => r.PayrollPeriodId == id && !r.IsDeleted)
            .OrderBy(r => r.Employee.LastName).ThenBy(r => r.Employee.FirstName)
            .Select(r => new PayrollRecordDto
            {
                Id = r.Id,
                PayrollPeriodId = r.PayrollPeriodId,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                EmployeeNumber = r.Employee.EmployeeNumber,
                BaseSalary = r.BaseSalary,
                TotalAllowances = r.TotalAllowances,
                GrossEarnings = r.GrossEarnings,
                TotalDeductions = r.TotalDeductions,
                TaxAmount = r.TaxAmount,
                SocialInsuranceEmployee = r.SocialInsuranceEmployee,
                OvertimePay = r.OvertimePay,
                AbsenceDeduction = r.AbsenceDeduction,
                LoanDeduction = r.LoanDeduction,
                NetSalary = r.NetSalary,
                WorkingDays = r.WorkingDays,
                PaidDays = r.PaidDays,
                Status = (int)r.Status
            })
            .ToListAsync();

        return Ok(records);
    }

    /// <summary>Gets a single payroll record with line-item details.</summary>
    [HttpGet("records/{recordId}")]
    public async Task<IActionResult> GetRecord(long recordId)
    {
        var record = await _context.PayrollRecords
            .Where(r => r.Id == recordId && !r.IsDeleted)
            .Select(r => new PayrollRecordDto
            {
                Id = r.Id,
                PayrollPeriodId = r.PayrollPeriodId,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                EmployeeNumber = r.Employee.EmployeeNumber,
                BaseSalary = r.BaseSalary,
                TotalAllowances = r.TotalAllowances,
                GrossEarnings = r.GrossEarnings,
                TotalDeductions = r.TotalDeductions,
                TaxAmount = r.TaxAmount,
                SocialInsuranceEmployee = r.SocialInsuranceEmployee,
                OvertimePay = r.OvertimePay,
                AbsenceDeduction = r.AbsenceDeduction,
                LoanDeduction = r.LoanDeduction,
                NetSalary = r.NetSalary,
                WorkingDays = r.WorkingDays,
                PaidDays = r.PaidDays,
                Status = (int)r.Status,
                Details = r.Details.Where(d => !d.IsDeleted).Select(d => new PayrollRecordDetailDto
                {
                    Id = d.Id,
                    SalaryComponentId = d.SalaryComponentId,
                    ComponentName = d.ComponentName,
                    ComponentNameAr = d.ComponentNameAr,
                    ComponentType = (int)d.ComponentType,
                    Amount = d.Amount,
                    Notes = d.Notes
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (record == null)
            return NotFound(new { error = "Payroll record not found." });

        return Ok(record);
    }
}

// Request records
public record CreatePayrollPeriodRequest(
    long BranchId,
    string Name,
    string? NameAr,
    int PeriodType,
    DateTime StartDate,
    DateTime EndDate,
    string? Notes
);
