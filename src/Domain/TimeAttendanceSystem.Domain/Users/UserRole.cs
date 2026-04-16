namespace TecAxle.Hrms.Domain.Users;

public class UserRole
{
    public long UserId { get; set; }
    public long RoleId { get; set; }

    /// <summary>
    /// Seniority / ordering hint within the role, consumed by <c>RoleAssignmentStrategy.FixedPriority</c>.
    /// Higher wins. Default 0 preserves pre-v13.6 behavior (ties broken by join order). (v13.6)
    /// </summary>
    public int Priority { get; set; }

    public User User { get; set; } = null!;
    public Role Role { get; set; } = null!;
}