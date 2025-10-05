namespace TimeAttendanceSystem.Domain.Common;

public static class PermissionResources
{
    public const string User = "user";
    public const string Role = "role";
    public const string Employee = "employee";
    public const string Branch = "branch";
    public const string Department = "department";
    public const string Shift = "shift";
    public const string Attendance = "attendance";
    public const string Schedule = "schedule";
    public const string Report = "report";
    public const string Settings = "settings";
    public const string Dashboard = "dashboard";
    public const string Permission = "permission";
    public const string Audit = "audit";
    public const string Notification = "notification";
    public const string System = "system";
    public const string PublicHoliday = "publicHoliday";
    public const string VacationType = "vacationType";
    public const string Vacation = "vacation";
    public const string ExcusePolicy = "excusePolicy";
    public const string Excuse = "excuse";
    public const string Session = "session";

    public static readonly Dictionary<string, string> ResourceDescriptions = new()
    {
        { User, "User accounts and profiles" },
        { Role, "User roles and access levels" },
        { Employee, "Employee records and information" },
        { Branch, "Company branches and locations" },
        { Department, "Organizational departments" },
        { Shift, "Work shifts and time periods" },
        { Attendance, "Time tracking and attendance records" },
        { Schedule, "Work schedules and shift management" },
        { Report, "Reports and analytics" },
        { Settings, "System configuration and settings" },
        { Dashboard, "Dashboard views and widgets" },
        { Permission, "Permission management" },
        { Audit, "Audit logs and security tracking" },
        { Notification, "System notifications and alerts" },
        { System, "Core system functions" },
        { PublicHoliday, "Public holidays and calendar management" },
        { VacationType, "Vacation types and leave policies" },
        { Vacation, "Employee vacation records and management" },
        { ExcusePolicy, "Excuse policies and organizational rules" },
        { Excuse, "Employee excuse requests and management" },
        { Session, "User sessions and security management" },
    };

    public static readonly Dictionary<string, string> ResourceIcons = new()
    {
        { User, "fa-user" },
        { Role, "fa-user-shield" },
        { Employee, "fa-users" },
        { Branch, "fa-building" },
        { Department, "fa-sitemap" },
        { Shift, "fa-clock" },
        { Attendance, "fa-user-clock" },
        { Schedule, "fa-calendar-alt" },
        { Report, "fa-chart-bar" },
        { Settings, "fa-cog" },
        { Dashboard, "fa-tachometer-alt" },
        { Permission, "fa-key" },
        { Audit, "fa-history" },
        { Notification, "fa-bell" },
        { System, "fa-server" },
        { PublicHoliday, "fa-calendar-check" },
        { VacationType, "fa-calendar-alt" },
        { ExcusePolicy, "fa-gavel" },
        { Excuse, "fa-file-alt" },
        { Session, "fa-wifi" },
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