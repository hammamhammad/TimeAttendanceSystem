using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Users.Commands.DeleteUser;

public record DeleteUserCommand(long UserId) : IRequest<Result<Unit>>;