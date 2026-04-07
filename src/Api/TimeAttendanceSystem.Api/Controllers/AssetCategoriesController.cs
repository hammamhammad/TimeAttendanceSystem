using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Assets;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/asset-categories")]
[Authorize]
public class AssetCategoriesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AssetCategoriesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists asset categories with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "AssetCategoryRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] long? parentCategoryId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AssetCategories.AsNoTracking().AsQueryable();

        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (parentCategoryId.HasValue) query = query.Where(x => x.ParentCategoryId == parentCategoryId.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)) || x.Code.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Code, x.Description, x.DescriptionAr,
                x.ParentCategoryId,
                ParentCategoryName = x.ParentCategory != null ? x.ParentCategory.Name : null,
                ParentCategoryNameAr = x.ParentCategory != null ? x.ParentCategory.NameAr : null,
                x.DepreciationRatePercent, x.DefaultUsefulLifeMonths,
                x.SortOrder, x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single asset category by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "AssetCategoryRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AssetCategories.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Code, x.Description, x.DescriptionAr,
                x.ParentCategoryId,
                ParentCategoryName = x.ParentCategory != null ? x.ParentCategory.Name : null,
                ParentCategoryNameAr = x.ParentCategory != null ? x.ParentCategory.NameAr : null,
                x.DepreciationRatePercent, x.DefaultUsefulLifeMonths,
                x.SortOrder, x.IsActive, x.CreatedAtUtc, x.ModifiedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Asset category not found." });
        return Ok(item);
    }

    /// <summary>Gets active asset categories for dropdown lists.</summary>
    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.AssetCategories
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.NameAr, x.Code })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Creates a new asset category.</summary>
    [HttpPost]
    [Authorize(Policy = "AssetCategoryManagement")]
    public async Task<IActionResult> Create([FromBody] CreateAssetCategoryRequest request)
    {
        // Validate unique code
        var codeExists = await _context.AssetCategories.AnyAsync(x => x.Code == request.Code && !x.IsDeleted);
        if (codeExists) return BadRequest(new { error = "An asset category with this code already exists." });

        // Validate parent if provided
        if (request.ParentCategoryId.HasValue)
        {
            var parentExists = await _context.AssetCategories.AnyAsync(x => x.Id == request.ParentCategoryId.Value);
            if (!parentExists) return BadRequest(new { error = "Parent category not found." });
        }

        var entity = new AssetCategory
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Code = request.Code,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            ParentCategoryId = request.ParentCategoryId,
            DepreciationRatePercent = request.DepreciationRatePercent,
            DefaultUsefulLifeMonths = request.DefaultUsefulLifeMonths,
            SortOrder = request.SortOrder,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AssetCategories.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing asset category.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "AssetCategoryManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateAssetCategoryRequest request)
    {
        var entity = await _context.AssetCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Asset category not found." });

        // Check code uniqueness (excluding self)
        var codeExists = await _context.AssetCategories.AnyAsync(x => x.Code == request.Code && x.Id != id && !x.IsDeleted);
        if (codeExists) return BadRequest(new { error = "An asset category with this code already exists." });

        // Prevent circular parent reference
        if (request.ParentCategoryId.HasValue)
        {
            if (request.ParentCategoryId.Value == id)
                return BadRequest(new { error = "A category cannot be its own parent." });

            var parentExists = await _context.AssetCategories.AnyAsync(x => x.Id == request.ParentCategoryId.Value);
            if (!parentExists) return BadRequest(new { error = "Parent category not found." });
        }

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Code = request.Code;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.ParentCategoryId = request.ParentCategoryId;
        entity.DepreciationRatePercent = request.DepreciationRatePercent;
        entity.DefaultUsefulLifeMonths = request.DefaultUsefulLifeMonths;
        entity.SortOrder = request.SortOrder;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset category updated." });
    }

    /// <summary>Soft deletes an asset category.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AssetCategoryManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.AssetCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Asset category not found." });

        // Check for assets using this category
        var hasAssets = await _context.Assets.AnyAsync(x => x.AssetCategoryId == id && !x.IsDeleted);
        if (hasAssets)
            return BadRequest(new { error = "Cannot delete category with existing assets. Remove or reassign assets first." });

        // Check for child categories
        var hasChildren = await _context.AssetCategories.AnyAsync(x => x.ParentCategoryId == id && !x.IsDeleted);
        if (hasChildren)
            return BadRequest(new { error = "Cannot delete category with child categories. Remove or reassign child categories first." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset category deleted." });
    }
}

public class CreateAssetCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? ParentCategoryId { get; set; }
    public decimal? DepreciationRatePercent { get; set; }
    public int? DefaultUsefulLifeMonths { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
