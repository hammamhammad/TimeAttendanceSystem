using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.Login;

public record LoginCommand(
    string Username,
    string Password,
    string? DeviceInfo = null
) : IRequest<Result<LoginResponse>>;