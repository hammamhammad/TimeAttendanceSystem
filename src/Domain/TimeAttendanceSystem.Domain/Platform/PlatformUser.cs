using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Platform;

/// <summary>
/// Platform-level user account stored in the master database.
/// These users are not tied to any tenant — they manage the platform itself.
/// </summary>
public class PlatformUser : BaseEntity
{
    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string PasswordSalt { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    public string? FullNameAr { get; set; }

    public PlatformRole Role { get; set; } = PlatformRole.TecAxleAdmin;

    public bool IsActive { get; set; } = true;

    public bool TwoFactorEnabled { get; set; }

    public bool MustChangePassword { get; set; } = true;

    public string PreferredLanguage { get; set; } = "en";

    public DateTime? LastLoginAtUtc { get; set; }

    public int FailedLoginAttempts { get; set; }

    public DateTime? LockoutEndUtc { get; set; }
}
