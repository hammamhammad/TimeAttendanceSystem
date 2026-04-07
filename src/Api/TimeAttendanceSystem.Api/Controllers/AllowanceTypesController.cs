using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/allowance-types")]
[Authorize]
public class AllowanceTypesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AllowanceTypesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists allowance types with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] AllowanceCategory? category = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] long? branchId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AllowanceTypes.AsNoTracking().AsQueryable();

        if (category.HasValue)
            query = query.Where(x => x.Category == category.Value);

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || x.Code.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new AllowanceTypeDto
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                DescriptionAr = x.DescriptionAr,
                Category = x.Category,
                DefaultCalculationType = x.DefaultCalculationType,
                DefaultAmount = x.DefaultAmount,
                DefaultPercentage = x.DefaultPercentage,
                IsTaxable = x.IsTaxable,
                IsSocialInsurable = x.IsSocialInsurable,
                IsActive = x.IsActive,
                BranchId = x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single allowance type by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AllowanceTypes
            .AsNoTracking()
            .Include(x => x.Branch)
            .Where(x => x.Id == id)
            .Select(x => new AllowanceTypeDto
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                DescriptionAr = x.DescriptionAr,
                Category = x.Category,
                DefaultCalculationType = x.DefaultCalculationType,
                DefaultAmount = x.DefaultAmount,
                DefaultPercentage = x.DefaultPercentage,
                IsTaxable = x.IsTaxable,
                IsSocialInsurable = x.IsSocialInsurable,
                IsActive = x.IsActive,
                BranchId = x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Allowance type not found." });

        return Ok(item);
    }

    /// <summary>Creates a new allowance type.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAllowanceTypeRequest request)
    {
        // Validate code uniqueness
        var codeExists = await _context.AllowanceTypes
            .AnyAsync(x => x.Code == request.Code);

        if (codeExists)
            return BadRequest(new { error = "An allowance type with this code already exists." });

        var entity = new AllowanceType
        {
            Code = request.Code,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Category = request.Category,
            DefaultCalculationType = request.DefaultCalculationType,
            DefaultAmount = request.DefaultAmount,
            DefaultPercentage = request.DefaultPercentage,
            IsTaxable = request.IsTaxable,
            IsSocialInsurable = request.IsSocialInsurable,
            IsActive = request.IsActive,
            BranchId = request.BranchId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceTypes.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an existing allowance type.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAllowanceTypeRequest request)
    {
        var entity = await _context.AllowanceTypes
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance type not found." });

        // Validate code uniqueness if changed
        if (entity.Code != request.Code)
        {
            var codeExists = await _context.AllowanceTypes
                .AnyAsync(x => x.Code == request.Code && x.Id != id);

            if (codeExists)
                return BadRequest(new { error = "An allowance type with this code already exists." });
        }

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.Category = request.Category;
        entity.DefaultCalculationType = request.DefaultCalculationType;
        entity.DefaultAmount = request.DefaultAmount;
        entity.DefaultPercentage = request.DefaultPercentage;
        entity.IsTaxable = request.IsTaxable;
        entity.IsSocialInsurable = request.IsSocialInsurable;
        entity.IsActive = request.IsActive;
        entity.BranchId = request.BranchId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Soft deletes an allowance type (if no active assignments).</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.AllowanceTypes
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance type not found." });

        // Check for active assignments
        var hasActiveAssignments = await _context.AllowanceAssignments
            .AnyAsync(x => x.AllowanceTypeId == id && x.Status == AllowanceAssignmentStatus.Active);

        if (hasActiveAssignments)
            return BadRequest(new { error = "Cannot delete allowance type with active assignments." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Toggles the IsActive status of an allowance type.</summary>
    [HttpPost("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(long id)
    {
        var entity = await _context.AllowanceTypes
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance type not found." });

        entity.IsActive = !entity.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { isActive = entity.IsActive });
    }

    /// <summary>Gets active allowance types for dropdown lists.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown([FromQuery] long? branchId = null)
    {
        var query = _context.AllowanceTypes
            .AsNoTracking()
            .Where(x => x.IsActive);

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);

        var items = await query
            .OrderBy(x => x.Name)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.Category,
                x.DefaultCalculationType,
                x.DefaultAmount,
                x.DefaultPercentage
            })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// DTOs and Request Records
// ===========================

public class AllowanceTypeDto
{
    public long Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public AllowanceCategory Category { get; set; }
    public CalculationType DefaultCalculationType { get; set; }
    public decimal? DefaultAmount { get; set; }
    public decimal? DefaultPercentage { get; set; }
    public bool IsTaxable { get; set; }
    public bool IsSocialInsurable { get; set; }
    public bool IsActive { get; set; }
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public record CreateAllowanceTypeRequest(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    AllowanceCategory Category,
    CalculationType DefaultCalculationType,
    decimal? DefaultAmount,
    decimal? DefaultPercentage,
    bool IsTaxable,
    bool IsSocialInsurable,
    bool IsActive,
    long? BranchId
);

public record UpdateAllowanceTypeRequest(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    AllowanceCategory Category,
    CalculationType DefaultCalculationType,
    decimal? DefaultAmount,
    decimal? DefaultPercentage,
    bool IsTaxable,
    bool IsSocialInsurable,
    bool IsActive,
    long? BranchId
);
