using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.ShiftAssignments.Queries.GetShiftAssignments;

/// <summary>
/// Data Transfer Object representing a shift assignment with comprehensive details.
/// Provides flattened view of shift assignment information including related entity details.
/// </summary>
/// <remarks>
/// DTO Features:
/// - Complete shift assignment information with related entity details
/// - Computed properties for display and business logic
/// - Hierarchical assignment information (Employee > Department > Branch)
/// - Date and status information for UI presentation
/// - Navigation and reference data for related entities
///
/// Display Properties:
/// - Target display names for user-friendly presentation
/// - Status descriptions and computed properties
/// - Date formatting and validation states
/// - Priority levels and conflict resolution information
///
/// Related Entity Information:
/// - Shift details including name and type
/// - Target entity information (Employee/Department/Branch names)
/// - Assignment metadata and audit information
/// - User accountability through assignment tracking
/// </remarks>
public class ShiftAssignmentDto
{
    /// <summary>
    /// Gets or sets the unique identifier of the shift assignment.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the shift identifier being assigned.
    /// </summary>
    public long ShiftId { get; set; }

    /// <summary>
    /// Gets or sets the name of the shift being assigned.
    /// </summary>
    public string ShiftName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the type of the shift being assigned.
    /// </summary>
    public string ShiftType { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the shift status.
    /// </summary>
    public string ShiftStatus { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the assignment type indicating organizational level.
    /// </summary>
    public ShiftAssignmentType AssignmentType { get; set; }

    /// <summary>
    /// Gets or sets the assignment type as a display string.
    /// </summary>
    public string AssignmentTypeDisplay { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee ID for employee-level assignments.
    /// </summary>
    public long? EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the employee name for employee-level assignments.
    /// </summary>
    public string? EmployeeName { get; set; }

    /// <summary>
    /// Gets or sets the employee number for employee-level assignments.
    /// </summary>
    public string? EmployeeNumber { get; set; }

    /// <summary>
    /// Gets or sets the department ID for department-level assignments.
    /// </summary>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Gets or sets the department name for department-level assignments.
    /// </summary>
    public string? DepartmentName { get; set; }

    /// <summary>
    /// Gets or sets the branch ID for branch-level assignments.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the branch name for branch-level assignments.
    /// </summary>
    public string? BranchName { get; set; }

    /// <summary>
    /// Gets or sets the branch code for branch-level assignments.
    /// </summary>
    public string? BranchCode { get; set; }

    /// <summary>
    /// Gets or sets the target display name based on assignment type.
    /// </summary>
    public string TargetDisplayName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the effective date when the assignment becomes active.
    /// </summary>
    public DateTime EffectiveDate { get; set; }

    /// <summary>
    /// Gets or sets the optional end date for temporary assignments.
    /// </summary>
    public DateTime? EndDate { get; set; }

    /// <summary>
    /// Gets or sets the assignment status.
    /// </summary>
    public ShiftAssignmentStatus Status { get; set; }

    /// <summary>
    /// Gets or sets the assignment status as a display string.
    /// </summary>
    public string StatusDisplay { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the assignment priority for conflict resolution.
    /// </summary>
    public int Priority { get; set; }

    /// <summary>
    /// Gets or sets the optional notes about the assignment.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who created the assignment.
    /// </summary>
    public long AssignedByUserId { get; set; }

    /// <summary>
    /// Gets or sets the username of the person who created the assignment.
    /// </summary>
    public string AssignedByUsername { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets when the assignment was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who created the assignment.
    /// </summary>
    public string CreatedBy { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets when the assignment was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who last modified the assignment.
    /// </summary>
    public string? ModifiedBy { get; set; }

    /// <summary>
    /// Gets a value indicating whether the assignment is currently active.
    /// </summary>
    public bool IsCurrentlyActive => Status == ShiftAssignmentStatus.Active &&
                                   EffectiveDate.Date <= DateTime.UtcNow.Date &&
                                   (!EndDate.HasValue || EndDate.Value.Date >= DateTime.UtcNow.Date);

    /// <summary>
    /// Gets a value indicating whether the assignment is temporary (has an end date).
    /// </summary>
    public bool IsTemporary => EndDate.HasValue;

    /// <summary>
    /// Gets a value indicating whether the assignment is future-dated.
    /// </summary>
    public bool IsFutureDated => EffectiveDate.Date > DateTime.UtcNow.Date;

    /// <summary>
    /// Gets a value indicating whether the assignment has expired.
    /// </summary>
    public bool IsExpired => EndDate.HasValue && EndDate.Value.Date < DateTime.UtcNow.Date;

    /// <summary>
    /// Gets the duration of the assignment in days (if temporary).
    /// </summary>
    public int? DurationDays => EndDate?.Subtract(EffectiveDate).Days;

    /// <summary>
    /// Gets the remaining days until the assignment expires (if temporary and active).
    /// </summary>
    public int? RemainingDays => EndDate?.Subtract(DateTime.UtcNow).Days;
}