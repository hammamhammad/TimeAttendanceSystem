namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Resolves the set of user IDs who should receive system-generated HR notifications
/// (contract/visa/document expiry, PIP/PIP-expiry alerts, loan reminders, etc.) for the
/// current tenant. Replaces scattered hardcoded <c>Role.Name == "HR"</c> /
/// <c>"HRManager"</c> / <c>"Admin"</c> checks across background jobs and controllers.
/// </summary>
/// <remarks>
/// Resolution:
/// <list type="number">
///   <item>Reads <see cref="Domain.Company.CompanySettings.NotificationRecipientRolesCsv"/> —
///         a CSV of role names. Default "HRManager,SystemAdmin".</item>
///   <item>If the tenant row doesn't exist or the CSV is empty, falls back to
///         "HRManager,SystemAdmin" — preserves pre-v13.4 behavior.</item>
///   <item>Queries <c>UserRoles</c> joined to <c>Roles</c> where the role name is in the set;
///         returns distinct active user IDs.</item>
///   <item>Extra role names (e.g. "HR", "Admin") can be appended to the CSV without
///         code changes, which is the whole point of this indirection.</item>
/// </list>
/// </remarks>
public interface INotificationRecipientResolver
{
    /// <summary>
    /// Returns the user IDs that should receive HR notifications for the current tenant.
    /// Never returns null; returns empty when nothing resolves — callers must handle that
    /// (log-and-skip is the usual pattern in background jobs).
    /// </summary>
    Task<IReadOnlyList<long>> GetRecipientUserIdsAsync(CancellationToken ct = default);

    /// <summary>
    /// Like <see cref="GetRecipientUserIdsAsync"/> but accepts additional role names to
    /// include on top of the tenant-configured CSV. Used by callers (SuccessionPlan, Asset*)
    /// that historically added "Admin" to the recipient list — migrate them to the configured
    /// CSV and eventually drop the <paramref name="extraRoles"/> arg entirely.
    /// </summary>
    Task<IReadOnlyList<long>> GetRecipientUserIdsAsync(IEnumerable<string> extraRoles, CancellationToken ct = default);
}
