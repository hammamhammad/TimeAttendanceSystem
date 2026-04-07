using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Users;

public class TwoFactorBackupCode : BaseEntity
{
    public long UserId { get; set; }
    public string Code { get; set; } = string.Empty;
    public bool IsUsed { get; set; }
    public DateTime? UsedAtUtc { get; set; }
    
    public User User { get; set; } = null!;
}