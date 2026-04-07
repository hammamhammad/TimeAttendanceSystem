using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Announcements;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/announcement-categories")]
[Authorize]
public class AnnouncementCategoriesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AnnouncementCategoriesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists announcement categories with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "AnnouncementCategoryRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AnnouncementCategories.AsNoTracking().AsQueryable();

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
                x.Id, x.Name, x.NameAr, x.Description, x.DescriptionAr,
                x.Icon, x.SortOrder, x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single announcement category by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "AnnouncementCategoryRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AnnouncementCategories.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Description, x.DescriptionAr,
                x.Icon, x.SortOrder, x.IsActive, x.CreatedAtUtc, x.ModifiedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Announcement category not found." });
        return Ok(item);
    }

    /// <summary>Gets active announcement categories for dropdown lists.</summary>
    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.AnnouncementCategories
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.NameAr })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Creates a new announcement category.</summary>
    [HttpPost]
    [Authorize(Policy = "AnnouncementCategoryManagement")]
    public async Task<IActionResult> Create([FromBody] CreateAnnouncementCategoryRequest request)
    {
        var entity = new AnnouncementCategory
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Icon = request.Icon,
            SortOrder = request.SortOrder,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AnnouncementCategories.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing announcement category.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "AnnouncementCategoryManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateAnnouncementCategoryRequest request)
    {
        var entity = await _context.AnnouncementCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Announcement category not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.Icon = request.Icon;
        entity.SortOrder = request.SortOrder;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Announcement category updated." });
    }

    /// <summary>Soft deletes an announcement category.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AnnouncementCategoryManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.AnnouncementCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Announcement category not found." });

        // Check for announcements using this category
        var hasAnnouncements = await _context.Announcements
            .AnyAsync(x => x.AnnouncementCategoryId == id && !x.IsDeleted);

        if (hasAnnouncements)
            return BadRequest(new { error = "Cannot delete category with existing announcements. Remove or reassign announcements first." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Announcement category deleted." });
    }
}

public class CreateAnnouncementCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Icon { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
