using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Users;

public class LoginAttempt : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string? UserAgent { get; set; }
    public bool IsSuccessful { get; set; }
    public string? FailureReason { get; set; }
    public DateTime AttemptedAtUtc { get; set; } = DateTime.UtcNow;
    public long? UserId { get; set; }
    
    public User? User { get; set; }
}