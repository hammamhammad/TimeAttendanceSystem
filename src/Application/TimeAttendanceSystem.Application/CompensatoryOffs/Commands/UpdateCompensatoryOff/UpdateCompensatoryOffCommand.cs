using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.UpdateCompensatoryOff;

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
