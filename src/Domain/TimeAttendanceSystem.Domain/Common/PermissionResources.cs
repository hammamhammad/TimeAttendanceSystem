namespace TimeAttendanceSystem.Domain.Common;

public static class PermissionResources
{
    public const string User = "user";
    public const string Role = "role";
    public const string Employee = "employee";
    public const string Branch = "branch";
    public const string Department = "department";
    public const string Attendance = "attendance";
    public const string Schedule = "schedule";
    public const string Report = "report";
    public const string Settings = "settings";
    public const string Dashboard = "dashboard";
    public const string Permission = "permission";
    public const string Audit = "audit";
    public const string Notification = "notification";
    public const string System = "system";
    
    public static readonly Dictionary<string, string> ResourceDescriptions = new()
    {
        { User, "User accounts and profiles" },
        { Role, "User roles and access levels" },
        { Employee, "Employee records and information" },
        { Branch, "Company branches and locations" },
        { Department, "Organizational departments" },
        { Attendance, "Time tracking and attendance records" },
        { Schedule, "Work schedules and shift management" },
        { Report, "Reports and analytics" },
        { Settings, "System configuration and settings" },
        { Dashboard, "Dashboard views and widgets" },
        { Permission, "Permission management" },
        { Audit, "Audit logs and security tracking" },
        { Notification, "System notifications and alerts" },
        { System, "Core system functions" }
    };
    
    public static readonly Dictionary<string, string> ResourceIcons = new()
    {
        { User, "fa-user" },
        { Role, "fa-user-shield" },
        { Employee, "fa-users" },
        { Branch, "fa-building" },
        { Department, "fa-sitemap" },
        { Attendance, "fa-clock" },
        { Schedule, "fa-calendar-alt" },
        { Report, "fa-chart-bar" },
        { Settings, "fa-cog" },
        { Dashboard, "fa-tachometer-alt" },
        { Permission, "fa-key" },
        { Audit, "fa-history" },
        { Notification, "fa-bell" },
        { System, "fa-server" }
    };
    
    public static string GetResourceDescription(string resource)
    {
        return ResourceDescriptions.TryGetValue(resource, out var description) ? description : resource;
    }
    
    public static string GetResourceIcon(string resource)
    {
        return ResourceIcons.TryGetValue(resource, out var icon) ? icon : "fa-question";
    }
}