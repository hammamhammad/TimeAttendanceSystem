using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Authorization.Commands.Login;

namespace TecAxle.Hrms.Application.Authorization.Commands.VerifyTwoFactor;

public record VerifyTwoFactorCommand(string Username, string Code, string? DeviceInfo = null) : IRequest<Result<LoginResponse>>;