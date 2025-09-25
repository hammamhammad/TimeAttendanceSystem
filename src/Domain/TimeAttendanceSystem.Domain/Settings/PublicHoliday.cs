using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Settings;

/// <summary>
/// Domain entity representing a public holiday that affects overtime calculation rates.
/// Supports both one-time and recurring holidays with flexible configuration.
/// </summary>
/// <remarks>
/// PublicHoliday Entity Features:
/// - One-time holidays (specific date)
/// - Recurring holidays (annual, monthly patterns)
/// - National and regional holiday support
/// - Active/inactive status for scheduling
/// - Integration with overtime rate calculations
///
/// Holiday Types:
/// - OneTime: Specific date holiday (e.g., company anniversary)
/// - Annual: Yearly recurring (e.g., Christmas, New Year)
/// - Monthly: Monthly recurring (e.g., first Monday of each month)
/// - Floating: Date calculated by rule (e.g., Easter, Thanksgiving)
///
/// Business Rules:
/// - Public holidays use premium overtime rates
/// - Holidays can be planned in advance
/// - Regional holidays can be branch/location specific
/// - Inactive holidays don't affect overtime calculations
/// </remarks>
public class PublicHoliday : BaseEntity
{
    /// <summary>
    /// Gets or sets the name of the public holiday.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Arabic name of the public holiday.
    /// Supports bilingual holiday naming.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// Gets or sets the specific date for one-time holidays.
    /// Used when HolidayType is OneTime.
    /// </summary>
    public DateTime? SpecificDate { get; set; }

    /// <summary>
    /// Gets or sets the month for recurring holidays (1-12).
    /// Used for Annual and Monthly holiday types.
    /// </summary>
    public int? Month { get; set; }

    /// <summary>
    /// Gets or sets the day of the month for recurring holidays (1-31).
    /// Used for Annual holiday types with fixed dates.
    /// </summary>
    public int? Day { get; set; }

    /// <summary>
    /// Gets or sets the type of holiday recurrence pattern.
    /// </summary>
    public HolidayType HolidayType { get; set; } = HolidayType.OneTime;

    /// <summary>
    /// Gets or sets whether this holiday is currently active.
    /// Inactive holidays are not considered in overtime calculations.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets whether this holiday affects all branches or is region-specific.
    /// When true, applies to all locations. When false, requires branch assignment.
    /// </summary>
    public bool IsNational { get; set; } = true;

    /// <summary>
    /// Gets or sets the specific branch ID if this is a regional holiday.
    /// Null for national holidays that apply to all branches.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the description or notes about this holiday.
    /// Provides additional context about the holiday significance.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets the year from which this holiday becomes effective.
    /// Allows scheduling holidays for future years.
    /// </summary>
    public int? EffectiveFromYear { get; set; }

    /// <summary>
    /// Gets or sets the year until which this holiday is valid.
    /// Null means the holiday continues indefinitely.
    /// </summary>
    public int? EffectiveToYear { get; set; }

    /// <summary>
    /// Gets or sets the day of the week for floating holidays.
    /// Used for holidays like "first Monday of month" patterns.
    /// </summary>
    public DayOfWeek? DayOfWeek { get; set; }

    /// <summary>
    /// Gets or sets the week occurrence for floating holidays (1-5).
    /// 1 = first occurrence, 2 = second occurrence, etc.
    /// -1 = last occurrence of the month.
    /// </summary>
    public int? WeekOccurrence { get; set; }

    /// <summary>
    /// Gets or sets the country code for international holiday support.
    /// Useful for multi-national organizations.
    /// </summary>
    public string? CountryCode { get; set; }

    /// <summary>
    /// Gets or sets the priority of this holiday when multiple holidays fall on the same date.
    /// Higher numbers indicate higher priority.
    /// </summary>
    public int Priority { get; set; } = 1;

