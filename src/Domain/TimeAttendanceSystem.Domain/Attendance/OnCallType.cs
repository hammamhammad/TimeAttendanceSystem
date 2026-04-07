namespace TecAxle.Hrms.Domain.Attendance;

/// <summary>
/// Enumeration defining the types of on-call duty assignments.
/// Classifies the nature and availability requirements of on-call schedules.
/// </summary>
public enum OnCallType
{
    /// <summary>
    /// Primary on-call duty requiring immediate availability and response.
    /// </summary>
    Primary = 1,

    /// <summary>
    /// Secondary backup on-call duty activated when the primary is unavailable.
    /// </summary>
    Secondary = 2,

    /// <summary>
    /// On-call duty specifically for weekend coverage.
    /// </summary>
    Weekend = 3,

    /// <summary>
    /// On-call duty specifically for public holiday coverage.
    /// </summary>
    Holiday = 4,

    /// <summary>
    /// On-call duty for overnight or after-hours coverage.
    /// </summary>
    Overnight = 5
}
