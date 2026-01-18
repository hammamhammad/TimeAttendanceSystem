using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Attendance.Queries.GetLeaveExcuseDetails;

/// <summary>
/// Response model containing leave, excuse, and remote work details for a specific employee and date.
/// Used in the Daily Attendance Detail page to provide comprehensive information about absences.
/// </summary>
public class LeaveExcuseDetailsResponse
{
    /// <summary>
    /// Employee vacations active on the specified date
    /// </summary>
    public List<EmployeeVacationDetailDto> Vacations { get; set; } = new();

    /// <summary>
    /// Employee excuses for the specified date
    /// </summary>
    public List<AttendanceExcuseDetailDto> Excuses { get; set; } = new();

    /// <summary>
    /// Remote work arrangements for the specified date (future expansion)
    /// </summary>
    public List<RemoteWorkDetailDto> RemoteWork { get; set; } = new();

    /// <summary>
    /// Indicates if any leave/excuse data exists for the date
    /// </summary>
    public bool HasLeaveExcuseData => Vacations.Any() || Excuses.Any() || RemoteWork.Any();
}

/// <summary>
/// Employee vacation details for display in attendance detail page
/// </summary>
public class EmployeeVacationDetailDto
{
    public long Id { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string VacationTypeName { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int DurationDays { get; set; }
    public bool IsApproved { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Computed status: Approved, Pending, Expired, or Completed
    /// </summary>
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// Display text for the status
    /// </summary>
    public string StatusDisplay { get; set; } = string.Empty;
}

/// <summary>
/// Employee excuse details for display in attendance detail page
/// </summary>
public class AttendanceExcuseDetailDto
{
    public long Id { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public DateTime ExcuseDate { get; set; }
    public ExcuseType ExcuseType { get; set; }
    public string ExcuseTypeDisplay { get; set; } = string.Empty;
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public decimal DurationHours { get; set; }
    public string Reason { get; set; } = string.Empty;
    public ApprovalStatus ApprovalStatus { get; set; }
    public string ApprovalStatusDisplay { get; set; } = string.Empty;
    public string? ApprovedByName { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? RejectionReason { get; set; }
    public bool HasAttachment { get; set; }
    public string? AttachmentPath { get; set; }
    public string? ProcessingNotes { get; set; }
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Formatted time range display (e.g., "09:00 - 11:30")
    /// </summary>
    public string TimeRangeDisplay => $"{StartTime:HH:mm} - {EndTime:HH:mm}";

    /// <summary>
    /// Formatted duration display (e.g., "2.5 hours")
    /// </summary>
    public string DurationDisplay => $"{DurationHours:F1} hours";
}

/// <summary>
/// Remote work arrangement details (future expansion)
/// </summary>
public class RemoteWorkDetailDto
{
    public long Id { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public DateTime WorkDate { get; set; }
    public string WorkLocation { get; set; } = string.Empty;
    public string WorkType { get; set; } = string.Empty; // Full Remote, Hybrid, etc.
    public TimeOnly? StartTime { get; set; }
    public TimeOnly? EndTime { get; set; }
    public string? Notes { get; set; }
    public bool IsApproved { get; set; }
    public string? ApprovedByName { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}