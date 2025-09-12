using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.ResendEmailVerification;

public record ResendEmailVerificationCommand(string Email) : IRequest<Result<bool>>;