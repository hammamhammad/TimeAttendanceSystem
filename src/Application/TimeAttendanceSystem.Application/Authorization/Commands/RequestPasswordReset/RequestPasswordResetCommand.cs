using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.RequestPasswordReset;

public record RequestPasswordResetCommand(string Email) : IRequest<Result<bool>>;