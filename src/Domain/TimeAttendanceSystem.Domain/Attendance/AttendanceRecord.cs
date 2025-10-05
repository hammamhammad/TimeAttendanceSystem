using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Domain entity representing a daily attendance record for an employee.
/// Aggregates all attendance transactions for a specific date and calculates attendance status.
/// </summary>
/// <remarks>
/// AttendanceRecord Entity Features:
/// - Daily attendance aggregation and status calculation
/// - Integration with assigned shifts for rule-based calculations
/// - Comprehensive working hours tracking and overtime calculation
/// - Break time management and tracking
/// - Late arrival and early departure detection
/// - Manual override capabilities for special circumstances
/// - Audit trail for all attendance modifications
///
/// Calculation Rules:
/// - Attendance status based on shift requirements and actual transactions
/// - Working hours calculated from check-in/out pairs
/// - Break time deducted from total working hours
/// - Overtime calculated beyond required shift hours
/// - Late and early departure penalties based on shift grace periods
///
/// Business Logic:
/// - Automatic generation for all employees with assigned shifts
/// - Real-time updates when transactions are added or modified
/// - Manual override capabilities for approved adjustments
/// - Integration with leave management and holiday calendars
/// - Compliance with labor law requirements and organizational policies
/// </remarks>
public class AttendanceRecord : BaseEntity
{
    /// <summary>
    /// Gets or sets the employee identifier for this attendance record.
    /// Links the record to the specific employee being tracked.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the attendance date for this record.
    /// Represents the specific date this attendance record covers.
    /// </summary>
    public DateTime AttendanceDate { get; set; }

    /// <summary>
    /// Gets or sets the shift assignment identifier for this date.
    /// Links to the specific shift assignment used for calculations.
    /// </summary>
    public long? ShiftAssignmentId { get; set; }

    /// <summary>
    /// Gets or sets the calculated attendance status for this date.
    /// Determined by comparing actual transactions against shift requirements.
    /// </summary>
    public AttendanceStatus Status { get; set; }

    /// <summary>
    /// Gets or sets the scheduled start time for this date based on shift assignment.
    /// Used as baseline for late arrival calculations.
    /// </summary>
    public TimeOnly? ScheduledStartTime { get; set; }

    /// <summary>
    /// Gets or sets the scheduled end time for this date based on shift assignment.
    /// Used as baseline for early departure calculations.
    /// </summary>
    public TimeOnly? ScheduledEndTime { get; set; }

    /// <summary>
    /// Gets or sets the actual check-in time recorded for this date.
    /// Null if no check-in transaction was recorded.
    /// </summary>
    public DateTime? ActualCheckInTime { get; set; }

    /// <summary>
    /// Gets or sets the actual check-out time recorded for this date.
    /// Null if no check-out transaction was recorded or day is incomplete.
    /// </summary>
    public DateTime? ActualCheckOutTime { get; set; }

    /// <summary>
    /// Gets or sets the total scheduled hours for this date based on shift.
    /// Used for overtime and hours completion calculations.
    /// </summary>
    public decimal ScheduledHours { get; set; }

    /// <summary>
    /// Gets or sets the total working hours calculated from transactions.
    /// Includes all work periods minus break times.
    /// </summary>
    public decimal WorkingHours { get; set; }

    /// <summary>
    /// Gets or sets the total break time taken during this date.
    /// Calculated from break start/end transaction pairs.
    /// </summary>
    public decimal BreakHours { get; set; }

    /// <summary>
    /// Gets or sets the total overtime hours worked beyond scheduled hours.
    /// Sum of pre-shift and post-shift overtime hours.
    /// </summary>
    public decimal OvertimeHours { get; set; }

    /// <summary>
    /// Gets or sets the pre-shift overtime hours worked before scheduled start time.
    /// Only counted when pre-shift overtime is enabled in configuration.
    /// </summary>
    public decimal PreShiftOvertimeHours { get; set; }

    /// <summary>
    /// Gets or sets the post-shift overtime hours worked after scheduled end time.
    /// Only counted when post-shift overtime is enabled in configuration.
    /// </summary>
    public decimal PostShiftOvertimeHours { get; set; }

    /// <summary>
    /// Gets or sets the overtime rate multiplier applied for this date.
    /// Based on day type (normal, holiday, off-day) and active configuration.
    /// </summary>
    public decimal OvertimeRate { get; set; }

    /// <summary>
    /// Gets or sets the total overtime payment amount calculated.
    /// Based on total overtime hours multiplied by overtime rate.
    /// </summary>
    public decimal OvertimeAmount { get; set; }

    /// <summary>
    /// Gets or sets the day type used for overtime calculation.
    /// Determines which rate multiplier is applied.
    /// </summary>
    public DayType OvertimeDayType { get; set; } = DayType.Normal;

    /// <summary>
    /// Gets or sets the overtime configuration ID used for calculations.
    /// Links to the specific configuration active when calculated.
    /// </summary>
    public long? OvertimeConfigurationId { get; set; }

