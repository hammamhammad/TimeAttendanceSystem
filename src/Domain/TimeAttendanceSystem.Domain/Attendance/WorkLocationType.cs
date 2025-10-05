namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Enum representing the work location type for an attendance record.
/// Indicates where the employee performed their work duties.
/// </summary>
/// <remarks>
/// Work Location Types:
/// - OnSite: Employee worked from company premises (default)
/// - Remote: Employee worked remotely as per approved remote work assignment
/// - Field: Employee worked in the field (customer site, external location)
/// - NotApplicable: Work location not applicable (holidays, absences, etc.)
///
/// Usage:
/// - Affects attendance calculations (overtime eligibility, shift enforcement)
/// - Links to RemoteWorkAssignment when type is Remote
/// - Used for reporting and analytics
/// - Integrates with RemoteWorkPolicy settings
///
/// Business Rules:
/// - OnSite is the default for regular attendance
/// - Remote requires approved RemoteWorkAssignment
/// - Field work may have different policies than remote work
/// - NotApplicable used for non-working days
/// </remarks>
public enum WorkLocationType
{
    /// <summary>
    /// Employee worked from company premises (office, factory, store, etc.)
    /// This is the default work location type.
    /// </summary>
    OnSite = 0,

    /// <summary>
    /// Employee worked remotely (from home or other remote location)
    /// Must be backed by an approved RemoteWorkAssignment.
    /// Subject to RemoteWorkPolicy rules and quotas.
    /// </summary>
    Remote = 1,

    /// <summary>
    /// Employee worked in the field (customer site, external location, mobile work)
    /// Typically for sales, service, or field operations staff.
    /// May have different attendance calculation rules.
    /// </summary>
    Field = 2,

    /// <summary>
    /// Work location not applicable for this record
    /// Used for holidays, vacations, absences, and other non-working days.
    /// </summary>
    NotApplicable = 99
}