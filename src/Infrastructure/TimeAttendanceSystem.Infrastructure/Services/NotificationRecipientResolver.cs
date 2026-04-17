using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

public sealed class NotificationRecipientResolver : INotificationRecipientResolver
{
    private static readonly string[] DefaultRoles = { "HRManager", "SystemAdmin" };

    private readonly IApplicationDbContext _context;
    private readonly ILogger<NotificationRecipientResolver> _logger;

    public NotificationRecipientResolver(IApplicationDbContext context, ILogger<NotificationRecipientResolver> logger)
    {
        _context = context;
        _logger = logger;
    }

    public Task<IReadOnlyList<long>> GetRecipientUserIdsAsync(CancellationToken ct = default)
        => GetRecipientUserIdsAsync(Array.Empty<string>(), ct);

    public async Task<IReadOnlyList<long>> GetRecipientUserIdsAsync(IEnumerable<string> extraRoles, CancellationToken ct = default)
    {
        var settings = await _context.CompanySettings
            .AsNoTracking()
            .FirstOrDefaultAsync(s => !s.IsDeleted, ct);

        var configured = ParseRoles(settings?.NotificationRecipientRolesCsv);
        var extras = extraRoles?.Where(r => !string.IsNullOrWhiteSpace(r)).Select(r => r.Trim()) ?? Array.Empty<string>();

        var roles = configured
            .Concat(extras)
            .Where(r => !string.IsNullOrWhiteSpace(r))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (roles.Length == 0)
        {
            _logger.LogWarning("NotificationRecipientResolver: no roles resolved; using hardcoded default set.");
            roles = DefaultRoles;
        }

        // Case-insensitive set membership (SQL generation is OK with Contains + ToUpper on both sides for postgres).
        var rolesUpper = roles.Select(r => r.ToUpperInvariant()).ToArray();

        var userIds = await _context.UserRoles
            .AsNoTracking()
            .Where(ur => rolesUpper.Contains(ur.Role.Name.ToUpper()))
            .Select(ur => ur.UserId)
            .Distinct()
            .ToListAsync(ct);

        return userIds;
    }

    private static string[] ParseRoles(string? csv)
    {
        if (string.IsNullOrWhiteSpace(csv)) return DefaultRoles;
        var parsed = csv
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(r => !string.IsNullOrWhiteSpace(r))
            .ToArray();
        return parsed.Length == 0 ? DefaultRoles : parsed;
    }
}
