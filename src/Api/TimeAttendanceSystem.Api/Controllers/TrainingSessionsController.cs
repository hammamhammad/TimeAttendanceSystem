using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-sessions")]
[Authorize]
public class TrainingSessionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingSessionsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training sessions with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingSessionRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? courseId = null,
        [FromQuery] long? programId = null,
        [FromQuery] long? branchId = null,
        [FromQuery] TrainingSessionStatus? status = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingSessions.AsNoTracking().AsQueryable();

        if (courseId.HasValue) query = query.Where(x => x.TrainingCourseId == courseId.Value);
        if (programId.HasValue) query = query.Where(x => x.TrainingProgramId == programId.Value);
        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (fromDate.HasValue) query = query.Where(x => x.StartDate >= fromDate.Value);
        if (toDate.HasValue) query = query.Where(x => x.EndDate <= toDate.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => (x.Title != null && x.Title.Contains(search)) || x.InstructorName != null && x.InstructorName.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TrainingCourseId,
                CourseCode = x.Course.Code,
                CourseTitle = x.Course.Title,
                CourseTitleAr = x.Course.TitleAr,
                x.TrainingProgramId,
                ProgramTitle = x.Program != null ? x.Program.Title : (string?)null,
                x.Location,
                x.LocationAr,
                x.InstructorName,
                x.InstructorNameAr,
                x.StartDate,
                x.EndDate,
                x.StartTime,
                x.EndTime,
                x.MaxParticipants,
                Status = x.Status.ToString(),
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : (string?)null,
                EnrollmentCount = x.Enrollments.Count(e => !e.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training session by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingSessionRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingSessions.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TrainingCourseId,
                CourseCode = x.Course.Code,
                CourseTitle = x.Course.Title,
                CourseTitleAr = x.Course.TitleAr,
                x.TrainingProgramId,
                ProgramTitle = x.Program != null ? x.Program.Title : (string?)null,
                ProgramTitleAr = x.Program != null ? x.Program.TitleAr : (string?)null,
                x.Location,
                x.LocationAr,
                x.InstructorName,
                x.InstructorNameAr,
                x.StartDate,
                x.EndDate,
                x.StartTime,
                x.EndTime,
                x.MaxParticipants,
                Status = x.Status.ToString(),
                x.Notes,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : (string?)null,
                EnrollmentCount = x.Enrollments.Count(e => !e.IsDeleted),
                Enrollments = x.Enrollments
                    .Where(e => !e.IsDeleted)
                    .Select(e => new
                    {
                        e.Id,
                        e.EmployeeId,
                        EmployeeName = e.Employee.FullName,
                        EmployeeNameAr = e.Employee.FullNameAr,
                        EmployeeNumber = e.Employee.EmployeeNumber,
                        Status = e.Status.ToString(),
                        e.EnrolledAt
                    })
                    .ToList(),
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training session not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training session.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingSessionRequest request)
    {
        var courseExists = await _context.TrainingCourses.AnyAsync(x => x.Id == request.TrainingCourseId);
        if (!courseExists) return BadRequest(new { error = "Training course not found." });

        var entity = new TrainingSession
        {
            TrainingCourseId = request.TrainingCourseId,
            TrainingProgramId = request.TrainingProgramId,
            Title = request.Title,
            Location = request.Location,
            LocationAr = request.LocationAr,
            InstructorName = request.InstructorName,
            InstructorNameAr = request.InstructorNameAr,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            MaxParticipants = request.MaxParticipants,
            Status = TrainingSessionStatus.Scheduled,
            Notes = request.Notes,
            BranchId = request.BranchId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingSessions.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing training session.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingSessionRequest request)
    {
        var entity = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training session not found." });

        if (entity.Status == TrainingSessionStatus.Completed || entity.Status == TrainingSessionStatus.Cancelled)
            return BadRequest(new { error = "Cannot update a completed or cancelled session." });

        entity.TrainingCourseId = request.TrainingCourseId;
        entity.TrainingProgramId = request.TrainingProgramId;
        entity.Title = request.Title;
        entity.Location = request.Location;
        entity.LocationAr = request.LocationAr;
        entity.InstructorName = request.InstructorName;
        entity.InstructorNameAr = request.InstructorNameAr;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.StartTime = request.StartTime;
        entity.EndTime = request.EndTime;
        entity.MaxParticipants = request.MaxParticipants;
        entity.Notes = request.Notes;
        entity.BranchId = request.BranchId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training session updated." });
    }

    /// <summary>Soft deletes a training session.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training session not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training session deleted." });
    }

    /// <summary>Marks a training session as completed.</summary>
    [HttpPost("{id}/complete")]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> Complete(long id)
    {
        var entity = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training session not found." });

        if (entity.Status == TrainingSessionStatus.Completed)
            return BadRequest(new { error = "Session is already completed." });
        if (entity.Status == TrainingSessionStatus.Cancelled)
            return BadRequest(new { error = "Cannot complete a cancelled session." });

        entity.Status = TrainingSessionStatus.Completed;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Mark approved enrollments as completed
        var enrollments = await _context.TrainingEnrollments
            .Where(e => e.TrainingSessionId == id && (e.Status == TrainingEnrollmentStatus.Approved || e.Status == TrainingEnrollmentStatus.InProgress) && !e.IsDeleted)
            .ToListAsync();

        foreach (var enrollment in enrollments)
        {
            enrollment.Status = TrainingEnrollmentStatus.Completed;
            enrollment.CompletedAt = DateTime.UtcNow;
            enrollment.ModifiedAtUtc = DateTime.UtcNow;
            enrollment.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training session completed.", enrollmentsCompleted = enrollments.Count });
    }

    /// <summary>Cancels a training session.</summary>
    [HttpPost("{id}/cancel")]
    [Authorize(Policy = "TrainingSessionManagement")]
    public async Task<IActionResult> Cancel(long id)
    {
        var entity = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training session not found." });

        if (entity.Status == TrainingSessionStatus.Completed)
            return BadRequest(new { error = "Cannot cancel a completed session." });
        if (entity.Status == TrainingSessionStatus.Cancelled)
            return BadRequest(new { error = "Session is already cancelled." });

        entity.Status = TrainingSessionStatus.Cancelled;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Cancel pending/approved enrollments
        var enrollments = await _context.TrainingEnrollments
            .Where(e => e.TrainingSessionId == id && e.Status != TrainingEnrollmentStatus.Cancelled && e.Status != TrainingEnrollmentStatus.Completed && !e.IsDeleted)
            .ToListAsync();

        foreach (var enrollment in enrollments)
        {
            enrollment.Status = TrainingEnrollmentStatus.Cancelled;
            enrollment.CancelledAt = DateTime.UtcNow;
            enrollment.CancellationReason = "Session cancelled";
            enrollment.ModifiedAtUtc = DateTime.UtcNow;
            enrollment.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training session cancelled.", enrollmentsCancelled = enrollments.Count });
    }

    /// <summary>Gets training sessions for calendar view.</summary>
    [HttpGet("calendar")]
    [Authorize(Policy = "TrainingSessionRead")]
    public async Task<IActionResult> GetCalendar(
        [FromQuery] DateTime from,
        [FromQuery] DateTime to,
        [FromQuery] long? branchId = null)
    {
        var query = _context.TrainingSessions.AsNoTracking()
            .Where(x => x.StartDate <= to && x.EndDate >= from);

        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value);

        var items = await query
            .Select(x => new
            {
                x.Id,
                x.Title,
                CourseTitle = x.Course.Title,
                CourseTitleAr = x.Course.TitleAr,
                x.StartDate,
                x.EndDate,
                x.StartTime,
                x.EndTime,
                Status = x.Status.ToString(),
                x.Location,
                x.LocationAr,
                x.InstructorName,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : (string?)null,
                EnrollmentCount = x.Enrollments.Count(e => !e.IsDeleted),
                x.MaxParticipants
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Returns scheduled/in-progress sessions for dropdowns.</summary>
    [HttpGet("dropdown")]
    [Authorize(Policy = "TrainingSessionRead")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.TrainingSessions.AsNoTracking()
            .Where(x => x.Status == TrainingSessionStatus.Scheduled || x.Status == TrainingSessionStatus.InProgress)
            .OrderBy(x => x.StartDate)
            .Select(x => new
            {
                x.Id,
                x.Title,
                CourseTitle = x.Course.Title,
                CourseTitleAr = x.Course.TitleAr,
                x.StartDate,
                x.EndDate
            })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateTrainingSessionRequest
{
    public long TrainingCourseId { get; set; }
    public long? TrainingProgramId { get; set; }
    public string? Title { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public string? InstructorName { get; set; }
    public string? InstructorNameAr { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }
    public int? MaxParticipants { get; set; }
    public string? Notes { get; set; }
    public long? BranchId { get; set; }
}

public class UpdateTrainingSessionRequest
{
    public long TrainingCourseId { get; set; }
    public long? TrainingProgramId { get; set; }
    public string? Title { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public string? InstructorName { get; set; }
    public string? InstructorNameAr { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }
    public int? MaxParticipants { get; set; }
    public string? Notes { get; set; }
    public long? BranchId { get; set; }
}
