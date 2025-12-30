using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveTransactionHistory;

/// <summary>
/// CQRS query for retrieving leave transaction history for an employee.
/// Returns complete audit trail of all balance changes.
/// </summary>
/// <param name="EmployeeId">ID of the employee (required)</param>
/// <param name="VacationTypeId">ID of the vacation type (optional - null returns all types)</param>
/// <param name="Year">Calendar year for transactions (optional - null returns all years)</param>
/// <param name="PageNumber">Page number for pagination (default 1)</param>
/// <param name="PageSize">Page size for pagination (default 50)</param>
public record GetLeaveTransactionHistoryQuery(
    long EmployeeId,
    long? VacationTypeId = null,
    int? Year = null,
    int PageNumber = 1,
    int PageSize = 50
) : IRequest<Result<PagedResult<LeaveTransactionDto>>>;
