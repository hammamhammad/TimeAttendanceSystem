using MediatR;
using TecAxle.Hrms.Application.Authorization.Commands.Login;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.PlatformLogin;

/// <summary>
/// Authenticates a TecAxle platform admin user against the master database.
/// Platform users can manage all tenants and access any tenant's data.
/// </summary>
public record PlatformLoginCommand(
    string Email,
    string Password,
    string? DeviceInfo = null,
    bool RememberMe = false
) : IRequest<Result<LoginResponse>>;