    /// <summary>
    /// Calculates the actual date of this holiday for a given year.
    /// </summary>
    /// <param name="year">The year to calculate the holiday date for</param>
    /// <returns>The calculated date, or null if not applicable for the year</returns>
    public DateTime? GetHolidayDateForYear(int year)
    {
        // Check if holiday is effective for this year
        if (EffectiveFromYear.HasValue && year < EffectiveFromYear.Value)
            return null;

        if (EffectiveToYear.HasValue && year > EffectiveToYear.Value)
            return null;

        if (!IsActive)
            return null;

        return HolidayType switch
        {
            HolidayType.OneTime => SpecificDate?.Year == year ? SpecificDate : null,
            HolidayType.Annual => CalculateAnnualDate(year),
            HolidayType.Monthly => null, // Monthly holidays require specific month parameter
            HolidayType.Floating => CalculateFloatingDate(year),
            _ => null
        };
    }

    /// <summary>
    /// Calculates the holiday dates for a given month in a specific year.
    /// Used for monthly recurring holidays.
    /// </summary>
    /// <param name="year">The year</param>
    /// <param name="month">The month (1-12)</param>
    /// <returns>Collection of holiday dates in the specified month</returns>
    public IEnumerable<DateTime> GetHolidayDatesForMonth(int year, int month)
    {
        if (!IsActive || HolidayType != HolidayType.Monthly)
            yield break;

        // Check if holiday is effective for this year
        if (EffectiveFromYear.HasValue && year < EffectiveFromYear.Value)
            yield break;

        if (EffectiveToYear.HasValue && year > EffectiveToYear.Value)
            yield break;

        if (Month.HasValue && Month.Value != month)
            yield break;

        // Calculate monthly recurring dates
        if (DayOfWeek.HasValue && WeekOccurrence.HasValue)
        {
            var date = CalculateFloatingDateForMonth(year, month);
            if (date.HasValue)
                yield return date.Value;
        }
        else if (Day.HasValue)
        {
            var date = TryCreateDate(year, month, Day.Value);
            if (date.HasValue)
                yield return date.Value;
        }
    }

