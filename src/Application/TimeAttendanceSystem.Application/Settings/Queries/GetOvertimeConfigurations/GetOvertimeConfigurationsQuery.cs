namespace TimeAttendanceSystem.Application.Settings.Queries.GetOvertimeConfigurations;

/// <summary>
/// Query for retrieving paginated overtime configurations with optional filtering.
/// Supports pagination, searching, and filtering by active status for efficient data retrieval.
/// </summary>
/// <param name="Page">Page number (1-based index) for pagination</param>
/// <param name="PageSize">Number of items per page (typically 10-50)</param>
/// <param name="Search">Optional search term to filter configurations by name or notes</param>
/// <param name="IsActive">Optional filter to show only active or inactive configurations</param>
/// <remarks>
/// Query Features:
/// - Pagination support for large datasets
/// - Text search across policy notes and configuration names
/// - Active status filtering for management workflows
/// - Ordered by creation date (newest first) by default
/// - Includes metadata for pagination controls
///
/// Performance Considerations:
/// - Page size limits prevent excessive data loading
/// - Search is optimized with database indexes
/// - Active configuration is identified in single query
/// - Total count calculated efficiently for pagination
/// - Results cached for frequently accessed configurations
///
/// Usage Patterns:
/// - Administrative configuration management interfaces
/// - Configuration selection during policy setup
/// - Audit and compliance reporting workflows
/// - Mobile and web application configuration lists
/// - API endpoints for external system integration
///
/// Filtering Logic:
/// - Search applies to policy notes and internal identifiers
/// - Active filter shows current versus historical configurations
/// - Effective date filtering available for time-based queries
/// - Sorting by effective date, creation date, or activity status
/// - Supports complex filtering combinations
///
/// Security Considerations:
/// - Only administrators can access overtime configurations
/// - Sensitive internal data excluded from search results
/// - Audit trail maintained for configuration access
/// - Role-based filtering applied automatically
/// - Branch-level access restrictions enforced
/// </remarks>
public record GetOvertimeConfigurationsQuery(
    int Page = 1,
    int PageSize = 10,
    string? Search = null,
    bool? IsActive = null
);