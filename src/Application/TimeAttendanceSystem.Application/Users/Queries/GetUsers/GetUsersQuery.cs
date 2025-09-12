using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Queries.GetUsers;

/// <summary>
/// CQRS query for retrieving paginated user lists with advanced filtering capabilities.
/// Supports search functionality, branch filtering, role filtering, and status filtering
/// with multi-tenant security enforcement and performance optimization.
/// </summary>
/// <param name="Page">Page number for pagination (1-based indexing, default: 1)</param>
/// <param name="PageSize">Number of users per page (default: 10, recommended max: 100)</param>
/// <param name="Search">Optional search term for username and email filtering</param>
/// <param name="BranchId">Optional branch ID to filter users by branch assignment</param>
/// <param name="RoleId">Optional role ID to filter users by role assignment</param>
/// <param name="IsActive">Optional status filter (true: active, false: inactive, null: all)</param>
/// <remarks>
/// Query Features:
/// - Paginated results to handle large user datasets efficiently
/// - Multi-field search across username and email with case-insensitive matching
/// - Branch-scoped filtering respecting multi-tenant access control
/// - Role-based filtering for administrative workflows
/// - Status filtering for active/inactive user management
/// - Automatic security filtering based on user's branch access scope
/// 
/// Search Functionality:
/// - Case-insensitive text search across username and email fields
/// - Partial matching using SQL LIKE/Contains operations
/// - Optimized with database indexing for performance
/// - Special characters safely handled to prevent SQL injection
/// - Empty or null search terms return all accessible users
/// 
/// Filtering Logic:
/// - Branch filter: Shows users assigned to specific branch
/// - Role filter: Shows users with specific role assignments
/// - Status filter: Active (true), Inactive (false), All (null)
/// - Multiple filters combined using AND logic
/// - System administrators see all users regardless of branch scope
/// - Regular users only see users within their accessible branches
/// 
/// Multi-tenant Security:
/// - Automatic branch-scoped access control enforcement
/// - System administrators have unrestricted access to all users
/// - Regular users limited to their assigned branch scope
/// - Cross-branch user visibility prevented for security
/// - Sensitive user data filtered based on permissions
/// 
/// Pagination Implementation:
/// - 1-based page numbering for user-friendly URLs
/// - Configurable page sizes with reasonable defaults
/// - Total count returned for pagination UI components
/// - Efficient database queries using SKIP/TAKE operations
/// - Performance optimized with proper database indexing
/// 
/// Response Format:
/// - Returns PagedResult&lt;UserDto&gt; with users and pagination metadata
/// - Includes total count, current page, and page size information
/// - User DTOs contain essential information without sensitive data
/// - Role and branch information included for administrative purposes
/// - Consistent error handling through Result pattern
/// 
/// Performance Considerations:
/// - Database queries optimized with selective field loading
/// - Eager loading used for related entities (roles, branches)
/// - Indexed fields used in WHERE clauses for fast filtering
/// - Query result caching considered for frequently accessed data
/// - Async operations prevent blocking of web requests
/// 
/// Usage Examples:
/// - User management dashboard: GetUsersQuery()
/// - Branch-specific user list: GetUsersQuery(BranchId: 123)
/// - Search users: GetUsersQuery(Search: "john.doe")
/// - Role-based filtering: GetUsersQuery(RoleId: 5)
/// - Active users only: GetUsersQuery(IsActive: true)
/// </remarks>
public record GetUsersQuery(
    int Page = 1,
    int PageSize = 10,
    string? Search = null,
    long? BranchId = null,
    long? RoleId = null,
    bool? IsActive = null
) : IRequest<Result<PagedResult<UserDto>>>;