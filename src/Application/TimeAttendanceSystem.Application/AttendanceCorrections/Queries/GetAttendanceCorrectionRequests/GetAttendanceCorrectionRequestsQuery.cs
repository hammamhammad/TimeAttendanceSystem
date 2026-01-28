using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests;

/// <summary>
/// CQRS query for retrieving attendance correction requests with filtering and pagination.
/// Supports comprehensive filtering by employee, date range, status, and type.
/// </summary>
/// <param name="EmployeeId">Optional employee identifier for employee-specific requests</param>
/// <param name="StartDate">Optional start date for date range filtering</param>
/// <param name="EndDate">Optional end date for date range filtering</param>
/// <param name="CorrectionType">Optional correction type filter (CheckIn/CheckOut)</param>
/// <param name="ApprovalStatus">Optional approval status filter</param>
/// <param name="BranchId">Optional branch identifier for branch-scoped filtering</param>
/// <param name="PageNumber">Page number for pagination (1-based)</param>
/// <param name="PageSize">Number of items per page</param>
/// <remarks>
/// Query Features:
/// - Employee-specific and cross-employee filtering
/// - Date range filtering for reporting periods
/// - Correction type and approval status filtering
/// - Branch-scoped filtering for multi-tenant access
/// - Pagination support for large datasets
/// - Includes employee and approver relationship data
/// - Sorted by correction date and creation time
///
/// Access Control:
/// - Users can only see requests for accessible employees
/// - Employee users can only see their own requests
/// - Manager users can see requests for their subordinates
/// - Admin/HR users can see all requests in their branch scope
/// </remarks>
public record GetAttendanceCorrectionRequestsQuery(
    long? EmployeeId = null,
    DateTime? StartDate = null,
    DateTime? EndDate = null,
    AttendanceCorrectionType? CorrectionType = null,
    ApprovalStatus? ApprovalStatus = null,
    long? BranchId = null,
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<Result<PagedResult<AttendanceCorrectionRequestDto>>>;
