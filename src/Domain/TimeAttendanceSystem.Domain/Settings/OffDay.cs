using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Settings;

/// <summary>
/// Domain entity representing designated off days (rest days) that affect overtime calculations.
/// Supports both regular weekly off days and custom off day periods.
/// </summary>
/// <remarks>
/// OffDay Entity Features:
/// - Weekly recurring off days (e.g., Friday-Saturday, Saturday-Sunday)
/// - Custom off day periods for special circumstances
/// - Branch-specific or organization-wide configuration
/// - Integration with overtime rate calculations
/// - Support for different cultural work week patterns
///
/// Off Day Types:
/// - WeeklyRecurring: Regular weekly pattern (e.g., weekends)
/// - CustomPeriod: Specific date ranges for special circumstances
/// - CompanyWide: Applies to entire organization
/// - BranchSpecific: Applies to specific branches only
///
/// Business Rules:
/// - Off days use the highest overtime rates
/// - Weekly patterns repeat automatically
/// - Custom periods override weekly patterns
/// - Branch-specific off days take precedence over company-wide settings
/// </remarks>
public class OffDay : BaseEntity
{
    /// <summary>
    /// Gets or sets the name/description of this off day configuration.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Arabic name of this off day configuration.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// Gets or sets the type of off day configuration.
    /// </summary>
    public OffDayType OffDayType { get; set; } = OffDayType.WeeklyRecurring;

    /// <summary>
    /// Gets or sets whether this off day configuration is currently active.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this applies to all branches or is branch-specific.
    /// </summary>
    public bool IsCompanyWide { get; set; } = true;

    /// <summary>
    /// Gets or sets the specific branch ID for branch-specific off days.
    /// Null for company-wide off day configurations.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the start date for custom period off days.
    /// Used when OffDayType is CustomPeriod.
    /// </summary>
    public DateTime? StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date for custom period off days.
    /// Used when OffDayType is CustomPeriod.
    /// </summary>
    public DateTime? EndDate { get; set; }

    /// <summary>
    /// Gets or sets whether Sunday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsSunday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether Monday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsMonday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether Tuesday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsTuesday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether Wednesday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsWednesday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether Thursday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsThursday { get; set; } = false;

    /// <summary>
    /// Gets or sets whether Friday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsFriday { get; set; } = true; // Default for Middle East

    /// <summary>
    /// Gets or sets whether Saturday is an off day for weekly recurring pattern.
    /// </summary>
    public bool IsSaturday { get; set; } = true; // Default for Middle East

    /// <summary>
    /// Gets or sets the description or notes about this off day configuration.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets the priority of this off day configuration when multiple configs overlap.
    /// Higher numbers indicate higher priority.
    /// </summary>
    public int Priority { get; set; } = 1;

    /// <summary>
    /// Gets or sets whether this off day overrides public holidays.
    /// When true, if a public holiday falls on this off day, it's treated as off day (highest rate).
    /// </summary>
    public bool OverridesPublicHolidays { get; set; } = true;

    /// <summary>
    /// Gets or sets the effective start date for this off day configuration.
    /// </summary>
    public DateTime EffectiveFromDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the effective end date for this off day configuration.
    /// Null means indefinite validity.
    /// </summary>
    public DateTime? EffectiveToDate { get; set; }

    /// <summary>
    /// Determines if a specific date is an off day according to this configuration.
    /// </summary>
    /// <param name="date">The date to check</param>
    /// <returns>True if the date is an off day</returns>
    public bool IsOffDay(DateTime date)
    {
        if (!IsActive)
            return false;

        // Check if configuration is effective for this date
        if (date.Date < EffectiveFromDate.Date)
            return false;

        if (EffectiveToDate.HasValue && date.Date > EffectiveToDate.Value.Date)
            return false;

        return OffDayType switch
        {
            OffDayType.WeeklyRecurring => IsWeeklyOffDay(date.DayOfWeek),
            OffDayType.CustomPeriod => IsInCustomPeriod(date),
            _ => false
        };
    }

    /// <summary>
    /// Determines if this off day configuration applies to a specific branch.
    /// </summary>
    /// <param name="branchId">The branch ID to check</param>
    /// <returns>True if the configuration applies to the specified branch</returns>
    public bool AppliesTo(long branchId)
    {
        return IsCompanyWide || BranchId == branchId;
    }

    /// <summary>
    /// Gets all off days within a specified date range.
    /// </summary>
    /// <param name="startDate">Start of the date range</param>
    /// <param name="endDate">End of the date range</param>
    /// <returns>Collection of off day dates</returns>
    public IEnumerable<DateTime> GetOffDaysInRange(DateTime startDate, DateTime endDate)
    {
        if (!IsActive)
            yield break;

        var current = startDate.Date;
        while (current <= endDate.Date)
        {
            if (IsOffDay(current))
                yield return current;

            current = current.AddDays(1);
        }
    }

