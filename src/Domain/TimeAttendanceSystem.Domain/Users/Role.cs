using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Users;

public class Role : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public bool IsSystem { get; set; }
    public bool IsEditable { get; set; } = true;
    public bool IsDeletable { get; set; } = true;

    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}