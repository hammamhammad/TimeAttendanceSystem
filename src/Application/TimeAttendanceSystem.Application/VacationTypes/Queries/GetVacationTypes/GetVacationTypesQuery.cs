using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypes;

/// <summary>
/// CQRS query for retrieving paginated vacation type lists with advanced filtering capabilities.
/// Supports search functionality, branch filtering, status filtering, and accrual type filtering
/// with multi-tenant security enforcement and performance optimization.
/// </summary>
/// <param name="Page">Page number for pagination (1-based indexing, default: 1)</param>
/// <param name="PageSize">Number of vacation types per page (default: 10, recommended max: 100)</param>
/// <param name="Search">Optional search term for vacation type name filtering</param>
/// <param name="BranchId">Optional branch ID to filter vacation types by branch assignment</param>
/// <param name="IsActive">Optional status filter (true: active, false: inactive, null: all)</param>
/// <param name="AccrualType">Optional accrual type filter for specific vacation accrual methods</param>
/// <param name="RequiresApproval">Optional approval requirement filter (true: requires approval, false: no approval, null: all)</param>
/// <param name="IsPaid">Optional payment type filter (true: paid leave, false: unpaid leave, null: all)</param>
/// <remarks>
/// Query Features:
/// - Paginated results to handle large vacation type datasets efficiently
/// - Multi-field search across vacation type names with case-insensitive matching
/// - Branch-scoped filtering respecting multi-tenant access control
/// - Status filtering for active/inactive vacation type management
/// - Accrual type filtering for specific vacation policy categories
/// - Approval workflow filtering for administrative purposes
/// - Automatic security filtering based on user's branch access scope
///
/// Search Functionality:
/// - Case-insensitive text search across name and Arabic name fields
/// - Partial matching using SQL LIKE/Contains operations
/// - Optimized with database indexing for performance
/// - Special characters safely handled to prevent SQL injection
/// - Empty or null search terms return all accessible vacation types
///
/// Filtering Logic:
/// - Branch filter: Shows vacation types assigned to specific branch
/// - Status filter: Active (true), Inactive (false), All (null)
/// - Accrual type filter: Filters by vacation accumulation method
/// - Approval filter: Shows vacation types by approval requirement
/// - Payment filter: Paid (true), Unpaid (false), All (null)
/// - Multiple filters combined using AND logic
/// - System administrators see all vacation types regardless of branch scope
/// - Regular users only see vacation types within their accessible branches
///
/// Multi-tenant Security:
/// - Automatic branch-scoped access control enforcement
/// - System administrators have unrestricted access to all vacation types
/// - Regular users limited to their assigned branch scope
/// - Cross-branch vacation type visibility prevented for security
/// - Vacation policy data filtered based on organizational permissions
///
/// Pagination Implementation:
/// - 1-based page numbering for user-friendly URLs
/// - Configurable page sizes with reasonable defaults
/// - Total count returned for pagination UI components
/// - Efficient database queries using SKIP/TAKE operations
/// - Performance optimized with proper database indexing
///
/// Response Format:
/// - Returns PagedResult&lt;VacationTypeDto&gt; with vacation types and pagination metadata
/// - Includes total count, current page, and page size information
/// - VacationTypeDto contains comprehensive vacation policy information
/// - Branch information included for administrative purposes
/// - Consistent error handling through Result pattern
///
/// Performance Considerations:
/// - Database queries optimized with selective field loading
/// - Eager loading used for related entities (branches)
/// - Indexed fields used in WHERE clauses for fast filtering
/// - Query result caching considered for frequently accessed data
/// - Async operations prevent blocking of web requests
///
/// Usage Examples:
/// - Vacation type management dashboard: GetVacationTypesQuery()
/// - Branch-specific vacation types: GetVacationTypesQuery(BranchId: 123)
/// - Search vacation types: GetVacationTypesQuery(Search: "Annual Leave")
/// - Active vacation types only: GetVacationTypesQuery(IsActive: true)
/// - Paid vacation types: GetVacationTypesQuery(IsPaid: true)
/// - Vacation types requiring approval: GetVacationTypesQuery(RequiresApproval: true)
/// - Specific accrual type: GetVacationTypesQuery(AccrualType: "Monthly")
/// </remarks>
public record GetVacationTypesQuery(
    int Page = 1,
    int PageSize = 10,
    string? Search = null,
    long? BranchId = null,
    bool? IsActive = null
) : IRequest<Result<PagedResult<VacationTypeDto>>>;