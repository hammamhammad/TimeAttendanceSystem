using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Assets;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/asset-maintenance")]
[Authorize]
public class AssetMaintenanceController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AssetMaintenanceController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists asset maintenance records with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "AssetMaintenanceRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? assetId = null,
        [FromQuery] MaintenanceType? maintenanceType = null,
        [FromQuery] MaintenanceStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AssetMaintenanceRecords.AsNoTracking().AsQueryable();

        if (assetId.HasValue) query = query.Where(x => x.AssetId == assetId.Value);
        if (maintenanceType.HasValue) query = query.Where(x => x.MaintenanceType == maintenanceType.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Description.Contains(search)
                || (x.DescriptionAr != null && x.DescriptionAr.Contains(search))
                || x.Asset.Name.Contains(search) || x.Asset.AssetTag.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.AssetId,
                AssetName = x.Asset.Name,
                AssetNameAr = x.Asset.NameAr,
                AssetTag = x.Asset.AssetTag,
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

    /// <summary>Gets a single maintenance record by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "AssetMaintenanceRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AssetMaintenanceRecords.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.AssetId,
                AssetName = x.Asset.Name,
                AssetNameAr = x.Asset.NameAr,
                AssetTag = x.Asset.AssetTag,
                MaintenanceType = x.MaintenanceType.ToString(),
                x.Description, x.DescriptionAr,
                x.ScheduledDate, x.CompletedDate,
                x.Cost, x.Currency, x.Vendor,
                Status = x.Status.ToString(),
                x.Notes, x.CreatedAtUtc, x.ModifiedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Maintenance record not found." });
        return Ok(item);
    }

    /// <summary>Creates a new maintenance record.</summary>
    [HttpPost]
    [Authorize(Policy = "AssetMaintenanceManagement")]
    public async Task<IActionResult> Create([FromBody] CreateAssetMaintenanceRequest request)
    {
        // Validate asset
        var asset = await _context.Assets.FirstOrDefaultAsync(x => x.Id == request.AssetId);
        if (asset == null) return BadRequest(new { error = "Asset not found." });

        var entity = new AssetMaintenanceRecord
        {
            AssetId = request.AssetId,
            MaintenanceType = request.MaintenanceType,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            ScheduledDate = request.ScheduledDate,
            CompletedDate = request.CompletedDate,
            Cost = request.Cost,
            Currency = request.Currency ?? "SAR",
            Vendor = request.Vendor,
            Status = request.Status,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        // If status is InProgress, update asset status
        if (request.Status == MaintenanceStatus.InProgress)
        {
            asset.Status = AssetStatus.InMaintenance;
            asset.ModifiedAtUtc = DateTime.UtcNow;
            asset.ModifiedBy = _currentUser.Username;
        }

        _context.AssetMaintenanceRecords.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing maintenance record.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "AssetMaintenanceManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAssetMaintenanceRequest request)
    {
        var entity = await _context.AssetMaintenanceRecords
            .Include(x => x.Asset)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return NotFound(new { error = "Maintenance record not found." });

        var previousStatus = entity.Status;

        entity.MaintenanceType = request.MaintenanceType;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.ScheduledDate = request.ScheduledDate;
        entity.CompletedDate = request.CompletedDate;
        entity.Cost = request.Cost;
        entity.Currency = request.Currency ?? "SAR";
        entity.Vendor = request.Vendor;
        entity.Status = request.Status;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Handle asset status transitions
        if (request.Status == MaintenanceStatus.Completed && previousStatus != MaintenanceStatus.Completed)
        {
            // Check if there are other active maintenance records for this asset
            var hasOtherActiveMaintenance = await _context.AssetMaintenanceRecords
                .AnyAsync(x => x.AssetId == entity.AssetId && x.Id != id
                    && (x.Status == MaintenanceStatus.InProgress || x.Status == MaintenanceStatus.Scheduled)
                    && !x.IsDeleted);

            if (!hasOtherActiveMaintenance)
            {
                // Check if asset is currently assigned
                var isAssigned = await _context.AssetAssignments
                    .AnyAsync(x => x.AssetId == entity.AssetId && x.Status == AssetAssignmentStatus.Active && !x.IsDeleted);

                entity.Asset.Status = isAssigned ? AssetStatus.Assigned : AssetStatus.Available;
                entity.Asset.ModifiedAtUtc = DateTime.UtcNow;
                entity.Asset.ModifiedBy = _currentUser.Username;
            }
        }
        else if (request.Status == MaintenanceStatus.InProgress && previousStatus != MaintenanceStatus.InProgress)
        {
            entity.Asset.Status = AssetStatus.InMaintenance;
            entity.Asset.ModifiedAtUtc = DateTime.UtcNow;
            entity.Asset.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Maintenance record updated." });
    }

    /// <summary>Soft deletes a maintenance record.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AssetMaintenanceManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.AssetMaintenanceRecords.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Maintenance record not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Maintenance record deleted." });
    }
}

public class CreateAssetMaintenanceRequest
{
    public long AssetId { get; set; }
    public MaintenanceType MaintenanceType { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal? Cost { get; set; }
    public string? Currency { get; set; }
    public string? Vendor { get; set; }
    public MaintenanceStatus Status { get; set; } = MaintenanceStatus.Scheduled;
    public string? Notes { get; set; }
}

public class UpdateAssetMaintenanceRequest
{
    public MaintenanceType MaintenanceType { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal? Cost { get; set; }
    public string? Currency { get; set; }
    public string? Vendor { get; set; }
    public MaintenanceStatus Status { get; set; }
    public string? Notes { get; set; }
}
