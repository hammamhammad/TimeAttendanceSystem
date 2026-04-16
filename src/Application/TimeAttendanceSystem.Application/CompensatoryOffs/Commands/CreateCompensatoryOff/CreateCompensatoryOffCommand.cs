using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.CreateCompensatoryOff;

public record CreateCompensatoryOffCommand(
    long EmployeeId,
    DateTime EarnedDate,
    DateTime ExpiryDate,
    string Reason,
    string? ReasonAr,
    decimal? HoursWorked,
    string? Notes
) : ICommand<Result<long>>;
