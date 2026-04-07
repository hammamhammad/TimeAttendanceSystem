using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveManagement.Queries.GetLeaveBalanceSummary;

/// <summary>
/// CQRS query for retrieving comprehensive leave balance summary for an employee.
/// Returns all vacation type balances for the specified year.
/// </summary>
/// <param name="EmployeeId">ID of the employee (required)</param>
/// <param name="Year">Calendar year for the balance summary (required)</param>
[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetLeaveBalanceSummaryQuery(
    long EmployeeId,
    int Year
) : IRequest<Result<LeaveBalanceSummaryDto>>;
