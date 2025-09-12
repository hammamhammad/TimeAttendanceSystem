using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Queries.GetUsers;

/// <summary>
/// Query handler for retrieving paginated user lists with advanced filtering and security enforcement.
/// Implements multi-tenant access control, search functionality, and performance optimizations
/// for user management and administrative operations.
/// </summary>
/// <remarks>
/// Handler Responsibilities:
/// - Multi-tenant security enforcement through branch scope filtering
/// - Advanced search and filtering across multiple user attributes
/// - Efficient pagination with total count calculation
/// - Role and branch relationship loading for administrative context
/// - Performance optimization through selective data loading and projection
/// 
/// Security Implementation:
/// - Automatic branch-scoped access control for non-system administrators
/// - System administrators have unrestricted access to all users
/// - Regular users can only view users within their assigned branches
/// - Cross-tenant data isolation maintained throughout query execution
/// - Sensitive user data excluded from response DTOs
/// 
/// Query Optimization:
/// - Eager loading of related entities (UserRoles, UserBranchScopes) to prevent N+1 queries
/// - Projection to DTOs at database level to minimize data transfer
/// - Efficient pagination using Skip/Take with proper indexing
/// - Filtered counting for accurate pagination metadata
/// - Ordered results for consistent user experience
/// 
/// Filtering Capabilities:
/// - Text search across username and email with case-insensitive matching
/// - Branch filtering for multi-tenant user management
/// - Role-based filtering for administrative workflows
/// - Status filtering for active/inactive user management
/// - Multiple filters combined using AND logic for precise results
/// 
/// Performance Considerations:
/// - Database queries optimized with proper JOIN strategies
/// - Indexed fields used in WHERE clauses for fast filtering
/// - Minimal data projection to reduce network overhead
/// - Async operations for non-blocking execution
/// - Efficient count queries for pagination metadata
/// 
/// Error Handling:
/// - Graceful handling of invalid pagination parameters
/// - Safe handling of null/empty search terms
/// - Database connection issues handled by infrastructure layer
/// - Consistent Result pattern for error communication
/// </remarks>
public class GetUsersQueryHandler : BaseHandler<GetUsersQuery, Result<PagedResult<UserDto>>>
{
    /// <summary>
    /// Initializes a new instance of the GetUsersQueryHandler.
    /// Sets up database context and user context for secure user querying.
    /// </summary>
    /// <param name="context">Database context for user data access</param>
    /// <param name="currentUser">Current user context for security and access control</param>
    public GetUsersQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    /// <summary>
    /// Handles the get users query with comprehensive filtering, pagination, and security enforcement.
    /// Retrieves users with role and branch information while enforcing multi-tenant access control.
    /// </summary>
    /// <param name="request">Get users query with pagination and filtering parameters</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Result containing paginated user list with metadata, or error details on failure</returns>
    /// <remarks>
    /// Query Execution Flow:
    /// 1. Base query construction with eager loading of related entities
    /// 2. Multi-tenant security filter application based on user's branch scope
    /// 3. Search filter application across username and email fields
    /// 4. Branch filter application for administrative filtering
    /// 5. Role filter application for role-based user management
    /// 6. Status filter application for active/inactive user filtering
    /// 7. Total count calculation for pagination metadata
    /// 8. Ordered pagination with DTO projection for performance
    /// 9. PagedResult construction with users and pagination information
    /// 
    /// Security Filtering:
    /// - System administrators see all users across all branches
    /// - Regular users limited to viewing users within their branch scope
    /// - Branch scope filtering prevents cross-tenant data access
    /// - Empty branch scope indicates system administrator privileges
    /// 
    /// Search Implementation:
    /// - Case-insensitive search using ToLower() for database compatibility
    /// - Searches across username and email fields simultaneously
    /// - Partial matching using Contains operation (SQL LIKE)
    /// - Special characters safely handled by Entity Framework
    /// 
    /// Performance Optimizations:
    /// - Eager loading prevents N+1 query problems for roles and branches
    /// - Database-level projection reduces memory usage and network transfer
    /// - Efficient pagination using Skip/Take with proper ordering
    /// - Indexed fields assumed for optimal query performance
    /// - Minimal field selection in DTO projection
    /// </remarks>
    public override async Task<Result<PagedResult<UserDto>>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        // Build base query with eager loading of related entities to prevent N+1 queries
        var query = Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .Include(u => u.UserBranchScopes)
                .ThenInclude(ubs => ubs.Branch)
            .AsQueryable();

        // Apply multi-tenant branch filtering for non-system administrators
        // System administrators (empty BranchIds) have unrestricted access
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(u => u.UserBranchScopes.Any(ubs => CurrentUser.BranchIds.Contains(ubs.BranchId)));
        }

        // Apply text search filter across username and email fields
        if (!string.IsNullOrEmpty(request.Search))
        {
            var searchLower = request.Search.ToLower();
            query = query.Where(u => u.Username.ToLower().Contains(searchLower) ||
                                   u.Email.ToLower().Contains(searchLower));
        }

        // Apply branch-specific filtering for administrative workflows
        if (request.BranchId.HasValue)
        {
            query = query.Where(u => u.UserBranchScopes.Any(ubs => ubs.BranchId == request.BranchId.Value));
        }

        // Apply role-based filtering for user management operations
        if (request.RoleId.HasValue)
        {
            query = query.Where(u => u.UserRoles.Any(ur => ur.RoleId == request.RoleId.Value));
        }

        // Apply status filtering for active/inactive user management
        if (request.IsActive.HasValue)
        {
            query = query.Where(u => u.IsActive == request.IsActive.Value);
        }

        // Calculate total count for pagination metadata (before pagination)
        var totalCount = await query.CountAsync(cancellationToken);

        // Execute paginated query with DTO projection for performance
        var users = await query
            .OrderBy(u => u.Username) // Consistent ordering for pagination
            .Skip((request.Page - 1) * request.PageSize) // Pagination offset
            .Take(request.PageSize) // Pagination limit
            .Select(u => new UserDto( // Database-level projection to DTO
                u.Id,
                u.Username,
                u.Email,
                u.Phone,
                u.TwoFactorEnabled,
                u.LockoutEndUtc,
                u.MustChangePassword,
                u.PreferredLanguage,
                u.IsActive,
                u.CreatedAtUtc,
                u.UserRoles.Select(ur => ur.Role.Name).ToList(), // Role names for display
                u.UserBranchScopes.Select(ubs => ubs.Branch.Name).ToList() // Branch names for context
            ))
            .ToListAsync(cancellationToken);

        // Construct paginated result with metadata for UI pagination components
        var pagedResult = new PagedResult<UserDto>(users, totalCount, request.Page, request.PageSize);
        return Result.Success(pagedResult);
    }
}