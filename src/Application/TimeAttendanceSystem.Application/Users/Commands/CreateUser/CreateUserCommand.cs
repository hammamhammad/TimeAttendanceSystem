using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Users.Commands.CreateUser;

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