    /// <summary>
    /// Validates the off day configuration.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateConfiguration()
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(Name))
            errors.Add("Off day configuration name is required");

        switch (OffDayType)
        {
            case OffDayType.WeeklyRecurring:
                if (!HasAnyWeeklyOffDay())
                    errors.Add("At least one day of the week must be selected for weekly recurring off days");
                break;

            case OffDayType.CustomPeriod:
                if (!StartDate.HasValue)
                    errors.Add("Start date is required for custom period off days");
                if (!EndDate.HasValue)
                    errors.Add("End date is required for custom period off days");
                if (StartDate.HasValue && EndDate.HasValue && EndDate <= StartDate)
                    errors.Add("End date must be after start date for custom period off days");
                break;
        }

        if (EffectiveToDate.HasValue && EffectiveToDate <= EffectiveFromDate)
            errors.Add("Effective to date must be after effective from date");

        if (Priority < 1)
            errors.Add("Priority must be at least 1");

        if (!IsCompanyWide && !BranchId.HasValue)
            errors.Add("Branch ID is required for branch-specific off day configurations");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Gets a collection of the selected weekly off days.
    /// </summary>
    /// <returns>Collection of DayOfWeek values that are off days</returns>
    public IEnumerable<DayOfWeek> GetWeeklyOffDays()
    {
        if (IsSunday) yield return DayOfWeek.Sunday;
        if (IsMonday) yield return DayOfWeek.Monday;
        if (IsTuesday) yield return DayOfWeek.Tuesday;
        if (IsWednesday) yield return DayOfWeek.Wednesday;
        if (IsThursday) yield return DayOfWeek.Thursday;
        if (IsFriday) yield return DayOfWeek.Friday;
        if (IsSaturday) yield return DayOfWeek.Saturday;
    }

    /// <summary>
    /// Sets the weekly off days based on a collection of DayOfWeek values.
    /// </summary>
    /// <param name="offDays">Collection of days to set as off days</param>
    public void SetWeeklyOffDays(IEnumerable<DayOfWeek> offDays)
    {
        // Reset all days first
        IsSunday = IsMonday = IsTuesday = IsWednesday = IsThursday = IsFriday = IsSaturday = false;

        // Set the specified off days
        foreach (var day in offDays)
        {
            switch (day)
            {
                case DayOfWeek.Sunday: IsSunday = true; break;
                case DayOfWeek.Monday: IsMonday = true; break;
                case DayOfWeek.Tuesday: IsTuesday = true; break;
                case DayOfWeek.Wednesday: IsWednesday = true; break;
                case DayOfWeek.Thursday: IsThursday = true; break;
                case DayOfWeek.Friday: IsFriday = true; break;
                case DayOfWeek.Saturday: IsSaturday = true; break;
            }
        }
    }

    /// <summary>
    /// Gets a description of this off day configuration.
    /// </summary>
    /// <returns>String description of the configuration</returns>
    public string GetConfigurationDescription()
    {
        var description = $"{Name}";

        if (OffDayType == OffDayType.WeeklyRecurring)
        {
            var offDays = GetWeeklyOffDays().Select(d => d.ToString().Substring(0, 3));
            description += $" - Weekly: {string.Join(", ", offDays)}";
        }
        else if (OffDayType == OffDayType.CustomPeriod)
        {
            description += $" - Period: {StartDate:yyyy-MM-dd} to {EndDate:yyyy-MM-dd}";
        }

        if (!IsCompanyWide)
            description += $" (Branch {BranchId})";

        return description;
    }

    /// <summary>
    /// Gets the number of off days in a week for weekly recurring pattern.
    /// </summary>
    /// <returns>Number of off days per week</returns>
    public int GetWeeklyOffDayCount()
    {
        if (OffDayType != OffDayType.WeeklyRecurring)
            return 0;

        return GetWeeklyOffDays().Count();
    }

    private bool IsWeeklyOffDay(DayOfWeek dayOfWeek)
    {
        return dayOfWeek switch
        {
            DayOfWeek.Sunday => IsSunday,
            DayOfWeek.Monday => IsMonday,
            DayOfWeek.Tuesday => IsTuesday,
            DayOfWeek.Wednesday => IsWednesday,
            DayOfWeek.Thursday => IsThursday,
            DayOfWeek.Friday => IsFriday,
            DayOfWeek.Saturday => IsSaturday,
            _ => false
        };
    }

    private bool IsInCustomPeriod(DateTime date)
    {
        if (!StartDate.HasValue || !EndDate.HasValue)
            return false;

        return date.Date >= StartDate.Value.Date && date.Date <= EndDate.Value.Date;
    }

    private bool HasAnyWeeklyOffDay()
    {
        return IsSunday || IsMonday || IsTuesday || IsWednesday || IsThursday || IsFriday || IsSaturday;
    }
}

/// <summary>
/// Enumeration representing different types of off day configurations.
/// </summary>
public enum OffDayType
{
    /// <summary>
    /// Off days that repeat weekly (e.g., weekends).
    /// </summary>
    WeeklyRecurring = 0,

    /// <summary>
    /// Off days for a specific custom period.
    /// </summary>
    CustomPeriod = 1
}