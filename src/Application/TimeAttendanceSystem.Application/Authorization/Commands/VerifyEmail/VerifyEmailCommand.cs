using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.VerifyEmail;

public record VerifyEmailCommand(string Email, string Token) : IRequest<Result<bool>>;