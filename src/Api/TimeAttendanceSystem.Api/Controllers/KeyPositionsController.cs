using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Succession;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/key-positions")]
[Authorize]
public class KeyPositionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public KeyPositionsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists key positions with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "KeyPositionRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] long? jobGradeId = null,
        [FromQuery] PositionCriticality? criticalityLevel = null,
        [FromQuery] VacancyRisk? vacancyRisk = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.KeyPositions.AsNoTracking().AsQueryable();

        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value);
        if (departmentId.HasValue) query = query.Where(x => x.DepartmentId == departmentId.Value);
        if (jobGradeId.HasValue) query = query.Where(x => x.JobGradeId == jobGradeId.Value);
        if (criticalityLevel.HasValue) query = query.Where(x => x.CriticalityLevel == criticalityLevel.Value);
        if (vacancyRisk.HasValue) query = query.Where(x => x.VacancyRisk == vacancyRisk.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.JobTitle.Contains(search) || (x.JobTitleAr != null && x.JobTitleAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.JobTitle,
                x.JobTitleAr,
                x.DepartmentId,
                DepartmentName = x.Department != null ? x.Department.Name : null,
                DepartmentNameAr = x.Department != null ? x.Department.NameAr : null,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.JobGradeId,
                JobGradeName = x.JobGrade != null ? x.JobGrade.Name : null,
                JobGradeNameAr = x.JobGrade != null ? x.JobGrade.NameAr : null,
                x.CurrentHolderId,
                CurrentHolderName = x.CurrentHolder != null ? x.CurrentHolder.FullName : null,
                CurrentHolderNameAr = x.CurrentHolder != null ? x.CurrentHolder.FullNameAr : null,
                CriticalityLevel = x.CriticalityLevel.ToString(),
                VacancyRisk = x.VacancyRisk.ToString(),
                x.MinExperienceYears,
                x.IsActive,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single key position by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "KeyPositionRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.KeyPositions.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.JobTitle,
                x.JobTitleAr,
                x.DepartmentId,
                DepartmentName = x.Department != null ? x.Department.Name : null,
                DepartmentNameAr = x.Department != null ? x.Department.NameAr : null,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.JobGradeId,
                JobGradeName = x.JobGrade != null ? x.JobGrade.Name : null,
                JobGradeNameAr = x.JobGrade != null ? x.JobGrade.NameAr : null,
                x.CurrentHolderId,
                CurrentHolderName = x.CurrentHolder != null ? x.CurrentHolder.FullName : null,
                CurrentHolderNameAr = x.CurrentHolder != null ? x.CurrentHolder.FullNameAr : null,
                CriticalityLevel = x.CriticalityLevel.ToString(),
                VacancyRisk = x.VacancyRisk.ToString(),
                x.ImpactOfVacancy,
                x.ImpactOfVacancyAr,
                x.RequiredCompetencies,
                x.MinExperienceYears,
                x.IsActive,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                SuccessionPlanCount = x.SuccessionPlans.Count(sp => !sp.IsDeleted)
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Key position not found." });
        return Ok(item);
    }

    /// <summary>Gets key positions for dropdown lists.</summary>
    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.KeyPositions
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.JobTitle)
            .Select(x => new { x.Id, x.JobTitle, x.JobTitleAr, x.BranchId })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Gets a risk summary across all key positions.</summary>
    [HttpGet("risk-summary")]
    [Authorize(Policy = "KeyPositionRead")]
    public async Task<IActionResult> GetRiskSummary()
    {
        var positions = await _context.KeyPositions.AsNoTracking()
            .Where(x => x.IsActive)
            .ToListAsync();

        var summary = new
        {
            totalKeyPositions = positions.Count,
            byCriticality = positions
                .GroupBy(x => x.CriticalityLevel.ToString())
                .Select(g => new { level = g.Key, count = g.Count() })
                .OrderByDescending(x => x.count),
            byVacancyRisk = positions
                .GroupBy(x => x.VacancyRisk.ToString())
                .Select(g => new { risk = g.Key, count = g.Count() })
                .OrderByDescending(x => x.count),
            vacantPositions = positions.Count(x => x.CurrentHolderId == null),
            highRiskCount = positions.Count(x => x.VacancyRisk == VacancyRisk.High || x.VacancyRisk == VacancyRisk.Imminent),
            criticalPositions = positions.Count(x => x.CriticalityLevel == PositionCriticality.Critical)
        };

        return Ok(summary);
    }

    /// <summary>Creates a new key position.</summary>
    [HttpPost]
    [Authorize(Policy = "KeyPositionManagement")]
    public async Task<IActionResult> Create([FromBody] CreateKeyPositionRequest request)
    {
        // Validate branch
        var branchExists = await _context.Branches.AnyAsync(x => x.Id == request.BranchId);
        if (!branchExists) return BadRequest(new { error = "Branch not found." });

        // Validate department if provided
        if (request.DepartmentId.HasValue)
        {
            var deptExists = await _context.Departments.AnyAsync(x => x.Id == request.DepartmentId.Value);
            if (!deptExists) return BadRequest(new { error = "Department not found." });
        }

        // Validate job grade if provided
        if (request.JobGradeId.HasValue)
        {
            var gradeExists = await _context.JobGrades.AnyAsync(x => x.Id == request.JobGradeId.Value);
            if (!gradeExists) return BadRequest(new { error = "Job grade not found." });
        }

        // Validate current holder if provided
        if (request.CurrentHolderId.HasValue)
        {
            var empExists = await _context.Employees.AnyAsync(x => x.Id == request.CurrentHolderId.Value);
            if (!empExists) return BadRequest(new { error = "Employee not found." });
        }

        var entity = new KeyPosition
        {
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,
            DepartmentId = request.DepartmentId,
            BranchId = request.BranchId,
            JobGradeId = request.JobGradeId,
            CurrentHolderId = request.CurrentHolderId,
            CriticalityLevel = request.CriticalityLevel,
            VacancyRisk = request.VacancyRisk,
            ImpactOfVacancy = request.ImpactOfVacancy,
            ImpactOfVacancyAr = request.ImpactOfVacancyAr,
            RequiredCompetencies = request.RequiredCompetencies,
            MinExperienceYears = request.MinExperienceYears,
            IsActive = true,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.KeyPositions.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing key position.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "KeyPositionManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateKeyPositionRequest request)
    {
        var entity = await _context.KeyPositions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Key position not found." });

        // Validate branch
        var branchExists = await _context.Branches.AnyAsync(x => x.Id == request.BranchId);
        if (!branchExists) return BadRequest(new { error = "Branch not found." });

        // Validate department if provided
        if (request.DepartmentId.HasValue)
        {
            var deptExists = await _context.Departments.AnyAsync(x => x.Id == request.DepartmentId.Value);
            if (!deptExists) return BadRequest(new { error = "Department not found." });
        }

        // Validate job grade if provided
        if (request.JobGradeId.HasValue)
        {
            var gradeExists = await _context.JobGrades.AnyAsync(x => x.Id == request.JobGradeId.Value);
            if (!gradeExists) return BadRequest(new { error = "Job grade not found." });
        }

        // Validate current holder if provided
        if (request.CurrentHolderId.HasValue)
        {
            var empExists = await _context.Employees.AnyAsync(x => x.Id == request.CurrentHolderId.Value);
            if (!empExists) return BadRequest(new { error = "Employee not found." });
        }

        entity.JobTitle = request.JobTitle;
        entity.JobTitleAr = request.JobTitleAr;
        entity.DepartmentId = request.DepartmentId;
        entity.BranchId = request.BranchId;
        entity.JobGradeId = request.JobGradeId;
        entity.CurrentHolderId = request.CurrentHolderId;
        entity.CriticalityLevel = request.CriticalityLevel;
        entity.VacancyRisk = request.VacancyRisk;
        entity.ImpactOfVacancy = request.ImpactOfVacancy;
        entity.ImpactOfVacancyAr = request.ImpactOfVacancyAr;
        entity.RequiredCompetencies = request.RequiredCompetencies;
        entity.MinExperienceYears = request.MinExperienceYears;
        entity.IsActive = request.IsActive;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Key position updated." });
    }

    /// <summary>Soft deletes a key position.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "KeyPositionManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.KeyPositions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Key position not found." });

        // Check for active succession plans
        var hasActivePlans = await _context.SuccessionPlans
            .AnyAsync(x => x.KeyPositionId == id && x.IsActive && !x.IsDeleted);
        if (hasActivePlans)
            return BadRequest(new { error = "Cannot delete key position with active succession plans." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Key position deleted." });
    }
}

public class CreateKeyPositionRequest
{
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long? DepartmentId { get; set; }
    public long BranchId { get; set; }
    public long? JobGradeId { get; set; }
    public long? CurrentHolderId { get; set; }
    public PositionCriticality CriticalityLevel { get; set; }
    public VacancyRisk VacancyRisk { get; set; }
    public string? ImpactOfVacancy { get; set; }
    public string? ImpactOfVacancyAr { get; set; }
    public string? RequiredCompetencies { get; set; }
    public int? MinExperienceYears { get; set; }
    public string? Notes { get; set; }
}

public class UpdateKeyPositionRequest
{
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long? DepartmentId { get; set; }
    public long BranchId { get; set; }
    public long? JobGradeId { get; set; }
    public long? CurrentHolderId { get; set; }
    public PositionCriticality CriticalityLevel { get; set; }
    public VacancyRisk VacancyRisk { get; set; }
    public string? ImpactOfVacancy { get; set; }
    public string? ImpactOfVacancyAr { get; set; }
    public string? RequiredCompetencies { get; set; }
    public int? MinExperienceYears { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }
}
