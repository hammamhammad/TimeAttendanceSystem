using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/open-enrollment-periods")]
[Authorize]
public class OpenEnrollmentPeriodsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public OpenEnrollmentPeriodsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists open enrollment periods with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "OpenEnrollmentPeriodRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] EnrollmentPeriodStatus? status = null,
        [FromQuery] int? planYear = null,
        [FromQuery] long? branchId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.OpenEnrollmentPeriods.AsNoTracking().AsQueryable();

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (planYear.HasValue)
            query = query.Where(x => x.PlanYear == planYear.Value);

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.NameAr,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.PlanYear,
                x.StartDate,
                x.EndDate,
                Status = x.Status.ToString(),
                x.AllowLifeEventChanges,
                x.Notes,
                x.IsActive,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single open enrollment period by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "OpenEnrollmentPeriodRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.OpenEnrollmentPeriods
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.NameAr,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.PlanYear,
                x.StartDate,
                x.EndDate,
                Status = x.Status.ToString(),
                x.AllowLifeEventChanges,
                x.Notes,
                x.IsActive,
                x.CreatedAtUtc,
                x.CreatedBy,
                x.ModifiedAtUtc,
                x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Open enrollment period not found." });

        return Ok(item);
    }

    /// <summary>Creates a new open enrollment period.</summary>
    [HttpPost]
    [Authorize(Policy = "OpenEnrollmentPeriodManagement")]
    public async Task<IActionResult> Create([FromBody] CreateOpenEnrollmentPeriodRequest request)
    {
        var entity = new OpenEnrollmentPeriod
        {
            Name = request.Name,
            NameAr = request.NameAr,
            BranchId = request.BranchId,
            PlanYear = request.PlanYear,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Status = EnrollmentPeriodStatus.Upcoming,
            AllowLifeEventChanges = request.AllowLifeEventChanges,
            Notes = request.Notes,
            IsActive = request.IsActive,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.OpenEnrollmentPeriods.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an existing open enrollment period.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "OpenEnrollmentPeriodManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateOpenEnrollmentPeriodRequest request)
    {
        var entity = await _context.OpenEnrollmentPeriods.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Open enrollment period not found." });

        if (entity.Status == EnrollmentPeriodStatus.Closed)
            return BadRequest(new { error = "Cannot update a closed enrollment period." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.BranchId = request.BranchId;
        entity.PlanYear = request.PlanYear;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.AllowLifeEventChanges = request.AllowLifeEventChanges;
        entity.Notes = request.Notes;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Soft deletes an open enrollment period.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "OpenEnrollmentPeriodManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.OpenEnrollmentPeriods.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Open enrollment period not found." });

        if (entity.Status == EnrollmentPeriodStatus.Open)
            return BadRequest(new { error = "Cannot delete an open enrollment period. Close it first." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Opens an enrollment period.</summary>
    [HttpPost("{id}/open")]
    [Authorize(Policy = "OpenEnrollmentPeriodManagement")]
    public async Task<IActionResult> Open(long id)
    {
        var entity = await _context.OpenEnrollmentPeriods.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Open enrollment period not found." });

        if (entity.Status != EnrollmentPeriodStatus.Upcoming)
            return BadRequest(new { error = $"Cannot open an enrollment period with status '{entity.Status}'. Only Upcoming periods can be opened." });

        entity.Status = EnrollmentPeriodStatus.Open;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }

    /// <summary>Closes an enrollment period.</summary>
    [HttpPost("{id}/close")]
    [Authorize(Policy = "OpenEnrollmentPeriodManagement")]
    public async Task<IActionResult> Close(long id)
    {
        var entity = await _context.OpenEnrollmentPeriods.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Open enrollment period not found." });

        if (entity.Status != EnrollmentPeriodStatus.Open)
            return BadRequest(new { error = $"Cannot close an enrollment period with status '{entity.Status}'. Only Open periods can be closed." });

        entity.Status = EnrollmentPeriodStatus.Closed;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }
}

// ===========================
// DTOs
// ===========================

public record CreateOpenEnrollmentPeriodRequest(
    string Name,
    string? NameAr,
    long? BranchId,
    int PlanYear,
    DateTime StartDate,
    DateTime EndDate,
    bool AllowLifeEventChanges,
    string? Notes,
    bool IsActive
);

public record UpdateOpenEnrollmentPeriodRequest(
    string Name,
    string? NameAr,
    long? BranchId,
    int PlanYear,
    DateTime StartDate,
    DateTime EndDate,
    bool AllowLifeEventChanges,
    string? Notes,
    bool IsActive
);
