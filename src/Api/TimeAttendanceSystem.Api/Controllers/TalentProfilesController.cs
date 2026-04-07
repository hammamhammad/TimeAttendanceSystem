using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Succession;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/talent-profiles")]
[Authorize]
public class TalentProfilesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TalentProfilesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists talent profiles with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TalentProfileRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] NineBoxPosition? nineBoxPosition = null,
        [FromQuery] ReadinessLevel? readinessLevel = null,
        [FromQuery] RetentionRisk? retentionRisk = null,
        [FromQuery] bool? isHighPotential = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TalentProfiles.AsNoTracking().AsQueryable();

        if (nineBoxPosition.HasValue) query = query.Where(x => x.NineBoxPosition == nineBoxPosition.Value);
        if (readinessLevel.HasValue) query = query.Where(x => x.ReadinessLevel == readinessLevel.Value);
        if (retentionRisk.HasValue) query = query.Where(x => x.RetentionRisk == retentionRisk.Value);
        if (isHighPotential.HasValue) query = query.Where(x => x.IsHighPotential == isHighPotential.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Employee.FullName.Contains(search)
                || (x.Employee.FullNameAr != null && x.Employee.FullNameAr.Contains(search))
                || x.Employee.EmployeeNumber.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                PerformanceRating = x.PerformanceRating != null ? x.PerformanceRating.ToString() : null,
                PotentialRating = x.PotentialRating.ToString(),
                NineBoxPosition = x.NineBoxPosition.ToString(),
                ReadinessLevel = x.ReadinessLevel.ToString(),
                RetentionRisk = x.RetentionRisk.ToString(),
                x.IsHighPotential,
                x.LastAssessmentDate,
                x.IsActive,
                x.CreatedAtUtc,
                SkillCount = x.Skills.Count(s => !s.IsDeleted)
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single talent profile by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TalentProfileRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TalentProfiles.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                DepartmentName = x.Employee.Department != null ? x.Employee.Department.Name : null,
                DepartmentNameAr = x.Employee.Department != null ? x.Employee.Department.NameAr : null,
                BranchName = x.Employee.Branch != null ? x.Employee.Branch.Name : null,
                PerformanceRating = x.PerformanceRating != null ? x.PerformanceRating.ToString() : null,
                PotentialRating = x.PotentialRating.ToString(),
                NineBoxPosition = x.NineBoxPosition.ToString(),
                ReadinessLevel = x.ReadinessLevel.ToString(),
                RetentionRisk = x.RetentionRisk.ToString(),
                x.CareerAspiration,
                x.CareerAspirationAr,
                x.StrengthsSummary,
                x.DevelopmentAreas,
                x.LastAssessmentDate,
                x.AssessedByUserId,
                x.IsHighPotential,
                x.IsActive,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                Skills = x.Skills.Where(s => !s.IsDeleted).Select(s => new
                {
                    s.Id,
                    s.SkillName,
                    s.SkillNameAr,
                    ProficiencyLevel = s.ProficiencyLevel.ToString(),
                    s.YearsOfExperience,
                    s.IsVerified,
                    s.VerifiedDate
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Talent profile not found." });
        return Ok(item);
    }

    /// <summary>Gets talent profiles for dropdown lists.</summary>
    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.TalentProfiles
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.Employee.FullName)
            .Select(x => new { x.Id, x.EmployeeId, EmployeeName = x.Employee.FullName, EmployeeNameAr = x.Employee.FullNameAr })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Gets the 9-box grid data for talent visualization.</summary>
    [HttpGet("nine-box-grid")]
    [Authorize(Policy = "TalentProfileRead")]
    public async Task<IActionResult> GetNineBoxGrid()
    {
        var profiles = await _context.TalentProfiles.AsNoTracking()
            .Where(x => x.IsActive)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                PerformanceRating = x.PerformanceRating != null ? x.PerformanceRating.ToString() : null,
                PotentialRating = x.PotentialRating.ToString(),
                NineBoxPosition = x.NineBoxPosition.ToString(),
                NineBoxPositionValue = (int)x.NineBoxPosition,
                ReadinessLevel = x.ReadinessLevel.ToString(),
                x.IsHighPotential
            })
            .ToListAsync();

        // Group by nine-box cell
        var grid = profiles
            .GroupBy(x => x.NineBoxPosition)
            .Select(g => new
            {
                position = g.Key,
                count = g.Count(),
                employees = g.Select(e => new
                {
                    e.Id,
                    e.EmployeeId,
                    e.EmployeeName,
                    e.EmployeeNameAr,
                    e.EmployeeNumber,
                    e.PerformanceRating,
                    e.PotentialRating,
                    e.ReadinessLevel,
                    e.IsHighPotential
                })
            });

        return Ok(new
        {
            totalProfiles = profiles.Count,
            grid
        });
    }

    /// <summary>Gets the talent pool (high-potential employees).</summary>
    [HttpGet("talent-pool")]
    [Authorize(Policy = "TalentProfileRead")]
    public async Task<IActionResult> GetTalentPool(
        [FromQuery] ReadinessLevel? readinessLevel = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TalentProfiles.AsNoTracking()
            .Where(x => x.IsActive && x.IsHighPotential);

        if (readinessLevel.HasValue)
            query = query.Where(x => x.ReadinessLevel == readinessLevel.Value);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.ReadinessLevel)
            .ThenByDescending(x => x.NineBoxPosition)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                DepartmentName = x.Employee.Department != null ? x.Employee.Department.Name : null,
                PerformanceRating = x.PerformanceRating != null ? x.PerformanceRating.ToString() : null,
                PotentialRating = x.PotentialRating.ToString(),
                NineBoxPosition = x.NineBoxPosition.ToString(),
                ReadinessLevel = x.ReadinessLevel.ToString(),
                RetentionRisk = x.RetentionRisk.ToString(),
                x.CareerAspiration,
                x.LastAssessmentDate
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Creates a new talent profile.</summary>
    [HttpPost]
    [Authorize(Policy = "TalentProfileManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTalentProfileRequest request)
    {
        // Validate employee
        var empExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!empExists) return BadRequest(new { error = "Employee not found." });

        // Check unique constraint: one profile per employee
        var existingProfile = await _context.TalentProfiles
            .AnyAsync(x => x.EmployeeId == request.EmployeeId);
        if (existingProfile)
            return BadRequest(new { error = "A talent profile already exists for this employee." });

        var entity = new TalentProfile
        {
            EmployeeId = request.EmployeeId,
            PerformanceRating = request.PerformanceRating,
            PotentialRating = request.PotentialRating,
            NineBoxPosition = request.NineBoxPosition,
            ReadinessLevel = request.ReadinessLevel,
            RetentionRisk = request.RetentionRisk,
            CareerAspiration = request.CareerAspiration,
            CareerAspirationAr = request.CareerAspirationAr,
            StrengthsSummary = request.StrengthsSummary,
            DevelopmentAreas = request.DevelopmentAreas,
            LastAssessmentDate = request.LastAssessmentDate,
            AssessedByUserId = _currentUser.UserId,
            IsHighPotential = request.IsHighPotential,
            IsActive = true,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TalentProfiles.Add(entity);
        await _context.SaveChangesAsync();

        // Add skills if provided
        if (request.Skills != null && request.Skills.Count > 0)
        {
            foreach (var skill in request.Skills)
            {
                var skillEntity = new TalentSkill
                {
                    TalentProfileId = entity.Id,
                    SkillName = skill.SkillName,
                    SkillNameAr = skill.SkillNameAr,
                    ProficiencyLevel = skill.ProficiencyLevel,
                    YearsOfExperience = skill.YearsOfExperience,
                    IsVerified = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                };
                _context.TalentSkills.Add(skillEntity);
            }
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing talent profile.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TalentProfileManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTalentProfileRequest request)
    {
        var entity = await _context.TalentProfiles
            .Include(x => x.Skills)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Talent profile not found." });

        entity.PerformanceRating = request.PerformanceRating;
        entity.PotentialRating = request.PotentialRating;
        entity.NineBoxPosition = request.NineBoxPosition;
        entity.ReadinessLevel = request.ReadinessLevel;
        entity.RetentionRisk = request.RetentionRisk;
        entity.CareerAspiration = request.CareerAspiration;
        entity.CareerAspirationAr = request.CareerAspirationAr;
        entity.StrengthsSummary = request.StrengthsSummary;
        entity.DevelopmentAreas = request.DevelopmentAreas;
        entity.LastAssessmentDate = request.LastAssessmentDate;
        entity.AssessedByUserId = _currentUser.UserId;
        entity.IsHighPotential = request.IsHighPotential;
        entity.IsActive = request.IsActive;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Replace skills: soft-delete existing, add new
        if (request.Skills != null)
        {
            foreach (var existingSkill in entity.Skills.Where(s => !s.IsDeleted))
            {
                existingSkill.IsDeleted = true;
                existingSkill.ModifiedAtUtc = DateTime.UtcNow;
                existingSkill.ModifiedBy = _currentUser.Username;
            }

            foreach (var skill in request.Skills)
            {
                var skillEntity = new TalentSkill
                {
                    TalentProfileId = entity.Id,
                    SkillName = skill.SkillName,
                    SkillNameAr = skill.SkillNameAr,
                    ProficiencyLevel = skill.ProficiencyLevel,
                    YearsOfExperience = skill.YearsOfExperience,
                    IsVerified = skill.IsVerified,
                    VerifiedByUserId = skill.IsVerified ? _currentUser.UserId : null,
                    VerifiedDate = skill.IsVerified ? DateTime.UtcNow : null,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                };
                _context.TalentSkills.Add(skillEntity);
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Talent profile updated." });
    }

    /// <summary>Soft deletes a talent profile.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TalentProfileManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TalentProfiles.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Talent profile not found." });

        // Check if profile is referenced by succession candidates
        var hasCandidates = await _context.SuccessionCandidates
            .AnyAsync(x => x.TalentProfileId == id && !x.IsDeleted);
        if (hasCandidates)
            return BadRequest(new { error = "Cannot delete talent profile referenced by succession candidates." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Talent profile deleted." });
    }
}

public class CreateTalentProfileRequest
{
    public long EmployeeId { get; set; }
    public PerformanceRating? PerformanceRating { get; set; }
    public PotentialRating PotentialRating { get; set; }
    public NineBoxPosition NineBoxPosition { get; set; }
    public ReadinessLevel ReadinessLevel { get; set; }
    public RetentionRisk RetentionRisk { get; set; }
    public string? CareerAspiration { get; set; }
    public string? CareerAspirationAr { get; set; }
    public string? StrengthsSummary { get; set; }
    public string? DevelopmentAreas { get; set; }
    public DateTime? LastAssessmentDate { get; set; }
    public bool IsHighPotential { get; set; }
    public string? Notes { get; set; }
    public List<TalentSkillRequest>? Skills { get; set; }
}

public class UpdateTalentProfileRequest
{
    public PerformanceRating? PerformanceRating { get; set; }
    public PotentialRating PotentialRating { get; set; }
    public NineBoxPosition NineBoxPosition { get; set; }
    public ReadinessLevel ReadinessLevel { get; set; }
    public RetentionRisk RetentionRisk { get; set; }
    public string? CareerAspiration { get; set; }
    public string? CareerAspirationAr { get; set; }
    public string? StrengthsSummary { get; set; }
    public string? DevelopmentAreas { get; set; }
    public DateTime? LastAssessmentDate { get; set; }
    public bool IsHighPotential { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }
    public List<TalentSkillRequest>? Skills { get; set; }
}

public class TalentSkillRequest
{
    public string SkillName { get; set; } = string.Empty;
    public string? SkillNameAr { get; set; }
    public ProficiencyLevel ProficiencyLevel { get; set; }
    public int? YearsOfExperience { get; set; }
    public bool IsVerified { get; set; }
}
