using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Sessions.Commands.TerminateSession;

public record TerminateSessionCommand(string SessionId) : IRequest<Result<bool>>;