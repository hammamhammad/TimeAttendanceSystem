using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Users;

public class UserSession : BaseEntity
{
    public long UserId { get; set; }
    public string SessionId { get; set; } = string.Empty;
    public string DeviceFingerprint { get; set; } = string.Empty;
    public string DeviceName { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string Browser { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime LastAccessedAtUtc { get; set; }
    public DateTime ExpiresAtUtc { get; set; }
    public bool IsActive { get; set; }
    public bool IsCurrentSession { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
}