using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Infrastructure.Services;

public class CurrentUser : ICurrentUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public long? UserId
    {
        get
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return long.TryParse(userIdClaim, out var userId) ? userId : null;
        }
    }

    public string? Username => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value;

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;

    public bool IsSystemAdmin => Roles.Contains("SystemAdmin");

    public IReadOnlyList<string> Roles
    {
        get
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null) return Array.Empty<string>();

            return user.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
        }
    }

    public IReadOnlyList<string> Permissions
    {
        get
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null) return Array.Empty<string>();

            return user.FindAll("permission").Select(c => c.Value).ToList();
        }
    }

    public IReadOnlyList<long> BranchIds
    {
        get
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null) return Array.Empty<long>();

            return user.FindAll("branch_scope")
                .Select(c => long.TryParse(c.Value, out var branchId) ? branchId : 0)
                .Where(id => id > 0)
                .ToList();
        }
    }

    public string PreferredLanguage => _httpContextAccessor.HttpContext?.User?.FindFirst("preferred_language")?.Value ?? "en";
}