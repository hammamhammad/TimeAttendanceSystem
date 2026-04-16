using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/exit-interviews")]
[Authorize]
[RequiresModuleEndpoint(SystemModule.Offboarding)]
public class ExitInterviewsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public ExitInterviewsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet("{terminationId}")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetByTermination(long terminationId)
    {
        var interview = await _context.ExitInterviews
            .Include(e => e.Employee)
            .Where(e => e.TerminationRecordId == terminationId && !e.IsDeleted)
            .Select(e => new
            {
                e.Id,
                e.TerminationRecordId,
                e.EmployeeId,
                EmployeeName = e.Employee.FirstName + " " + e.Employee.LastName,
                e.InterviewDate,
                e.InterviewerUserId,
                e.OverallSatisfactionRating,
                e.ReasonForLeaving,
                e.ReasonForLeavingAr,
                e.WouldRejoin,
                e.LikedMost,
                e.ImprovementSuggestions,
                e.AdditionalComments,
                e.IsConfidential,
                e.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (interview == null)
            return NotFound(new { error = "Exit interview not found." });

        return Ok(interview);
    }

    [HttpPost("{terminationId}")]
    public async Task<IActionResult> Create(long terminationId, [FromBody] ExitInterviewRequest request)
    {
        var termination = await _context.TerminationRecords
            .FirstOrDefaultAsync(t => t.Id == terminationId && !t.IsDeleted);

        if (termination == null)
            return NotFound(new { error = "Termination record not found." });

        var exists = await _context.ExitInterviews
            .AnyAsync(e => e.TerminationRecordId == terminationId && !e.IsDeleted);

        if (exists)
            return BadRequest(new { error = "Exit interview already exists for this termination." });

        var interview = new ExitInterview
        {
            TerminationRecordId = terminationId,
            EmployeeId = termination.EmployeeId,
            InterviewDate = request.InterviewDate,
            InterviewerUserId = _currentUser.UserId ?? 0,
            OverallSatisfactionRating = request.OverallSatisfactionRating,
            ReasonForLeaving = request.ReasonForLeaving,
            ReasonForLeavingAr = request.ReasonForLeavingAr,
            WouldRejoin = request.WouldRejoin,
            LikedMost = request.LikedMost,
            ImprovementSuggestions = request.ImprovementSuggestions,
            AdditionalComments = request.AdditionalComments,
            IsConfidential = request.IsConfidential,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.ExitInterviews.Add(interview);
        await _context.SaveChangesAsync();

        return Ok(new { id = interview.Id });
    }

    [HttpPut("{terminationId}")]
    public async Task<IActionResult> Update(long terminationId, [FromBody] ExitInterviewRequest request)
    {
        var interview = await _context.ExitInterviews
            .FirstOrDefaultAsync(e => e.TerminationRecordId == terminationId && !e.IsDeleted);

        if (interview == null)
            return NotFound(new { error = "Exit interview not found." });

        interview.InterviewDate = request.InterviewDate;
        interview.OverallSatisfactionRating = request.OverallSatisfactionRating;
        interview.ReasonForLeaving = request.ReasonForLeaving;
        interview.ReasonForLeavingAr = request.ReasonForLeavingAr;
        interview.WouldRejoin = request.WouldRejoin;
        interview.LikedMost = request.LikedMost;
        interview.ImprovementSuggestions = request.ImprovementSuggestions;
        interview.AdditionalComments = request.AdditionalComments;
        interview.IsConfidential = request.IsConfidential;
        interview.ModifiedAtUtc = DateTime.UtcNow;
        interview.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public record ExitInterviewRequest(
    DateTime InterviewDate,
    int? OverallSatisfactionRating,
    string? ReasonForLeaving,
    string? ReasonForLeavingAr,
    bool? WouldRejoin,
    string? LikedMost,
    string? ImprovementSuggestions,
    string? AdditionalComments,
    bool IsConfidential = true
);
