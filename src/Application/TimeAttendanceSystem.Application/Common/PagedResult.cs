namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Generic container for paginated query results with comprehensive pagination metadata.
/// Provides all necessary information for implementing pagination UI components
/// and efficient data loading patterns in large datasets.
/// </summary>
/// <typeparam name="T">The type of items contained in the paginated result</typeparam>
/// <remarks>
/// Pagination Features:
/// - Contains the actual data items for the current page
/// - Provides complete pagination metadata for UI components
/// - Calculates derived pagination properties automatically
/// - Supports both client-side and server-side pagination scenarios
/// - Immutable design prevents accidental modification
/// 
/// Design Principles:
/// - Immutable object ensures data integrity throughout application layers
/// - Read-only collections prevent external modification of results
/// - Comprehensive metadata reduces client-side pagination calculations
/// - Generic design supports all entity types and DTOs
/// - Consistent pagination model across the entire application
/// 
/// UI Integration:
/// - HasPrevious/HasNext properties enable/disable navigation buttons
/// - TotalPages supports full pagination controls and page jumping
/// - Page and PageSize properties maintain current pagination state
/// - TotalCount enables "showing X of Y items" display messages
/// - Items collection directly bindable to UI list components
/// 
/// Performance Benefits:
/// - Lazy evaluation of pagination properties reduces unnecessary calculations
/// - Read-only collections optimize memory usage and prevent defensive copying
/// - Efficient total page calculation using ceiling division
/// - Minimal object allocation through property-based design
/// - Compatible with both synchronous and asynchronous loading patterns
/// 
/// Usage Patterns:
/// - Query handlers return PagedResult for list operations
/// - API controllers serialize PagedResult for JSON responses
/// - UI components consume pagination metadata for controls
/// - Caching layers can cache entire PagedResult objects
/// - Testing scenarios can easily validate pagination logic
/// 
/// Mathematics:
/// - TotalPages calculation handles fractional pages correctly
/// - HasPrevious logic prevents navigation to invalid pages
/// - HasNext logic prevents navigation beyond available data
/// - Zero-based internal logic with 1-based external interface
/// - Edge cases handled (empty results, single page, etc.)
/// </remarks>
public class PagedResult<T>
{
    /// <summary>
    /// Gets the collection of items for the current page.
    /// Contains the actual data requested by the pagination query.
    /// </summary>
    /// <value>
    /// Read-only list of items of type T for the current page.
    /// May be empty if no items exist for the requested page.
    /// </value>
    /// <remarks>
    /// Item Collection Properties:
    /// - Immutable collection prevents external modification
    /// - Generic type supports any entity or DTO type
    /// - Count may be less than PageSize for the last page
    /// - Empty collection valid for pages beyond available data
    /// - Direct binding to UI list controls and iteration
    /// </remarks>
    public IReadOnlyList<T> Items { get; }

    /// <summary>
    /// Gets the total number of items across all pages in the complete dataset.
    /// Used for calculating pagination metadata and displaying result counts.
    /// </summary>
    /// <value>
    /// Total count of items in the complete, unfiltered result set.
    /// Zero indicates no items match the query criteria.
    /// </value>
    /// <remarks>
    /// Total Count Usage:
    /// - Enables "showing X-Y of Z items" display messages
    /// - Required for calculating total pages accurately
    /// - Supports result count validation and empty state handling
    /// - Independent of current page size or position
    /// - Reflects filtered count when filters are applied
    /// </remarks>
    public int TotalCount { get; }

    /// <summary>
    /// Gets the current page number (1-based indexing for user-friendly display).
    /// Indicates which page of results is currently being displayed.
    /// </summary>
    /// <value>
    /// Current page number starting from 1.
    /// Always positive for valid pagination scenarios.
    /// </value>
    /// <remarks>
    /// Page Number Characteristics:
    /// - 1-based indexing matches user expectations and URL patterns
    /// - Used for calculating skip/take values in database queries
    /// - Enables current page highlighting in pagination controls
    /// - Validates against TotalPages for boundary checking
    /// - Supports deep linking and bookmarking of paginated results
    /// </remarks>
    public int Page { get; }

