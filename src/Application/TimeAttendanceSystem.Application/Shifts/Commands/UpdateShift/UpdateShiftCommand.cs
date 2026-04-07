using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Shifts;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Shifts.Commands.UpdateShift;

/// <summary>
/// Command for updating an existing shift with comprehensive shift management capabilities.
/// Supports modification of all shift properties while maintaining business rule validation.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record UpdateShiftCommand(
    long Id,
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
    TimeOnly? CoreStart = null,
    TimeOnly? CoreEnd = null,
    // Working Days
    bool IsSunday = false,
    bool IsMonday = true,
    bool IsTuesday = true,
    bool IsWednesday = true,
    bool IsThursday = true,
    bool IsFriday = true,
    bool IsSaturday = false,
    bool IsNightShift = false,
    List<UpdateShiftPeriodCommand>? ShiftPeriods = null
) : ICommand<Result>;

/// <summary>
/// Command for updating a shift period within a shift.
/// </summary>
public record UpdateShiftPeriodCommand(
    long? Id,
    int PeriodOrder,
    TimeOnly StartTime,
    TimeOnly EndTime
);