    /// <summary>
    /// Gets or sets calculation notes for overtime processing.
    /// Contains detailed breakdown of how overtime was calculated.
    /// </summary>
    public string? OvertimeCalculationNotes { get; set; }

    /// <summary>
    /// Gets or sets the number of minutes the employee was late.
    /// Calculated as the difference between scheduled and actual check-in times.
    /// </summary>
    public int LateMinutes { get; set; }

    /// <summary>
    /// Gets or sets the number of minutes the employee left early.
    /// Calculated as the difference between scheduled and actual check-out times.
    /// </summary>
    public int EarlyLeaveMinutes { get; set; }

    /// <summary>
    /// Gets or sets whether this record has been manually overridden.
    /// Indicates that manual adjustments have been made to the calculated values.
    /// </summary>
    public bool IsManualOverride { get; set; } = false;

    /// <summary>
    /// Gets or sets the user who performed the manual override.
    /// Required when IsManualOverride is true for audit purposes.
    /// </summary>
    public long? OverrideByUserId { get; set; }

    /// <summary>
    /// Gets or sets when the manual override was performed.
    /// Timestamp for audit trail of manual modifications.
    /// </summary>
    public DateTime? OverrideAtUtc { get; set; }

    /// <summary>
    /// Gets or sets notes explaining the manual override reason.
    /// Provides context for why manual adjustments were necessary.
    /// </summary>
    public string? OverrideNotes { get; set; }

    /// <summary>
    /// Gets or sets whether this record has been approved by a supervisor.
    /// Used for attendance records requiring managerial review.
    /// </summary>
    public bool IsApproved { get; set; } = false;

    /// <summary>
    /// Gets or sets the user who approved this attendance record.
    /// Required when IsApproved is true for accountability.
    /// </summary>
    public long? ApprovedByUserId { get; set; }

    /// <summary>
    /// Gets or sets when this attendance record was approved.
    /// Timestamp for approval audit trail.
    /// </summary>
    public DateTime? ApprovedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets whether this attendance record has been finalized.
    /// Finalized records cannot be modified without special permissions.
    /// </summary>
    public bool IsFinalized { get; set; } = false;

    /// <summary>
    /// Gets or sets general notes about this attendance record.
    /// Free-text field for additional context or explanations.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the work location type for this attendance record.
    /// Indicates where the employee performed their work (OnSite, Remote, Field).
    /// Affects attendance calculations based on remote work policy settings.
    /// </summary>
    public WorkLocationType WorkLocation { get; set; } = WorkLocationType.OnSite;

    /// <summary>
    /// Gets or sets the remote work request identifier if WorkLocation is Remote.
    /// Links to the approved remote work request that authorizes remote work for this date.
    /// </summary>
    public long? RemoteWorkRequestId { get; set; }

    /// <summary>
    /// Gets or sets the remote work request entity if applicable.
    /// Navigation property providing access to remote work request details.
    /// </summary>
    public RemoteWorkRequest? RemoteWorkRequest { get; set; }

    /// <summary>
    /// Calculates and updates the total overtime hours from pre-shift and post-shift overtime.
    /// </summary>
    public void CalculateTotalOvertimeHours()
    {
        OvertimeHours = PreShiftOvertimeHours + PostShiftOvertimeHours;
    }

    /// <summary>
    /// Updates basic overtime details with calculated values.
    /// </summary>
    /// <param name="preShiftHours">Pre-shift overtime hours</param>
    /// <param name="postShiftHours">Post-shift overtime hours</param>
    /// <param name="rate">Overtime rate multiplier</param>
    /// <param name="dayType">Day type for overtime calculation</param>
    /// <param name="configurationId">Configuration ID used</param>
    /// <param name="notes">Calculation notes</param>
    public void UpdateOvertimeDetails(
        decimal preShiftHours,
        decimal postShiftHours,
        decimal rate,
        DayType dayType,
        long? configurationId = null,
        string? notes = null)
    {
        PreShiftOvertimeHours = preShiftHours;
        PostShiftOvertimeHours = postShiftHours;
        CalculateTotalOvertimeHours();
        OvertimeRate = rate;
        OvertimeAmount = OvertimeHours * rate;
        OvertimeDayType = dayType;
        OvertimeConfigurationId = configurationId;
        OvertimeCalculationNotes = notes;
    }

    /// <summary>
    /// Gets a summary of the overtime calculation for this record.
    /// </summary>
    /// <returns>String summary of overtime details</returns>
    public string GetOvertimeSummary()
    {
        if (OvertimeHours <= 0)
        {
            return "No overtime";
        }

        var summary = $"Total: {OvertimeHours:F2}h";

        if (PreShiftOvertimeHours > 0)
        {
            summary += $" (Pre: {PreShiftOvertimeHours:F2}h)";
        }

        if (PostShiftOvertimeHours > 0)
        {
            summary += $" (Post: {PostShiftOvertimeHours:F2}h)";
        }

        summary += $" @ {OvertimeRate:F1}x rate ({OvertimeDayType})";

        if (OvertimeAmount > 0)
        {
            summary += $" = {OvertimeAmount:F2}";
        }

        return summary;
    }

