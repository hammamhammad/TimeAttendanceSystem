using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-enrollments")]
[Authorize]
public class TrainingEnrollmentsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingEnrollmentsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training enrollments with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingEnrollmentRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? sessionId = null,
        [FromQuery] long? programId = null,
        [FromQuery] TrainingEnrollmentStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingEnrollments.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (sessionId.HasValue) query = query.Where(x => x.TrainingSessionId == sessionId.Value);
        if (programId.HasValue) query = query.Where(x => x.TrainingProgramId == programId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Employee.FullName.Contains(search) || x.Employee.EmployeeNumber.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.EnrolledAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.TrainingSessionId,
                SessionTitle = x.Session != null ? x.Session.Title : (string?)null,
                CourseTitle = x.Session != null ? x.Session.Course.Title : (string?)null,
                CourseTitleAr = x.Session != null ? x.Session.Course.TitleAr : (string?)null,
                SessionStartDate = x.Session != null ? x.Session.StartDate : (DateTime?)null,
                SessionEndDate = x.Session != null ? x.Session.EndDate : (DateTime?)null,
                x.TrainingProgramId,
                ProgramTitle = x.Program != null ? x.Program.Title : (string?)null,
                Status = x.Status.ToString(),
                x.EnrolledAt,
                x.CompletedAt,
                x.CancelledAt,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training enrollment by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingEnrollmentRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingEnrollments.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.TrainingSessionId,
                SessionTitle = x.Session != null ? x.Session.Title : (string?)null,
                CourseTitle = x.Session != null ? x.Session.Course.Title : (string?)null,
                CourseTitleAr = x.Session != null ? x.Session.Course.TitleAr : (string?)null,
                SessionStartDate = x.Session != null ? x.Session.StartDate : (DateTime?)null,
                SessionEndDate = x.Session != null ? x.Session.EndDate : (DateTime?)null,
                x.TrainingProgramId,
                ProgramTitle = x.Program != null ? x.Program.Title : (string?)null,
                ProgramTitleAr = x.Program != null ? x.Program.TitleAr : (string?)null,
                Status = x.Status.ToString(),
                x.EnrolledByUserId,
                x.EnrolledAt,
                x.CompletedAt,
                x.CancelledAt,
                x.CancellationReason,
                x.WorkflowInstanceId,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training enrollment not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training enrollment.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingEnrollmentManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingEnrollmentRequest request)
    {
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!employeeExists) return BadRequest(new { error = "Employee not found." });

        if (request.TrainingSessionId.HasValue)
        {
            var session = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == request.TrainingSessionId.Value);
            if (session == null) return BadRequest(new { error = "Training session not found." });

            if (session.Status == TrainingSessionStatus.Completed || session.Status == TrainingSessionStatus.Cancelled)
                return BadRequest(new { error = "Cannot enroll in a completed or cancelled session." });

            // Check max participants
            if (session.MaxParticipants.HasValue)
            {
                var currentCount = await _context.TrainingEnrollments
                    .CountAsync(x => x.TrainingSessionId == session.Id && x.Status != TrainingEnrollmentStatus.Cancelled && x.Status != TrainingEnrollmentStatus.Rejected && !x.IsDeleted);
                if (currentCount >= session.MaxParticipants.Value)
                    return BadRequest(new { error = "Session has reached maximum capacity." });
            }

            // Check duplicate enrollment
            var alreadyEnrolled = await _context.TrainingEnrollments
                .AnyAsync(x => x.EmployeeId == request.EmployeeId && x.TrainingSessionId == request.TrainingSessionId.Value
                    && x.Status != TrainingEnrollmentStatus.Cancelled && x.Status != TrainingEnrollmentStatus.Rejected && !x.IsDeleted);
            if (alreadyEnrolled) return BadRequest(new { error = "Employee is already enrolled in this session." });
        }

        var entity = new TrainingEnrollment
        {
            EmployeeId = request.EmployeeId,
            TrainingSessionId = request.TrainingSessionId,
            TrainingProgramId = request.TrainingProgramId,
            Status = TrainingEnrollmentStatus.Pending,
            EnrolledByUserId = _currentUser.UserId,
            EnrolledAt = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingEnrollments.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Approves a training enrollment.</summary>
    [HttpPost("{id}/approve")]
    [Authorize(Policy = "TrainingEnrollmentManagement")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.TrainingEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training enrollment not found." });

        if (entity.Status != TrainingEnrollmentStatus.Pending)
            return BadRequest(new { error = "Only pending enrollments can be approved." });

        entity.Status = TrainingEnrollmentStatus.Approved;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training enrollment approved." });
    }

    /// <summary>Rejects a training enrollment.</summary>
    [HttpPost("{id}/reject")]
    [Authorize(Policy = "TrainingEnrollmentManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectEnrollmentRequest? request = null)
    {
        var entity = await _context.TrainingEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training enrollment not found." });

        if (entity.Status != TrainingEnrollmentStatus.Pending)
            return BadRequest(new { error = "Only pending enrollments can be rejected." });

        entity.Status = TrainingEnrollmentStatus.Rejected;
        entity.CancellationReason = request?.Reason;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training enrollment rejected." });
    }

    /// <summary>Cancels a training enrollment.</summary>
    [HttpPost("{id}/cancel")]
    [Authorize(Policy = "TrainingEnrollmentManagement")]
    public async Task<IActionResult> Cancel(long id, [FromBody] CancelEnrollmentRequest? request = null)
    {
        var entity = await _context.TrainingEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training enrollment not found." });

        if (entity.Status == TrainingEnrollmentStatus.Completed || entity.Status == TrainingEnrollmentStatus.Cancelled)
            return BadRequest(new { error = "Cannot cancel a completed or already cancelled enrollment." });

        entity.Status = TrainingEnrollmentStatus.Cancelled;
        entity.CancelledAt = DateTime.UtcNow;
        entity.CancellationReason = request?.Reason;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training enrollment cancelled." });
    }

    /// <summary>Bulk enrolls multiple employees in a training session.</summary>
    [HttpPost("bulk-enroll")]
    [Authorize(Policy = "TrainingEnrollmentManagement")]
    public async Task<IActionResult> BulkEnroll([FromBody] BulkEnrollRequest request)
    {
        if (request.EmployeeIds == null || !request.EmployeeIds.Any())
            return BadRequest(new { error = "At least one employee is required." });

        TrainingSession? session = null;
        if (request.TrainingSessionId.HasValue)
        {
            session = await _context.TrainingSessions.FirstOrDefaultAsync(x => x.Id == request.TrainingSessionId.Value);
            if (session == null) return BadRequest(new { error = "Training session not found." });

            if (session.Status == TrainingSessionStatus.Completed || session.Status == TrainingSessionStatus.Cancelled)
                return BadRequest(new { error = "Cannot enroll in a completed or cancelled session." });
        }

        var existingEnrollments = await _context.TrainingEnrollments
            .Where(x => request.EmployeeIds.Contains(x.EmployeeId)
                && x.TrainingSessionId == request.TrainingSessionId
                && x.Status != TrainingEnrollmentStatus.Cancelled
                && x.Status != TrainingEnrollmentStatus.Rejected
                && !x.IsDeleted)
            .Select(x => x.EmployeeId)
            .ToListAsync();

        var newEmployeeIds = request.EmployeeIds.Except(existingEnrollments).ToList();
        var enrollments = new List<TrainingEnrollment>();

        foreach (var empId in newEmployeeIds)
        {
            var enrollment = new TrainingEnrollment
            {
                EmployeeId = empId,
                TrainingSessionId = request.TrainingSessionId,
                TrainingProgramId = request.TrainingProgramId,
                Status = TrainingEnrollmentStatus.Pending,
                EnrolledByUserId = _currentUser.UserId,
                EnrolledAt = DateTime.UtcNow,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "system"
            };
            _context.TrainingEnrollments.Add(enrollment);
            enrollments.Add(enrollment);
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = $"Enrolled {enrollments.Count} employees.",
            enrolledCount = enrollments.Count,
            skippedCount = existingEnrollments.Count
        });
    }

    /// <summary>Soft deletes a training enrollment.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingEnrollmentManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training enrollment not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training enrollment deleted." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateTrainingEnrollmentRequest
{
    public long EmployeeId { get; set; }
    public long? TrainingSessionId { get; set; }
    public long? TrainingProgramId { get; set; }
}

public class RejectEnrollmentRequest
{
    public string? Reason { get; set; }
}

public class CancelEnrollmentRequest
{
    public string? Reason { get; set; }
}

public class BulkEnrollRequest
{
    public List<long> EmployeeIds { get; set; } = new();
    public long? TrainingSessionId { get; set; }
    public long? TrainingProgramId { get; set; }
}
