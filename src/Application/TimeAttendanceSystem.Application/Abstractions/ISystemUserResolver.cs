namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Resolves the "system user" identifier for auto-created records (e.g. auto shift assignments,
/// background-job-produced data). Replaces the hardcoded <c>UserId = 1</c> fallback.
/// </summary>
/// <remarks>
/// Resolution order inside a tenant DB:
/// 1. A user with <c>IsSystemUser = true</c> (preferring the username "systemadmin" if multiple).
/// 2. The current authenticated user (if any).
/// 3. Throws — never returns an arbitrary ID and never silently falls back to 1.
/// Result is cached per process for 5 minutes because the system-user set is stable within a tenant.
/// </remarks>
public interface ISystemUserResolver
{
    /// <summary>
    /// Returns the User ID that should be used for records auto-created by the system within the
    /// current tenant context. Throws <see cref="InvalidOperationException"/> if no suitable user exists.
    /// </summary>
    Task<long> GetSystemUserIdAsync(CancellationToken ct = default);
}
