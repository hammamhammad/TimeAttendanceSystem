using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Analytics;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/saved-dashboards")]
[Authorize]
public class SavedDashboardsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SavedDashboardsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists all saved dashboards for the current user.</summary>
    [HttpGet]
    [Authorize(Policy = "SavedDashboardRead")]
    public async Task<IActionResult> GetAll()
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();

        var dashboards = await _context.SavedDashboards
            .AsNoTracking()
            .Where(d => d.UserId == userId.Value && !d.IsDeleted)
            .OrderByDescending(d => d.IsDefault)
            .ThenByDescending(d => d.ModifiedAtUtc ?? d.CreatedAtUtc)
            .Select(d => new
            {
                d.Id,
                d.Name,
                d.NameAr,
                d.IsDefault,
                d.CreatedAtUtc,
                d.ModifiedAtUtc
            })
            .ToListAsync();

        return Ok(dashboards);
    }

    /// <summary>Gets a saved dashboard by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "SavedDashboardRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();

        var dashboard = await _context.SavedDashboards
            .AsNoTracking()
            .Where(d => d.Id == id && d.UserId == userId.Value && !d.IsDeleted)
            .Select(d => new
            {
                d.Id,
                d.Name,
                d.NameAr,
                d.LayoutJson,
                d.IsDefault,
                d.CreatedAtUtc,
                d.ModifiedAtUtc
            })
            .FirstOrDefaultAsync();

        if (dashboard == null) return NotFound(new { message = "Dashboard not found" });

        return Ok(dashboard);
    }

    /// <summary>Creates a new saved dashboard.</summary>
    [HttpPost]
    [Authorize(Policy = "SavedDashboardManagement")]
    public async Task<IActionResult> Create([FromBody] SavedDashboardRequest request)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();

        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(new { message = "Name is required" });
        if (string.IsNullOrWhiteSpace(request.LayoutJson))
            return BadRequest(new { message = "LayoutJson is required" });

        var entity = new SavedDashboard
        {
            UserId = userId.Value,
            Name = request.Name,
            NameAr = request.NameAr,
            LayoutJson = request.LayoutJson,
            IsDefault = request.IsDefault,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        // If setting as default, unset other defaults
        if (entity.IsDefault)
        {
            await UnsetOtherDefaults(userId.Value);
        }

        await _context.SavedDashboards.AddAsync(entity);
        await _context.SaveChangesAsync(default);

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new
        {
            entity.Id,
            entity.Name,
            entity.NameAr,
            entity.LayoutJson,
            entity.IsDefault,
            entity.CreatedAtUtc
        });
    }

    /// <summary>Updates a saved dashboard.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "SavedDashboardManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] SavedDashboardRequest request)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();

        var entity = await _context.SavedDashboards
            .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId.Value && !d.IsDeleted);

        if (entity == null) return NotFound(new { message = "Dashboard not found" });

        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(new { message = "Name is required" });
        if (string.IsNullOrWhiteSpace(request.LayoutJson))
            return BadRequest(new { message = "LayoutJson is required" });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.LayoutJson = request.LayoutJson;
        entity.IsDefault = request.IsDefault;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        if (entity.IsDefault)
        {
            await UnsetOtherDefaults(userId.Value, entity.Id);
        }

        await _context.SaveChangesAsync(default);

        return Ok(new
        {
            entity.Id,
            entity.Name,
            entity.NameAr,
            entity.LayoutJson,
            entity.IsDefault,
            entity.ModifiedAtUtc
        });
    }

    /// <summary>Deletes a saved dashboard (soft delete).</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "SavedDashboardManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();

        var entity = await _context.SavedDashboards
            .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId.Value && !d.IsDeleted);

        if (entity == null) return NotFound(new { message = "Dashboard not found" });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync(default);

        return NoContent();
    }

    /// <summary>Sets a dashboard as the default for the current user.</summary>
    [HttpPut("{id}/default")]
    [Authorize(Policy = "SavedDashboardManagement")]
    public async Task<IActionResult> SetDefault(long id)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();

        var entity = await _context.SavedDashboards
            .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId.Value && !d.IsDeleted);

        if (entity == null) return NotFound(new { message = "Dashboard not found" });

        // Unset other defaults
        await UnsetOtherDefaults(userId.Value, entity.Id);

        entity.IsDefault = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync(default);

        return Ok(new
        {
            entity.Id,
            entity.Name,
            entity.IsDefault,
            message = "Dashboard set as default"
        });
    }

    private async Task UnsetOtherDefaults(long userId, long? excludeId = null)
    {
        var currentDefaults = await _context.SavedDashboards
            .Where(d => d.UserId == userId && d.IsDefault && !d.IsDeleted
                && (!excludeId.HasValue || d.Id != excludeId.Value))
            .ToListAsync();

        foreach (var d in currentDefaults)
        {
            d.IsDefault = false;
            d.ModifiedAtUtc = DateTime.UtcNow;
            d.ModifiedBy = "SYSTEM";
        }
    }
}

public class SavedDashboardRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string LayoutJson { get; set; } = string.Empty;
    public bool IsDefault { get; set; }
}
