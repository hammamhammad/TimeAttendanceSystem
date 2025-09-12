using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Sessions.Commands.TerminateSession;

public record TerminateSessionCommand(string SessionId) : IRequest<Result<bool>>;