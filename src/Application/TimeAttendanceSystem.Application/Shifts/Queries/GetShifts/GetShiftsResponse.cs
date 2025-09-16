using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;

/// <summary>
/// Data transfer object for shift information.
/// </summary>
public class ShiftDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ShiftType ShiftType { get; set; }
    public ShiftStatus Status { get; set; } = ShiftStatus.Active;
    public decimal? RequiredHours { get; set; }
    public bool IsCheckInRequired { get; set; }
    public bool IsAutoCheckOut { get; set; }
    public bool AllowFlexibleHours { get; set; }
    public int? FlexMinutesBefore { get; set; }
    public int? FlexMinutesAfter { get; set; }
    public int? GracePeriodMinutes { get; set; }

    // Extended Business Rules
    public decimal? RequiredWeeklyHours { get; set; }
    public bool HasCoreHours { get; set; } = false;
    public TimeOnly? CoreStart { get; set; }
    public TimeOnly? CoreEnd { get; set; }

    // Working Days
    public bool IsSunday { get; set; } = false;
    public bool IsMonday { get; set; } = true;
    public bool IsTuesday { get; set; } = true;
    public bool IsWednesday { get; set; } = true;
    public bool IsThursday { get; set; } = true;
    public bool IsFriday { get; set; } = true;
    public bool IsSaturday { get; set; } = false;
    public bool IsNightShift { get; set; } = false;

    public List<ShiftPeriodDto> ShiftPeriods { get; set; } = new();
    public DateTime CreatedAtUtc { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
    public string? ModifiedBy { get; set; }
}

/// <summary>
/// Data transfer object for shift period information.
/// </summary>
public class ShiftPeriodDto
{
    public long Id { get; set; }
    public int PeriodOrder { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public decimal Hours { get; set; }
    public bool IsNightPeriod { get; set; }
}