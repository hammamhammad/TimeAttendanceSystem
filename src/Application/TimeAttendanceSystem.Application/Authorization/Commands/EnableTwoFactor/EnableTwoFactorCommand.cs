using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.EnableTwoFactor;

public record EnableTwoFactorCommand() : IRequest<Result<EnableTwoFactorResponse>>;