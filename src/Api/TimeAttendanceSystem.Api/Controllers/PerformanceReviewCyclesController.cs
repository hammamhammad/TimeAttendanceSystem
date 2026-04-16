using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/performance-cycles")]
[Authorize]
public class PerformanceReviewCyclesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public PerformanceReviewCyclesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists performance review cycles.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ReviewCycleStatus? status,
        [FromQuery] ReviewCycleType? cycleType,
        [FromQuery] long? branchId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.PerformanceReviewCycles
            .Include(c => c.Branch)
            .Where(c => !c.IsDeleted);

        if (status.HasValue)
            query = query.Where(c => c.Status == status.Value);
        if (cycleType.HasValue)
            query = query.Where(c => c.CycleType == cycleType.Value);
        if (branchId.HasValue)
            query = query.Where(c => c.BranchId == branchId.Value || c.BranchId == null);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(c => c.StartDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new PerformanceCycleListDto
            {
                Id = c.Id,
                BranchId = c.BranchId,
                BranchName = c.Branch != null ? c.Branch.Name : "All Branches",
                Name = c.Name,
                NameAr = c.NameAr,
                CycleType = c.CycleType,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                SelfAssessmentDeadline = c.SelfAssessmentDeadline,
                ManagerAssessmentDeadline = c.ManagerAssessmentDeadline,
                Status = c.Status,
                ReviewCount = c.Reviews.Count(r => !r.IsDeleted),
                CreatedAtUtc = c.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a performance review cycle by ID with review count.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.PerformanceReviewCycles
            .Include(c => c.Branch)
            .Include(c => c.CompetencyFramework)
            .Include(c => c.Reviews.Where(r => !r.IsDeleted))
            .Where(c => c.Id == id && !c.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Performance review cycle not found." });

        var reviewsByStatus = item.Reviews
            .GroupBy(r => r.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToList();

        return Ok(new PerformanceCycleDetailDto
        {
            Id = item.Id,
            BranchId = item.BranchId,
            BranchName = item.Branch?.Name,
            Name = item.Name,
            NameAr = item.NameAr,
            CycleType = item.CycleType,
            StartDate = item.StartDate,
            EndDate = item.EndDate,
            SelfAssessmentDeadline = item.SelfAssessmentDeadline,
            ManagerAssessmentDeadline = item.ManagerAssessmentDeadline,
            Status = item.Status,
            CompetencyFrameworkId = item.CompetencyFrameworkId,
            CompetencyFrameworkName = item.CompetencyFramework?.Name,
            Description = item.Description,
            DescriptionAr = item.DescriptionAr,
            ReviewCount = item.Reviews.Count,
            ReviewsByStatus = reviewsByStatus.ToDictionary(x => x.Status.ToString(), x => x.Count),
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new performance review cycle.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePerformanceCycleRequest request)
    {
        var entity = new PerformanceReviewCycle
        {
            BranchId = request.BranchId,
            Name = request.Name,
            NameAr = request.NameAr,
            CycleType = request.CycleType,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            SelfAssessmentDeadline = request.SelfAssessmentDeadline,
            ManagerAssessmentDeadline = request.ManagerAssessmentDeadline,
            CompetencyFrameworkId = request.CompetencyFrameworkId,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Status = ReviewCycleStatus.Planning,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.PerformanceReviewCycles.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a performance review cycle (only if Planning).</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdatePerformanceCycleRequest request)
    {
        var entity = await _context.PerformanceReviewCycles
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Performance review cycle not found." });

        if (entity.Status != ReviewCycleStatus.Planning)
            return BadRequest(new { error = "Can only update cycles in Planning status." });

        entity.BranchId = request.BranchId;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.CycleType = request.CycleType;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.SelfAssessmentDeadline = request.SelfAssessmentDeadline;
        entity.ManagerAssessmentDeadline = request.ManagerAssessmentDeadline;
        entity.CompetencyFrameworkId = request.CompetencyFrameworkId;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Activates a cycle: auto-creates PerformanceReview for each active employee with a manager.
    /// </summary>
    [HttpPost("{id}/activate")]
    public async Task<IActionResult> Activate(long id)
    {
        var cycle = await _context.PerformanceReviewCycles
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (cycle == null)
            return NotFound(new { error = "Performance review cycle not found." });

        if (cycle.Status != ReviewCycleStatus.Planning)
            return BadRequest(new { error = "Can only activate cycles in Planning status." });

        // Query all active employees (optionally filtered by BranchId)
        var employeeQuery = _context.Employees
            .Where(e => !e.IsDeleted && e.IsActive && e.ManagerEmployeeId.HasValue);

        if (cycle.BranchId.HasValue)
            employeeQuery = employeeQuery.Where(e => e.BranchId == cycle.BranchId.Value);

        var employees = await employeeQuery
            .Select(e => new { e.Id, e.ManagerEmployeeId })
            .ToListAsync();

        // Check if reviews already exist for this cycle
        var existingReviewEmployeeIds = await _context.PerformanceReviews
            .Where(r => r.PerformanceReviewCycleId == id && !r.IsDeleted)
            .Select(r => r.EmployeeId)
            .ToListAsync();

        var reviewsCreated = 0;
        foreach (var emp in employees)
        {
            if (existingReviewEmployeeIds.Contains(emp.Id))
                continue;

            var review = new PerformanceReview
            {
                PerformanceReviewCycleId = cycle.Id,
                EmployeeId = emp.Id,
                ReviewerEmployeeId = emp.ManagerEmployeeId!.Value,
                Status = ReviewStatus.SelfAssessmentPending,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };

            _context.PerformanceReviews.Add(review);
            reviewsCreated++;
        }

        cycle.Status = ReviewCycleStatus.Active;
        cycle.ModifiedAtUtc = DateTime.UtcNow;
        cycle.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = $"Cycle activated. {reviewsCreated} reviews created for employees." });
    }

    /// <summary>Completes a performance review cycle.</summary>
    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(long id)
    {
        var cycle = await _context.PerformanceReviewCycles
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (cycle == null)
            return NotFound(new { error = "Performance review cycle not found." });

        if (cycle.Status != ReviewCycleStatus.Active && cycle.Status != ReviewCycleStatus.InReview && cycle.Status != ReviewCycleStatus.Calibration)
            return BadRequest(new { error = "Cycle must be Active, InReview, or Calibration to complete." });

        cycle.Status = ReviewCycleStatus.Completed;
        cycle.ModifiedAtUtc = DateTime.UtcNow;
        cycle.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Performance review cycle completed." });
    }

    /// <summary>Cancels a performance review cycle.</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var cycle = await _context.PerformanceReviewCycles
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (cycle == null)
            return NotFound(new { error = "Performance review cycle not found." });

        if (cycle.Status == ReviewCycleStatus.Completed)
            return BadRequest(new { error = "Cannot cancel a completed cycle." });

        cycle.Status = ReviewCycleStatus.Cancelled;
        cycle.ModifiedAtUtc = DateTime.UtcNow;
        cycle.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Performance review cycle cancelled." });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreatePerformanceCycleRequest(
    long? BranchId,
    string Name,
    string? NameAr,
    ReviewCycleType CycleType,
    DateTime StartDate,
    DateTime EndDate,
    DateTime? SelfAssessmentDeadline,
    DateTime? ManagerAssessmentDeadline,
    long? CompetencyFrameworkId,
    string? Description,
    string? DescriptionAr
);

public record UpdatePerformanceCycleRequest(
    long? BranchId,
    string Name,
    string? NameAr,
    ReviewCycleType CycleType,
    DateTime StartDate,
    DateTime EndDate,
    DateTime? SelfAssessmentDeadline,
    DateTime? ManagerAssessmentDeadline,
    long? CompetencyFrameworkId,
    string? Description,
    string? DescriptionAr
);

public class PerformanceCycleListDto
{
    public long Id { get; set; }
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public ReviewCycleType CycleType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime? SelfAssessmentDeadline { get; set; }
    public DateTime? ManagerAssessmentDeadline { get; set; }
    public ReviewCycleStatus Status { get; set; }
    public int ReviewCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class PerformanceCycleDetailDto : PerformanceCycleListDto
{
    public long? CompetencyFrameworkId { get; set; }
    public string? CompetencyFrameworkName { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public Dictionary<string, int> ReviewsByStatus { get; set; } = new();
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
