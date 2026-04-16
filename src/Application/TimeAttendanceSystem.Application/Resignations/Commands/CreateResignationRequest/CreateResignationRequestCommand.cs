using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.CreateResignationRequest;

public record CreateResignationRequestCommand(
    long EmployeeId,
    DateTime ResignationDate,
    DateTime LastWorkingDate,
    string? Reason,
    string? ReasonAr
) : ICommand<Result<long>>;
