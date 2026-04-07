using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Users.Queries.GetUserById;

public record GetUserByIdQuery(long UserId) : IRequest<Result<UserDetailDto>>;