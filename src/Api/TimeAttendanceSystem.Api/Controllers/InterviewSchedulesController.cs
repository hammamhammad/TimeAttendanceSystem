using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/interviews")]
[Authorize]
[RequiresModuleEndpoint(SystemModule.Recruitment)]
public class InterviewSchedulesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public InterviewSchedulesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists interview schedules with optional filters and pagination.</summary>
    [HttpGet]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? applicationId,
        [FromQuery] long? interviewerEmployeeId,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] InterviewResult? result,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.InterviewSchedules
            .Include(i => i.InterviewerEmployee)
            .Include(i => i.JobApplication).ThenInclude(a => a.Candidate)
            .Include(i => i.JobApplication).ThenInclude(a => a.JobPosting)
            .Where(i => !i.IsDeleted);

        if (applicationId.HasValue)
            query = query.Where(i => i.JobApplicationId == applicationId.Value);
        if (interviewerEmployeeId.HasValue)
            query = query.Where(i => i.InterviewerEmployeeId == interviewerEmployeeId.Value);
        if (fromDate.HasValue)
            query = query.Where(i => i.ScheduledDate >= fromDate.Value);
        if (toDate.HasValue)
            query = query.Where(i => i.ScheduledDate <= toDate.Value);
        if (result.HasValue)
            query = query.Where(i => i.Result == result.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(i => i.ScheduledDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(i => new InterviewScheduleListDto
            {
                Id = i.Id,
                JobApplicationId = i.JobApplicationId,
                CandidateName = i.JobApplication.Candidate.FirstName + " " + i.JobApplication.Candidate.LastName,
                PostingTitle = i.JobApplication.JobPosting.PostingTitle,
                InterviewType = i.InterviewType,
                InterviewerEmployeeId = i.InterviewerEmployeeId,
                InterviewerName = i.InterviewerEmployee.FirstName + " " + i.InterviewerEmployee.LastName,
                ScheduledDate = i.ScheduledDate,
                DurationMinutes = i.DurationMinutes,
                Location = i.Location,
                MeetingLink = i.MeetingLink,
                Result = i.Result,
                CreatedAtUtc = i.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets an interview schedule by ID.</summary>
    [HttpGet("{id}")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.InterviewSchedules
            .Include(i => i.InterviewerEmployee)
            .Include(i => i.JobApplication).ThenInclude(a => a.Candidate)
            .Include(i => i.JobApplication).ThenInclude(a => a.JobPosting)
            .Include(i => i.Feedback)
            .Where(i => i.Id == id && !i.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Interview schedule not found." });

        return Ok(new InterviewScheduleDetailDto
        {
            Id = item.Id,
            JobApplicationId = item.JobApplicationId,
            CandidateName = item.JobApplication.Candidate.FirstName + " " + item.JobApplication.Candidate.LastName,
            CandidateEmail = item.JobApplication.Candidate.Email,
            PostingTitle = item.JobApplication.JobPosting.PostingTitle,
            InterviewType = item.InterviewType,
            InterviewerEmployeeId = item.InterviewerEmployeeId,
            InterviewerName = item.InterviewerEmployee.FirstName + " " + item.InterviewerEmployee.LastName,
            ScheduledDate = item.ScheduledDate,
            DurationMinutes = item.DurationMinutes,
            Location = item.Location,
            MeetingLink = item.MeetingLink,
            Result = item.Result,
            Notes = item.Notes,
            CancellationReason = item.CancellationReason,
            HasFeedback = item.Feedback != null && !item.Feedback.IsDeleted,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new interview schedule (updates application status to InterviewScheduled).</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateInterviewScheduleRequest request)
    {
        // Validate application exists
        var application = await _context.JobApplications
            .FirstOrDefaultAsync(a => a.Id == request.JobApplicationId && !a.IsDeleted);

        if (application == null)
            return NotFound(new { error = "Job application not found." });

        if (application.Status == ApplicationStatus.Rejected ||
            application.Status == ApplicationStatus.Withdrawn ||
            application.Status == ApplicationStatus.Hired)
            return BadRequest(new { error = "Cannot schedule interview for application in terminal status." });

        // Validate interviewer exists
        var interviewer = await _context.Employees
            .AnyAsync(e => e.Id == request.InterviewerEmployeeId && !e.IsDeleted && e.IsActive);

        if (!interviewer)
            return NotFound(new { error = "Interviewer employee not found." });

        var entity = new InterviewSchedule
        {
            JobApplicationId = request.JobApplicationId,
            InterviewType = request.InterviewType,
            InterviewerEmployeeId = request.InterviewerEmployeeId,
            ScheduledDate = request.ScheduledDate,
            DurationMinutes = request.DurationMinutes,
            Location = request.Location,
            MeetingLink = request.MeetingLink,
            Notes = request.Notes,
            Result = InterviewResult.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.InterviewSchedules.Add(entity);

        // Update application status to InterviewScheduled
        if (application.Status < ApplicationStatus.InterviewScheduled)
        {
            application.Status = ApplicationStatus.InterviewScheduled;
            application.ModifiedAtUtc = DateTime.UtcNow;
            application.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates (reschedules) an interview.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateInterviewScheduleRequest request)
    {
        var entity = await _context.InterviewSchedules
            .FirstOrDefaultAsync(i => i.Id == id && !i.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Interview schedule not found." });

        if (entity.Result != InterviewResult.Pending && entity.Result != InterviewResult.Rescheduled)
            return BadRequest(new { error = "Can only reschedule pending or previously rescheduled interviews." });

        entity.InterviewType = request.InterviewType;
        entity.InterviewerEmployeeId = request.InterviewerEmployeeId;
        entity.ScheduledDate = request.ScheduledDate;
        entity.DurationMinutes = request.DurationMinutes;
        entity.Location = request.Location;
        entity.MeetingLink = request.MeetingLink;
        entity.Notes = request.Notes;
        entity.Result = InterviewResult.Rescheduled;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Marks interview as complete with result.</summary>
    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(long id, [FromBody] CompleteInterviewRequest request)
    {
        var entity = await _context.InterviewSchedules
            .Include(i => i.JobApplication)
            .FirstOrDefaultAsync(i => i.Id == id && !i.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Interview schedule not found." });

        if (entity.Result != InterviewResult.Pending && entity.Result != InterviewResult.Rescheduled)
            return BadRequest(new { error = "Interview is not in a pending or rescheduled state." });

        entity.Result = request.Result;
        entity.Notes = request.Notes ?? entity.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Update application status to Interviewing if it was InterviewScheduled
        if (entity.JobApplication.Status == ApplicationStatus.InterviewScheduled)
        {
            entity.JobApplication.Status = ApplicationStatus.Interviewing;
            entity.JobApplication.ModifiedAtUtc = DateTime.UtcNow;
            entity.JobApplication.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = $"Interview completed with result: {request.Result}." });
    }

    /// <summary>Cancels an interview with reason.</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id, [FromBody] CancelInterviewRequest request)
    {
        var entity = await _context.InterviewSchedules
            .FirstOrDefaultAsync(i => i.Id == id && !i.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Interview schedule not found." });

        if (entity.Result != InterviewResult.Pending && entity.Result != InterviewResult.Rescheduled)
            return BadRequest(new { error = "Can only cancel pending or rescheduled interviews." });

        entity.CancellationReason = request.Reason;
        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Interview cancelled." });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateInterviewScheduleRequest(
    long JobApplicationId,
    InterviewType InterviewType,
    long InterviewerEmployeeId,
    DateTime ScheduledDate,
    int DurationMinutes,
    string? Location,
    string? MeetingLink,
    string? Notes
);

public record UpdateInterviewScheduleRequest(
    InterviewType InterviewType,
    long InterviewerEmployeeId,
    DateTime ScheduledDate,
    int DurationMinutes,
    string? Location,
    string? MeetingLink,
    string? Notes
);

public record CompleteInterviewRequest(
    InterviewResult Result,
    string? Notes
);

public record CancelInterviewRequest(string Reason);

public class InterviewScheduleListDto
{
    public long Id { get; set; }
    public long JobApplicationId { get; set; }
    public string CandidateName { get; set; } = string.Empty;
    public string PostingTitle { get; set; } = string.Empty;
    public InterviewType InterviewType { get; set; }
    public long InterviewerEmployeeId { get; set; }
    public string InterviewerName { get; set; } = string.Empty;
    public DateTime ScheduledDate { get; set; }
    public int DurationMinutes { get; set; }
    public string? Location { get; set; }
    public string? MeetingLink { get; set; }
    public InterviewResult Result { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class InterviewScheduleDetailDto : InterviewScheduleListDto
{
    public string? CandidateEmail { get; set; }
    public string? Notes { get; set; }
    public string? CancellationReason { get; set; }
    public bool HasFeedback { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
