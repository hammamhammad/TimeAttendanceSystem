using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.Login;

public record LoginCommand(
    string Email,
    string Password,
    string? DeviceInfo = null,
    bool RememberMe = false
) : IRequest<Result<LoginResult>>;

public record LoginResult(
    bool Success,
    LoginResponse? Response = null
);
