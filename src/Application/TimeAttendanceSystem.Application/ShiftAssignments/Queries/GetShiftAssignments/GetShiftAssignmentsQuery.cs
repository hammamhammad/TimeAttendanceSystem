using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.ShiftAssignments.Queries.GetShiftAssignments;

/// <summary>
/// Query for retrieving shift assignments with comprehensive filtering and pagination capabilities.
/// Supports multi-level filtering by assignment type, target entities, dates, and status.
/// </summary>
/// <remarks>
/// Query Features:
/// - Pagination support for large result sets
/// - Multi-criteria filtering for precise result matching
/// - Assignment type filtering (Employee, Department, Branch)
/// - Date range filtering for time-based queries
/// - Status-based filtering for lifecycle management
/// - Text search across assignment details and notes
/// - Sorting and ordering capabilities
///
/// Filter Options:
/// - Assignment Type: Filter by Employee, Department, or Branch assignments
/// - Target Entity: Filter by specific Employee, Department, or Branch IDs
/// - Date Range: Filter by effective date ranges and current/future assignments
/// - Status: Filter by Active, Pending, Inactive, Expired, or Cancelled assignments
/// - Shift: Filter assignments for specific shifts
/// - Priority: Filter by assignment priority levels
///
/// Performance Considerations:
/// - Indexed query paths for optimal database performance
/// - Efficient pagination to handle large datasets
/// - Selective loading of related entities to minimize data transfer
/// - Query optimization for common filtering scenarios
/// </remarks>
public record GetShiftAssignmentsQuery(
    /// <summary>
    /// Page number for pagination (1-based indexing).
    /// Determines which subset of results to return.
    /// </summary>
    int Page = 1,

    /// <summary>
    /// Number of items per page for pagination.
    /// Controls the size of each result page.
    /// </summary>
    int PageSize = 10,

    /// <summary>
    /// Optional text search across assignment details, notes, and related entity names.
    /// Supports partial matching and case-insensitive search.
    /// </summary>
    string? Search = null,

    /// <summary>
    /// Optional filter by assignment type.
    /// Filters results to show only Employee, Department, or Branch assignments.
    /// </summary>
    ShiftAssignmentType? AssignmentType = null,

    /// <summary>
    /// Optional filter by specific employee ID.
    /// Only returns assignments for the specified employee.
    /// </summary>
    long? EmployeeId = null,

    /// <summary>
    /// Optional filter by specific department ID.
    /// Only returns assignments for the specified department.
    /// </summary>
    long? DepartmentId = null,

    /// <summary>
    /// Optional filter by specific branch ID.
    /// Only returns assignments for the specified branch.
    /// </summary>
    long? BranchId = null,

    /// <summary>
    /// Optional filter by specific shift ID.
    /// Only returns assignments for the specified shift.
    /// </summary>
    long? ShiftId = null,

    /// <summary>
    /// Optional filter by assignment status.
    /// Filters results to show only assignments with the specified status.
    /// </summary>
    ShiftAssignmentStatus? Status = null,

    /// <summary>
    /// Optional filter for assignments effective from this date.
    /// Only returns assignments that are effective on or after this date.
    /// </summary>
    DateTime? EffectiveFrom = null,

    /// <summary>
    /// Optional filter for assignments effective until this date.
    /// Only returns assignments that are effective on or before this date.
    /// </summary>
    DateTime? EffectiveTo = null,

    /// <summary>
    /// Optional filter to show only currently active assignments.
    /// When true, filters to assignments that are active on the current date.
    /// </summary>
    bool? CurrentlyActive = null,

    /// <summary>
    /// Optional filter by minimum priority level.
    /// Only returns assignments with priority greater than or equal to this value.
    /// </summary>
    int? MinPriority = null,

    /// <summary>
    /// Optional filter by maximum priority level.
    /// Only returns assignments with priority less than or equal to this value.
    /// </summary>
    int? MaxPriority = null
) : IRequest<Result<PagedResult<ShiftAssignmentDto>>>;