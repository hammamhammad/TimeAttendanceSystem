namespace TimeAttendanceSystem.Domain.Users;

public class RolePermission
{
    public long RoleId { get; set; }
    public long PermissionId { get; set; }

    public Role Role { get; set; } = null!;
    public Permission Permission { get; set; } = null!;
}