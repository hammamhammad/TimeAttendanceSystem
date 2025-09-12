using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.ConfirmTwoFactor;

public record ConfirmTwoFactorCommand(string Code) : IRequest<Result<bool>>;