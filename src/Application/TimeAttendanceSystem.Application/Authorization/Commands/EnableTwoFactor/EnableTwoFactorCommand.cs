using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.EnableTwoFactor;

public record EnableTwoFactorCommand() : IRequest<Result<EnableTwoFactorResponse>>;