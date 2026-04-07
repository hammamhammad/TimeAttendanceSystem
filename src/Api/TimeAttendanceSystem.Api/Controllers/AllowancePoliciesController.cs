using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/allowance-policies")]
[Authorize]
public class AllowancePoliciesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AllowancePoliciesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists allowance policies with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? typeId = null,
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AllowancePolicies.AsNoTracking().AsQueryable();

        if (typeId.HasValue)
            query = query.Where(x => x.AllowanceTypeId == typeId.Value);

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new AllowancePolicyDto
            {
                Id = x.Id,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                DescriptionAr = x.DescriptionAr,
                BranchId = x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                EligibilityRules = x.EligibilityRules,
                RequiresApproval = x.RequiresApproval,
                MinAmount = x.MinAmount,
                MaxAmount = x.MaxAmount,
                MaxPercentageOfBasic = x.MaxPercentageOfBasic,
                IsTemporaryAllowed = x.IsTemporaryAllowed,
                MaxDurationMonths = x.MaxDurationMonths,
                EffectiveDate = x.EffectiveDate,
                IsActive = x.IsActive,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single allowance policy by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AllowancePolicies
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new AllowancePolicyDto
            {
                Id = x.Id,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                DescriptionAr = x.DescriptionAr,
                BranchId = x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                EligibilityRules = x.EligibilityRules,
                RequiresApproval = x.RequiresApproval,
                MinAmount = x.MinAmount,
                MaxAmount = x.MaxAmount,
                MaxPercentageOfBasic = x.MaxPercentageOfBasic,
                IsTemporaryAllowed = x.IsTemporaryAllowed,
                MaxDurationMonths = x.MaxDurationMonths,
                EffectiveDate = x.EffectiveDate,
                IsActive = x.IsActive,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Allowance policy not found." });

        return Ok(item);
    }

    /// <summary>Creates a new allowance policy.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAllowancePolicyRequest request)
    {
        // Validate allowance type exists
        var typeExists = await _context.AllowanceTypes
            .AnyAsync(x => x.Id == request.AllowanceTypeId);

        if (!typeExists)
            return BadRequest(new { error = "Allowance type not found." });

        var entity = new AllowancePolicy
        {
            AllowanceTypeId = request.AllowanceTypeId,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            BranchId = request.BranchId,
            EligibilityRules = request.EligibilityRules,
            RequiresApproval = request.RequiresApproval,
            MinAmount = request.MinAmount,
            MaxAmount = request.MaxAmount,
            MaxPercentageOfBasic = request.MaxPercentageOfBasic,
            IsTemporaryAllowed = request.IsTemporaryAllowed,
            MaxDurationMonths = request.MaxDurationMonths,
            EffectiveDate = request.EffectiveDate,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowancePolicies.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an existing allowance policy.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAllowancePolicyRequest request)
    {
        var entity = await _context.AllowancePolicies
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance policy not found." });

        entity.AllowanceTypeId = request.AllowanceTypeId;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.BranchId = request.BranchId;
        entity.EligibilityRules = request.EligibilityRules;
        entity.RequiresApproval = request.RequiresApproval;
        entity.MinAmount = request.MinAmount;
        entity.MaxAmount = request.MaxAmount;
        entity.MaxPercentageOfBasic = request.MaxPercentageOfBasic;
        entity.IsTemporaryAllowed = request.IsTemporaryAllowed;
        entity.MaxDurationMonths = request.MaxDurationMonths;
        entity.EffectiveDate = request.EffectiveDate;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Soft deletes an allowance policy.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.AllowancePolicies
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance policy not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Toggles the IsActive status of an allowance policy.</summary>
    [HttpPost("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(long id)
    {
        var entity = await _context.AllowancePolicies
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance policy not found." });

        entity.IsActive = !entity.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { isActive = entity.IsActive });
    }

    /// <summary>Gets policies for a specific allowance type.</summary>
    [HttpGet("by-type/{typeId}")]
    public async Task<IActionResult> GetByType(long typeId, [FromQuery] bool? isActive = null)
    {
        var query = _context.AllowancePolicies
            .AsNoTracking()
            .Where(x => x.AllowanceTypeId == typeId);

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        var items = await query
            .OrderBy(x => x.Name)
            .Select(x => new AllowancePolicyDto
            {
                Id = x.Id,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                DescriptionAr = x.DescriptionAr,
                BranchId = x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                EligibilityRules = x.EligibilityRules,
                RequiresApproval = x.RequiresApproval,
                MinAmount = x.MinAmount,
                MaxAmount = x.MaxAmount,
                MaxPercentageOfBasic = x.MaxPercentageOfBasic,
                IsTemporaryAllowed = x.IsTemporaryAllowed,
                MaxDurationMonths = x.MaxDurationMonths,
                EffectiveDate = x.EffectiveDate,
                IsActive = x.IsActive,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// DTOs and Request Records
// ===========================

public class AllowancePolicyDto
{
    public long Id { get; set; }
    public long AllowanceTypeId { get; set; }
    public string AllowanceTypeName { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public string? EligibilityRules { get; set; }
    public bool RequiresApproval { get; set; }
    public decimal? MinAmount { get; set; }
    public decimal? MaxAmount { get; set; }
    public decimal? MaxPercentageOfBasic { get; set; }
    public bool IsTemporaryAllowed { get; set; }
    public int? MaxDurationMonths { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public record CreateAllowancePolicyRequest(
    long AllowanceTypeId,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? BranchId,
    string? EligibilityRules,
    bool RequiresApproval,
    decimal? MinAmount,
    decimal? MaxAmount,
    decimal? MaxPercentageOfBasic,
    bool IsTemporaryAllowed,
    int? MaxDurationMonths,
    DateTime EffectiveDate,
    bool IsActive
);

public record UpdateAllowancePolicyRequest(
    long AllowanceTypeId,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? BranchId,
    string? EligibilityRules,
    bool RequiresApproval,
    decimal? MinAmount,
    decimal? MaxAmount,
    decimal? MaxPercentageOfBasic,
    bool IsTemporaryAllowed,
    int? MaxDurationMonths,
    DateTime EffectiveDate,
    bool IsActive
);
