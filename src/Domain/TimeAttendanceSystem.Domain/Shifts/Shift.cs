using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Shifts;

/// <summary>
/// Domain entity representing a work shift definition within the time attendance system.
/// Defines working hours, attendance rules, and compliance requirements for employee time tracking.
/// Supports flexible, multi-period, night shifts, and hours-only shift types for comprehensive workforce management.
/// </summary>
public class Shift : BaseEntity
{
    /// <summary>
    /// Gets or sets the unique name of the shift.
    /// Must be unique across the system for identification.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the optional description of the shift providing additional context.
    /// </summary>
    public string? Description { get; set; }


    /// <summary>
    /// Gets or sets the shift type determining how time is calculated and validated.
    /// </summary>
    public ShiftType ShiftType { get; set; }

    /// <summary>
    /// Gets or sets the status of the shift (Active, Inactive, Draft, Archived).
    /// </summary>
    public ShiftStatus Status { get; set; } = ShiftStatus.Active;

    /// <summary>
    /// Gets or sets the total required hours for hours-only shifts.
    /// Only applicable when ShiftType is HoursOnly.
    /// </summary>
    public decimal? RequiredHours { get; set; }

    /// <summary>
    /// Gets or sets whether check-in is required for this shift.
    /// If false, absence is not flagged for missing check-in.
    /// </summary>
    public bool IsCheckInRequired { get; set; } = true;

    /// <summary>
    /// Gets or sets whether check-out is automatic at shift end time.
    /// If true, system calculates end time as shift's configured end time.
    /// </summary>
    public bool IsAutoCheckOut { get; set; } = false;

    /// <summary>
    /// Gets or sets whether flexible hours are allowed for this shift.
    /// Enables check-in within a defined time window instead of strict start time.
    /// </summary>
    public bool AllowFlexibleHours { get; set; } = false;

    /// <summary>
    /// Gets or sets the number of minutes before start time for flexible check-in.
    /// Only applicable when AllowFlexibleHours is true.
    /// </summary>
    public int? FlexMinutesBefore { get; set; }

    /// <summary>
    /// Gets or sets the number of minutes after start time for flexible check-in.
    /// Only applicable when AllowFlexibleHours is true.
    /// </summary>
    public int? FlexMinutesAfter { get; set; }

    /// <summary>
    /// Gets or sets the grace period in minutes for late check-in without penalty.
    /// Applies only to time-based shifts, not hours-only shifts.
    /// </summary>
    public int? GracePeriodMinutes { get; set; }

    /// <summary>
    /// Gets or sets the required weekly hours for this shift.
    /// Total hours an employee must work across the shift's work week.
    /// </summary>
    public decimal? RequiredWeeklyHours { get; set; }

    /// <summary>
    /// Gets or sets whether this shift has core hours defined.
    /// Core hours are mandatory presence windows each working day.
    /// </summary>
    public bool HasCoreHours { get; set; } = false;

    /// <summary>
    /// Gets or sets the core hours start time for mandatory presence.
    /// Only applicable when HasCoreHours is true.
    /// </summary>
    public TimeOnly? CoreStart { get; set; }

    /// <summary>
    /// Gets or sets the core hours end time for mandatory presence.
    /// Only applicable when HasCoreHours is true.
    /// </summary>
    public TimeOnly? CoreEnd { get; set; }

