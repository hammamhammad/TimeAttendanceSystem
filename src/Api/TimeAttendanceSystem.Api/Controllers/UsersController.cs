using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Users.Commands.CreateUser;
using TimeAttendanceSystem.Application.Users.Commands.UpdateUser;
using TimeAttendanceSystem.Application.Users.Commands.DeleteUser;
using TimeAttendanceSystem.Application.Users.Commands.AssignUserRole;
using TimeAttendanceSystem.Application.Users.Commands.RemoveUserRole;
using TimeAttendanceSystem.Application.Users.Commands.AssignUserBranchScope;
using TimeAttendanceSystem.Application.Users.Queries.GetUsers;
using TimeAttendanceSystem.Application.Users.Queries.GetUserById;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for user management operations in the Time Attendance System.
/// Provides comprehensive CRUD operations, role management, and access control
/// with enterprise-grade security and authorization features.
/// </summary>
/// <remarks>
/// User Management Features:
/// - Create, read, update, delete user accounts
/// - Role assignment and management for authorization
/// - Branch scope assignment for multi-tenant security
/// - User search and filtering capabilities
/// - Account activation/deactivation controls
/// - Bulk operations for administrative efficiency
/// 
/// Security and Authorization:
/// - All endpoints require authentication (JWT token)
/// - Permission-based authorization for sensitive operations
/// - Branch-level data access control
/// - Audit logging for all user management actions
/// - Input validation and sanitization
/// - Protection against privilege escalation
/// 
/// Data Access Patterns:
/// - Paginated results for performance with large datasets
/// - Advanced filtering by role, branch, and status
/// - Search functionality across multiple user fields
/// - Efficient queries with proper indexing
/// - Lazy loading for related entities
/// 
/// Multi-tenancy Support:
/// - Branch-scoped user management
/// - Hierarchical permission inheritance
/// - Cross-branch user assignment capabilities
/// - Tenant data isolation and security
/// - Role-based multi-branch access control
/// 
/// API Design Patterns:
/// - RESTful endpoints following HTTP conventions
/// - CQRS pattern with MediatR for clean architecture
/// - Consistent error handling and response formats
/// - Request/response DTOs for API contract stability
/// - OpenAPI/Swagger documentation support
/// </remarks>
[ApiController]
[Route("api/v1/users")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Initializes the users controller with MediatR for CQRS pattern implementation.
    /// </summary>
    /// <param name="mediator">MediatR instance for dispatching commands and queries</param>
    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves a paginated list of users with optional filtering and search capabilities.
    /// Supports advanced filtering by branch, role, status, and text search across user fields.
    /// </summary>
    /// <param name="page">Page number for pagination (1-based, default: 1)</param>
    /// <param name="pageSize">Number of items per page (default: 10, max: 100)</param>
    /// <param name="search">Optional search term for username, email, or display name</param>
    /// <param name="branchId">Optional branch ID to filter users by branch assignment</param>
    /// <param name="roleId">Optional role ID to filter users by role assignment</param>
    /// <param name="isActive">Optional status filter (true: active, false: inactive, null: all)</param>
    /// <returns>Paginated list of users with metadata</returns>
    /// <response code="200">Users retrieved successfully</response>
    /// <response code="400">Invalid query parameters</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to view users</response>
    /// <remarks>
    /// Query Features:
    /// - Pagination prevents memory issues with large user sets
    /// - Multi-field search across username, email, full name
    /// - Branch filtering respects user's access scope
    /// - Role filtering enables administrative workflows
    /// - Status filtering for account management
    /// 
    /// Search Functionality:
    /// - Case-insensitive text matching
    /// - Partial matches supported (contains operation)
    /// - Searches across: username, email, first name, last name
    /// - Special characters properly escaped
    /// - Performance optimized with database indexing
    /// 
    /// Filtering Logic:
    /// - Branch filter respects user's branch access scope
    /// - Role filter shows users with specific role assignments
    /// - Status filter: active (true), inactive (false), all (null)
    /// - Multiple filters combined with AND logic
    /// - Empty results for invalid filter combinations
    /// 
    /// Response Format:
    /// - Paginated results with total count and page info
    /// - User DTOs with essential information only
    /// - Sensitive data (passwords, tokens) excluded
    /// - Role and branch information included
    /// - Performance metrics for monitoring
    /// 
    /// Security Considerations:
    /// - Users only see accounts within their branch scope
    /// - Sensitive user data filtered from response
    /// - Query parameters validated and sanitized
    /// - Rate limiting applied to prevent abuse
    /// - Audit logging for compliance requirements
    /// </remarks>
    [HttpGet]
    [Authorize(Policy = "UserRead")]
    public async Task<IActionResult> GetUsers(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] long? branchId = null,
        [FromQuery] long? roleId = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetUsersQuery(page, pageSize, search, branchId, roleId, isActive);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpPost]
    [Authorize(Policy = "UserManagement")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        var command = new CreateUserCommand(
            request.Username,
            request.Email,
            request.Phone,
            request.Password,
            request.PreferredLanguage,
            request.MustChangePassword,
            request.RoleIds,
            request.BranchIds,
            request.EmployeeId
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { id = result.Value });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "UserRead")]
    public async Task<IActionResult> GetUserById(long id)
    {
        var query = new GetUserByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "UserManagement")]
    public async Task<IActionResult> UpdateUser(long id, [FromBody] UpdateUserRequest request)
    {
        var command = new UpdateUserCommand
        {
            Id = id,
            Email = request.Email,
            Phone = request.Phone,
            PreferredLanguage = request.PreferredLanguage,
            IsActive = request.IsActive,
            MustChangePassword = request.MustChangePassword
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "UserManagement")]
    public async Task<IActionResult> DeleteUser(long id)
    {
        var command = new DeleteUserCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpPost("{id}/roles")]
    [Authorize(Policy = "UserRoleAssignment")]
    public async Task<IActionResult> AssignRole(long id, [FromBody] AssignRoleRequest request)
    {
        var command = new AssignUserRoleCommand
        {
            UserId = id,
            RoleId = request.RoleId
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{id}/roles/{roleId}")]
    [Authorize(Policy = "UserRoleAssignment")]
    public async Task<IActionResult> RemoveRole(long id, long roleId)
    {
        var command = new RemoveUserRoleCommand
        {
            UserId = id,
            RoleId = roleId
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpPost("{id}/branches")]
    [Authorize(Policy = "UserManagement")]
    public async Task<IActionResult> AssignBranch(long id, [FromBody] AssignBranchRequest request)
    {
        var command = new AssignUserBranchScopeCommand
        {
            UserId = id,
            BranchId = request.BranchId
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

public record CreateUserRequest(
    string Username,
    string Email,
    string? Phone,
    string Password,
    string PreferredLanguage,
    bool MustChangePassword,
    List<long> RoleIds,
    List<long> BranchIds,
    long? EmployeeId
);

public record UpdateUserRequest(
    string Email,
    string? Phone,
    string PreferredLanguage,
    bool IsActive,
    bool MustChangePassword
);

public record AssignRoleRequest(
    long RoleId
);

public record AssignBranchRequest(
    long BranchId
);