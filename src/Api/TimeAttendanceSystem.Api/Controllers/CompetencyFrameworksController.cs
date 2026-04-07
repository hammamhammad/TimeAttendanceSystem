using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/competency-frameworks")]
[Authorize]
public class CompetencyFrameworksController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CompetencyFrameworksController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists competency frameworks.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.CompetencyFrameworks
            .Where(f => !f.IsDeleted);

        if (isActive.HasValue)
            query = query.Where(f => f.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(f => f.Name.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(f => f.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(f => new CompetencyFrameworkListDto
            {
                Id = f.Id,
                Name = f.Name,
                NameAr = f.NameAr,
                Description = f.Description,
                IsActive = f.IsActive,
                CompetencyCount = f.Competencies.Count(c => !c.IsDeleted),
                CreatedAtUtc = f.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a competency framework by ID with competencies.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.CompetencyFrameworks
            .Include(f => f.Competencies.Where(c => !c.IsDeleted).OrderBy(c => c.DisplayOrder))
            .Where(f => f.Id == id && !f.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Competency framework not found." });

        return Ok(new CompetencyFrameworkDetailDto
        {
            Id = item.Id,
            Name = item.Name,
            NameAr = item.NameAr,
            Description = item.Description,
            DescriptionAr = item.DescriptionAr,
            IsActive = item.IsActive,
            Competencies = item.Competencies.Select(c => new CompetencyDto
            {
                Id = c.Id,
                Name = c.Name,
                NameAr = c.NameAr,
                Description = c.Description,
                DescriptionAr = c.DescriptionAr,
                Category = c.Category,
                CategoryAr = c.CategoryAr,
                DisplayOrder = c.DisplayOrder
            }).ToList(),
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new competency framework with competencies.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCompetencyFrameworkRequest request)
    {
        var entity = new CompetencyFramework
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        if (request.Competencies != null)
        {
            var order = 1;
            foreach (var comp in request.Competencies)
            {
                entity.Competencies.Add(new Competency
                {
                    Name = comp.Name,
                    NameAr = comp.NameAr,
                    Description = comp.Description,
                    DescriptionAr = comp.DescriptionAr,
                    Category = comp.Category,
                    CategoryAr = comp.CategoryAr,
                    DisplayOrder = comp.DisplayOrder ?? order++,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                });
            }
        }

        _context.CompetencyFrameworks.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a competency framework and its competencies.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateCompetencyFrameworkRequest request)
    {
        var entity = await _context.CompetencyFrameworks
            .Include(f => f.Competencies.Where(c => !c.IsDeleted))
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Competency framework not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Replace competencies: soft-delete existing, add new
        if (request.Competencies != null)
        {
            foreach (var existing in entity.Competencies)
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
            }

            var order = 1;
            foreach (var comp in request.Competencies)
            {
                var newComp = new Competency
                {
                    CompetencyFrameworkId = entity.Id,
                    Name = comp.Name,
                    NameAr = comp.NameAr,
                    Description = comp.Description,
                    DescriptionAr = comp.DescriptionAr,
                    Category = comp.Category,
                    CategoryAr = comp.CategoryAr,
                    DisplayOrder = comp.DisplayOrder ?? order++,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                };
                _context.Competencies.Add(newComp);
            }
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Soft-deletes a competency framework.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.CompetencyFrameworks
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Competency framework not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Gets active frameworks for dropdown/select components.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.CompetencyFrameworks
            .Where(f => !f.IsDeleted && f.IsActive)
            .OrderBy(f => f.Name)
            .Select(f => new { f.Id, f.Name, f.NameAr })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateCompetencyInput(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    string? Category,
    string? CategoryAr,
    int? DisplayOrder
);

public record CreateCompetencyFrameworkRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    bool IsActive,
    List<CreateCompetencyInput>? Competencies
);

public record UpdateCompetencyFrameworkRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    bool IsActive,
    List<CreateCompetencyInput>? Competencies
);

public class CompetencyFrameworkListDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int CompetencyCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class CompetencyFrameworkDetailDto : CompetencyFrameworkListDto
{
    public string? DescriptionAr { get; set; }
    public List<CompetencyDto> Competencies { get; set; } = new();
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}

public class CompetencyDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Category { get; set; }
    public string? CategoryAr { get; set; }
    public int DisplayOrder { get; set; }
}
