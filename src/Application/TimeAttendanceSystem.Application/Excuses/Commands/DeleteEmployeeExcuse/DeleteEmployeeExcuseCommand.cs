using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Excuses.Commands.DeleteEmployeeExcuse;

public record DeleteEmployeeExcuseCommand(long Id) : IRequest<Result<bool>>;