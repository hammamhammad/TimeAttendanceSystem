using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveManagement.Queries.GetEmployeeLeaveBalance;

/// <summary>
/// CQRS query for retrieving employee leave balance for a specific vacation type and year.
/// </summary>
/// <param name="EmployeeId">ID of the employee (required)</param>
/// <param name="VacationTypeId">ID of the vacation type (required)</param>
/// <param name="Year">Calendar year for the balance (required)</param>
[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetEmployeeLeaveBalanceQuery(
    long EmployeeId,
    long VacationTypeId,
    int Year
) : IRequest<Result<LeaveBalanceDto?>>;
