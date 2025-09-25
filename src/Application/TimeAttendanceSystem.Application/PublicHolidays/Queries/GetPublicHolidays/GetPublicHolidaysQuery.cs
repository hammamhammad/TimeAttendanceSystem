using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidays;

/// <summary>
/// Query for retrieving paginated public holidays with comprehensive filtering options.
/// Supports pagination, searching, and filtering by various criteria for efficient data retrieval
/// and management interface requirements.
/// </summary>
/// <param name="Page">Page number (1-based index) for pagination</param>
/// <param name="PageSize">Number of items per page (typically 10-50)</param>
/// <param name="SearchTerm">Optional search term to filter holidays by name or description</param>
/// <param name="Year">Optional year filter to show holidays effective for specific year</param>
/// <param name="BranchId">Optional branch filter for regional holiday management</param>
/// <param name="HolidayType">Optional filter by holiday type (OneTime, Annual, Monthly, Floating)</param>
/// <param name="IsActive">Optional filter to show only active or inactive holidays</param>
/// <param name="IsNational">Optional filter to show national vs regional holidays</param>
/// <param name="CountryCode">Optional country code filter for international organizations</param>
/// <remarks>
/// Query Features:
/// - Comprehensive pagination support for large holiday datasets
/// - Multi-criteria filtering for targeted holiday retrieval
/// - Text search across holiday names and descriptions
/// - Year-based filtering for calendar planning workflows
/// - Branch-specific filtering for multi-tenant operations
/// - Holiday type filtering for administrative categorization
/// - Active status filtering for operational management
/// - Country-based filtering for international compliance
///
/// Performance Considerations:
/// - Page size limits prevent excessive data loading
/// - Search optimized with database indexes on key fields
/// - Year filtering optimized for calendar generation
/// - Branch filtering leverages multi-tenant architecture
/// - Result caching for frequently accessed holiday lists
/// - Efficient counting for pagination metadata
///
/// Usage Patterns:
/// - Administrative holiday management interfaces
/// - Calendar generation for specific years and branches
/// - Holiday selection during overtime configuration
/// - Compliance reporting and audit workflows
/// - Mobile and web application holiday displays
/// - Integration with external calendar systems
///
/// Filtering Logic:
/// - Search applies to holiday names, Arabic names, and descriptions
/// - Year filter shows holidays effective/applicable for the year
/// - Branch filter handles both national and regional holidays
/// - Type filter enables category-based holiday management
/// - Active filter supports operational vs historical views
/// - Country filter enables international holiday management
///
/// Security Considerations:
/// - Branch-level access control enforced automatically
/// - Role-based filtering applied based on user permissions
/// - Sensitive holiday data protected from unauthorized access
/// - Audit trail maintained for holiday access patterns
/// - Multi-tenant data isolation preserved in queries
///
/// Data Structure:
/// - Returns PublicHolidayDto objects with calculated fields
/// - Includes pattern descriptions for complex recurrence rules
/// - Provides next occurrence dates for planning purposes
/// - Contains conflict indicators for overlapping holidays
/// - Includes usage statistics for administrative insights
/// </remarks>
public record GetPublicHolidaysQuery(
    int Page = 1,
    int PageSize = 10,
    string? SearchTerm = null,
    int? Year = null,
    long? BranchId = null,
    HolidayType? HolidayType = null,
    bool? IsActive = null,
    bool? IsNational = null,
    string? CountryCode = null
) : IRequest<Result<GetPublicHolidaysResponse>>;

/// <summary>
/// Data transfer object for public holiday information with additional computed fields.
/// Provides comprehensive holiday data for display and management interfaces.
/// </summary>
public record PublicHolidayDto
{
    /// <summary>Gets or sets the unique identifier of the holiday.</summary>
    public long Id { get; init; }

    /// <summary>Gets or sets the name of the holiday.</summary>
    public string Name { get; init; } = string.Empty;

    /// <summary>Gets or sets the Arabic name of the holiday.</summary>
    public string? NameAr { get; init; }

    /// <summary>Gets or sets the holiday type.</summary>
    public HolidayType HolidayType { get; init; }

    /// <summary>Gets or sets whether the holiday is currently active.</summary>
    public bool IsActive { get; init; }

    /// <summary>Gets or sets whether the holiday is national.</summary>
    public bool IsNational { get; init; }

    /// <summary>Gets or sets the branch ID for regional holidays.</summary>
    public long? BranchId { get; init; }

    /// <summary>Gets or sets the branch name for regional holidays.</summary>
    public string? BranchName { get; init; }

    /// <summary>Gets or sets the holiday description.</summary>
    public string? Description { get; init; }

    /// <summary>Gets or sets the effective from year.</summary>
    public int? EffectiveFromYear { get; init; }

    /// <summary>Gets or sets the effective to year.</summary>
    public int? EffectiveToYear { get; init; }

    /// <summary>Gets or sets the country code.</summary>
    public string? CountryCode { get; init; }

    /// <summary>Gets or sets the priority of the holiday.</summary>
    public int Priority { get; init; }

    /// <summary>Gets or sets the pattern description for the holiday recurrence.</summary>
    public string PatternDescription { get; init; } = string.Empty;

    /// <summary>Gets or sets the next occurrence date of the holiday.</summary>
    public DateTime? NextOccurrence { get; init; }

    /// <summary>Gets or sets whether this holiday has conflicts with other holidays.</summary>
    public bool HasConflicts { get; init; }

    /// <summary>Gets or sets the creation date of the holiday.</summary>
    public DateTime CreatedAt { get; init; }

    /// <summary>Gets or sets the last update date of the holiday.</summary>
    public DateTime? UpdatedAt { get; init; }
}

/// <summary>
/// Response object for paginated public holidays query.
/// Contains the holiday data and pagination metadata.
/// </summary>
public record GetPublicHolidaysResponse
{
    /// <summary>Gets or sets the list of holidays for the current page.</summary>
    public IEnumerable<PublicHolidayDto> Holidays { get; init; } = new List<PublicHolidayDto>();

    /// <summary>Gets or sets the total number of holidays matching the filter criteria.</summary>
    public int TotalCount { get; init; }

    /// <summary>Gets or sets the current page number.</summary>
    public int Page { get; init; }

    /// <summary>Gets or sets the number of items per page.</summary>
    public int PageSize { get; init; }

    /// <summary>Gets or sets the total number of pages.</summary>
    public int TotalPages { get; init; }

    /// <summary>Gets or sets whether there are more pages available.</summary>
    public bool HasNextPage { get; init; }

    /// <summary>Gets or sets whether there are previous pages available.</summary>
    public bool HasPreviousPage { get; init; }
}