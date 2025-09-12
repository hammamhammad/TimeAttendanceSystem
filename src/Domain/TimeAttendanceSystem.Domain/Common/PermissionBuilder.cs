using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.Common;

public static class PermissionBuilder
{
    public static string BuildKey(string resource, string action)
    {
        return $"{resource}.{action}";
    }
    
    public static (string Resource, string Action) ParseKey(string permissionKey)
    {
        var parts = permissionKey.Split('.', 2);
        if (parts.Length == 2)
        {
            return (parts[0], parts[1]);
        }
        return (permissionKey, string.Empty);
    }
    
    public static Permission CreatePermission(string resource, string action, string group)
    {
        var key = BuildKey(resource, action);
        var actionDescription = PermissionActions.GetActionDescription(action);
        var resourceDescription = PermissionResources.GetResourceDescription(resource);
        
        return new Permission
        {
            Key = key,
            Group = group,
            Description = $"{actionDescription} {resourceDescription.ToLower()}",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };
    }
    
    public static List<Permission> CreateResourcePermissions(string resource, string group, params string[] actions)
    {
        return actions.Select(action => CreatePermission(resource, action, group)).ToList();
    }
    
    public static List<Permission> CreateStandardCrudPermissions(string resource, string group)
    {
        return CreateResourcePermissions(resource, group, 
            PermissionActions.Read,
            PermissionActions.Create,
            PermissionActions.Update,
            PermissionActions.Delete);
    }
    
    public static List<Permission> CreateExtendedCrudPermissions(string resource, string group)
    {
        return CreateResourcePermissions(resource, group,
            PermissionActions.Read,
            PermissionActions.Create,
            PermissionActions.Update,
            PermissionActions.Delete,
            PermissionActions.Export,
            PermissionActions.Import);
    }
    
    public static bool HasPermission(IEnumerable<string> userPermissions, string resource, string action)
    {
        var requiredPermission = BuildKey(resource, action);
        return userPermissions.Contains(requiredPermission) || userPermissions.Contains("*");
    }
    
    public static bool HasAnyPermission(IEnumerable<string> userPermissions, string resource, params string[] actions)
    {
        return actions.Any(action => HasPermission(userPermissions, resource, action));
    }
    
    public static bool HasAllPermissions(IEnumerable<string> userPermissions, string resource, params string[] actions)
    {
        return actions.All(action => HasPermission(userPermissions, resource, action));
    }
}