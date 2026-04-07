using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Assets;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/assets")]
[Authorize]
public class AssetsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AssetsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists assets with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "AssetRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? categoryId = null,
        [FromQuery] long? branchId = null,
        [FromQuery] AssetStatus? status = null,
        [FromQuery] AssetCondition? condition = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Assets.AsNoTracking().AsQueryable();

        if (categoryId.HasValue) query = query.Where(x => x.AssetCategoryId == categoryId.Value);
        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (condition.HasValue) query = query.Where(x => x.Condition == condition.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search))
                || x.AssetTag.Contains(search) || (x.SerialNumber != null && x.SerialNumber.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.AssetTag, x.Name, x.NameAr, x.Description, x.DescriptionAr,
                x.SerialNumber, x.Model, x.Manufacturer,
                x.PurchaseDate, x.PurchasePrice, x.Currency, x.WarrantyExpiryDate,
                x.AssetCategoryId,
                CategoryName = x.Category.Name,
                CategoryNameAr = x.Category.NameAr,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.LocationDescription,
                Status = x.Status.ToString(),
                Condition = x.Condition.ToString(),
                x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single asset by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "AssetRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Assets.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.AssetTag, x.Name, x.NameAr, x.Description, x.DescriptionAr,
                x.SerialNumber, x.Model, x.Manufacturer,
                x.PurchaseDate, x.PurchasePrice, x.Currency, x.WarrantyExpiryDate,
                x.AssetCategoryId,
                CategoryName = x.Category.Name,
                CategoryNameAr = x.Category.NameAr,
                CategoryCode = x.Category.Code,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.LocationDescription,
                Status = x.Status.ToString(),
                Condition = x.Condition.ToString(),
                x.Notes, x.IsActive, x.CreatedAtUtc, x.ModifiedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Asset not found." });
        return Ok(item);
    }

    /// <summary>Gets available assets for dropdown lists.</summary>
    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.Assets
            .Where(x => x.IsActive && !x.IsDeleted && x.Status == AssetStatus.Available)
            .OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.NameAr, x.AssetTag })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Gets assignment history for a specific asset.</summary>
    [HttpGet("{id}/assignments")]
    [Authorize(Policy = "AssetRead")]
    public async Task<IActionResult> GetAssetAssignments(long id,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var assetExists = await _context.Assets.AnyAsync(x => x.Id == id);
        if (!assetExists) return NotFound(new { error = "Asset not found." });

        var query = _context.AssetAssignments.AsNoTracking()
            .Where(x => x.AssetId == id);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.AssignedDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.AssetId, x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.AssignedDate, x.ExpectedReturnDate, x.ActualReturnDate,
                Status = x.Status.ToString(),
                x.AssignmentNotes, x.ReturnNotes,
                ReturnCondition = x.ReturnCondition != null ? x.ReturnCondition.ToString() : null,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets maintenance history for a specific asset.</summary>
    [HttpGet("{id}/maintenance")]
    [Authorize(Policy = "AssetRead")]
    public async Task<IActionResult> GetAssetMaintenance(long id,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var assetExists = await _context.Assets.AnyAsync(x => x.Id == id);
        if (!assetExists) return NotFound(new { error = "Asset not found." });

        var query = _context.AssetMaintenanceRecords.AsNoTracking()
            .Where(x => x.AssetId == id);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.AssetId,
                MaintenanceType = x.MaintenanceType.ToString(),
                x.Description, x.DescriptionAr,
                x.ScheduledDate, x.CompletedDate,
                x.Cost, x.Currency, x.Vendor,
                Status = x.Status.ToString(),
                x.Notes, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Creates a new asset with auto-generated AssetTag.</summary>
    [HttpPost]
    [Authorize(Policy = "AssetManagement")]
    public async Task<IActionResult> Create([FromBody] CreateAssetRequest request)
    {
        // Validate category
        var category = await _context.AssetCategories.FirstOrDefaultAsync(x => x.Id == request.AssetCategoryId);
        if (category == null) return BadRequest(new { error = "Asset category not found." });

        // Validate branch
        var branchExists = await _context.Branches.AnyAsync(x => x.Id == request.BranchId);
        if (!branchExists) return BadRequest(new { error = "Branch not found." });

        // Auto-generate AssetTag: {CategoryCode}-{SequenceNumber}
        var lastAsset = await _context.Assets
            .IgnoreQueryFilters()
            .Where(x => x.AssetCategoryId == request.AssetCategoryId)
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync();

        var sequence = 1;
        if (lastAsset != null)
        {
            var parts = lastAsset.AssetTag.Split('-');
            if (parts.Length >= 2 && int.TryParse(parts.Last(), out var lastSeq))
                sequence = lastSeq + 1;
        }

        var assetTag = $"{category.Code}-{sequence:D5}";

        // Ensure tag is unique (handle edge cases)
        while (await _context.Assets.IgnoreQueryFilters().AnyAsync(x => x.AssetTag == assetTag))
        {
            sequence++;
            assetTag = $"{category.Code}-{sequence:D5}";
        }

        var entity = new Asset
        {
            AssetCategoryId = request.AssetCategoryId,
            AssetTag = assetTag,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            SerialNumber = request.SerialNumber,
            Model = request.Model,
            Manufacturer = request.Manufacturer,
            PurchaseDate = request.PurchaseDate,
            PurchasePrice = request.PurchasePrice,
            Currency = request.Currency ?? "SAR",
            WarrantyExpiryDate = request.WarrantyExpiryDate,
            BranchId = request.BranchId,
            LocationDescription = request.LocationDescription,
            Status = AssetStatus.Available,
            Condition = request.Condition,
            Notes = request.Notes,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.Assets.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id, assetTag = entity.AssetTag });
    }

    /// <summary>Updates an existing asset.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "AssetManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAssetRequest request)
    {
        var entity = await _context.Assets.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Asset not found." });

        // Validate category if changed
        if (request.AssetCategoryId != entity.AssetCategoryId)
        {
            var categoryExists = await _context.AssetCategories.AnyAsync(x => x.Id == request.AssetCategoryId);
            if (!categoryExists) return BadRequest(new { error = "Asset category not found." });
        }

        // Validate branch if changed
        if (request.BranchId != entity.BranchId)
        {
            var branchExists = await _context.Branches.AnyAsync(x => x.Id == request.BranchId);
            if (!branchExists) return BadRequest(new { error = "Branch not found." });
        }

        entity.AssetCategoryId = request.AssetCategoryId;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.SerialNumber = request.SerialNumber;
        entity.Model = request.Model;
        entity.Manufacturer = request.Manufacturer;
        entity.PurchaseDate = request.PurchaseDate;
        entity.PurchasePrice = request.PurchasePrice;
        entity.Currency = request.Currency ?? "SAR";
        entity.WarrantyExpiryDate = request.WarrantyExpiryDate;
        entity.BranchId = request.BranchId;
        entity.LocationDescription = request.LocationDescription;
        entity.Status = request.Status;
        entity.Condition = request.Condition;
        entity.Notes = request.Notes;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset updated." });
    }

    /// <summary>Soft deletes an asset.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AssetManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Assets.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Asset not found." });

        // Check for active assignments
        var hasActiveAssignments = await _context.AssetAssignments
            .AnyAsync(x => x.AssetId == id && x.Status == AssetAssignmentStatus.Active && !x.IsDeleted);
        if (hasActiveAssignments)
            return BadRequest(new { error = "Cannot delete asset with active assignments. Return the asset first." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset deleted." });
    }
}

public class CreateAssetRequest
{
    public long AssetCategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? SerialNumber { get; set; }
    public string? Model { get; set; }
    public string? Manufacturer { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public decimal? PurchasePrice { get; set; }
    public string? Currency { get; set; }
    public DateTime? WarrantyExpiryDate { get; set; }
    public long BranchId { get; set; }
    public string? LocationDescription { get; set; }
    public AssetCondition Condition { get; set; } = AssetCondition.New;
    public string? Notes { get; set; }
}

public class UpdateAssetRequest
{
    public long AssetCategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? SerialNumber { get; set; }
    public string? Model { get; set; }
    public string? Manufacturer { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public decimal? PurchasePrice { get; set; }
    public string? Currency { get; set; }
    public DateTime? WarrantyExpiryDate { get; set; }
    public long BranchId { get; set; }
    public string? LocationDescription { get; set; }
    public AssetStatus Status { get; set; }
    public AssetCondition Condition { get; set; }
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;
}
