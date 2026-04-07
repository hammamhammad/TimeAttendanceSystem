using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Resignations.Commands.CreateResignationRequest;

[RequiresModule(SystemModule.Offboarding)]
public record CreateResignationRequestCommand(
    long EmployeeId,
    DateTime ResignationDate,
    DateTime LastWorkingDate,
    string? Reason,
    string? ReasonAr
) : ICommand<Result<long>>;
