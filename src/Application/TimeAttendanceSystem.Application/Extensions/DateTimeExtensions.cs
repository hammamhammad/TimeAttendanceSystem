namespace TimeAttendanceSystem.Application.Extensions;

/// <summary>
/// Extension methods for DateTime to handle PostgreSQL timestamp with time zone requirements.
/// </summary>
public static class DateTimeExtensions
{
    /// <summary>
    /// Normalizes a DateTime to UTC date at midnight.
    /// Required for PostgreSQL timestamp with time zone comparisons in EF Core queries.
    /// Using date.Date alone creates a DateTime with Kind=Unspecified which PostgreSQL/Npgsql rejects.
    /// </summary>
    /// <param name="date">The date to normalize</param>
    /// <returns>A DateTime with the date portion and Kind=Utc</returns>
    public static DateTime ToUtcDate(this DateTime date)
    {
        return DateTime.SpecifyKind(date.Date, DateTimeKind.Utc);
    }

    /// <summary>
    /// Normalizes a nullable DateTime to UTC date at midnight.
    /// </summary>
    /// <param name="date">The nullable date to normalize</param>
    /// <returns>A nullable DateTime with the date portion and Kind=Utc, or null if input is null</returns>
    public static DateTime? ToUtcDate(this DateTime? date)
    {
        return date.HasValue ? DateTime.SpecifyKind(date.Value.Date, DateTimeKind.Utc) : null;
    }
}
