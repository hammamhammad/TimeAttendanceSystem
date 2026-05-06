using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common.Extensions;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// ERP spec §7D / §15 — distinct filter values for reference / enum / status
/// filter widgets in the data grid.
/// <code>
/// GET /api/v1/filter-options?entity=employees&amp;field=department.name&amp;search=foo&amp;limit=50
/// </code>
/// </summary>
[ApiController]
[Route("api/v1/filter-options")]
[Authorize]
public class FilterOptionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public FilterOptionsController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] string entity,
        [FromQuery] string field,
        [FromQuery] string? search = null,
        [FromQuery] int limit = 50,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(entity) || string.IsNullOrWhiteSpace(field))
            return BadRequest(new { message = "entity and field are required" });

        limit = Math.Clamp(limit, 1, 200);

        var values = entity.ToLowerInvariant() switch
        {
            "employees" => await _context.Employees.AsNoTracking().GetDistinctStringsAsync(field, search, limit, ct),
            "branches" => await _context.Branches.AsNoTracking().GetDistinctStringsAsync(field, search, limit, ct),
            "departments" => await _context.Departments.AsNoTracking().GetDistinctStringsAsync(field, search, limit, ct),
            _ => null
        };

        if (values is null)
            return BadRequest(new { message = $"Unknown entity '{entity}'" });

        return Ok(values.Select(v => new { label = v, value = v }));
    }
}
