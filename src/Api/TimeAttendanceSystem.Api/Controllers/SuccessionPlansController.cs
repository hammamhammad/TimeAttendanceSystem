using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Succession;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/succession-plans")]
[Authorize]
public class SuccessionPlansController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SuccessionPlansController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists succession plans with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "SuccessionPlanRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? keyPositionId = null,
        [FromQuery] SuccessionPlanStatus? status = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.SuccessionPlans.AsNoTracking().AsQueryable();

        if (keyPositionId.HasValue) query = query.Where(x => x.KeyPositionId == keyPositionId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.NameAr,
                x.KeyPositionId,
                KeyPositionTitle = x.KeyPosition.JobTitle,
                KeyPositionTitleAr = x.KeyPosition.JobTitleAr,
                BranchName = x.KeyPosition.Branch.Name,
                Status = x.Status.ToString(),
                x.EffectiveDate,
                x.ReviewDate,
                x.IsActive,
                x.CreatedAtUtc,
                CandidateCount = x.Candidates.Count(c => !c.IsDeleted)
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single succession plan by ID with candidates.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "SuccessionPlanRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.SuccessionPlans.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.NameAr,
                x.KeyPositionId,
                KeyPositionTitle = x.KeyPosition.JobTitle,
                KeyPositionTitleAr = x.KeyPosition.JobTitleAr,
                KeyPositionBranchName = x.KeyPosition.Branch.Name,
                KeyPositionDepartmentName = x.KeyPosition.Department != null ? x.KeyPosition.Department.Name : null,
                CriticalityLevel = x.KeyPosition.CriticalityLevel.ToString(),
                Status = x.Status.ToString(),
                x.EffectiveDate,
                x.ReviewDate,
                x.ReviewedByUserId,
                x.IsActive,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                Candidates = x.Candidates.Where(c => !c.IsDeleted)
                    .OrderBy(c => c.Priority)
                    .Select(c => new
                    {
                        c.Id,
                        c.EmployeeId,
                        EmployeeName = c.Employee.FullName,
                        EmployeeNameAr = c.Employee.FullNameAr,
                        EmployeeNumber = c.Employee.EmployeeNumber,
                        c.TalentProfileId,
                        ReadinessLevel = c.ReadinessLevel.ToString(),
                        ReadinessTimeline = c.ReadinessTimeline.ToString(),
                        c.Priority,
                        c.DevelopmentPlan,
                        c.DevelopmentPlanAr,
                        c.GapAnalysis,
                        Status = c.Status.ToString(),
                        c.Notes
                    }).ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Succession plan not found." });
        return Ok(item);
    }

    /// <summary>Creates a new succession plan.</summary>
    [HttpPost]
    [Authorize(Policy = "SuccessionPlanManagement")]
    public async Task<IActionResult> Create([FromBody] CreateSuccessionPlanRequest request)
    {
        // Validate key position
        var positionExists = await _context.KeyPositions.AnyAsync(x => x.Id == request.KeyPositionId);
        if (!positionExists) return BadRequest(new { error = "Key position not found." });

        var entity = new SuccessionPlan
        {
            KeyPositionId = request.KeyPositionId,
            Name = request.Name,
            NameAr = request.NameAr,
            Status = request.Status,
            EffectiveDate = request.EffectiveDate,
            ReviewDate = request.ReviewDate,
            IsActive = true,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.SuccessionPlans.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing succession plan.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "SuccessionPlanManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateSuccessionPlanRequest request)
    {
        var entity = await _context.SuccessionPlans.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Succession plan not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Status = request.Status;
        entity.EffectiveDate = request.EffectiveDate;
        entity.ReviewDate = request.ReviewDate;
        entity.ReviewedByUserId = _currentUser.UserId;
        entity.IsActive = request.IsActive;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Succession plan updated." });
    }

    /// <summary>Soft deletes a succession plan.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "SuccessionPlanManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.SuccessionPlans.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Succession plan not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Succession plan deleted." });
    }

    /// <summary>Adds a candidate to a succession plan.</summary>
    [HttpPost("{id}/candidates")]
    [Authorize(Policy = "SuccessionPlanManagement")]
    public async Task<IActionResult> AddCandidate(long id, [FromBody] AddSuccessionCandidateRequest request)
    {
        var plan = await _context.SuccessionPlans.FirstOrDefaultAsync(x => x.Id == id);
        if (plan == null) return NotFound(new { error = "Succession plan not found." });

        // Validate employee
        var empExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!empExists) return BadRequest(new { error = "Employee not found." });

        // Check for duplicate candidate
        var duplicateCandidate = await _context.SuccessionCandidates
            .AnyAsync(x => x.SuccessionPlanId == id && x.EmployeeId == request.EmployeeId && !x.IsDeleted);
        if (duplicateCandidate)
            return BadRequest(new { error = "This employee is already a candidate in this succession plan." });

        // Validate talent profile if provided
        if (request.TalentProfileId.HasValue)
        {
            var profileExists = await _context.TalentProfiles.AnyAsync(x => x.Id == request.TalentProfileId.Value);
            if (!profileExists) return BadRequest(new { error = "Talent profile not found." });
        }

        // Auto-set priority to next available if not provided
        var maxPriority = await _context.SuccessionCandidates
            .Where(x => x.SuccessionPlanId == id && !x.IsDeleted)
            .MaxAsync(x => (int?)x.Priority) ?? 0;

        var entity = new SuccessionCandidate
        {
            SuccessionPlanId = id,
            EmployeeId = request.EmployeeId,
            TalentProfileId = request.TalentProfileId,
            ReadinessLevel = request.ReadinessLevel,
            ReadinessTimeline = request.ReadinessTimeline,
            Priority = request.Priority > 0 ? request.Priority : maxPriority + 1,
            DevelopmentPlan = request.DevelopmentPlan,
            DevelopmentPlanAr = request.DevelopmentPlanAr,
            GapAnalysis = request.GapAnalysis,
            Status = CandidateSuccessionStatus.Active,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.SuccessionCandidates.Add(entity);
        await _context.SaveChangesAsync();
        return Ok(new { id = entity.Id, message = "Candidate added to succession plan." });
    }

    /// <summary>Removes a candidate from a succession plan.</summary>
    [HttpDelete("{id}/candidates/{candidateId}")]
    [Authorize(Policy = "SuccessionPlanManagement")]
    public async Task<IActionResult> RemoveCandidate(long id, long candidateId)
    {
        var candidate = await _context.SuccessionCandidates
            .FirstOrDefaultAsync(x => x.Id == candidateId && x.SuccessionPlanId == id);
        if (candidate == null) return NotFound(new { error = "Candidate not found in this succession plan." });

        candidate.IsDeleted = true;
        candidate.ModifiedAtUtc = DateTime.UtcNow;
        candidate.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Candidate removed from succession plan." });
    }

    /// <summary>Reorders candidates in a succession plan by updating priorities.</summary>
    [HttpPut("{id}/candidates/reorder")]
    [Authorize(Policy = "SuccessionPlanManagement")]
    public async Task<IActionResult> ReorderCandidates(long id, [FromBody] ReorderCandidatesRequest request)
    {
        var plan = await _context.SuccessionPlans.AnyAsync(x => x.Id == id);
        if (!plan) return NotFound(new { error = "Succession plan not found." });

        var candidates = await _context.SuccessionCandidates
            .Where(x => x.SuccessionPlanId == id && !x.IsDeleted)
            .ToListAsync();

        foreach (var reorder in request.CandidateOrders)
        {
            var candidate = candidates.FirstOrDefault(c => c.Id == reorder.CandidateId);
            if (candidate != null)
            {
                candidate.Priority = reorder.Priority;
                candidate.ModifiedAtUtc = DateTime.UtcNow;
                candidate.ModifiedBy = _currentUser.Username;
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Candidates reordered." });
    }
}

public class CreateSuccessionPlanRequest
{
    public long KeyPositionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public SuccessionPlanStatus Status { get; set; } = SuccessionPlanStatus.Draft;
    public DateTime EffectiveDate { get; set; }
    public DateTime? ReviewDate { get; set; }
    public string? Notes { get; set; }
}

public class UpdateSuccessionPlanRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public SuccessionPlanStatus Status { get; set; }
    public DateTime EffectiveDate { get; set; }
    public DateTime? ReviewDate { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }
}

public class AddSuccessionCandidateRequest
{
    public long EmployeeId { get; set; }
    public long? TalentProfileId { get; set; }
    public ReadinessLevel ReadinessLevel { get; set; }
    public ReadinessTimeline ReadinessTimeline { get; set; }
    public int Priority { get; set; }
    public string? DevelopmentPlan { get; set; }
    public string? DevelopmentPlanAr { get; set; }
    public string? GapAnalysis { get; set; }
    public string? Notes { get; set; }
}

public class ReorderCandidatesRequest
{
    public List<CandidateOrderItem> CandidateOrders { get; set; } = new();
}

public class CandidateOrderItem
{
    public long CandidateId { get; set; }
    public int Priority { get; set; }
}
