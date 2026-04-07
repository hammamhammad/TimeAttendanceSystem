using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/timesheets")]
[Authorize]
public class TimesheetsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TimesheetsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists timesheets with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TimesheetRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? timesheetPeriodId = null,
        [FromQuery] long? employeeId = null,
        [FromQuery] TimesheetStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Timesheets.AsNoTracking().AsQueryable();

        if (timesheetPeriodId.HasValue)
            query = query.Where(x => x.TimesheetPeriodId == timesheetPeriodId.Value);

        if (employeeId.HasValue)
            query = query.Where(x => x.EmployeeId == employeeId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x =>
                x.Employee.FirstName.Contains(search) ||
                x.Employee.LastName.Contains(search) ||
                x.Employee.EmployeeNumber.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.TimesheetPeriodId,
                PeriodName = x.TimesheetPeriod.Name,
                PeriodStartDate = x.TimesheetPeriod.StartDate,
                PeriodEndDate = x.TimesheetPeriod.EndDate,
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.Status,
                x.TotalHours,
                x.RegularHours,
                x.OvertimeHours,
                x.SubmittedAt,
                x.ApprovedAt,
                x.RejectedAt,
                x.RejectionReason,
                x.Notes,
                EntryCount = x.Entries.Count(e => !e.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single timesheet by ID with all entries.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TimesheetRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Timesheets
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.TimesheetPeriodId,
                PeriodName = x.TimesheetPeriod.Name,
                PeriodStartDate = x.TimesheetPeriod.StartDate,
                PeriodEndDate = x.TimesheetPeriod.EndDate,
                PeriodStatus = x.TimesheetPeriod.Status,
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.Status,
                x.TotalHours,
                x.RegularHours,
                x.OvertimeHours,
                x.SubmittedAt,
                x.SubmittedByUserId,
                x.ApprovedAt,
                x.ApprovedByUserId,
                x.RejectedAt,
                x.RejectionReason,
                x.Notes,
                x.WorkflowInstanceId,
                x.CreatedAtUtc,
                Entries = x.Entries
                    .Where(e => !e.IsDeleted)
                    .OrderBy(e => e.EntryDate)
                    .ThenBy(e => e.ProjectId)
                    .Select(e => new
                    {
                        e.Id,
                        e.ProjectId,
                        ProjectName = e.Project.Name,
                        ProjectCode = e.Project.Code,
                        e.ProjectTaskId,
                        ProjectTaskName = e.ProjectTask != null ? e.ProjectTask.Name : null,
                        e.EntryDate,
                        e.Hours,
                        e.OvertimeHours,
                        e.Notes,
                        e.IsAutoPopulated,
                        e.AttendanceRecordId
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Timesheet not found." });

        return Ok(item);
    }

    /// <summary>Creates a new timesheet for an employee in a period.</summary>
    [HttpPost]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTimesheetRequest request)
    {
        // Validate period
        var period = await _context.TimesheetPeriods.FindAsync(request.TimesheetPeriodId);
        if (period == null || period.IsDeleted)
            return BadRequest(new { error = "Timesheet period not found." });

        if (period.Status != TimesheetPeriodStatus.Open)
            return BadRequest(new { error = "Timesheet period is not open." });

        // Validate employee
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!employeeExists)
            return BadRequest(new { error = "Employee not found." });

        // Check for duplicate
        var exists = await _context.Timesheets
            .AnyAsync(x => x.TimesheetPeriodId == request.TimesheetPeriodId
                && x.EmployeeId == request.EmployeeId);
        if (exists)
            return BadRequest(new { error = "A timesheet already exists for this employee in this period." });

        var entity = new Timesheet
        {
            TimesheetPeriodId = request.TimesheetPeriodId,
            EmployeeId = request.EmployeeId,
            Status = TimesheetStatus.Draft,
            TotalHours = 0,
            RegularHours = 0,
            OvertimeHours = 0,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.Timesheets.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a timesheet and its entries.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTimesheetRequest request)
    {
        var entity = await _context.Timesheets
            .Include(x => x.Entries.Where(e => !e.IsDeleted))
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Draft && entity.Status != TimesheetStatus.Rejected)
            return BadRequest(new { error = "Only draft or rejected timesheets can be updated." });

        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        // Remove existing entries
        foreach (var existing in entity.Entries.ToList())
        {
            existing.IsDeleted = true;
            existing.ModifiedAtUtc = DateTime.UtcNow;
            existing.ModifiedBy = _currentUser.Username ?? "SYSTEM";
        }

        // Add new entries
        if (request.Entries != null)
        {
            foreach (var entryReq in request.Entries)
            {
                var entry = new TimesheetEntry
                {
                    TimesheetId = entity.Id,
                    ProjectId = entryReq.ProjectId,
                    ProjectTaskId = entryReq.ProjectTaskId,
                    EntryDate = entryReq.EntryDate,
                    Hours = entryReq.Hours,
                    OvertimeHours = entryReq.OvertimeHours,
                    Notes = entryReq.Notes,
                    IsAutoPopulated = false,
                    AttendanceRecordId = entryReq.AttendanceRecordId,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                };
                _context.TimesheetEntries.Add(entry);
            }
        }

        // Recalculate totals
        var newEntries = request.Entries ?? new List<TimesheetEntryRequest>();
        entity.TotalHours = newEntries.Sum(e => e.Hours + e.OvertimeHours);
        entity.RegularHours = newEntries.Sum(e => e.Hours);
        entity.OvertimeHours = newEntries.Sum(e => e.OvertimeHours);

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Deletes a timesheet (soft delete).</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Timesheets.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Draft)
            return BadRequest(new { error = "Only draft timesheets can be deleted." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Submits a timesheet for approval.</summary>
    [HttpPost("{id}/submit")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Submit(long id)
    {
        var entity = await _context.Timesheets
            .Include(x => x.TimesheetPeriod)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Draft && entity.Status != TimesheetStatus.Rejected)
            return BadRequest(new { error = "Only draft or rejected timesheets can be submitted." });

        if (entity.TimesheetPeriod.Status != TimesheetPeriodStatus.Open)
            return BadRequest(new { error = "Timesheet period is not open for submissions." });

        // Check that timesheet has entries
        var hasEntries = await _context.TimesheetEntries
            .AnyAsync(x => x.TimesheetId == id && !x.IsDeleted);

        if (!hasEntries)
            return BadRequest(new { error = "Cannot submit a timesheet with no entries." });

        entity.Status = TimesheetStatus.Submitted;
        entity.SubmittedAt = DateTime.UtcNow;
        entity.SubmittedByUserId = _currentUser.UserId;
        entity.RejectedAt = null;
        entity.RejectionReason = null;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, status = entity.Status });
    }

    /// <summary>Approves a submitted timesheet.</summary>
    [HttpPost("{id}/approve")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveTimesheetRequest? request = null)
    {
        var entity = await _context.Timesheets.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Submitted)
            return BadRequest(new { error = "Only submitted timesheets can be approved." });

        entity.Status = TimesheetStatus.Approved;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ApprovedByUserId = _currentUser.UserId;
        if (request?.Notes != null)
            entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, status = entity.Status });
    }

    /// <summary>Rejects a submitted timesheet.</summary>
    [HttpPost("{id}/reject")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectTimesheetRequest request)
    {
        var entity = await _context.Timesheets.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Submitted)
            return BadRequest(new { error = "Only submitted timesheets can be rejected." });

        entity.Status = TimesheetStatus.Rejected;
        entity.RejectedAt = DateTime.UtcNow;
        entity.RejectionReason = request.Reason;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, status = entity.Status });
    }

    /// <summary>Recalls a submitted timesheet back to draft.</summary>
    [HttpPost("{id}/recall")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> Recall(long id)
    {
        var entity = await _context.Timesheets.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Submitted)
            return BadRequest(new { error = "Only submitted timesheets can be recalled." });

        entity.Status = TimesheetStatus.Recalled;
        entity.SubmittedAt = null;
        entity.SubmittedByUserId = null;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, status = entity.Status });
    }

    /// <summary>Auto-populates a timesheet from attendance records for the period.</summary>
    [HttpPost("{id}/auto-populate")]
    [Authorize(Policy = "TimesheetManagement")]
    public async Task<IActionResult> AutoPopulate(long id, [FromBody] AutoPopulateTimesheetRequest request)
    {
        var entity = await _context.Timesheets
            .Include(x => x.TimesheetPeriod)
            .Include(x => x.Entries.Where(e => !e.IsDeleted))
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Timesheet not found." });

        if (entity.Status != TimesheetStatus.Draft && entity.Status != TimesheetStatus.Rejected)
            return BadRequest(new { error = "Only draft or rejected timesheets can be auto-populated." });

        // Get attendance records for the employee in the period date range
        var attendanceRecords = await _context.AttendanceRecords
            .AsNoTracking()
            .Where(ar => ar.EmployeeId == entity.EmployeeId
                && ar.AttendanceDate >= entity.TimesheetPeriod.StartDate
                && ar.AttendanceDate <= entity.TimesheetPeriod.EndDate
                && !ar.IsDeleted)
            .OrderBy(ar => ar.AttendanceDate)
            .ToListAsync();

        if (!attendanceRecords.Any())
            return BadRequest(new { error = "No attendance records found for this period." });

        // Remove existing auto-populated entries
        foreach (var existing in entity.Entries.Where(e => e.IsAutoPopulated).ToList())
        {
            existing.IsDeleted = true;
            existing.ModifiedAtUtc = DateTime.UtcNow;
            existing.ModifiedBy = _currentUser.Username ?? "SYSTEM";
        }

        // Create entries from attendance records
        var entriesCreated = 0;
        foreach (var ar in attendanceRecords)
        {
            var regularHours = ar.WorkingHours;
            var overtimeHours = ar.OvertimeHours;

            if (regularHours <= 0 && overtimeHours <= 0)
                continue;

            var entry = new TimesheetEntry
            {
                TimesheetId = entity.Id,
                ProjectId = request.DefaultProjectId,
                ProjectTaskId = request.DefaultProjectTaskId,
                EntryDate = ar.AttendanceDate,
                Hours = regularHours,
                OvertimeHours = overtimeHours,
                IsAutoPopulated = true,
                AttendanceRecordId = ar.Id,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };
            _context.TimesheetEntries.Add(entry);
            entriesCreated++;
        }

        // Recalculate totals from all non-deleted entries (manual ones) plus new auto-populated
        var manualEntries = entity.Entries.Where(e => !e.IsAutoPopulated && !e.IsDeleted).ToList();
        var autoRegular = attendanceRecords.Where(ar => ar.WorkingHours > 0 || ar.OvertimeHours > 0).Sum(ar => ar.WorkingHours);
        var autoOvertime = attendanceRecords.Where(ar => ar.WorkingHours > 0 || ar.OvertimeHours > 0).Sum(ar => ar.OvertimeHours);

        entity.RegularHours = manualEntries.Sum(e => e.Hours) + autoRegular;
        entity.OvertimeHours = manualEntries.Sum(e => e.OvertimeHours) + autoOvertime;
        entity.TotalHours = entity.RegularHours + entity.OvertimeHours;

        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, entriesCreated });
    }
}

// ── DTOs ────────────────────────────────────────────────

public class CreateTimesheetRequest
{
    public long TimesheetPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public string? Notes { get; set; }
}

public class UpdateTimesheetRequest
{
    public string? Notes { get; set; }
    public List<TimesheetEntryRequest>? Entries { get; set; }
}

public class TimesheetEntryRequest
{
    public long ProjectId { get; set; }
    public long? ProjectTaskId { get; set; }
    public DateTime EntryDate { get; set; }
    public decimal Hours { get; set; }
    public decimal OvertimeHours { get; set; }
    public string? Notes { get; set; }
    public long? AttendanceRecordId { get; set; }
}

public class ApproveTimesheetRequest
{
    public string? Notes { get; set; }
}

public class RejectTimesheetRequest
{
    public string Reason { get; set; } = string.Empty;
}

public class AutoPopulateTimesheetRequest
{
    public long DefaultProjectId { get; set; }
    public long? DefaultProjectTaskId { get; set; }
}
