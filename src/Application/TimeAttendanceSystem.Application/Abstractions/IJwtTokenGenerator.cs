using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Application.Abstractions;

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user, IReadOnlyList<string> roles, IReadOnlyList<string> permissions, IReadOnlyList<long> branchIds, bool rememberMe = false);

    string GenerateRefreshToken();

    DateTime GetTokenExpiration(bool rememberMe = false);
}
