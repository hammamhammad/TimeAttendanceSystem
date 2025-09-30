namespace TimeAttendanceSystem.Domain.Excuses;

/// <summary>
/// Enumeration defining the types of excuses available in the system.
/// Distinguishes between personal excuses (limited by policy) and official duties (exempt from limits).
/// </summary>
public enum ExcuseType
{
    /// <summary>
    /// Personal excuse - subject to policy limits and restrictions.
    /// May impact salary based on organizational policy.
    /// </summary>
    PersonalExcuse = 1,

    /// <summary>
    /// Official duty - exempt from personal excuse limits.
    /// Fully compensated time away for work-related activities.
    /// </summary>
    OfficialDuty = 2
}