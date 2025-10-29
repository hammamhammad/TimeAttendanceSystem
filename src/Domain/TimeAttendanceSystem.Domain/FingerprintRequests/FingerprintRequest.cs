using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.FingerprintRequests;

/// <summary>
/// Represents a fingerprint enrollment or update request from an employee
/// </summary>
public class FingerprintRequest : BaseEntity
{
    /// <summary>
    /// The employee who made the request
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Type of request (NewEnrollment, Update, Issue)
    /// </summary>
    public FingerprintRequestType RequestType { get; set; }

    /// <summary>
    /// Description of the issue or reason for the request
    /// </summary>
    public string IssueDescription { get; set; } = string.Empty;

    /// <summary>
    /// Which fingers are affected (e.g., "Right Thumb, Left Index")
    /// </summary>
    public string? AffectedFingers { get; set; }

    /// <summary>
    /// Employee's preferred date for re-enrollment
    /// </summary>
    public DateTime? PreferredDate { get; set; }

    /// <summary>
    /// Employee's preferred time for re-enrollment
    /// </summary>
    public TimeSpan? PreferredTime { get; set; }

    /// <summary>
    /// Scheduled date for fingerprint enrollment
    /// </summary>
    public DateTime? ScheduledDate { get; set; }

    /// <summary>
    /// Scheduled time for fingerprint enrollment
    /// </summary>
    public TimeSpan? ScheduledTime { get; set; }

    /// <summary>
    /// Date and time when the request was completed
    /// </summary>
    public DateTime? CompletedDate { get; set; }

    /// <summary>
    /// Current status of the request
    /// </summary>
    public FingerprintRequestStatus Status { get; set; } = FingerprintRequestStatus.Pending;

    /// <summary>
    /// ID of the technician who will handle the request
    /// </summary>
    public long? TechnicianId { get; set; }

    /// <summary>
    /// Notes from the technician
    /// </summary>
    public string? TechnicianNotes { get; set; }

    // Navigation properties
    public virtual Employees.Employee? Employee { get; set; }
    public virtual Users.User? Technician { get; set; }
}

/// <summary>
/// Types of fingerprint requests
/// </summary>
public enum FingerprintRequestType
{
    /// <summary>
    /// Initial enrollment for new employee
    /// </summary>
    NewEnrollment,

    /// <summary>
    /// Update existing fingerprint data
    /// </summary>
    Update,

    /// <summary>
    /// Report an issue with fingerprint reader or data
    /// </summary>
    Issue,

    /// <summary>
    /// Register additional fingers
    /// </summary>
    AdditionalFingers,

    /// <summary>
    /// Change fingerprint device location
    /// </summary>
    LocationChange
}

/// <summary>
/// Status of fingerprint request
/// </summary>
public enum FingerprintRequestStatus
{
    /// <summary>
    /// Request submitted, awaiting review
    /// </summary>
    Pending,

    /// <summary>
    /// Request reviewed and scheduled
    /// </summary>
    Scheduled,

    /// <summary>
    /// Fingerprint enrollment completed
    /// </summary>
    Completed,

    /// <summary>
    /// Request cancelled by employee or admin
    /// </summary>
    Cancelled,

    /// <summary>
    /// Request rejected
    /// </summary>
    Rejected
}
