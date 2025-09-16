using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Shifts.Commands.CreateShift;

/// <summary>
/// Command for creating a new shift with comprehensive shift management capabilities.
/// Supports time-based, hours-only, flexible, and multi-period shifts with validation.
/// </summary>
public record CreateShiftCommand(
    string Name,
    string? Description,
    ShiftType ShiftType,
    decimal? RequiredHours,
    ShiftStatus Status = ShiftStatus.Active,
    bool IsCheckInRequired = true,
    bool IsAutoCheckOut = false,
    bool AllowFlexibleHours = false,
    int? FlexMinutesBefore = null,
    int? FlexMinutesAfter = null,
    int? GracePeriodMinutes = null,
    // Extended Business Rules
    decimal? RequiredWeeklyHours = null,
    bool HasCoreHours = false,
    string? CoreStart = null,
    string? CoreEnd = null,
    // Working Days
    bool IsSunday = false,
    bool IsMonday = true,
    bool IsTuesday = true,
    bool IsWednesday = true,
    bool IsThursday = true,
    bool IsFriday = true,
    bool IsSaturday = false,
    bool IsNightShift = false,
    List<CreateShiftPeriodCommand>? ShiftPeriods = null
) : ICommand<Result<long>>;

/// <summary>
/// Command for creating a shift period within a shift.
/// </summary>
public record CreateShiftPeriodCommand(
    int PeriodOrder,
    TimeOnly StartTime,
    TimeOnly EndTime
);