using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.VerifyEmail;

public record VerifyEmailCommand(string Email, string Token) : IRequest<Result<bool>>;