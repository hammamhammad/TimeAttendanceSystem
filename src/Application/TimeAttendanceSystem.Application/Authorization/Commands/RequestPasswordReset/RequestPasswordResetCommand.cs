using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.RequestPasswordReset;

public record RequestPasswordResetCommand(string Email) : IRequest<Result<bool>>;