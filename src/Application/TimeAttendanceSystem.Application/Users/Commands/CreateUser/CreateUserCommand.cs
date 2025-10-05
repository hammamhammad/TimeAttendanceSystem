using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.CreateUser;

public record CreateUserCommand(
    string Username,
    string Email,
    string? Phone,
    string Password,
    string PreferredLanguage,
    bool MustChangePassword,
    List<long> RoleIds,
    List<long> BranchIds,
    long? EmployeeId
) : IRequest<Result<long>>;