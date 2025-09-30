using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteEmployeeExcuse;

public record DeleteEmployeeExcuseCommand(long Id) : IRequest<Result<bool>>;