    // Navigation properties
    /// <summary>
    /// Gets or sets the employee entity this attendance record belongs to.
    /// Navigation property providing access to employee details.
    /// </summary>
    public Employee Employee { get; set; } = null!;

    /// <summary>
    /// Gets or sets the shift assignment used for this attendance record.
    /// Navigation property providing access to shift rules and requirements.
    /// </summary>
    public ShiftAssignment? ShiftAssignment { get; set; }

    /// <summary>
    /// Gets or sets the collection of attendance transactions for this date.
    /// All check-in, check-out, and break transactions for this attendance record.
    /// </summary>
    public ICollection<AttendanceTransaction> Transactions { get; set; } = new List<AttendanceTransaction>();

    /// <summary>
    /// Calculates the net working hours excluding break time.
    /// </summary>
    /// <returns>Working hours minus break hours</returns>
    public decimal CalculateNetWorkingHours()
    {
        return Math.Max(0, WorkingHours - BreakHours);
    }

    /// <summary>
    /// Determines if the employee was late based on shift grace period.
    /// </summary>
    /// <param name="gracePeriodMinutes">Grace period allowed by the shift</param>
    /// <returns>True if late beyond grace period</returns>
    public bool IsLateArrival(int? gracePeriodMinutes = null)
    {
        if (!ActualCheckInTime.HasValue || !ScheduledStartTime.HasValue)
            return false;

        var graceMinutes = gracePeriodMinutes ?? 0;
        return LateMinutes > graceMinutes;
    }

    /// <summary>
    /// Determines if the employee left early beyond acceptable limits.
    /// </summary>
    /// <param name="toleranceMinutes">Early leave tolerance in minutes</param>
    /// <returns>True if left too early</returns>
    public bool IsEarlyDeparture(int toleranceMinutes = 0)
    {
        return EarlyLeaveMinutes > toleranceMinutes;
    }

    /// <summary>
    /// Validates the attendance record business rules and data integrity.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateRecord()
    {
        var errors = new List<string>();

        // Validate attendance date is not in the future
        if (AttendanceDate.Date > DateTime.UtcNow.Date)
        {
            errors.Add("Attendance date cannot be in the future");
        }

        // Validate check-in/out time logic
        if (ActualCheckInTime.HasValue && ActualCheckOutTime.HasValue)
        {
            if (ActualCheckOutTime <= ActualCheckInTime)
            {
                errors.Add("Check-out time must be after check-in time");
            }
        }

        // Validate working hours are not negative
        if (WorkingHours < 0)
        {
            errors.Add("Working hours cannot be negative");
        }

        // Validate break hours are not greater than working hours
        if (BreakHours > WorkingHours)
        {
            errors.Add("Break hours cannot exceed working hours");
        }

        // Validate manual override requirements
        if (IsManualOverride)
        {
            if (!OverrideByUserId.HasValue)
            {
                errors.Add("Manual override must specify who performed it");
            }
            if (!OverrideAtUtc.HasValue)
            {
                errors.Add("Manual override must have timestamp");
            }
        }

        // Validate approval requirements
        if (IsApproved)
        {
            if (!ApprovedByUserId.HasValue)
            {
                errors.Add("Approved records must specify who approved them");
            }
            if (!ApprovedAtUtc.HasValue)
            {
                errors.Add("Approved records must have approval timestamp");
            }
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Gets a summary description of this attendance record.
    /// </summary>
    /// <returns>String summary of attendance status and hours</returns>
    public string GetSummaryDescription()
    {
        var statusText = Status.ToString();
        var hoursText = WorkingHours > 0 ? $" ({WorkingHours:F2}h)" : "";
        var lateText = LateMinutes > 0 ? $" - Late {LateMinutes}min" : "";
        var earlyText = EarlyLeaveMinutes > 0 ? $" - Early {EarlyLeaveMinutes}min" : "";

        return $"{statusText}{hoursText}{lateText}{earlyText}";
    }

    /// <summary>
    /// Determines if this attendance record is complete (has both check-in and check-out).
    /// </summary>
    /// <returns>True if both check-in and check-out are recorded</returns>
    public bool IsComplete()
    {
        return ActualCheckInTime.HasValue && ActualCheckOutTime.HasValue;
    }

    /// <summary>
    /// Calculates attendance completion percentage based on scheduled hours.
    /// </summary>
    /// <returns>Percentage of scheduled hours completed (0-100+)</returns>
    public decimal CalculateCompletionPercentage()
    {
        if (ScheduledHours <= 0)
            return 0;

        return Math.Round((CalculateNetWorkingHours() / ScheduledHours) * 100, 2);
    }
}