    /// <summary>
    /// Validates the holiday configuration.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateHoliday()
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(Name))
            errors.Add("Holiday name is required");

        switch (HolidayType)
        {
            case HolidayType.OneTime:
                if (!SpecificDate.HasValue)
                    errors.Add("Specific date is required for one-time holidays");
                break;

            case HolidayType.Annual:
                if (!Month.HasValue || Month < 1 || Month > 12)
                    errors.Add("Valid month (1-12) is required for annual holidays");
                if (!Day.HasValue || Day < 1 || Day > 31)
                    errors.Add("Valid day (1-31) is required for annual holidays");
                break;

            case HolidayType.Monthly:
                if (DayOfWeek.HasValue && (!WeekOccurrence.HasValue || WeekOccurrence < -1 || WeekOccurrence == 0 || WeekOccurrence > 5))
                    errors.Add("Valid week occurrence (-1, 1-5) is required for floating monthly holidays");
                if (!DayOfWeek.HasValue && (!Day.HasValue || Day < 1 || Day > 31))
                    errors.Add("Either day of week with occurrence or day of month is required for monthly holidays");
                break;

            case HolidayType.Floating:
                if (!Month.HasValue || Month < 1 || Month > 12)
                    errors.Add("Valid month (1-12) is required for floating holidays");
                if (!DayOfWeek.HasValue)
                    errors.Add("Day of week is required for floating holidays");
                if (!WeekOccurrence.HasValue || WeekOccurrence < -1 || WeekOccurrence == 0 || WeekOccurrence > 5)
                    errors.Add("Valid week occurrence (-1, 1-5) is required for floating holidays");
                break;
        }

        if (EffectiveFromYear.HasValue && EffectiveToYear.HasValue && EffectiveToYear <= EffectiveFromYear)
            errors.Add("Effective to year must be after effective from year");

        if (Priority < 1)
            errors.Add("Priority must be at least 1");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Determines if this holiday applies to a specific branch.
    /// </summary>
    /// <param name="branchId">The branch ID to check</param>
    /// <returns>True if the holiday applies to the specified branch</returns>
    public bool AppliesTo(long branchId)
    {
        return IsNational || BranchId == branchId;
    }

    private DateTime? CalculateAnnualDate(int year)
    {
        if (!Month.HasValue || !Day.HasValue)
            return null;

        return TryCreateDate(year, Month.Value, Day.Value);
    }

    private DateTime? TryCreateDate(int year, int month, int day)
    {
        try
        {
            return new DateTime(year, month, day);
        }
        catch (ArgumentOutOfRangeException)
        {
            // Invalid date (e.g., Feb 29 in non-leap year, Feb 31)
            return null;
        }
    }

    private DateTime? CalculateFloatingDate(int year)
    {
        if (!Month.HasValue)
            return null;

        return CalculateFloatingDateForMonth(year, Month.Value);
    }

    private DateTime? CalculateFloatingDateForMonth(int year, int month)
    {
        if (!DayOfWeek.HasValue || !WeekOccurrence.HasValue)
            return null;

        var firstDayOfMonth = new DateTime(year, month, 1);
        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

        if (WeekOccurrence.Value == -1)
        {
            // Last occurrence in the month
            var lastDay = lastDayOfMonth;
            while (lastDay.DayOfWeek != DayOfWeek.Value)
            {
                lastDay = lastDay.AddDays(-1);
            }
            return lastDay;
        }
        else
        {
            // Nth occurrence in the month
            var firstOccurrence = firstDayOfMonth;
            while (firstOccurrence.DayOfWeek != DayOfWeek.Value)
            {
                firstOccurrence = firstOccurrence.AddDays(1);
            }

            var targetDate = firstOccurrence.AddDays(7 * (WeekOccurrence.Value - 1));
            return targetDate.Month == month ? targetDate : null;
        }
    }

    /// <summary>
    /// Gets a description of this holiday's recurrence pattern.
    /// </summary>
    /// <returns>String description of the holiday pattern</returns>
    public string GetPatternDescription()
    {
        return HolidayType switch
        {
            HolidayType.OneTime => $"One-time on {SpecificDate:yyyy-MM-dd}",
            HolidayType.Annual => $"Annual on {Month:D2}/{Day:D2}",
            HolidayType.Monthly when DayOfWeek.HasValue => $"Monthly {GetOccurrenceText()} {DayOfWeek}",
            HolidayType.Monthly => $"Monthly on day {Day}",
            HolidayType.Floating => $"Annual {GetOccurrenceText()} {DayOfWeek} of {GetMonthName()}",
            _ => "Unknown pattern"
        };
    }

    private string GetOccurrenceText()
    {
        return WeekOccurrence switch
        {
            1 => "first",
            2 => "second",
            3 => "third",
            4 => "fourth",
            5 => "fifth",
            -1 => "last",
            _ => WeekOccurrence?.ToString() ?? ""
        };
    }

    private string GetMonthName()
    {
        if (!Month.HasValue)
            return "";

        return new DateTime(2000, Month.Value, 1).ToString("MMMM");
    }
}

/// <summary>
/// Enumeration representing different types of holiday recurrence patterns.
/// </summary>
public enum HolidayType
{
    /// <summary>
    /// Holiday occurs on a specific date only once.
    /// </summary>
    OneTime = 0,

    /// <summary>
    /// Holiday occurs annually on the same month and day.
    /// </summary>
    Annual = 1,

    /// <summary>
    /// Holiday occurs monthly on a specified day or day of week.
    /// </summary>
    Monthly = 2,

    /// <summary>
    /// Holiday occurs annually on a calculated date (e.g., first Monday of March).
    /// </summary>
    Floating = 3
}