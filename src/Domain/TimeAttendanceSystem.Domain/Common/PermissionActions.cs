namespace TimeAttendanceSystem.Domain.Common;

public static class PermissionActions
{
    public const string Read = "read";
    public const string Create = "create";
    public const string Update = "update";
    public const string Delete = "delete";
    public const string Export = "export";
    public const string Import = "import";
    public const string Approve = "approve";
    public const string Reject = "reject";
    public const string Lock = "lock";
    public const string Unlock = "unlock";
    public const string ResetPassword = "resetPassword";
    public const string AssignRole = "assignRole";
    public const string RemoveRole = "removeRole";
    public const string AssignPermission = "assignPermission";
    public const string RemovePermission = "removePermission";
    public const string View = "view";
    public const string Download = "download";
    public const string Upload = "upload";
    public const string Archive = "archive";
    public const string Restore = "restore";
    public const string Activate = "activate";
    public const string Deactivate = "deactivate";
    public const string Assign = "assign";
    public const string Unassign = "unassign";
    public const string Manage = "manage";
    public const string Configure = "configure";
    public const string BulkCreate = "bulkCreate";
    
    public static readonly Dictionary<string, string> ActionDescriptions = new()
    {
        { Read, "View and read data" },
        { Create, "Create new records" },
        { Update, "Modify existing records" },
        { Delete, "Remove records permanently" },
        { Export, "Export data to external formats" },
        { Import, "Import data from external sources" },
        { Approve, "Approve pending requests or changes" },
        { Reject, "Reject pending requests or changes" },
        { Lock, "Lock or disable accounts" },
        { Unlock, "Unlock or enable accounts" },
        { ResetPassword, "Reset user passwords" },
        { AssignRole, "Assign roles to users" },
        { RemoveRole, "Remove roles from users" },
        { AssignPermission, "Assign permissions to roles" },
        { RemovePermission, "Remove permissions from roles" },
        { View, "View detailed information" },
        { Download, "Download files or data" },
        { Upload, "Upload files or data" },
        { Archive, "Archive records for long-term storage" },
        { Restore, "Restore archived or deleted records" },
        { Activate, "Activate inactive records" },
        { Deactivate, "Deactivate active records" },
        { Assign, "Assign resources or relationships" },
        { Unassign, "Remove resource assignments" },
        { Manage, "Full management capabilities" },
        { Configure, "Configure settings and parameters" },
        { BulkCreate, "Create multiple records in bulk operations" },
    };

    public static readonly Dictionary<string, string> ActionColors = new()
    {
        { Read, "info" },
        { View, "info" },
        { Create, "success" },
        { Update, "warning" },
        { Delete, "danger" },
        { Export, "primary" },
        { Import, "secondary" },
        { Download, "primary" },
        { Upload, "secondary" },
        { Approve, "success" },
        { Reject, "danger" },
        { Lock, "danger" },
        { Unlock, "success" },
        { ResetPassword, "warning" },
        { AssignRole, "info" },
        { RemoveRole, "warning" },
        { AssignPermission, "info" },
        { RemovePermission, "warning" },
        { Archive, "secondary" },
        { Restore, "success" },
        { Activate, "success" },
        { Deactivate, "warning" },
        { Assign, "info" },
        { Unassign, "warning" },
        { Manage, "primary" },
        { Configure, "primary" },
        { BulkCreate, "primary" },
    };
    
    public static string GetActionDescription(string action)
    {
        return ActionDescriptions.TryGetValue(action, out var description) ? description : action;
    }
    
    public static string GetActionColor(string action)
    {
        return ActionColors.TryGetValue(action, out var color) ? color : "light";
    }
}