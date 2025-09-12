using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.Logout;

public record LogoutCommand(string? RefreshToken = null, bool LogoutFromAllDevices = false) : IRequest<Result<bool>>;