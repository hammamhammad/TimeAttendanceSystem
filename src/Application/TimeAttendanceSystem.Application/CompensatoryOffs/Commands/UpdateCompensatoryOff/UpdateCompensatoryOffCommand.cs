using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.UpdateCompensatoryOff;

[RequiresModule(SystemModule.LeaveManagement)]
public record UpdateCompensatoryOffCommand(
    long Id,
    long EmployeeId,
    DateTime EarnedDate,
    DateTime ExpiryDate,
    string Reason,
    string? ReasonAr,
    decimal? HoursWorked,
    string? Notes
) : ICommand<Result>;
