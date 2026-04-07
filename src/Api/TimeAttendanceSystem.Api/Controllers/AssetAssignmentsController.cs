using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Assets;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/asset-assignments")]
[Authorize]
public class AssetAssignmentsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AssetAssignmentsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists asset assignments with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "AssetAssignmentRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? assetId = null,
        [FromQuery] long? employeeId = null,
        [FromQuery] AssetAssignmentStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AssetAssignments.AsNoTracking().AsQueryable();

        if (assetId.HasValue) query = query.Where(x => x.AssetId == assetId.Value);
        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Asset.Name.Contains(search) || x.Asset.AssetTag.Contains(search)
                || x.Employee.FullName.Contains(search) || x.Employee.EmployeeNumber.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.AssignedDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.AssetId, x.EmployeeId,
                AssetName = x.Asset.Name,
                AssetNameAr = x.Asset.NameAr,
                AssetTag = x.Asset.AssetTag,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.AssignedDate, x.ExpectedReturnDate, x.ActualReturnDate,
                Status = x.Status.ToString(),
                x.AssignmentNotes, x.ReturnNotes,
                ReturnCondition = x.ReturnCondition != null ? x.ReturnCondition.ToString() : null,
                x.AssignedByUserId, x.ReturnReceivedByUserId,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single asset assignment by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "AssetAssignmentRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AssetAssignments.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.AssetId, x.EmployeeId,
                AssetName = x.Asset.Name,
                AssetNameAr = x.Asset.NameAr,
                AssetTag = x.Asset.AssetTag,
                AssetSerialNumber = x.Asset.SerialNumber,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.AssignedDate, x.ExpectedReturnDate, x.ActualReturnDate,
                Status = x.Status.ToString(),
                x.AssignmentNotes, x.ReturnNotes,
                ReturnCondition = x.ReturnCondition != null ? x.ReturnCondition.ToString() : null,
                x.AssignedByUserId, x.ReturnReceivedByUserId,
                x.CreatedAtUtc, x.ModifiedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Asset assignment not found." });
        return Ok(item);
    }

    /// <summary>Gets asset assignments by employee ID.</summary>
    [HttpGet("by-employee/{employeeId}")]
    [Authorize(Policy = "AssetAssignmentRead")]
    public async Task<IActionResult> GetByEmployee(long employeeId,
        [FromQuery] AssetAssignmentStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == employeeId);
        if (!employeeExists) return NotFound(new { error = "Employee not found." });

        var query = _context.AssetAssignments.AsNoTracking()
            .Where(x => x.EmployeeId == employeeId);

        if (status.HasValue) query = query.Where(x => x.Status == status.Value);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.AssignedDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.AssetId,
                AssetName = x.Asset.Name,
                AssetNameAr = x.Asset.NameAr,
                AssetTag = x.Asset.AssetTag,
                AssetSerialNumber = x.Asset.SerialNumber,
                CategoryName = x.Asset.Category.Name,
                CategoryNameAr = x.Asset.Category.NameAr,
                x.AssignedDate, x.ExpectedReturnDate, x.ActualReturnDate,
                Status = x.Status.ToString(),
                x.AssignmentNotes,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets asset clearance status for an employee (used during offboarding).</summary>
    [HttpGet("clearance/{employeeId}")]
    [Authorize(Policy = "AssetAssignmentRead")]
    public async Task<IActionResult> GetClearance(long employeeId)
    {
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == employeeId);
        if (!employeeExists) return NotFound(new { error = "Employee not found." });

        var activeAssignments = await _context.AssetAssignments.AsNoTracking()
            .Where(x => x.EmployeeId == employeeId && x.Status == AssetAssignmentStatus.Active)
            .Select(x => new
            {
                x.Id, x.AssetId,
                AssetName = x.Asset.Name,
                AssetNameAr = x.Asset.NameAr,
                AssetTag = x.Asset.AssetTag,
                x.AssignedDate, x.ExpectedReturnDate,
                Status = x.Status.ToString()
            })
            .ToListAsync();

        var totalAssigned = activeAssignments.Count;
        var isCleared = totalAssigned == 0;

        return Ok(new
        {
            employeeId,
            isCleared,
            totalAssigned,
            pendingReturns = activeAssignments
        });
    }

    /// <summary>Creates a new asset assignment.</summary>
    [HttpPost]
    [Authorize(Policy = "AssetAssignmentManagement")]
    public async Task<IActionResult> Create([FromBody] CreateAssetAssignmentRequest request)
    {
        // Validate asset
        var asset = await _context.Assets.FirstOrDefaultAsync(x => x.Id == request.AssetId);
        if (asset == null) return BadRequest(new { error = "Asset not found." });
        if (asset.Status != AssetStatus.Available)
            return BadRequest(new { error = $"Asset is not available. Current status: {asset.Status}." });

        // Validate employee
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!employeeExists) return BadRequest(new { error = "Employee not found." });

        var entity = new AssetAssignment
        {
            AssetId = request.AssetId,
            EmployeeId = request.EmployeeId,
            AssignedDate = request.AssignedDate,
            ExpectedReturnDate = request.ExpectedReturnDate,
            Status = AssetAssignmentStatus.Active,
            AssignmentNotes = request.AssignmentNotes,
            AssignedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        // Update asset status to Assigned
        asset.Status = AssetStatus.Assigned;
        asset.ModifiedAtUtc = DateTime.UtcNow;
        asset.ModifiedBy = _currentUser.Username;

        _context.AssetAssignments.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing asset assignment.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "AssetAssignmentManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAssetAssignmentRequest request)
    {
        var entity = await _context.AssetAssignments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Asset assignment not found." });

        if (entity.Status == AssetAssignmentStatus.Returned)
            return BadRequest(new { error = "Cannot update a returned assignment." });

        entity.ExpectedReturnDate = request.ExpectedReturnDate;
        entity.AssignmentNotes = request.AssignmentNotes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset assignment updated." });
    }

    /// <summary>Processes the return of an assigned asset.</summary>
    [HttpPut("{id}/return")]
    [Authorize(Policy = "AssetAssignmentManagement")]
    public async Task<IActionResult> ReturnAsset(long id, [FromBody] ReturnAssetRequest request)
    {
        var entity = await _context.AssetAssignments
            .Include(x => x.Asset)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return NotFound(new { error = "Asset assignment not found." });
        if (entity.Status != AssetAssignmentStatus.Active && entity.Status != AssetAssignmentStatus.Overdue)
            return BadRequest(new { error = "Only active or overdue assignments can be returned." });

        entity.ActualReturnDate = request.ReturnDate ?? DateTime.UtcNow;
        entity.ReturnNotes = request.ReturnNotes;
        entity.ReturnCondition = request.ReturnCondition;
        entity.ReturnReceivedByUserId = _currentUser.UserId;
        entity.Status = AssetAssignmentStatus.Returned;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Update asset status based on return condition
        if (request.ReturnCondition == AssetCondition.NonFunctional)
            entity.Asset.Status = AssetStatus.Damaged;
        else if (request.ReturnCondition == AssetCondition.Poor)
            entity.Asset.Status = AssetStatus.InMaintenance;
        else
            entity.Asset.Status = AssetStatus.Available;

        entity.Asset.Condition = request.ReturnCondition ?? entity.Asset.Condition;
        entity.Asset.ModifiedAtUtc = DateTime.UtcNow;
        entity.Asset.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset returned successfully." });
    }

    /// <summary>Soft deletes an asset assignment.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AssetAssignmentManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.AssetAssignments
            .Include(x => x.Asset)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return NotFound(new { error = "Asset assignment not found." });

        if (entity.Status == AssetAssignmentStatus.Active)
        {
            // Revert asset status to Available
            entity.Asset.Status = AssetStatus.Available;
            entity.Asset.ModifiedAtUtc = DateTime.UtcNow;
            entity.Asset.ModifiedBy = _currentUser.Username;
        }

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Asset assignment deleted." });
    }
}

public class CreateAssetAssignmentRequest
{
    public long AssetId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime AssignedDate { get; set; }
    public DateTime? ExpectedReturnDate { get; set; }
    public string? AssignmentNotes { get; set; }
}

public class UpdateAssetAssignmentRequest
{
    public DateTime? ExpectedReturnDate { get; set; }
    public string? AssignmentNotes { get; set; }
}

public class ReturnAssetRequest
{
    public DateTime? ReturnDate { get; set; }
    public string? ReturnNotes { get; set; }
    public AssetCondition? ReturnCondition { get; set; }
}
