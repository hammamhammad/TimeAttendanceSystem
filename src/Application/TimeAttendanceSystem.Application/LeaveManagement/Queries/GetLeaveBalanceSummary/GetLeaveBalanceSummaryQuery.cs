using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveBalanceSummary;

/// <summary>
/// CQRS query for retrieving comprehensive leave balance summary for an employee.
/// Returns all vacation type balances for the specified year.
/// </summary>
/// <param name="EmployeeId">ID of the employee (required)</param>
/// <param name="Year">Calendar year for the balance summary (required)</param>
public record GetLeaveBalanceSummaryQuery(
    long EmployeeId,
    int Year
) : IRequest<Result<LeaveBalanceSummaryDto>>;
