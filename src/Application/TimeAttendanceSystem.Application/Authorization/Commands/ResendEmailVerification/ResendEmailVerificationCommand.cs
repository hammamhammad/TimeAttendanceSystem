using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.ResendEmailVerification;

public record ResendEmailVerificationCommand(string Email) : IRequest<Result<bool>>;