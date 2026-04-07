using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Succession;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/career-paths")]
[Authorize]
public class CareerPathsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CareerPathsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists career paths with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "CareerPathRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.CareerPaths.AsNoTracking().AsQueryable();

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
                x.Description,
                x.DescriptionAr,
                x.IsActive,
                x.CreatedAtUtc,
                StepCount = x.Steps.Count(s => !s.IsDeleted)
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single career path by ID with steps.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "CareerPathRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.CareerPaths.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.NameAr,
                x.Description,
                x.DescriptionAr,
                x.IsActive,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                Steps = x.Steps.Where(s => !s.IsDeleted)
                    .OrderBy(s => s.StepOrder)
                    .Select(s => new
                    {
                        s.Id,
                        s.FromJobGradeId,
                        FromJobGradeName = s.FromJobGrade != null ? s.FromJobGrade.Name : null,
                        FromJobGradeNameAr = s.FromJobGrade != null ? s.FromJobGrade.NameAr : null,
                        s.ToJobGradeId,
                        ToJobGradeName = s.ToJobGrade.Name,
                        ToJobGradeNameAr = s.ToJobGrade.NameAr,
                        s.JobTitle,
                        s.JobTitleAr,
                        s.TypicalDurationMonths,
                        s.RequiredCompetencies,
                        s.StepOrder
                    }).ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Career path not found." });
        return Ok(item);
    }

    /// <summary>Gets career paths for dropdown lists.</summary>
    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.CareerPaths
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.NameAr })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Creates a new career path.</summary>
    [HttpPost]
    [Authorize(Policy = "CareerPathManagement")]
    public async Task<IActionResult> Create([FromBody] CreateCareerPathRequest request)
    {
        var entity = new CareerPath
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.CareerPaths.Add(entity);
        await _context.SaveChangesAsync();

        // Add steps if provided
        if (request.Steps != null && request.Steps.Count > 0)
        {
            foreach (var step in request.Steps)
            {
                // Validate ToJobGrade
                var toGradeExists = await _context.JobGrades.AnyAsync(x => x.Id == step.ToJobGradeId);
                if (!toGradeExists) return BadRequest(new { error = $"Job grade {step.ToJobGradeId} not found." });

                if (step.FromJobGradeId.HasValue)
                {
                    var fromGradeExists = await _context.JobGrades.AnyAsync(x => x.Id == step.FromJobGradeId.Value);
                    if (!fromGradeExists) return BadRequest(new { error = $"Job grade {step.FromJobGradeId.Value} not found." });
                }

                var stepEntity = new CareerPathStep
                {
                    CareerPathId = entity.Id,
                    FromJobGradeId = step.FromJobGradeId,
                    ToJobGradeId = step.ToJobGradeId,
                    JobTitle = step.JobTitle,
                    JobTitleAr = step.JobTitleAr,
                    TypicalDurationMonths = step.TypicalDurationMonths,
                    RequiredCompetencies = step.RequiredCompetencies,
                    StepOrder = step.StepOrder,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                };
                _context.CareerPathSteps.Add(stepEntity);
            }
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing career path.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "CareerPathManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateCareerPathRequest request)
    {
        var entity = await _context.CareerPaths.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Career path not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Career path updated." });
    }

    /// <summary>Soft deletes a career path.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "CareerPathManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.CareerPaths.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Career path not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Career path deleted." });
    }

    // ===== Nested Steps CRUD =====

    /// <summary>Adds a step to a career path.</summary>
    [HttpPost("{id}/steps")]
    [Authorize(Policy = "CareerPathManagement")]
    public async Task<IActionResult> AddStep(long id, [FromBody] CareerPathStepRequest request)
    {
        var pathExists = await _context.CareerPaths.AnyAsync(x => x.Id == id);
        if (!pathExists) return NotFound(new { error = "Career path not found." });

        // Validate ToJobGrade
        var toGradeExists = await _context.JobGrades.AnyAsync(x => x.Id == request.ToJobGradeId);
        if (!toGradeExists) return BadRequest(new { error = "To job grade not found." });

        if (request.FromJobGradeId.HasValue)
        {
            var fromGradeExists = await _context.JobGrades.AnyAsync(x => x.Id == request.FromJobGradeId.Value);
            if (!fromGradeExists) return BadRequest(new { error = "From job grade not found." });
        }

        // Auto-set StepOrder if not provided
        if (request.StepOrder <= 0)
        {
            var maxOrder = await _context.CareerPathSteps
                .Where(x => x.CareerPathId == id && !x.IsDeleted)
                .MaxAsync(x => (int?)x.StepOrder) ?? 0;
            request.StepOrder = maxOrder + 1;
        }

        var entity = new CareerPathStep
        {
            CareerPathId = id,
            FromJobGradeId = request.FromJobGradeId,
            ToJobGradeId = request.ToJobGradeId,
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,
            TypicalDurationMonths = request.TypicalDurationMonths,
            RequiredCompetencies = request.RequiredCompetencies,
            StepOrder = request.StepOrder,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.CareerPathSteps.Add(entity);
        await _context.SaveChangesAsync();
        return Ok(new { id = entity.Id, message = "Step added to career path." });
    }

    /// <summary>Updates a step in a career path.</summary>
    [HttpPut("{id}/steps/{stepId}")]
    [Authorize(Policy = "CareerPathManagement")]
    public async Task<IActionResult> UpdateStep(long id, long stepId, [FromBody] CareerPathStepRequest request)
    {
        var step = await _context.CareerPathSteps
            .FirstOrDefaultAsync(x => x.Id == stepId && x.CareerPathId == id);
        if (step == null) return NotFound(new { error = "Career path step not found." });

        // Validate ToJobGrade
        var toGradeExists = await _context.JobGrades.AnyAsync(x => x.Id == request.ToJobGradeId);
        if (!toGradeExists) return BadRequest(new { error = "To job grade not found." });

        if (request.FromJobGradeId.HasValue)
        {
            var fromGradeExists = await _context.JobGrades.AnyAsync(x => x.Id == request.FromJobGradeId.Value);
            if (!fromGradeExists) return BadRequest(new { error = "From job grade not found." });
        }

        step.FromJobGradeId = request.FromJobGradeId;
        step.ToJobGradeId = request.ToJobGradeId;
        step.JobTitle = request.JobTitle;
        step.JobTitleAr = request.JobTitleAr;
        step.TypicalDurationMonths = request.TypicalDurationMonths;
        step.RequiredCompetencies = request.RequiredCompetencies;
        step.StepOrder = request.StepOrder;
        step.ModifiedAtUtc = DateTime.UtcNow;
        step.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Career path step updated." });
    }

    /// <summary>Removes a step from a career path.</summary>
    [HttpDelete("{id}/steps/{stepId}")]
    [Authorize(Policy = "CareerPathManagement")]
    public async Task<IActionResult> DeleteStep(long id, long stepId)
    {
        var step = await _context.CareerPathSteps
            .FirstOrDefaultAsync(x => x.Id == stepId && x.CareerPathId == id);
        if (step == null) return NotFound(new { error = "Career path step not found." });

        step.IsDeleted = true;
        step.ModifiedAtUtc = DateTime.UtcNow;
        step.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Career path step deleted." });
    }
}

public class CreateCareerPathRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public List<CareerPathStepRequest>? Steps { get; set; }
}

public class UpdateCareerPathRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;
}

public class CareerPathStepRequest
{
    public long? FromJobGradeId { get; set; }
    public long ToJobGradeId { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public int? TypicalDurationMonths { get; set; }
    public string? RequiredCompetencies { get; set; }
    public int StepOrder { get; set; }
}
