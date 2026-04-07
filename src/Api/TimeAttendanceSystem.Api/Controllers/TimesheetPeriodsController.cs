using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/timesheet-periods")]
[Authorize]
public class TimesheetPeriodsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TimesheetPeriodsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists timesheet periods with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TimesheetPeriodRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId = null,
        [FromQuery] TimesheetPeriodStatus? status = null,
        [FromQuery] TimesheetPeriodType? periodType = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TimesheetPeriods.AsNoTracking().AsQueryable();

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (periodType.HasValue)
            query = query.Where(x => x.PeriodType == periodType.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.Name,
                x.PeriodType,
                x.StartDate,
                x.EndDate,
                x.SubmissionDeadline,
                x.Status,
                x.IsActive,
                TimesheetCount = x.Timesheets.Count(t => !t.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single timesheet period by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TimesheetPeriodRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TimesheetPeriods
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.Name,
                x.PeriodType,
                x.StartDate,
                x.EndDate,
                x.SubmissionDeadline,
                x.Status,
                x.IsActive,
                TimesheetCount = x.Timesheets.Count(t => !t.IsDeleted),
                SubmittedCount = x.Timesheets.Count(t => !t.IsDeleted && t.Status == TimesheetStatus.Submitted),
                ApprovedCount = x.Timesheets.Count(t => !t.IsDeleted && t.Status == TimesheetStatus.Approved),
                x.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Timesheet period not found." });

        return Ok(item);
    }

    /// <summary>Creates a new timesheet period.</summary>
    [HttpPost]
    [Authorize(Policy = "TimesheetPeriodManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTimesheetPeriodRequest request)
    {
        // Validate branch
        var branchExists = await _context.Branches.AnyAsync(x => x.Id == request.BranchId);
        if (!branchExists)
            return BadRequest(new { error = "Branch not found." });

        // Validate dates
        if (request.EndDate <= request.StartDate)
            return BadRequest(new { error = "End date must be after start date." });

        if (request.SubmissionDeadline <= request.EndDate)
            return BadRequest(new { error = "Submission deadline must be after end date." });

        // Check for overlapping periods in same branch
        var overlapping = await _context.TimesheetPeriods
            .AnyAsync(x => x.BranchId == request.BranchId
                && x.PeriodType == request.PeriodType
                && x.StartDate < request.EndDate
                && x.EndDate > request.StartDate);

        if (overlapping)
            return BadRequest(new { error = "An overlapping timesheet period already exists for this branch." });

        var entity = new TimesheetPeriod
        {
            BranchId = request.BranchId,
            Name = request.Name,
            PeriodType = request.PeriodType,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            SubmissionDeadline = request.SubmissionDeadline,
            Status = TimesheetPeriodStatus.Open,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.TimesheetPeriods.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a timesheet period.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TimesheetPeriodManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTimesheetPeriodRequest request)
    {
        var entity = await _context.TimesheetPeriods.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet period not found." });

        if (entity.Status == TimesheetPeriodStatus.Locked)
            return BadRequest(new { error = "Cannot update a locked timesheet period." });

        entity.Name = request.Name;
        entity.PeriodType = request.PeriodType;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.SubmissionDeadline = request.SubmissionDeadline;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Deletes a timesheet period (soft delete).</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TimesheetPeriodManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TimesheetPeriods.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet period not found." });

        // Check if period has any timesheets
        var hasTimesheets = await _context.Timesheets
            .AnyAsync(x => x.TimesheetPeriodId == id);

        if (hasTimesheets)
            return BadRequest(new { error = "Cannot delete a period that has timesheets." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Closes a timesheet period. No more timesheets can be submitted.</summary>
    [HttpPost("{id}/close")]
    [Authorize(Policy = "TimesheetPeriodManagement")]
    public async Task<IActionResult> Close(long id)
    {
        var entity = await _context.TimesheetPeriods.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet period not found." });

        if (entity.Status != TimesheetPeriodStatus.Open)
            return BadRequest(new { error = "Only open periods can be closed." });

        entity.Status = TimesheetPeriodStatus.Closed;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, status = entity.Status });
    }

    /// <summary>Locks a timesheet period. No further changes are allowed.</summary>
    [HttpPost("{id}/lock")]
    [Authorize(Policy = "TimesheetPeriodManagement")]
    public async Task<IActionResult> Lock(long id)
    {
        var entity = await _context.TimesheetPeriods.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet period not found." });

        if (entity.Status != TimesheetPeriodStatus.Closed)
            return BadRequest(new { error = "Only closed periods can be locked." });

        entity.Status = TimesheetPeriodStatus.Locked;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, status = entity.Status });
    }
}

// ── DTOs ────────────────────────────────────────────────

public class CreateTimesheetPeriodRequest
{
    public long BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public TimesheetPeriodType PeriodType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime SubmissionDeadline { get; set; }
}

public class UpdateTimesheetPeriodRequest
{
    public string Name { get; set; } = string.Empty;
    public TimesheetPeriodType PeriodType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime SubmissionDeadline { get; set; }
    public bool IsActive { get; set; }
}
