using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/job-postings")]
[Authorize]
public class JobPostingsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public JobPostingsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists job postings with optional filters and pagination.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? requisitionId,
        [FromQuery] JobPostingStatus? status,
        [FromQuery] bool? isInternal,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.JobPostings
            .Include(p => p.JobRequisition).ThenInclude(r => r.Branch)
            .Include(p => p.JobRequisition).ThenInclude(r => r.Department)
            .Where(p => !p.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(p => _currentUser.BranchIds.Contains(p.JobRequisition.BranchId));

        if (requisitionId.HasValue)
            query = query.Where(p => p.JobRequisitionId == requisitionId.Value);
        if (status.HasValue)
            query = query.Where(p => p.Status == status.Value);
        if (isInternal.HasValue)
            query = query.Where(p => p.IsInternal == isInternal.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.PostingTitle.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(p => p.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new JobPostingListDto
            {
                Id = p.Id,
                JobRequisitionId = p.JobRequisitionId,
                RequisitionNumber = p.JobRequisition.RequisitionNumber,
                PostingTitle = p.PostingTitle,
                PostingTitleAr = p.PostingTitleAr,
                BranchName = p.JobRequisition.Branch.Name,
                DepartmentName = p.JobRequisition.Department.Name,
                IsInternal = p.IsInternal,
                IsPublished = p.IsPublished,
                PublishDate = p.PublishDate,
                ExpiryDate = p.ExpiryDate,
                ApplicationCount = p.ApplicationCount,
                Status = p.Status,
                CreatedAtUtc = p.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a job posting by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.JobPostings
            .Include(p => p.JobRequisition).ThenInclude(r => r.Branch)
            .Include(p => p.JobRequisition).ThenInclude(r => r.Department)
            .Where(p => p.Id == id && !p.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Job posting not found." });

        return Ok(new JobPostingDetailDto
        {
            Id = item.Id,
            JobRequisitionId = item.JobRequisitionId,
            RequisitionNumber = item.JobRequisition.RequisitionNumber,
            JobTitle = item.JobRequisition.JobTitle,
            PostingTitle = item.PostingTitle,
            PostingTitleAr = item.PostingTitleAr,
            ExternalDescription = item.ExternalDescription,
            ExternalDescriptionAr = item.ExternalDescriptionAr,
            Responsibilities = item.Responsibilities,
            ResponsibilitiesAr = item.ResponsibilitiesAr,
            Benefits = item.Benefits,
            BenefitsAr = item.BenefitsAr,
            Location = item.Location,
            LocationAr = item.LocationAr,
            BranchName = item.JobRequisition.Branch.Name,
            DepartmentName = item.JobRequisition.Department.Name,
            IsInternal = item.IsInternal,
            IsPublished = item.IsPublished,
            PublishDate = item.PublishDate,
            ExpiryDate = item.ExpiryDate,
            ApplicationCount = item.ApplicationCount,
            Status = item.Status,
            Notes = item.Notes,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new job posting from an approved requisition.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateJobPostingRequest request)
    {
        var requisition = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == request.JobRequisitionId && !r.IsDeleted);

        if (requisition == null)
            return NotFound(new { error = "Job requisition not found." });

        if (requisition.Status != RequisitionStatus.Approved && requisition.Status != RequisitionStatus.Open)
            return BadRequest(new { error = "Can only create postings from Approved or Open requisitions." });

        // Mark requisition as Open if it was Approved
        if (requisition.Status == RequisitionStatus.Approved)
        {
            requisition.Status = RequisitionStatus.Open;
            requisition.ModifiedAtUtc = DateTime.UtcNow;
            requisition.ModifiedBy = _currentUser.Username;
        }

        var entity = new JobPosting
        {
            JobRequisitionId = request.JobRequisitionId,
            PostingTitle = request.PostingTitle,
            PostingTitleAr = request.PostingTitleAr,
            ExternalDescription = request.ExternalDescription,
            ExternalDescriptionAr = request.ExternalDescriptionAr,
            Responsibilities = request.Responsibilities,
            ResponsibilitiesAr = request.ResponsibilitiesAr,
            Benefits = request.Benefits,
            BenefitsAr = request.BenefitsAr,
            Location = request.Location,
            LocationAr = request.LocationAr,
            IsInternal = request.IsInternal,
            ExpiryDate = request.ExpiryDate,
            Status = JobPostingStatus.Draft,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.JobPostings.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a job posting (only if Draft).</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateJobPostingRequest request)
    {
        var entity = await _context.JobPostings
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job posting not found." });

        if (entity.Status != JobPostingStatus.Draft)
            return BadRequest(new { error = "Can only update postings in Draft status." });

        entity.PostingTitle = request.PostingTitle;
        entity.PostingTitleAr = request.PostingTitleAr;
        entity.ExternalDescription = request.ExternalDescription;
        entity.ExternalDescriptionAr = request.ExternalDescriptionAr;
        entity.Responsibilities = request.Responsibilities;
        entity.ResponsibilitiesAr = request.ResponsibilitiesAr;
        entity.Benefits = request.Benefits;
        entity.BenefitsAr = request.BenefitsAr;
        entity.Location = request.Location;
        entity.LocationAr = request.LocationAr;
        entity.IsInternal = request.IsInternal;
        entity.ExpiryDate = request.ExpiryDate;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Publishes a job posting.</summary>
    [HttpPost("{id}/publish")]
    public async Task<IActionResult> Publish(long id)
    {
        var entity = await _context.JobPostings
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job posting not found." });

        if (entity.Status != JobPostingStatus.Draft)
            return BadRequest(new { error = "Can only publish postings in Draft status." });

        entity.Status = JobPostingStatus.Published;
        entity.IsPublished = true;
        entity.PublishDate = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Job posting published." });
    }

    /// <summary>Closes a job posting.</summary>
    [HttpPost("{id}/close")]
    public async Task<IActionResult> Close(long id)
    {
        var entity = await _context.JobPostings
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job posting not found." });

        if (entity.Status != JobPostingStatus.Published)
            return BadRequest(new { error = "Can only close published postings." });

        entity.Status = JobPostingStatus.Closed;
        entity.IsPublished = false;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Job posting closed." });
    }

    /// <summary>Gets internal postings for self-service portal.</summary>
    [HttpGet("internal")]
    public async Task<IActionResult> GetInternalPostings(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.JobPostings
            .Include(p => p.JobRequisition).ThenInclude(r => r.Branch)
            .Include(p => p.JobRequisition).ThenInclude(r => r.Department)
            .Where(p => !p.IsDeleted && p.IsInternal && p.Status == JobPostingStatus.Published);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(p => p.PublishDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new JobPostingListDto
            {
                Id = p.Id,
                JobRequisitionId = p.JobRequisitionId,
                RequisitionNumber = p.JobRequisition.RequisitionNumber,
                PostingTitle = p.PostingTitle,
                PostingTitleAr = p.PostingTitleAr,
                BranchName = p.JobRequisition.Branch.Name,
                DepartmentName = p.JobRequisition.Department.Name,
                IsInternal = p.IsInternal,
                IsPublished = p.IsPublished,
                PublishDate = p.PublishDate,
                ExpiryDate = p.ExpiryDate,
                ApplicationCount = p.ApplicationCount,
                Status = p.Status,
                CreatedAtUtc = p.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateJobPostingRequest(
    long JobRequisitionId,
    string PostingTitle,
    string? PostingTitleAr,
    string? ExternalDescription,
    string? ExternalDescriptionAr,
    string? Responsibilities,
    string? ResponsibilitiesAr,
    string? Benefits,
    string? BenefitsAr,
    string? Location,
    string? LocationAr,
    bool IsInternal,
    DateTime? ExpiryDate,
    string? Notes
);

public record UpdateJobPostingRequest(
    string PostingTitle,
    string? PostingTitleAr,
    string? ExternalDescription,
    string? ExternalDescriptionAr,
    string? Responsibilities,
    string? ResponsibilitiesAr,
    string? Benefits,
    string? BenefitsAr,
    string? Location,
    string? LocationAr,
    bool IsInternal,
    DateTime? ExpiryDate,
    string? Notes
);

public class JobPostingListDto
{
    public long Id { get; set; }
    public long JobRequisitionId { get; set; }
    public string RequisitionNumber { get; set; } = string.Empty;
    public string PostingTitle { get; set; } = string.Empty;
    public string? PostingTitleAr { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public bool IsInternal { get; set; }
    public bool IsPublished { get; set; }
    public DateTime? PublishDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public int ApplicationCount { get; set; }
    public JobPostingStatus Status { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class JobPostingDetailDto : JobPostingListDto
{
    public string? JobTitle { get; set; }
    public string? ExternalDescription { get; set; }
    public string? ExternalDescriptionAr { get; set; }
    public string? Responsibilities { get; set; }
    public string? ResponsibilitiesAr { get; set; }
    public string? Benefits { get; set; }
    public string? BenefitsAr { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public string? Notes { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