    /// <summary>
    /// Gets or sets whether this shift applies on Sunday.
    /// </summary>
    public bool IsSunday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether this shift applies on Monday.
    /// </summary>
    public bool IsMonday { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this shift applies on Tuesday.
    /// </summary>
    public bool IsTuesday { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this shift applies on Wednesday.
    /// </summary>
    public bool IsWednesday { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this shift applies on Thursday.
    /// </summary>
    public bool IsThursday { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this shift applies on Friday.
    /// </summary>
    public bool IsFriday { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this shift applies on Saturday.
    /// </summary>
    public bool IsSaturday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether this is a night shift that spans midnight.
    /// This is calculated based on shift periods and cached for database storage.
    /// </summary>
    public bool IsNightShift { get; set; } = false;

    /// <summary>
    /// Gets or sets the collection of shift periods defining working time blocks.
    /// Single-period shifts have one period, multi-period shifts have up to two periods.
    /// </summary>
    public ICollection<ShiftPeriod> ShiftPeriods { get; set; } = new List<ShiftPeriod>();

    /// <summary>
    /// Calculates the total hours for this shift based on shift type and periods.
    /// For time-based shifts: sum of all period hours.
    /// For hours-only shifts: returns RequiredHours.
    /// </summary>
    public decimal CalculateTotalHours()
    {
        return ShiftType switch
        {
            ShiftType.HoursOnly => RequiredHours ?? 0m,
            ShiftType.TimeBased => ShiftPeriods.Sum(p => p.Hours),
            _ => 0m
        };
    }

    /// <summary>
    /// Validates the shift configuration against business rules.
    /// </summary>
    public (bool IsValid, List<string> Errors) ValidateShiftRules()
    {
        var errors = new List<string>();

        // Rule 8: A shift must define either (Start/End times) or (Hours per day)
        if (ShiftType == ShiftType.TimeBased)
        {
            if (!ShiftPeriods.Any())
            {
                errors.Add("Time-based shifts must have at least one shift period");
            }

            if (RequiredHours.HasValue)
            {
                errors.Add("Time-based shifts should not have required hours set");
            }
        }
        else if (ShiftType == ShiftType.HoursOnly)
        {
            if (ShiftPeriods.Any())
            {
                errors.Add("Hours-only shifts should not have shift periods");
            }

            if (!RequiredHours.HasValue || RequiredHours <= 0)
            {
                errors.Add("Hours-only shifts must have valid required hours");
            }
        }

        // Rule 8: If two periods are defined, both must be valid ranges
        if (ShiftPeriods.Count > 2)
        {
            errors.Add("Shifts can have at most two periods per day");
        }

        // Rule 8: Grace Period/Flexible Hours only valid for time-based shifts
        if (ShiftType == ShiftType.HoursOnly)
        {
            if (AllowFlexibleHours)
            {
                errors.Add("Flexible hours are not valid for hours-only shifts");
            }

            if (GracePeriodMinutes.HasValue)
            {
                errors.Add("Grace period is not valid for hours-only shifts");
            }
        }

        // Rule 8: Grace period and flexible hours conflict
        if (AllowFlexibleHours && GracePeriodMinutes.HasValue && GracePeriodMinutes.Value > 0)
        {
            errors.Add("Grace period is not allowed when flexible hours is enabled");
        }

        // Rule 8: Check-In Required and Auto Check-Out options cannot conflict
        if (!IsCheckInRequired && !IsAutoCheckOut)
        {
            errors.Add("Either check-in must be required or auto check-out must be enabled");
        }

        // Extended Rules: Core Hours validation
        if (HasCoreHours)
        {
            if (!CoreStart.HasValue || !CoreEnd.HasValue)
            {
                errors.Add("Core hours start and end times must be set when core hours are enabled");
            }
            else if (CoreStart >= CoreEnd && !IsNightShift)
            {
                errors.Add("Core hours start time must be before end time for day shifts");
            }

            // Core hours must be within shift periods for time-based shifts
            if (ShiftType == ShiftType.TimeBased && ShiftPeriods.Any())
            {
                var coreIsWithinPeriods = false;
                foreach (var period in ShiftPeriods)
                {
                    if (IsCoreWithinPeriod(period, CoreStart.Value, CoreEnd.Value))
                    {
                        coreIsWithinPeriods = true;
                        break;
                    }
                }

                if (!coreIsWithinPeriods)
                {
                    errors.Add("Core hours must be within the defined shift periods");
                }
            }
        }

        // Extended Rules: Working days validation
        var hasWorkingDays = IsSunday || IsMonday || IsTuesday || IsWednesday || IsThursday || IsFriday || IsSaturday;
        if (!hasWorkingDays)
        {
            errors.Add("At least one working day must be selected");
        }

        // Extended Rules: Weekly hours validation
        if (RequiredWeeklyHours.HasValue)
        {
            if (RequiredWeeklyHours <= 0)
            {
                errors.Add("Required weekly hours must be greater than 0");
            }

            if (RequiredWeeklyHours > 168) // Maximum hours in a week
            {
                errors.Add("Required weekly hours cannot exceed 168 hours per week");
            }

            // For hours-only shifts, weekly hours should be reasonable with daily hours
            if (ShiftType == ShiftType.HoursOnly && RequiredHours.HasValue)
            {
                var workingDaysCount = GetWorkingDaysCount();
                var maxWeeklyFromDaily = RequiredHours.Value * workingDaysCount;

                if (RequiredWeeklyHours > maxWeeklyFromDaily * 1.5m) // Allow some flexibility
                {
                    errors.Add("Required weekly hours seems too high compared to daily hours and working days");
                }
            }
        }

        return (errors.Count == 0, errors);
    }


    /// <summary>
    /// Gets the count of working days for this shift.
    /// </summary>
    public int GetWorkingDaysCount()
    {
        var count = 0;
        if (IsSunday) count++;
        if (IsMonday) count++;
        if (IsTuesday) count++;
        if (IsWednesday) count++;
        if (IsThursday) count++;
        if (IsFriday) count++;
        if (IsSaturday) count++;
        return count;
    }

    /// <summary>
    /// Gets the working days as a list of day names.
    /// </summary>
    public List<string> GetWorkingDays()
    {
        var days = new List<string>();
        if (IsSunday) days.Add("Sunday");
        if (IsMonday) days.Add("Monday");
        if (IsTuesday) days.Add("Tuesday");
        if (IsWednesday) days.Add("Wednesday");
        if (IsThursday) days.Add("Thursday");
        if (IsFriday) days.Add("Friday");
        if (IsSaturday) days.Add("Saturday");
        return days;
    }

    /// <summary>
    /// Checks if core hours are within a specific shift period.
    /// </summary>
    private bool IsCoreWithinPeriod(ShiftPeriod period, TimeOnly coreStart, TimeOnly coreEnd)
    {
        // For night periods, handle midnight crossing
        if (period.IsNightPeriod)
        {
            // Night period spans midnight: start > end
            // Core can be within first part (start to midnight) or second part (midnight to end)
            var withinFirstPart = coreStart >= period.StartTime && coreEnd >= period.StartTime;
            var withinSecondPart = coreStart <= period.EndTime && coreEnd <= period.EndTime;
            var spansNight = coreStart >= period.StartTime && coreEnd <= period.EndTime;

            return withinFirstPart || withinSecondPart || spansNight;
        }
        else
        {
            // Normal day period: start < end
            return coreStart >= period.StartTime && coreEnd <= period.EndTime;
        }
    }

    /// <summary>
    /// Calculates core hours duration in decimal hours.
    /// </summary>
    public decimal CalculateCoreHours()
    {
        if (!HasCoreHours || !CoreStart.HasValue || !CoreEnd.HasValue)
            return 0m;

        var start = CoreStart.Value;
        var end = CoreEnd.Value;

        if (end > start)
        {
            // Normal day core hours
            return (decimal)(end - start).TotalHours;
        }
        else if (end < start)
        {
            // Night core hours spanning midnight
            var hoursToMidnight = (decimal)(new TimeSpan(23, 59, 59) - start.ToTimeSpan()).TotalHours + (1.0m / 60.0m);
            var hoursFromMidnight = (decimal)end.ToTimeSpan().TotalHours;
            return hoursToMidnight + hoursFromMidnight;
        }
        else
        {
            // Same start and end time
            return 0m;
        }
    }
}