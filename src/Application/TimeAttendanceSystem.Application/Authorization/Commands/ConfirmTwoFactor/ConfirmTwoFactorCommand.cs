using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.ConfirmTwoFactor;

public record ConfirmTwoFactorCommand(string Code) : IRequest<Result<bool>>;