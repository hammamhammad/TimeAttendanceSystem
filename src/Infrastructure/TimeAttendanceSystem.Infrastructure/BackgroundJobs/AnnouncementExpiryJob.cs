using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that finds Published announcements past their ExpiryDate
/// and sets them to Expired status.
/// </summary>
public class AnnouncementExpiryJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AnnouncementExpiryJob> _logger;

    public AnnouncementExpiryJob(IApplicationDbContext context, ILogger<AnnouncementExpiryJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting announcement expiry job at {Time}", DateTime.UtcNow);

        try
        {
            var now = DateTime.UtcNow;

            var expiredAnnouncements = await _context.Announcements
                .Where(a => a.Status == AnnouncementStatus.Published
                    && a.ExpiryDate != null
                    && a.ExpiryDate <= now
                    && !a.IsDeleted)
                .ToListAsync();

            if (!expiredAnnouncements.Any())
            {
                _logger.LogDebug("No expired announcements to process");
                return;
            }

            foreach (var announcement in expiredAnnouncements)
            {
                announcement.Status = AnnouncementStatus.Expired;
                announcement.ModifiedAtUtc = now;
                announcement.ModifiedBy = "SYSTEM";
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Expired {Count} announcements past their expiry date", expiredAnnouncements.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running announcement expiry job");
            throw;
        }
    }
}
