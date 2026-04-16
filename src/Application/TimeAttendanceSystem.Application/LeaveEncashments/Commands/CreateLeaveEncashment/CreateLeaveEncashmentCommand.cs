using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.CreateLeaveEncashment;

public record CreateLeaveEncashmentCommand(
    long EmployeeId,
    long VacationTypeId,
    decimal DaysEncashed,
    string? Notes
) : ICommand<Result<long>>;
