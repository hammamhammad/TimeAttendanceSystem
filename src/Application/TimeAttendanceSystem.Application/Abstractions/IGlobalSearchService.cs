namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 3 (v14.3): Lightweight cross-module search for HR/admin operator productivity.
///
/// Deliberately NOT a full-text search engine — the project has no Lucene/Elastic/
/// Postgres-FTS infrastructure and adding one would be speculative overbuilding. Instead
/// this service runs short, bounded, indexable LIKE/contains queries across the most-used
/// operator entities and returns a typed, uniform <see cref="GlobalSearchItem"/> shape.
///
/// Supported entity types (Phase 3):
///   - <c>Employee</c> (by name, employee number)
///   - <c>LoanApplication</c> (by purpose, employee name)
///   - <c>ExpenseClaim</c> (by claim number, description)
///   - <c>BenefitEnrollment</c> (by plan code/name + employee)
///   - <c>LetterRequest</c> (by letter type + employee)
///   - <c>OperationalFailureAlert</c> (by source entity type/id, failure code)
///
/// Permission/branch scope: respects <see cref="ICurrentUser.BranchIds"/> where the entity
/// has a branch dimension (Employee directly; other entities through their Employee FK).
/// SystemAdmin bypasses branch scope (matches the pattern used across the rest of the app).
///
/// Result is capped per type (default 10 per type, max 50) and overall (sum capped) so the
/// endpoint stays cheap even when the query is very short. Callers can filter the types
/// they want via <see cref="GlobalSearchRequest.IncludeTypes"/>.
/// </summary>
public interface IGlobalSearchService
{
    Task<GlobalSearchResponse> SearchAsync(GlobalSearchRequest request, CancellationToken ct = default);
}

public sealed class GlobalSearchRequest
{
    public required string Query { get; init; }
    public int PerTypeLimit { get; init; } = 10;
    public ISet<string>? IncludeTypes { get; init; } // null = all supported types
}

public sealed class GlobalSearchResponse
{
    public required string Query { get; init; }
    public int TotalCount { get; set; }
    public List<GlobalSearchItem> Items { get; } = new();
}

public sealed class GlobalSearchItem
{
    /// <summary>e.g. "Employee", "LoanApplication", "ExpenseClaim", "BenefitEnrollment", "LetterRequest", "OperationalFailureAlert".</summary>
    public required string EntityType { get; init; }
    public required long EntityId { get; init; }

    /// <summary>Primary display label (employee name, claim number, plan name…).</summary>
    public required string Title { get; init; }

    /// <summary>Short context line (status, date, amount…). Null if the entity has no useful context.</summary>
    public string? Subtitle { get; init; }

    /// <summary>Employee id this item relates to, if any, so UIs can group by person.</summary>
    public long? EmployeeId { get; init; }

    /// <summary>Branch id for scoping / display if known.</summary>
    public long? BranchId { get; init; }

    /// <summary>Status label from the entity's enum (string) for tint/sort.</summary>
    public string? Status { get; init; }
}
