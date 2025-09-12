using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Authorization.Commands.Login;

namespace TimeAttendanceSystem.Application.Authorization.Commands.VerifyTwoFactor;

public record VerifyTwoFactorCommand(string Username, string Code, string? DeviceInfo = null) : IRequest<Result<LoginResponse>>;