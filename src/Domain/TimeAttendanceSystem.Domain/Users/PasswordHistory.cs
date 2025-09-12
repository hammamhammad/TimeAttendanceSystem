using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Users;

public class PasswordHistory : BaseEntity
{
    public long UserId { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
    public string PasswordSalt { get; set; } = string.Empty;
    public DateTime ChangedAtUtc { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
}