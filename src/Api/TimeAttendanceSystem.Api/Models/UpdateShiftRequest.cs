using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for updating an existing shift with comprehensive shift management capabilities.
/// Supports time-based, hours-only, flexible, and multi-period shifts with validation.
/// </summary>
public class UpdateShiftRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ShiftType ShiftType { get; set; }
    public ShiftStatus? Status { get; set; }
    public decimal? RequiredHours { get; set; }
    public bool? IsCheckInRequired { get; set; }
    public bool? IsAutoCheckOut { get; set; }
    public bool? AllowFlexibleHours { get; set; }
    public int? FlexMinutesBefore { get; set; }
    public int? FlexMinutesAfter { get; set; }
    public int? GracePeriodMinutes { get; set; }

    // Extended Business Rules
    public decimal? RequiredWeeklyHours { get; set; }
    public bool? HasCoreHours { get; set; }
    public string? CoreStart { get; set; } // "HH:mm" format
    public string? CoreEnd { get; set; } // "HH:mm" format

    // Working Days
    public bool? IsSunday { get; set; }
    public bool? IsMonday { get; set; }
    public bool? IsTuesday { get; set; }
    public bool? IsWednesday { get; set; }
    public bool? IsThursday { get; set; }
    public bool? IsFriday { get; set; }
    public bool? IsSaturday { get; set; }
    public bool? IsNightShift { get; set; }

    public List<UpdateShiftPeriodRequest>? ShiftPeriods { get; set; }
}

/// <summary>
/// Request model for updating a shift period within a shift.
/// </summary>
public class UpdateShiftPeriodRequest
{
    public long? Id { get; set; }
    public int PeriodOrder { get; set; }
    public string StartTime { get; set; } = string.Empty; // "HH:mm" format
    public string EndTime { get; set; } = string.Empty; // "HH:mm" format
}