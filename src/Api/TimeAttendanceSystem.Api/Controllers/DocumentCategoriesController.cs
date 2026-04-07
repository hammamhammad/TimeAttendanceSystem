using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/document-categories")]
[Authorize]
public class DocumentCategoriesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public DocumentCategoriesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "DocumentCategoryRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.DocumentCategories.AsNoTracking().AsQueryable();

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Description, x.DescriptionAr, x.IsActive,
                DocumentCount = x.Documents.Count(d => !d.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "DocumentCategoryRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.DocumentCategories.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Description, x.DescriptionAr, x.IsActive,
                DocumentCount = x.Documents.Count(d => !d.IsDeleted),
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Document category not found." });
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = "DocumentCategoryManagement")]
    public async Task<IActionResult> Create([FromBody] CreateDocumentCategoryRequest request)
    {
        var entity = new DocumentCategory
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.DocumentCategories.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "DocumentCategoryManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateDocumentCategoryRequest request)
    {
        var entity = await _context.DocumentCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Document category not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Document category updated." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "DocumentCategoryManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.DocumentCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Document category not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Document category deleted." });
    }
}

public class CreateDocumentCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;
}
