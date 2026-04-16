namespace TecAxle.Hrms.Application.Abstractions;

public interface ICurrentUser
{
    long? UserId { get; }
    string? Username { get; }
    bool IsAuthenticated { get; }
    bool IsSystemAdmin { get; }
    IReadOnlyList<string> Roles { get; }
    IReadOnlyList<string> Permissions { get; }
    IReadOnlyList<long> BranchIds { get; }
    string PreferredLanguage { get; }
}
