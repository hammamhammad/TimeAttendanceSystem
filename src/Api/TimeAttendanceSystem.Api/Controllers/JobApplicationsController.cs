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
[Route("api/v1/job-applications")]
[Authorize]
[RequiresModuleEndpoint(SystemModule.Recruitment)]
public class JobApplicationsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public JobApplicationsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists job applications with optional filters and pagination.</summary>
    [HttpGet]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? postingId,
        [FromQuery] long? candidateId,
        [FromQuery] ApplicationStatus? status,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.JobApplications
            .Include(a => a.Candidate)
            .Include(a => a.JobPosting).ThenInclude(p => p.JobRequisition)
            .Where(a => !a.IsDeleted);

        if (postingId.HasValue)
            query = query.Where(a => a.JobPostingId == postingId.Value);
        if (candidateId.HasValue)
            query = query.Where(a => a.CandidateId == candidateId.Value);
        if (status.HasValue)
            query = query.Where(a => a.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(a =>
                a.Candidate.FirstName.Contains(search) ||
                a.Candidate.LastName.Contains(search) ||
                (a.Candidate.Email != null && a.Candidate.Email.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(a => a.AppliedDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new JobApplicationListDto
            {
                Id = a.Id,
                CandidateId = a.CandidateId,
                CandidateName = a.Candidate.FirstName + " " + a.Candidate.LastName,
                CandidateEmail = a.Candidate.Email,
                JobPostingId = a.JobPostingId,
                PostingTitle = a.JobPosting.PostingTitle,
                RequisitionNumber = a.JobPosting.JobRequisition.RequisitionNumber,
                Status = a.Status,
                AppliedDate = a.AppliedDate,
                CreatedAtUtc = a.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a job application by ID with full details.</summary>
    [HttpGet("{id}")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.JobApplications
            .Include(a => a.Candidate)
            .Include(a => a.JobPosting).ThenInclude(p => p.JobRequisition).ThenInclude(r => r.Branch)
            .Include(a => a.JobPosting).ThenInclude(p => p.JobRequisition).ThenInclude(r => r.Department)
            .Include(a => a.Interviews).ThenInclude(i => i.InterviewerEmployee)
            .Where(a => a.Id == id && !a.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Job application not found." });

        return Ok(new JobApplicationDetailDto
        {
            Id = item.Id,
            CandidateId = item.CandidateId,
            CandidateName = item.Candidate.FirstName + " " + item.Candidate.LastName,
            CandidateEmail = item.Candidate.Email,
            CandidatePhone = item.Candidate.Phone,
            CandidateResumeUrl = item.Candidate.ResumeUrl,
            JobPostingId = item.JobPostingId,
            PostingTitle = item.JobPosting.PostingTitle,
            RequisitionNumber = item.JobPosting.JobRequisition.RequisitionNumber,
            BranchName = item.JobPosting.JobRequisition.Branch.Name,
            DepartmentName = item.JobPosting.JobRequisition.Department.Name,
            Status = item.Status,
            AppliedDate = item.AppliedDate,
            CoverLetterUrl = item.CoverLetterUrl,
            ScreeningNotes = item.ScreeningNotes,
            RejectionReason = item.RejectionReason,
            RejectionReasonAr = item.RejectionReasonAr,
            ReviewedByUserId = item.ReviewedByUserId,
            ReviewedAt = item.ReviewedAt,
            Notes = item.Notes,
            Interviews = item.Interviews.Where(i => !i.IsDeleted).Select(i => new InterviewSummaryDto
            {
                Id = i.Id,
                InterviewType = i.InterviewType,
                InterviewerName = i.InterviewerEmployee.FirstName + " " + i.InterviewerEmployee.LastName,
                ScheduledDate = i.ScheduledDate,
                Result = i.Result
            }).ToList(),
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new job application.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateJobApplicationRequest request)
    {
        // Validate posting is Published
        var posting = await _context.JobPostings
            .FirstOrDefaultAsync(p => p.Id == request.JobPostingId && !p.IsDeleted);

        if (posting == null)
            return NotFound(new { error = "Job posting not found." });

        if (posting.Status != JobPostingStatus.Published)
            return BadRequest(new { error = "Can only apply to published postings." });

        // Validate candidate exists
        var candidate = await _context.Candidates
            .FirstOrDefaultAsync(c => c.Id == request.CandidateId && !c.IsDeleted);

        if (candidate == null)
            return NotFound(new { error = "Candidate not found." });

        // Check if candidate already applied to this posting
        var existingApp = await _context.JobApplications
            .AnyAsync(a => a.CandidateId == request.CandidateId
                && a.JobPostingId == request.JobPostingId
                && !a.IsDeleted);

        if (existingApp)
            return BadRequest(new { error = "Candidate has already applied to this posting." });

        var entity = new JobApplication
        {
            CandidateId = request.CandidateId,
            JobPostingId = request.JobPostingId,
            Status = ApplicationStatus.New,
            AppliedDate = DateTime.UtcNow,
            CoverLetterUrl = request.CoverLetterUrl,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.JobApplications.Add(entity);

        // Increment application count on posting
        posting.ApplicationCount++;
        posting.ModifiedAtUtc = DateTime.UtcNow;
        posting.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Advances an application to the next stage.</summary>
    [HttpPost("{id}/advance")]
    public async Task<IActionResult> Advance(long id, [FromBody] AdvanceApplicationRequest request)
    {
        var entity = await _context.JobApplications
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job application not found." });

        if (entity.Status == ApplicationStatus.Hired ||
            entity.Status == ApplicationStatus.Rejected ||
            entity.Status == ApplicationStatus.Withdrawn)
            return BadRequest(new { error = "Cannot advance application in terminal status." });

        // Advance to specified stage or next sequential stage
        entity.Status = request.NewStatus;
        entity.ScreeningNotes = request.Notes ?? entity.ScreeningNotes;
        entity.ReviewedByUserId = _currentUser.UserId;
        entity.ReviewedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = $"Application advanced to {entity.Status}." });
    }

    /// <summary>Rejects an application with reason.</summary>
    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectApplicationRequest request)
    {
        var entity = await _context.JobApplications
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job application not found." });

        if (entity.Status == ApplicationStatus.Hired || entity.Status == ApplicationStatus.Rejected)
            return BadRequest(new { error = "Cannot reject application in terminal status." });

        entity.Status = ApplicationStatus.Rejected;
        entity.RejectionReason = request.Reason;
        entity.RejectionReasonAr = request.ReasonAr;
        entity.ReviewedByUserId = _currentUser.UserId;
        entity.ReviewedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Application rejected." });
    }

    /// <summary>Withdraws an application by candidate.</summary>
    [HttpPost("{id}/withdraw")]
    public async Task<IActionResult> Withdraw(long id)
    {
        var entity = await _context.JobApplications
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job application not found." });

        if (entity.Status == ApplicationStatus.Hired || entity.Status == ApplicationStatus.Rejected)
            return BadRequest(new { error = "Cannot withdraw application in terminal status." });

        entity.Status = ApplicationStatus.Withdrawn;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Application withdrawn." });
    }

    /// <summary>Gets pipeline view for a specific posting (count per stage).</summary>
    [HttpGet("posting/{postingId}/pipeline")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetPipeline(long postingId)
    {
        var pipeline = await _context.JobApplications
            .Where(a => a.JobPostingId == postingId && !a.IsDeleted)
            .GroupBy(a => a.Status)
            .Select(g => new { Stage = g.Key, Count = g.Count() })
            .ToListAsync();

        return Ok(pipeline);
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateJobApplicationRequest(
    long CandidateId,
    long JobPostingId,
    string? CoverLetterUrl,
    string? Notes
);

public record AdvanceApplicationRequest(
    ApplicationStatus NewStatus,
    string? Notes
);

public record RejectApplicationRequest(
    string Reason,
    string? ReasonAr
);

public class JobApplicationListDto
{
    public long Id { get; set; }
    public long CandidateId { get; set; }
    public string CandidateName { get; set; } = string.Empty;
    public string? CandidateEmail { get; set; }
    public long JobPostingId { get; set; }
    public string PostingTitle { get; set; } = string.Empty;
    public string RequisitionNumber { get; set; } = string.Empty;
    public ApplicationStatus Status { get; set; }
    public DateTime AppliedDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class JobApplicationDetailDto : JobApplicationListDto
{
    public string? CandidatePhone { get; set; }
    public string? CandidateResumeUrl { get; set; }
    public string? BranchName { get; set; }
    public string? DepartmentName { get; set; }
    public string? CoverLetterUrl { get; set; }
    public string? ScreeningNotes { get; set; }
    public string? RejectionReason { get; set; }
    public string? RejectionReasonAr { get; set; }
    public long? ReviewedByUserId { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public string? Notes { get; set; }
    public List<InterviewSummaryDto> Interviews { get; set; } = new();
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}

public class InterviewSummaryDto
{
    public long Id { get; set; }
    public InterviewType InterviewType { get; set; }
    public string InterviewerName { get; set; } = string.Empty;
    public DateTime ScheduledDate { get; set; }
    public InterviewResult Result { get; set; }
}
