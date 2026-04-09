using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.Login;

/// <summary>
/// Unified login command — authenticates both tenant users and platform admins via email.
/// </summary>
public record LoginCommand(
    string Email,
    string Password,
    long? TenantId = null,
    string? DeviceInfo = null,
    bool RememberMe = false
) : IRequest<Result<LoginResult>>;

/// <summary>
/// Login result that can represent success, tenant selection needed, or failure.
/// </summary>
public record LoginResult(
    bool Success,
    LoginResponse? Response = null,
    bool RequiresTenantSelection = false,
    List<TenantOption>? Tenants = null
);

public record TenantOption(
    long TenantId,
    string Name,
    string? NameAr,
    string? LogoUrl
);
