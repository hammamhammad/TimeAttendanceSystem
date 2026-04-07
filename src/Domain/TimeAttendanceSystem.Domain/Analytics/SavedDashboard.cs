using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Domain.Analytics;

public class SavedDashboard : BaseEntity
{
    public long UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string LayoutJson { get; set; } = string.Empty;
    public bool IsDefault { get; set; } = false;

    // Navigation
    public User User { get; set; } = null!;
}
