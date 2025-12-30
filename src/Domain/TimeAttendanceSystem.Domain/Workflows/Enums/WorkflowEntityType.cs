namespace TimeAttendanceSystem.Domain.Workflows.Enums;

/// <summary>
/// Defines the types of entities that can have workflow-based approval processes.
/// Each entity type can have its own workflow definition and approval chain.
/// </summary>
public enum WorkflowEntityType
{
    /// <summary>
    /// Vacation/Leave request workflow.
    /// Supports vacation requests, annual leave, sick leave, etc.
    /// </summary>
    Vacation = 1,

    /// <summary>
    /// Excuse request workflow.
    /// Supports early departure, late arrival, and other time-based excuses.
    /// </summary>
    Excuse = 2,

    /// <summary>
    /// Remote work request workflow.
    /// Supports work-from-home and remote location requests.
    /// </summary>
    RemoteWork = 3,

    /// <summary>
    /// Overtime request workflow.
    /// Supports pre-approval and post-facto overtime justification.
    /// </summary>
    Overtime = 4,

    /// <summary>
    /// Attendance correction request workflow.
    /// Supports corrections for missing check-in/out and time adjustments.
    /// </summary>
    AttendanceCorrection = 5,

    /// <summary>
    /// Timesheet submission workflow.
    /// Supports weekly/monthly timesheet approval.
    /// </summary>
    Timesheet = 6,

    /// <summary>
    /// Fingerprint registration request workflow.
    /// Supports biometric enrollment requests.
    /// </summary>
    FingerprintRequest = 7
}
