namespace TimeAttendanceSystem.Application.Settings.Queries.GetOvertimeConfigurations;

/// <summary>
/// Response object for overtime configuration list queries with pagination support.
/// Contains a collection of overtime configurations along with metadata for pagination and filtering.
/// </summary>
/// <param name="Items">Collection of overtime configuration DTOs matching the query criteria</param>
/// <param name="TotalCount">Total number of overtime configurations available (before pagination)</param>
/// <param name="Page">Current page number (1-based index)</param>
/// <param name="PageSize">Number of items per page</param>
/// <param name="TotalPages">Total number of pages available</param>
/// <param name="HasNextPage">Indicates if there are more pages available</param>
/// <param name="HasPreviousPage">Indicates if there are previous pages available</param>
/// <param name="ActiveConfigurationId">ID of the currently active overtime configuration (if any)</param>
/// <remarks>
/// Response Structure:
/// - Provides paginated results for efficient data loading
/// - Includes pagination metadata for client-side navigation
/// - Identifies active configuration for quick reference
/// - Optimized for both desktop and mobile interfaces
/// - Supports filtering and sorting operations
///
/// Pagination Design:
/// - Page numbers start from 1 for user-friendly navigation
/// - Page size is configurable but typically 10-50 items
/// - Total count enables accurate pagination controls
/// - HasNext/HasPrevious flags simplify navigation logic
/// - Total pages calculation handles edge cases correctly
///
/// Active Configuration:
/// - ActiveConfigurationId highlights the current effective configuration
/// - Null value indicates no active configuration exists
/// - Enables quick identification of which configuration is in use
/// - Supports configuration management workflow
/// - Helps administrators understand current overtime policies
///
/// Usage Patterns:
/// - Administrative interfaces for configuration management
/// - Configuration comparison and selection workflows
/// - Audit reports showing configuration history
/// - API endpoints for mobile and web applications
/// - Export operations for compliance documentation
///
/// Performance Considerations:
/// - Items collection contains only requested page data
/// - Total count query optimized for large datasets
/// - Active configuration lookup cached for performance
/// - Serialization optimized for network transmission
/// - Supports both JSON and XML serialization formats
///
/// Filtering Support:
/// - Response structure accommodates filtered results
/// - Total count reflects applied filters
/// - Pagination works correctly with filtered data
/// - Active configuration identified within filtered set
/// - Sort order preserved in paginated results
///
/// Client Integration:
/// - Pagination metadata enables responsive UI design
/// - Active configuration ID supports highlighting
/// - Total count enables progress indicators
/// - Page information supports URL state management
/// - Items collection ready for data binding
/// </remarks>
public record GetOvertimeConfigurationsResponse(
    IEnumerable<OvertimeConfigurationDto> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages,
    bool HasNextPage,
    bool HasPreviousPage,
    long? ActiveConfigurationId
);