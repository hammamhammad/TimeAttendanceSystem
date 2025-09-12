namespace TimeAttendanceSystem.Application.Roles.Queries.GetRoles;

public class RoleDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsSystem { get; set; }
    public bool IsEditable { get; set; }
    public bool IsDeletable { get; set; }
    public int UserCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    
    public List<PermissionDto> Permissions { get; set; } = new();
}

public class PermissionDto
{
    public long Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}