using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/letter-templates")]
[Authorize]
public class LetterTemplatesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public LetterTemplatesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "LetterTemplateRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] LetterType? letterType = null,
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.LetterTemplates.AsNoTracking().AsQueryable();

        if (letterType.HasValue) query = query.Where(x => x.LetterType == letterType.Value);
        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.LetterType).ThenBy(x => x.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.LetterType, x.Name, x.NameAr, x.IsDefault, x.IsActive,
                x.BranchId, BranchName = x.Branch != null ? x.Branch.Name : null,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "LetterTemplateRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.LetterTemplates.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.LetterType, x.Name, x.NameAr, x.Content, x.ContentAr,
                x.HeaderLogoUrl, x.FooterText, x.FooterTextAr,
                x.IsDefault, x.IsActive, x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Letter template not found." });
        return Ok(item);
    }

    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.LetterTemplates
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name })
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = "LetterTemplateManagement")]
    public async Task<IActionResult> Create([FromBody] CreateLetterTemplateRequest request)
    {
        var entity = new LetterTemplate
        {
            LetterType = request.LetterType,
            Name = request.Name,
            NameAr = request.NameAr,
            Content = request.Content,
            ContentAr = request.ContentAr,
            HeaderLogoUrl = request.HeaderLogoUrl,
            FooterText = request.FooterText,
            FooterTextAr = request.FooterTextAr,
            IsDefault = request.IsDefault,
            BranchId = request.BranchId,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.LetterTemplates.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "LetterTemplateManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateLetterTemplateRequest request)
    {
        var entity = await _context.LetterTemplates.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Letter template not found." });

        entity.LetterType = request.LetterType;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Content = request.Content;
        entity.ContentAr = request.ContentAr;
        entity.HeaderLogoUrl = request.HeaderLogoUrl;
        entity.FooterText = request.FooterText;
        entity.FooterTextAr = request.FooterTextAr;
        entity.IsDefault = request.IsDefault;
        entity.BranchId = request.BranchId;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Letter template updated." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "LetterTemplateManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.LetterTemplates.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Letter template not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Letter template deleted." });
    }
}

public class CreateLetterTemplateRequest
{
    public LetterType LetterType { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Content { get; set; }
    public string? ContentAr { get; set; }
    public string? HeaderLogoUrl { get; set; }
    public string? FooterText { get; set; }
    public string? FooterTextAr { get; set; }
    public bool IsDefault { get; set; }
    public long? BranchId { get; set; }
    public bool IsActive { get; set; } = true;
}
