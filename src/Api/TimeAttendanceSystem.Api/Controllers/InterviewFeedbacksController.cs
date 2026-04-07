using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/interview-feedbacks")]
[Authorize]
public class InterviewFeedbacksController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public InterviewFeedbacksController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Gets feedback for a specific interview.</summary>
    [HttpGet("{interviewId}")]
    public async Task<IActionResult> GetByInterview(long interviewId)
    {
        var feedback = await _context.InterviewFeedbacks
            .Include(f => f.InterviewerEmployee)
            .Include(f => f.InterviewSchedule).ThenInclude(i => i.JobApplication).ThenInclude(a => a.Candidate)
            .Where(f => f.InterviewScheduleId == interviewId && !f.IsDeleted)
            .FirstOrDefaultAsync();

        if (feedback == null)
            return NotFound(new { error = "Interview feedback not found." });

        return Ok(new InterviewFeedbackDto
        {
            Id = feedback.Id,
            InterviewScheduleId = feedback.InterviewScheduleId,
            InterviewerEmployeeId = feedback.InterviewerEmployeeId,
            InterviewerName = feedback.InterviewerEmployee.FirstName + " " + feedback.InterviewerEmployee.LastName,
            CandidateName = feedback.InterviewSchedule.JobApplication.Candidate.FirstName + " " + feedback.InterviewSchedule.JobApplication.Candidate.LastName,
            TechnicalScore = feedback.TechnicalScore,
            CommunicationScore = feedback.CommunicationScore,
            CulturalFitScore = feedback.CulturalFitScore,
            OverallScore = feedback.OverallScore,
            Recommendation = feedback.Recommendation,
            Strengths = feedback.Strengths,
            Weaknesses = feedback.Weaknesses,
            Comments = feedback.Comments,
            CreatedAtUtc = feedback.CreatedAtUtc,
            CreatedBy = feedback.CreatedBy,
            ModifiedAtUtc = feedback.ModifiedAtUtc
        });
    }

    /// <summary>Creates/submits interview feedback.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateInterviewFeedbackRequest request)
    {
        // Validate interview exists
        var interview = await _context.InterviewSchedules
            .FirstOrDefaultAsync(i => i.Id == request.InterviewScheduleId && !i.IsDeleted);

        if (interview == null)
            return NotFound(new { error = "Interview schedule not found." });

        // Check if feedback already exists
        var existingFeedback = await _context.InterviewFeedbacks
            .AnyAsync(f => f.InterviewScheduleId == request.InterviewScheduleId && !f.IsDeleted);

        if (existingFeedback)
            return BadRequest(new { error = "Feedback already exists for this interview. Use PUT to update." });

        var entity = new InterviewFeedback
        {
            InterviewScheduleId = request.InterviewScheduleId,
            InterviewerEmployeeId = request.InterviewerEmployeeId,
            TechnicalScore = request.TechnicalScore,
            CommunicationScore = request.CommunicationScore,
            CulturalFitScore = request.CulturalFitScore,
            OverallScore = request.OverallScore,
            Recommendation = request.Recommendation,
            Strengths = request.Strengths,
            Weaknesses = request.Weaknesses,
            Comments = request.Comments,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.InterviewFeedbacks.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates interview feedback.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateInterviewFeedbackRequest request)
    {
        var entity = await _context.InterviewFeedbacks
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Interview feedback not found." });

        entity.TechnicalScore = request.TechnicalScore;
        entity.CommunicationScore = request.CommunicationScore;
        entity.CulturalFitScore = request.CulturalFitScore;
        entity.OverallScore = request.OverallScore;
        entity.Recommendation = request.Recommendation;
        entity.Strengths = request.Strengths;
        entity.Weaknesses = request.Weaknesses;
        entity.Comments = request.Comments;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateInterviewFeedbackRequest(
    long InterviewScheduleId,
    long InterviewerEmployeeId,
    int TechnicalScore,
    int CommunicationScore,
    int CulturalFitScore,
    int OverallScore,
    InterviewRecommendation Recommendation,
    string? Strengths,
    string? Weaknesses,
    string? Comments
);

public record UpdateInterviewFeedbackRequest(
    int TechnicalScore,
    int CommunicationScore,
    int CulturalFitScore,
    int OverallScore,
    InterviewRecommendation Recommendation,
    string? Strengths,
    string? Weaknesses,
    string? Comments
);

public class InterviewFeedbackDto
{
    public long Id { get; set; }
    public long InterviewScheduleId { get; set; }
    public long InterviewerEmployeeId { get; set; }
    public string InterviewerName { get; set; } = string.Empty;
    public string CandidateName { get; set; } = string.Empty;
    public int TechnicalScore { get; set; }
    public int CommunicationScore { get; set; }
    public int CulturalFitScore { get; set; }
    public int OverallScore { get; set; }
    public InterviewRecommendation Recommendation { get; set; }
    public string? Strengths { get; set; }
    public string? Weaknesses { get; set; }
    public string? Comments { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
