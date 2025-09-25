using System.ComponentModel.DataAnnotations;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for updating an attendance record with manual overrides.
/// Allows HR managers and supervisors to modify attendance records when needed.
/// </summary>
public class UpdateAttendanceRecordRequest
{
    /// <summary>
    /// Gets or sets the attendance status override.
    /// When provided, manually sets the attendance status.
    /// </summary>
    public AttendanceStatus? Status { get; set; }

    /// <summary>
    /// Gets or sets the manual check-in time override.
    /// Allows correcting incorrect or missing check-in times.
    /// </summary>
    public DateTime? ActualCheckInTime { get; set; }

    /// <summary>
    /// Gets or sets the manual check-out time override.
    /// Allows correcting incorrect or missing check-out times.
    /// </summary>
    public DateTime? ActualCheckOutTime { get; set; }

    /// <summary>
    /// Gets or sets the working hours override.
    /// Allows manually setting working hours when automatic calculation is incorrect.
    /// </summary>
    [Range(0, 24, ErrorMessage = "Working hours must be between 0 and 24")]
    public decimal? WorkingHours { get; set; }

    /// <summary>
    /// Gets or sets the break hours override.
    /// Allows manually adjusting break time deductions.
    /// </summary>
    [Range(0, 24, ErrorMessage = "Break hours must be between 0 and 24")]
    public decimal? BreakHours { get; set; }

    /// <summary>
    /// Gets or sets the overtime hours override.
    /// Allows manually setting overtime when policy differs from automatic calculation.
    /// </summary>
    [Range(0, 24, ErrorMessage = "Overtime hours must be between 0 and 24")]
    public decimal? OvertimeHours { get; set; }

    /// <summary>
    /// Gets or sets the late minutes override.
    /// Allows adjusting late penalty when circumstances warrant it.
    /// </summary>
    [Range(0, 1440, ErrorMessage = "Late minutes must be between 0 and 1440 (24 hours)")]
    public int? LateMinutes { get; set; }

    /// <summary>
    /// Gets or sets the early leave minutes override.
    /// Allows adjusting early departure penalty when justified.
    /// </summary>
    [Range(0, 1440, ErrorMessage = "Early leave minutes must be between 0 and 1440 (24 hours)")]
    public int? EarlyLeaveMinutes { get; set; }

    /// <summary>
    /// Gets or sets whether to approve this attendance record.
    /// Marks the record as reviewed and approved by a supervisor.
    /// </summary>
    public bool? IsApproved { get; set; }

    /// <summary>
    /// Gets or sets general notes about this attendance record.
    /// Provides context for any manual adjustments or special circumstances.
    /// </summary>
    [StringLength(1000, ErrorMessage = "Notes cannot exceed 1000 characters")]
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the reason for manual override.
    /// Required when making manual adjustments for audit trail purposes.
    /// </summary>
    [StringLength(500, ErrorMessage = "Override notes cannot exceed 500 characters")]
    public string? OverrideNotes { get; set; }

    /// <summary>
    /// Validates that the request has at least one field to update.
    /// </summary>
    /// <returns>True if at least one update field is provided</returns>
    public bool HasUpdates()
    {
        return Status.HasValue ||
               ActualCheckInTime.HasValue ||
               ActualCheckOutTime.HasValue ||
               WorkingHours.HasValue ||
               BreakHours.HasValue ||
               OvertimeHours.HasValue ||
               LateMinutes.HasValue ||
               EarlyLeaveMinutes.HasValue ||
               IsApproved.HasValue ||
               !string.IsNullOrWhiteSpace(Notes) ||
               !string.IsNullOrWhiteSpace(OverrideNotes);
    }

    /// <summary>
    /// Validates that check-in time is before check-out time if both are provided.
    /// </summary>
    /// <returns>Tuple containing validation result and error message</returns>
    public (bool IsValid, string? ErrorMessage) ValidateTimeOrder()
    {
        if (ActualCheckInTime.HasValue && ActualCheckOutTime.HasValue)
        {
            if (ActualCheckOutTime <= ActualCheckInTime)
            {
                return (false, "Check-out time must be after check-in time");
            }
        }

        return (true, null);
    }

    /// <summary>
    /// Validates that break hours don't exceed working hours if both are provided.
    /// </summary>
    /// <returns>Tuple containing validation result and error message</returns>
    public (bool IsValid, string? ErrorMessage) ValidateHoursLogic()
    {
        if (WorkingHours.HasValue && BreakHours.HasValue)
        {
            if (BreakHours > WorkingHours)
            {
                return (false, "Break hours cannot exceed working hours");
            }
        }

        return (true, null);
    }

    /// <summary>
    /// Validates that manual overrides require override notes.
    /// </summary>
    /// <returns>Tuple containing validation result and error message</returns>
    public (bool IsValid, string? ErrorMessage) ValidateOverrideRequirements()
    {
        var hasManualOverrides = Status.HasValue ||
                                ActualCheckInTime.HasValue ||
                                ActualCheckOutTime.HasValue ||
                                WorkingHours.HasValue ||
                                BreakHours.HasValue ||
                                OvertimeHours.HasValue ||
                                LateMinutes.HasValue ||
                                EarlyLeaveMinutes.HasValue;

        if (hasManualOverrides && string.IsNullOrWhiteSpace(OverrideNotes))
        {
            return (false, "Override notes are required when making manual adjustments to attendance data");
        }

        return (true, null);
    }
}