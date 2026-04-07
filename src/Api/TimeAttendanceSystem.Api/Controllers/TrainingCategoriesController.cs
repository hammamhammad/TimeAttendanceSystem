using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-categories")]
[Authorize]
public class TrainingCategoriesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingCategoriesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training categories with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingCategoryRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingCategories.AsNoTracking().AsQueryable();

        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
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
                x.SortOrder,
                CourseCount = x.Courses.Count(c => !c.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training category by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingCategoryRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingCategories.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.NameAr,
                x.Description,
                x.DescriptionAr,
                x.IsActive,
                x.SortOrder,
                CourseCount = x.Courses.Count(c => !c.IsDeleted),
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training category not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training category.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingCategoryManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingCategoryRequest request)
    {
        var entity = new TrainingCategory
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingCategories.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing training category.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingCategoryManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingCategoryRequest request)
    {
        var entity = await _context.TrainingCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training category not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training category updated." });
    }

    /// <summary>Soft deletes a training category.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingCategoryManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training category not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training category deleted." });
    }

    /// <summary>Returns active categories for dropdowns.</summary>
    [HttpGet("dropdown")]
    [Authorize(Policy = "TrainingCategoryRead")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.TrainingCategories.AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.NameAr })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateTrainingCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}

public class UpdateTrainingCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}
