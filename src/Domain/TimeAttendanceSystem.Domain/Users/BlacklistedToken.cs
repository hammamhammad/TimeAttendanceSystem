using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Users;

public class BlacklistedToken : BaseEntity
{
    public string TokenId { get; set; } = string.Empty;
    public string TokenType { get; set; } = string.Empty; // "AccessToken" or "RefreshToken"
    public DateTime ExpiresAtUtc { get; set; }
    public long UserId { get; set; }
    public string Reason { get; set; } = string.Empty;
    
    public User User { get; set; } = null!;
    
    public bool IsExpired => DateTime.UtcNow >= ExpiresAtUtc;
}