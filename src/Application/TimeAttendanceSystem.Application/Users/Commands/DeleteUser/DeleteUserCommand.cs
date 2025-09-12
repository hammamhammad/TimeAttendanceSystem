using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.DeleteUser;

public record DeleteUserCommand(long UserId) : IRequest<Result<Unit>>;