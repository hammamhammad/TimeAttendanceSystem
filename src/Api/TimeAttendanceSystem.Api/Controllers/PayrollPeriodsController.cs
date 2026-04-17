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
    private readonly IPayrollSideEffectReverser _sideEffectReverser;

    public PayrollPeriodsController(
        IMediator mediator,
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IPayrollSideEffectReverser sideEffectReverser)
    {
        _mediator = mediator;
        _context = context;
        _currentUser = currentUser;
        _sideEffectReverser = sideEffectReverser;
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
        var result = await _mediator.Send(new ProcessPayrollPeriodCommand(id, IsRecalculation: false));
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value, message = "Payroll period processed successfully." });
    }

    /// <summary>
    /// Recalculates a Processed payroll period: soft-deletes the previous non-finalized records
    /// and produces new ones using the current effective configuration and inputs.
    /// Locked/Finalized records are preserved.
    /// </summary>
    [HttpPost("{id}/recalculate")]
    public async Task<IActionResult> Recalculate(long id)
    {
        var result = await _mediator.Send(new ProcessPayrollPeriodCommand(id, IsRecalculation: true));
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });
        return Ok(new { id = result.Value, message = "Payroll period recalculated successfully." });
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
        period.LockedAtUtc = DateTime.UtcNow;
        period.LockedByUserId = _currentUser.UserId;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = _currentUser.Username;

        // Finalize and LOCK all records. A finalized+locked record is immutable.
        var records = await _context.PayrollRecords
            .Where(r => r.PayrollPeriodId == id && !r.IsDeleted)
            .ToListAsync();

        foreach (var r in records)
        {
            r.Status = PayrollRecordStatus.Finalized;
            r.LockedAtUtc = DateTime.UtcNow;
            r.LockedByUserId = _currentUser.UserId;
            r.ModifiedAtUtc = DateTime.UtcNow;
            r.ModifiedBy = _currentUser.Username;
        }

        // Audit entry for finalization.
        _context.PayrollRunAudits.Add(new TecAxle.Hrms.Domain.Payroll.PayrollRunAudit
        {
            PayrollPeriodId = id,
            RunType = PayrollRunType.Finalization,
            TriggeredByUserId = _currentUser.UserId,
            TriggeredByUsername = _currentUser.Username,
            StartedAtUtc = DateTime.UtcNow,
            CompletedAtUtc = DateTime.UtcNow,
            Status = PayrollRunStatus.Completed,
            EmployeesProcessed = records.Count,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        });

        await _context.SaveChangesAsync();
        return Ok(new { message = "Payroll period marked as paid and locked." });
    }

    /// <summary>
    /// SystemAdmin-only: unlocks a Paid payroll period so that corrections can be applied.
    /// Reverts the period to Processed (so /recalculate is allowed), clears lock fields on
    /// period + records, and sets records back to Calculated status. Writes a PayrollRunAudit
    /// entry of type Adjustment capturing the reason. The admin must subsequently call
    /// /recalculate, /approve, and /mark-paid to re-finalize — this endpoint deliberately
    /// does NOT trigger a recalc itself, so the operator consciously reviews numbers after unlock.
    /// </summary>
    [HttpPost("{id}/admin-unlock")]
    public async Task<IActionResult> AdminUnlock(long id, [FromBody] AdminUnlockRequest request)
    {
        if (!_currentUser.IsSystemAdmin)
            return Forbid();
        if (string.IsNullOrWhiteSpace(request?.Reason))
            return BadRequest(new { error = "A reason is required to unlock a finalized payroll period." });

        var period = await _context.PayrollPeriods
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        if (period == null)
            return NotFound(new { error = "Payroll period not found." });
        if (period.Status != PayrollPeriodStatus.Paid || !period.LockedAtUtc.HasValue)
            return BadRequest(new { error = "Only Paid/locked payroll periods can be admin-unlocked." });

        period.Status = PayrollPeriodStatus.Processed;
        period.LockedAtUtc = null;
        period.LockedByUserId = null;
        period.ApprovedAt = null;
        period.ApprovedByUserId = null;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = _currentUser.Username;

        var records = await _context.PayrollRecords
            .Where(r => r.PayrollPeriodId == id && !r.IsDeleted)
            .ToListAsync();
        foreach (var r in records)
        {
            r.LockedAtUtc = null;
            r.LockedByUserId = null;
            r.Status = PayrollRecordStatus.Calculated;
            r.ModifiedAtUtc = DateTime.UtcNow;
            r.ModifiedBy = _currentUser.Username;
        }

        // Phase 2 (v14.2): reverse payroll-linked side-effects (loans/advances/expenses) so a
        // subsequent /recalculate sees a clean slate. Without this, repayments/advances/claims
        // would stay in Paid/Deducted/Reimbursed state and the rerun would skip them entirely
        // (matching logic ignores rows with non-null PayrollRecordId), silently producing a
        // shorter payroll. Runs INSIDE the same transaction as the status flip via SaveChanges.
        await _sideEffectReverser.ReverseAllInPeriodAsync(id,
            $"admin-unlock by {_currentUser.Username}: {request.Reason}");

        _context.PayrollRunAudits.Add(new TecAxle.Hrms.Domain.Payroll.PayrollRunAudit
        {
            PayrollPeriodId = id,
            RunType = PayrollRunType.Adjustment,
            TriggeredByUserId = _currentUser.UserId,
            TriggeredByUsername = _currentUser.Username,
            StartedAtUtc = DateTime.UtcNow,
            CompletedAtUtc = DateTime.UtcNow,
            Status = PayrollRunStatus.Completed,
            EmployeesProcessed = records.Count,
            WarningsJson = System.Text.Json.JsonSerializer.Serialize(new[]
            {
                new { kind = "admin-unlock", reason = request.Reason, records = records.Count }
            }),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        });

        await _context.SaveChangesAsync();
        return Ok(new
        {
            message = "Payroll period unlocked. Status reverted to Processed. Call /recalculate (optional), then /approve and /mark-paid to re-finalize.",
            unlockedRecords = records.Count
        });
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

        // Phase 2 (v14.2): reverse any already-applied side-effects on the records we are
        // about to cancel. Also cascade-soft-delete any orphan PayrollRecordDetail rows so
        // cancelled-period data is consistent.
        await _sideEffectReverser.ReverseAllInPeriodAsync(id,
            $"period-cancel by {_currentUser.Username}");
        await _sideEffectReverser.CascadeDeleteDetailsAsync(id);

        // Soft-delete the PayrollRecord rows owned by the cancelled period so they no longer
        // appear in records lists (audit trail preserved — IsDeleted is a soft flag, the
        // PayrollRunAudit + CalculationBreakdownJson history remain intact).
        var records = await _context.PayrollRecords
            .Where(r => r.PayrollPeriodId == id && !r.IsDeleted)
            .ToListAsync();
        foreach (var r in records)
        {
            r.IsDeleted = true;
            r.ModifiedAtUtc = DateTime.UtcNow;
            r.ModifiedBy = _currentUser.Username;
            r.Notes = (r.Notes ?? "") + $" | Cancelled with period {id} on {DateTime.UtcNow:O}";
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Payroll period cancelled.", reversedRecords = records.Count });
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
                Status = (int)r.Status,
                LockedAtUtc = r.LockedAtUtc,
                CalculationVersion = r.CalculationVersion
            })
            .ToListAsync();

        return Ok(records);
    }

    /// <summary>Gets the payroll-run audit history for a period.</summary>
    [HttpGet("{id}/run-audit")]
    public async Task<IActionResult> GetRunAudit(long id)
    {
        var audits = await _context.PayrollRunAudits
            .Where(a => a.PayrollPeriodId == id && !a.IsDeleted)
            .OrderByDescending(a => a.StartedAtUtc)
            .Select(a => new
            {
                id = a.Id,
                runType = (int)a.RunType,
                status = (int)a.Status,
                startedAtUtc = a.StartedAtUtc,
                completedAtUtc = a.CompletedAtUtc,
                triggeredByUsername = a.TriggeredByUsername,
                employeesProcessed = a.EmployeesProcessed,
                employeesFailed = a.EmployeesFailed,
                employeesSkipped = a.EmployeesSkipped,
                warningCount = a.WarningCount,
                warningsJson = a.WarningsJson,
                errorsJson = a.ErrorsJson
            })
            .ToListAsync();

        return Ok(audits);
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
                LockedAtUtc = r.LockedAtUtc,
                CalculationVersion = r.CalculationVersion,
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

public record AdminUnlockRequest(string Reason);
