using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.CreateUser;

public record CreateUserCommand(
    string Username,
    string Email,
    string? Phone,
    string Password,
    string PreferredLanguage,
    List<long> RoleIds,
    List<long> BranchIds
) : IRequest<Result<long>>;