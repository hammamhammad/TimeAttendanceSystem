namespace TecAxle.Hrms.Application.Authorization.Commands.Login;

public record LoginResponse(
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt,
    bool MustChangePassword,
    UserInfo User
);

public record UserInfo(
    long Id,
    string Username,
    string Email,
    string PreferredLanguage,
    List<string> Roles,
    List<string> Permissions,
    List<long> BranchIds,
    string? FullName = null,
    string? FullNameAr = null,
    long? EmployeeId = null,
    bool IsManager = false
);
