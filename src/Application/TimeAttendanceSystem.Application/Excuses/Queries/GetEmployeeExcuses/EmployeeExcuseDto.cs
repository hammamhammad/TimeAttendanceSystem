using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuses;

/// <summary>
/// Data Transfer Object for employee excuse information.
/// Contains all excuse details for frontend consumption.
/// </summary>
public class EmployeeExcuseDto
{
    /// <summary>
    /// Gets or sets the unique identifier for the excuse.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the employee identifier this excuse belongs to.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the employee's full name.
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's employee number.
    /// </summary>
    public string EmployeeNumber { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the department name.
    /// </summary>
    public string DepartmentName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the branch name.
    /// </summary>
    public string BranchName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the date of the excuse.
    /// </summary>
    public DateTime ExcuseDate { get; set; }

    /// <summary>
    /// Gets or sets the type of excuse.
    /// </summary>
    public ExcuseType ExcuseType { get; set; }

    /// <summary>
    /// Gets or sets the excuse type as a string.
    /// </summary>
    public string ExcuseTypeDisplay { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the start time of the excuse.
    /// </summary>
    public TimeOnly StartTime { get; set; }

    /// <summary>
    /// Gets or sets the end time of the excuse.
    /// </summary>
    public TimeOnly EndTime { get; set; }

    /// <summary>
    /// Gets or sets the time range as a formatted string.
    /// </summary>
    public string TimeRange { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the duration in hours.
    /// </summary>
    public decimal DurationHours { get; set; }

    /// <summary>
    /// Gets or sets the reason for the excuse.
    /// </summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the approval status.
    /// </summary>
    public ApprovalStatus ApprovalStatus { get; set; }

    /// <summary>
    /// Gets or sets the approval status as a string.
    /// </summary>
    public string ApprovalStatusDisplay { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the approver's user ID.
    /// </summary>
    public long? ApprovedById { get; set; }

    /// <summary>
    /// Gets or sets the approver's name.
    /// </summary>
    public string? ApprovedByName { get; set; }

    /// <summary>
    /// Gets or sets when the excuse was approved or rejected.
    /// </summary>
    public DateTime? ApprovedAt { get; set; }

    /// <summary>
    /// Gets or sets the rejection reason if rejected.
    /// </summary>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Gets or sets the attachment file path.
    /// </summary>
    public string? AttachmentPath { get; set; }

    /// <summary>
    /// Gets or sets whether this excuse affects salary.
    /// </summary>
    public bool AffectsSalary { get; set; }

    /// <summary>
    /// Gets or sets processing notes for the excuse.
    /// </summary>
    public string? ProcessingNotes { get; set; }

    /// <summary>
    /// Gets or sets when the excuse was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who created the excuse.
    /// </summary>
    public string CreatedBy { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets when the excuse was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who last modified the excuse.
    /// </summary>
    public string? ModifiedBy { get; set; }

    /// <summary>
    /// Gets or sets whether the excuse can be modified.
    /// </summary>
    public bool CanBeModified { get; set; }

    /// <summary>
    /// Gets or sets a summary of the excuse for display.
    /// </summary>
    public string ExcuseSummary { get; set; } = string.Empty;
}