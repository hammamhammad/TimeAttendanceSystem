using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Users;

public class Permission : BaseEntity
{
    public string Key { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}