    /// <summary>
    /// Gets the number of items requested per page.
    /// Determines the maximum number of items that can be displayed on each page.
    /// </summary>
    /// <value>
    /// Maximum number of items per page.
    /// Always positive for valid pagination scenarios.
    /// </value>
    /// <remarks>
    /// Page Size Properties:
    /// - Controls database query limit (TAKE clause)
    /// - Affects memory usage and network transfer size
    /// - User-configurable in many UI scenarios
    /// - Consistent across pagination requests for predictable behavior
    /// - Balance between performance and user experience
    /// </remarks>
    public int PageSize { get; }

    /// <summary>
    /// Gets the total number of pages required to display all items.
    /// Calculated automatically based on total count and page size.
    /// </summary>
    /// <value>
    /// Total number of pages in the complete paginated result set.
    /// Minimum value is 1 if any items exist, 0 if no items exist.
    /// </value>
    /// <remarks>
    /// Total Pages Calculation:
    /// - Uses ceiling division to handle partial pages correctly
    /// - Last page may contain fewer items than PageSize
    /// - Zero when TotalCount is zero (empty result set)
    /// - Supports page jump controls and validation
    /// - Enables "page X of Y" display messages
    /// </remarks>
    public int TotalPages { get; }

    /// <summary>
    /// Gets a value indicating whether a previous page exists.
    /// Enables/disables "Previous" navigation controls in pagination UI.
    /// </summary>
    /// <value>
    /// True if current page is greater than 1, false otherwise.
    /// False for first page or empty result sets.
    /// </value>
    /// <remarks>
    /// Previous Page Logic:
    /// - Simple comparison: Page > 1
    /// - Prevents navigation to invalid page numbers
    /// - Used for conditional rendering of navigation controls
    /// - Supports keyboard and mouse navigation patterns
    /// - Consistent with standard pagination behavior
    /// </remarks>
    public bool HasPrevious { get; }

    /// <summary>
    /// Gets a value indicating whether a next page exists.
    /// Enables/disables "Next" navigation controls in pagination UI.
    /// </summary>
    /// <value>
    /// True if current page is less than total pages, false otherwise.
    /// False for last page or empty result sets.
    /// </value>
    /// <remarks>
    /// Next Page Logic:
    /// - Comparison: Page &lt; TotalPages
    /// - Prevents navigation beyond available data
    /// - Used for conditional rendering of navigation controls
    /// - Supports infinite scroll and lazy loading patterns
    /// - Handles edge cases like empty result sets gracefully
    /// </remarks>
    public bool HasNext { get; }

    /// <summary>
    /// Initializes a new instance of the PagedResult class with items and pagination parameters.
    /// Automatically calculates all derived pagination properties.
    /// </summary>
    /// <param name="items">The collection of items for the current page</param>
    /// <param name="totalCount">Total number of items in the complete dataset</param>
    /// <param name="page">Current page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <remarks>
    /// Constructor Responsibilities:
    /// - Stores all provided parameters as immutable properties
    /// - Calculates TotalPages using ceiling division for partial pages
    /// - Determines HasPrevious based on current page position
    /// - Determines HasNext based on current page vs total pages
    /// - Validates input parameters implicitly through property assignment
    /// 
    /// Calculation Details:
    /// - TotalPages: Math.Ceiling(totalCount / (double)pageSize)
    /// - HasPrevious: page > 1
    /// - HasNext: page < TotalPages
    /// - All calculations performed once during construction
    /// - Thread-safe immutable object after construction
    /// </remarks>
    public PagedResult(IReadOnlyList<T> items, int totalCount, int page, int pageSize)
    {
        Items = items;
        TotalCount = totalCount;
        Page = page;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        HasPrevious = page > 1;
        HasNext = page < TotalPages;
    }
}