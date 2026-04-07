using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-attendance")]
[Authorize]
public class TrainingAttendanceController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingAttendanceController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Gets attendance records for a specific training session.</summary>
    [HttpGet("session/{sessionId}")]
    [Authorize(Policy = "TrainingSessionRead")]
    public async Task<IActionResult> GetBySession(long sessionId, [FromQuery] DateTime? date = null)
    {
        var sessionExists = await _context.TrainingSessions.AnyAsync(x => x.Id == sessionId);
        if (!sessionExists) return NotFound(new { error = "Training session not found." });

        var query = _context.TrainingAttendanceRecords.AsNoTracking()
            .Where(x => x.TrainingSessionId == sessionId);

        if (date.HasValue) query = query.Where(x => x.AttendanceDate.Date == date.Value.Date);

        var items = await query
            .OrderBy(x => x.AttendanceDate).ThenBy(x => x.Employee.FullName)
            .Select(x => new
            {
                x.Id,
                x.TrainingSessionId,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.AttendanceDate,
                Status = x.Status.ToString(),
                x.CheckInTime,
                x.CheckOutTime,
                x.Notes,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount = items.Count });
    }

    /// <summary>Bulk marks attendance for a training session on a given date.</summary>
    [HttpPost("session/{sessionId}")]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> BulkMarkAttendance(long sessionId, [FromBody] BulkTrainingAttendanceRequest request)
    {
        var session = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == sessionId);
        if (session == null) return NotFound(new { error = "Training session not found." });

        if (request.Records == null || !request.Records.Any())
            return BadRequest(new { error = "At least one attendance record is required." });

        var created = 0;
        var updated = 0;

        foreach (var record in request.Records)
        {
            var existing = await _context.TrainingAttendanceRecords
                .FirstOrDefaultAsync(x => x.TrainingSessionId == sessionId
                    && x.EmployeeId == record.EmployeeId
                    && x.AttendanceDate.Date == request.AttendanceDate.Date
                    && !x.IsDeleted);

            if (existing != null)
            {
                existing.Status = record.Status;
                existing.CheckInTime = record.CheckInTime;
                existing.CheckOutTime = record.CheckOutTime;
                existing.Notes = record.Notes;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
                updated++;
            }
            else
            {
                var entity = new TrainingAttendance
                {
                    TrainingSessionId = sessionId,
                    EmployeeId = record.EmployeeId,
                    AttendanceDate = request.AttendanceDate.Date,
                    Status = record.Status,
                    CheckInTime = record.CheckInTime,
                    CheckOutTime = record.CheckOutTime,
                    Notes = record.Notes,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                };
                _context.TrainingAttendanceRecords.Add(entity);
                created++;
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Attendance marked.", created, updated });
    }

    /// <summary>Updates a single training attendance record.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingAttendanceRequest request)
    {
        var entity = await _context.TrainingAttendanceRecords.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training attendance record not found." });

        entity.Status = request.Status;
        entity.CheckInTime = request.CheckInTime;
        entity.CheckOutTime = request.CheckOutTime;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training attendance updated." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class BulkTrainingAttendanceRequest
{
    public DateTime AttendanceDate { get; set; }
    public List<TrainingAttendanceRecord> Records { get; set; } = new();
}

public class TrainingAttendanceRecord
{
    public long EmployeeId { get; set; }
    public TrainingAttendanceStatus Status { get; set; }
    public TimeSpan? CheckInTime { get; set; }
    public TimeSpan? CheckOutTime { get; set; }
    public string? Notes { get; set; }
}

public class UpdateTrainingAttendanceRequest
{
    public TrainingAttendanceStatus Status { get; set; }
    public TimeSpan? CheckInTime { get; set; }
    public TimeSpan? CheckOutTime { get; set; }
    public string? Notes { get; set; }
}
