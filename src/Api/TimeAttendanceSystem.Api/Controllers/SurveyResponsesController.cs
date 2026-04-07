using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/survey-responses")]
[Authorize]
public class SurveyResponsesController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public SurveyResponsesController(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Submits anonymous survey responses.
    /// Accepts a participant token and an array of responses.
    /// Does NOT require employee identity - linked via ParticipantToken only.
    /// </summary>
    [HttpPost("submit")]
    [AllowAnonymous]
    public async Task<IActionResult> Submit([FromBody] SubmitSurveyResponseRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ParticipantToken))
            return BadRequest(new { error = "Participant token is required." });

        if (request.Responses == null || !request.Responses.Any())
            return BadRequest(new { error = "At least one response is required." });

        // Find participant by anonymous token
        var participant = await _context.SurveyParticipants
            .Include(p => p.Distribution)
            .FirstOrDefaultAsync(p => p.AnonymousToken == request.ParticipantToken && !p.IsDeleted);

        if (participant == null)
            return NotFound(new { error = "Invalid participant token." });

        if (participant.Status == SurveyParticipantStatus.Completed)
            return BadRequest(new { error = "Survey has already been completed." });

        if (participant.Status == SurveyParticipantStatus.Expired)
            return BadRequest(new { error = "Survey has expired." });

        if (participant.Distribution.Status != SurveyDistributionStatus.Active)
            return BadRequest(new { error = "Survey is not currently active." });

        if (DateTime.UtcNow > participant.Distribution.EndDate)
            return BadRequest(new { error = "Survey deadline has passed." });

        // Validate that the question IDs belong to this distribution's template
        var validQuestionIds = await _context.SurveyQuestions.AsNoTracking()
            .Where(q => q.SurveyTemplateId == participant.Distribution.SurveyTemplateId && !q.IsDeleted)
            .Select(q => q.Id)
            .ToListAsync();

        var now = DateTime.UtcNow;

        // Delete any existing responses for this token (in case of re-submission from Started status)
        var existingResponses = await _context.SurveyResponses
            .Where(r => r.SurveyDistributionId == participant.SurveyDistributionId
                && r.ParticipantToken == request.ParticipantToken)
            .ToListAsync();

        foreach (var existing in existingResponses)
        {
            existing.IsDeleted = true;
            existing.ModifiedAtUtc = now;
            existing.ModifiedBy = "ANONYMOUS";
        }

        // Save new responses
        foreach (var resp in request.Responses)
        {
            if (!validQuestionIds.Contains(resp.QuestionId))
                continue; // Skip invalid question IDs

            var response = new SurveyResponse
            {
                SurveyDistributionId = participant.SurveyDistributionId,
                SurveyQuestionId = resp.QuestionId,
                ParticipantToken = request.ParticipantToken,
                ResponseText = resp.ResponseText,
                ResponseValue = resp.ResponseValue,
                SelectedOptions = resp.SelectedOptions,
                CreatedAtUtc = now,
                CreatedBy = "ANONYMOUS"
            };
            _context.SurveyResponses.Add(response);
        }

        // Update participant status
        participant.Status = SurveyParticipantStatus.Completed;
        participant.CompletedAt = now;
        participant.ModifiedAtUtc = now;
        participant.ModifiedBy = "ANONYMOUS";

        // Update distribution response count
        participant.Distribution.TotalResponses = await _context.SurveyParticipants
            .CountAsync(p => p.SurveyDistributionId == participant.SurveyDistributionId
                && p.Status == SurveyParticipantStatus.Completed) + 1; // +1 for current

        participant.Distribution.ModifiedAtUtc = now;
        participant.Distribution.ModifiedBy = "SYSTEM";

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey responses submitted successfully." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class SubmitSurveyResponseRequest
{
    public string ParticipantToken { get; set; } = string.Empty;
    public List<SurveyResponseItem> Responses { get; set; } = new();
}

public class SurveyResponseItem
{
    public long QuestionId { get; set; }
    public string? ResponseText { get; set; }
    public int? ResponseValue { get; set; }
    public string? SelectedOptions { get; set; }
}
