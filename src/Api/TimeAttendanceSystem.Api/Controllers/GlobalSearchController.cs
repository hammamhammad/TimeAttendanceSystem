using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Phase 3 (v14.3): Cross-module global search endpoint.
///
/// HR / admin operators can search across employees, loan applications, expense claims,
/// benefit enrollments, letter requests, and unresolved operational alerts in one call.
/// Result shape is uniform so the frontend can render a single-list omnibox-style UI.
///
/// Permission + branch-scope rules from <see cref="ICurrentUser"/> are honoured by the
/// underlying service — branch-scoped users only see entities for their branches;
/// SystemAdmin sees everything.
/// </summary>
[ApiController]
[Route("api/v1/search")]
[Authorize]
public sealed class GlobalSearchController : ControllerBase
{
    private readonly IGlobalSearchService _search;

    public GlobalSearchController(IGlobalSearchService search) => _search = search;

    /// <summary>
    /// Run a cross-module query. Minimum 2 characters (shorter queries return empty to
    /// keep the endpoint cheap). Optional comma-separated <c>types</c> filter.
    /// </summary>
    /// <param name="q">Search string.</param>
    /// <param name="types">Optional comma-separated list of entity types to include
    /// (e.g. "Employee,LoanApplication"). Null or empty = all supported types.</param>
    /// <param name="perType">Max results per entity type. Clamped to [1, 50]. Default 10.</param>
    [HttpGet]
    public async Task<IActionResult> Search(
        [FromQuery] string q,
        [FromQuery] string? types = null,
        [FromQuery] int perType = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(q) || q.Trim().Length < 2)
            return Ok(new { query = q, totalCount = 0, items = Array.Empty<object>() });

        HashSet<string>? typeSet = null;
        if (!string.IsNullOrWhiteSpace(types))
        {
            typeSet = types
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);
        }

        var result = await _search.SearchAsync(new GlobalSearchRequest
        {
            Query = q.Trim(),
            PerTypeLimit = perType,
            IncludeTypes = typeSet
        }, ct);

        return Ok(result);
    }
}
