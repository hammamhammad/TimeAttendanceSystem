using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuses;

/// <summary>
/// CQRS query for retrieving employee excuse requests with filtering and pagination.
/// Supports comprehensive filtering by employee, date range, status, and type.
/// </summary>
/// <param name="EmployeeId">Optional employee identifier for employee-specific excuses</param>
/// <param name="StartDate">Optional start date for date range filtering</param>
/// <param name="EndDate">Optional end date for date range filtering</param>
/// <param name="ExcuseType">Optional excuse type filter</param>
/// <param name="ApprovalStatus">Optional approval status filter</param>
/// <param name="BranchId">Optional branch identifier for branch-scoped filtering</param>
/// <param name="PageNumber">Page number for pagination (1-based)</param>
/// <param name="PageSize">Number of items per page</param>
/// <remarks>
/// Query Features:
/// - Employee-specific and cross-employee filtering
/// - Date range filtering for reporting periods
/// - Excuse type and approval status filtering
/// - Branch-scoped filtering for multi-tenant access
/// - Pagination support for large datasets
/// - Includes employee and approver relationship data
/// - Sorted by excuse date and creation time
///
/// Access Control:
/// - Users can only see excuses for accessible employees
/// - Employee users can only see their own excuses
/// - Manager users can see excuses for their subordinates
/// - Admin/HR users can see all excuses in their branch scope
///
/// Performance Considerations:
/// - Efficient indexing on EmployeeId, ExcuseDate, and ApprovalStatus
/// - Optimized joins with employee and user tables
/// - Projection to DTOs for minimal data transfer
/// - Date range filtering for performance on large datasets
/// </remarks>
public record GetEmployeeExcusesQuery(
    long? EmployeeId = null,
    DateTime? StartDate = null,
    DateTime? EndDate = null,
    ExcuseType? ExcuseType = null,
    ApprovalStatus? ApprovalStatus = null,
    long? BranchId = null,
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<Result<PagedResult<EmployeeExcuseDto>>>;