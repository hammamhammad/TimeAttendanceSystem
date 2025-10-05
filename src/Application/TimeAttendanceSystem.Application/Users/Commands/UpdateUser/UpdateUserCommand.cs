using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.UpdateUser;

public record UpdateUserCommand : IRequest<Result<Unit>>
{
    public long Id { get; init; }
    public string Email { get; init; } = string.Empty;
    public string? Phone { get; init; }
    public string PreferredLanguage { get; init; } = "en";
    public bool IsActive { get; init; }
    public bool MustChangePassword { get; init; }
}