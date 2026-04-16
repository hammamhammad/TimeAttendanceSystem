using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/feedback-requests")]
[Authorize]
public class FeedbackRequestsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public FeedbackRequestsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists 360 feedback requests with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? reviewId,
        [FromQuery] FeedbackStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.FeedbackRequests360
            .Include(f => f.RequestedFromEmployee)
            .Include(f => f.PerformanceReview).ThenInclude(r => r.Employee)
            .Include(f => f.PerformanceReview).ThenInclude(r => r.ReviewCycle)
            .Where(f => !f.IsDeleted);

        if (reviewId.HasValue)
            query = query.Where(f => f.PerformanceReviewId == reviewId.Value);
        if (status.HasValue)
            query = query.Where(f => f.Status == status.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(f => f.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(f => new FeedbackRequest360ListDto
            {
                Id = f.Id,
                PerformanceReviewId = f.PerformanceReviewId,
                CycleName = f.PerformanceReview.ReviewCycle.Name,
                RevieweeName = f.PerformanceReview.Employee.FirstName + " " + f.PerformanceReview.Employee.LastName,
                RequestedFromEmployeeId = f.RequestedFromEmployeeId,
                RequestedFromName = f.RequestedFromEmployee.FirstName + " " + f.RequestedFromEmployee.LastName,
                Status = f.Status,
                Deadline = f.Deadline,
                SubmittedAt = f.SubmittedAt,
                CreatedAtUtc = f.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Creates a 360 feedback request.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFeedbackRequest360Request request)
    {
        // Validate review exists
        var review = await _context.PerformanceReviews
            .AnyAsync(r => r.Id == request.PerformanceReviewId && !r.IsDeleted);

        if (!review)
            return NotFound(new { error = "Performance review not found." });

        // Validate requested employee exists
        var employee = await _context.Employees
            .AnyAsync(e => e.Id == request.RequestedFromEmployeeId && !e.IsDeleted && e.IsActive);

        if (!employee)
            return NotFound(new { error = "Employee not found." });

        // Check for duplicate request
        var exists = await _context.FeedbackRequests360
            .AnyAsync(f => f.PerformanceReviewId == request.PerformanceReviewId
                && f.RequestedFromEmployeeId == request.RequestedFromEmployeeId
                && !f.IsDeleted);

        if (exists)
            return BadRequest(new { error = "Feedback request already exists for this employee and review." });

        var entity = new FeedbackRequest360
        {
            PerformanceReviewId = request.PerformanceReviewId,
            RequestedFromEmployeeId = request.RequestedFromEmployeeId,
            Status = FeedbackStatus.Requested,
            Deadline = request.Deadline,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.FeedbackRequests360.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Gets pending feedback requests assigned to the current user (self-service).</summary>
    [HttpGet("my-pending")]
    public async Task<IActionResult> GetMyPending(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var employeeLink = await _context.EmployeeUserLinks
            .Where(l => l.UserId == _currentUser.UserId)
            .Select(l => l.EmployeeId)
            .FirstOrDefaultAsync();

        if (employeeLink == 0)
            return Ok(new { data = new List<object>(), totalCount = 0, pageNumber = page, pageSize });

        var query = _context.FeedbackRequests360
            .Include(f => f.PerformanceReview).ThenInclude(r => r.Employee)
            .Include(f => f.PerformanceReview).ThenInclude(r => r.ReviewCycle)
            .Where(f => !f.IsDeleted
                && f.RequestedFromEmployeeId == employeeLink
                && f.Status == FeedbackStatus.Requested);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(f => f.Deadline)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(f => new FeedbackRequest360ListDto
            {
                Id = f.Id,
                PerformanceReviewId = f.PerformanceReviewId,
                CycleName = f.PerformanceReview.ReviewCycle.Name,
                RevieweeName = f.PerformanceReview.Employee.FirstName + " " + f.PerformanceReview.Employee.LastName,
                RequestedFromEmployeeId = f.RequestedFromEmployeeId,
                RequestedFromName = "",
                Status = f.Status,
                Deadline = f.Deadline,
                SubmittedAt = f.SubmittedAt,
                CreatedAtUtc = f.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Submits a feedback response for a request.</summary>
    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(long id, [FromBody] SubmitFeedback360Request request)
    {
        var feedbackRequest = await _context.FeedbackRequests360
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);

        if (feedbackRequest == null)
            return NotFound(new { error = "Feedback request not found." });

        if (feedbackRequest.Status != FeedbackStatus.Requested)
            return BadRequest(new { error = "Can only submit feedback for pending requests." });

        // Create response
        var response = new Feedback360Response
        {
            FeedbackRequest360Id = feedbackRequest.Id,
            Ratings = request.Ratings,
            Strengths = request.Strengths,
            AreasForImprovement = request.AreasForImprovement,
            AdditionalComments = request.AdditionalComments,
            IsAnonymous = request.IsAnonymous,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.Feedback360Responses.Add(response);

        // Update request status
        feedbackRequest.Status = FeedbackStatus.Submitted;
        feedbackRequest.SubmittedAt = DateTime.UtcNow;
        feedbackRequest.ModifiedAtUtc = DateTime.UtcNow;
        feedbackRequest.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { responseId = response.Id, message = "Feedback submitted." });
    }

    /// <summary>Declines a feedback request.</summary>
    [HttpPost("{id}/decline")]
    public async Task<IActionResult> Decline(long id)
    {
        var feedbackRequest = await _context.FeedbackRequests360
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);

        if (feedbackRequest == null)
            return NotFound(new { error = "Feedback request not found." });

        if (feedbackRequest.Status != FeedbackStatus.Requested)
            return BadRequest(new { error = "Can only decline pending requests." });

        feedbackRequest.Status = FeedbackStatus.Declined;
        feedbackRequest.ModifiedAtUtc = DateTime.UtcNow;
        feedbackRequest.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Feedback request declined." });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateFeedbackRequest360Request(
    long PerformanceReviewId,
    long RequestedFromEmployeeId,
    DateTime? Deadline
);

public record SubmitFeedback360Request(
    string? Ratings,
    string? Strengths,
    string? AreasForImprovement,
    string? AdditionalComments,
    bool IsAnonymous
);

public class FeedbackRequest360ListDto
{
    public long Id { get; set; }
    public long PerformanceReviewId { get; set; }
    public string CycleName { get; set; } = string.Empty;
    public string RevieweeName { get; set; } = string.Empty;
    public long RequestedFromEmployeeId { get; set; }
    public string RequestedFromName { get; set; } = string.Empty;
    public FeedbackStatus Status { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
