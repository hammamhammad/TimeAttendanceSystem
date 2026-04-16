namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Utilities for parsing tenant-configured CSV threshold strings (e.g. "30,15,7" for
/// contract expiry alert windows). Rejects malformed entries silently (warns via return),
/// never throws — a background job must never crash because an admin typed a bad value.
/// </summary>
internal static class BackgroundJobSettingsHelper
{
    /// <summary>
    /// Parses a CSV list of positive integers. Returns <paramref name="fallback"/> when the
    /// input is null / empty / entirely invalid.
    /// </summary>
    public static int[] ParseCsvDays(string? csv, int[] fallback)
    {
        if (string.IsNullOrWhiteSpace(csv)) return fallback;

        var parts = csv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var parsed = new List<int>();
        foreach (var p in parts)
        {
            if (int.TryParse(p, out var n) && n > 0 && n <= 3650)
                parsed.Add(n);
        }

        return parsed.Count == 0 ? fallback : parsed.Distinct().OrderByDescending(x => x).ToArray();
    }
}
