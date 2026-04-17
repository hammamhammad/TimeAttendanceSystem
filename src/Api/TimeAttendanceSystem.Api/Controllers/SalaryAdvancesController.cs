using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/salary-advances")]
[Authorize]
public class SalaryAdvancesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SalaryAdvancesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "SalaryAdvanceRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] SalaryAdvanceStatus? status = null,
        [FromQuery] DateTime? deductionFrom = null,
        [FromQuery] DateTime? deductionTo = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.SalaryAdvances.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        // Phase 6: filter by deduction window via the date range instead of legacy YYYYMM.
        if (deductionFrom.HasValue)
            query = query.Where(x => x.DeductionEndDate >= deductionFrom.Value);
        if (deductionTo.HasValue)
            query = query.Where(x => x.DeductionStartDate <= deductionTo.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Reason != null && x.Reason.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.RequestDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.Amount, x.Currency, x.RequestDate,
                x.DeductionStartDate, x.DeductionEndDate,
                x.Reason, x.ReasonAr, x.Status, x.ApprovedAt,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "SalaryAdvanceRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.SalaryAdvances.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.Amount, x.Currency, x.RequestDate,
                x.DeductionStartDate, x.DeductionEndDate,
                x.Reason, x.ReasonAr, x.Status, x.RejectionReason,
                x.ApprovedByUserId, x.ApprovedAt, x.PayrollRecordId,
                x.WorkflowInstanceId, x.SubmittedByUserId,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Salary advance not found." });
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSalaryAdvanceRequest request)
    {
        // Phase 6: the API now only accepts the date-range deduction window. Old clients
        // that still send DeductionMonth should be migrated. If both date fields are
        // omitted the SalaryAdvanceExecutor falls back to next-month-after-approval.
        var entity = new SalaryAdvance
        {
            EmployeeId = request.EmployeeId,
            Amount = request.Amount,
            Currency = request.Currency ?? "SAR",
            RequestDate = DateTime.UtcNow,
            DeductionStartDate = request.DeductionStartDate,
            DeductionEndDate = request.DeductionEndDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Status = SalaryAdvanceStatus.Pending,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.SalaryAdvances.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Policy = "SalaryAdvanceManagement")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.SalaryAdvances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Salary advance not found." });
        if (entity.Status != SalaryAdvanceStatus.Pending)
            return BadRequest(new { error = "Only pending advances can be approved." });

        entity.Status = SalaryAdvanceStatus.Approved;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Salary advance approved." });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Policy = "SalaryAdvanceManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectSalaryAdvanceRequest request)
    {
        var entity = await _context.SalaryAdvances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Salary advance not found." });
        if (entity.Status != SalaryAdvanceStatus.Pending)
            return BadRequest(new { error = "Only pending advances can be rejected." });

        entity.Status = SalaryAdvanceStatus.Rejected;
        entity.RejectionReason = request.Reason;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Salary advance rejected." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "SalaryAdvanceManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.SalaryAdvances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Salary advance not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Salary advance deleted." });
    }
}

public class CreateSalaryAdvanceRequest
{
    public long EmployeeId { get; set; }
    public decimal Amount { get; set; }
    public string? Currency { get; set; }

    // Phase 6 (v14.6): replaced the legacy YYYYMM `DeductionMonth` int with an explicit
    // date range. The executor back-fills a sensible default if these are omitted.
    public DateTime? DeductionStartDate { get; set; }
    public DateTime? DeductionEndDate { get; set; }

    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
}

public class RejectSalaryAdvanceRequest
{
    public string? Reason { get; set; }
}
