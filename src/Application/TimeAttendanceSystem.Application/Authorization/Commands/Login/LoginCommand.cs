using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.Login;

public record LoginCommand(
    string Username,
    string Password,
    string? DeviceInfo = null,
    bool RememberMe = false
) : IRequest<Result<LoginResponse>>;