using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Excuses.Commands.DeleteEmployeeExcuse;

[RequiresModule(SystemModule.LeaveManagement)]
public record DeleteEmployeeExcuseCommand(long Id) : IRequest<Result<bool>>;