using System.Text.Json;

namespace TecAxle.Hrms.Application.Authorization.Services;

/// <summary>
/// Progressive login-lockout escalation policy. Represents an ordered list of tiers where
/// hitting a given number of failed attempts triggers a specific lockout duration.
/// Pre-v13.3 behavior (for tenant users): 5→15min, 10→1h, 15→24h.
/// Stored serialized in <c>CompanySettings.LoginLockoutPolicyJson</c>.
/// </summary>
public sealed record LoginLockoutPolicy(IReadOnlyList<LockoutTier> Tiers)
{
    public static readonly LoginLockoutPolicy Default = new(new[]
    {
        new LockoutTier(5, 15),
        new LockoutTier(10, 60),
        new LockoutTier(15, 1440),
    });

    /// <summary>
    /// Returns the lockout duration (as <see cref="TimeSpan"/>) that should apply given the
    /// current number of failed attempts, or null when no tier has been reached.
    /// Tiers are evaluated highest-first so hitting tier N chooses the biggest lockout.
    /// </summary>
    public TimeSpan? GetLockoutForAttempts(int failedAttempts)
    {
        foreach (var tier in Tiers.OrderByDescending(t => t.FailedAttempts))
        {
            if (failedAttempts >= tier.FailedAttempts)
                return TimeSpan.FromMinutes(tier.LockoutMinutes);
        }
        return null;
    }

    public static LoginLockoutPolicy ParseOrDefault(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return Default;

        try
        {
            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.ValueKind != JsonValueKind.Array) return Default;

            var tiers = new List<LockoutTier>();
            foreach (var item in doc.RootElement.EnumerateArray())
            {
                if (item.TryGetProperty("attempts", out var a) && item.TryGetProperty("minutes", out var m))
                {
                    var attempts = a.GetInt32();
                    var minutes = m.GetInt32();
                    if (attempts > 0 && minutes > 0 && minutes <= 14 * 24 * 60)
                        tiers.Add(new LockoutTier(attempts, minutes));
                }
            }

            if (tiers.Count == 0) return Default;
            return new LoginLockoutPolicy(tiers);
        }
        catch
        {
            return Default;
        }
    }
}

/// <summary>A single tier of the progressive lockout policy.</summary>
public sealed record LockoutTier(int FailedAttempts, int LockoutMinutes);
