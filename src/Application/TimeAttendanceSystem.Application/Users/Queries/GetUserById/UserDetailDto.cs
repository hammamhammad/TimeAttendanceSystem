using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Users.Queries.GetUserById;

public class UserDetailDto
{
    public long Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public bool EmailConfirmed { get; set; }
    public bool TwoFactorEnabled { get; set; }
    public DateTime? LockoutEndUtc { get; set; }
    public bool LockoutEnabled { get; set; }
    public int AccessFailedCount { get; set; }
    public bool MustChangePassword { get; set; }
    public string PreferredLanguage { get; set; } = "en";
    public bool IsActive { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
    public string? CreatedBy { get; set; }
    public string? ModifiedBy { get; set; }
    
    public List<UserRoleDto> Roles { get; set; } = new();
    public List<UserBranchScopeDto> BranchScopes { get; set; } = new();
}

public class UserRoleDto
{
    public long RoleId { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public bool IsSystem { get; set; }
}

public class UserBranchScopeDto
{
    public long BranchId { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public string BranchCode { get; set; } = string.Empty;
}