namespace TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Queries;

/// <summary>
/// Fingerprint request data transfer object
/// </summary>
public class FingerprintRequestDto
{
    /// <summary>
    /// Request ID
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Employee ID
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Employee name
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Employee number
    /// </summary>
    public string EmployeeNumber { get; set; } = string.Empty;

    /// <summary>
    /// Department name
    /// </summary>
    public string? DepartmentName { get; set; }

    /// <summary>
    /// Request type
    /// </summary>
    public string RequestType { get; set; } = string.Empty;

    /// <summary>
    /// Issue description
    /// </summary>
    public string IssueDescription { get; set; } = string.Empty;

    /// <summary>
    /// Affected fingers
    /// </summary>
    public string? AffectedFingers { get; set; }

    /// <summary>
    /// Preferred date
    /// </summary>
    public DateTime? PreferredDate { get; set; }

    /// <summary>
    /// Preferred time
    /// </summary>
    public TimeSpan? PreferredTime { get; set; }

    /// <summary>
    /// Scheduled date
    /// </summary>
    public DateTime? ScheduledDate { get; set; }

    /// <summary>
    /// Scheduled time
    /// </summary>
    public TimeSpan? ScheduledTime { get; set; }

    /// <summary>
    /// Completion date
    /// </summary>
    public DateTime? CompletedDate { get; set; }

    /// <summary>
    /// Request status
    /// </summary>
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// Technician ID
    /// </summary>
    public long? TechnicianId { get; set; }

    /// <summary>
    /// Technician name
    /// </summary>
    public string? TechnicianName { get; set; }

    /// <summary>
    /// Technician notes
    /// </summary>
    public string? TechnicianNotes { get; set; }

    /// <summary>
    /// Created date
    /// </summary>
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Modified date
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }
}
