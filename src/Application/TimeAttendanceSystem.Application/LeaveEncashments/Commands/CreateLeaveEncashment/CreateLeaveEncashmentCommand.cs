using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.CreateLeaveEncashment;

[RequiresModule(SystemModule.LeaveManagement)]
public record CreateLeaveEncashmentCommand(
    long EmployeeId,
    long VacationTypeId,
    decimal DaysEncashed,
    string? Notes
) : ICommand<Result<long>>;
