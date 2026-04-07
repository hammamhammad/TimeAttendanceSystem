using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that finds Scheduled announcements past their ScheduledPublishDate
/// and sets them to Published status.
/// </summary>
public class AnnouncementSchedulerJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AnnouncementSchedulerJob> _logger;

    public AnnouncementSchedulerJob(IApplicationDbContext context, ILogger<AnnouncementSchedulerJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting announcement scheduler job at {Time}", DateTime.UtcNow);

        try
        {
            var now = DateTime.UtcNow;

            var scheduledAnnouncements = await _context.Announcements
                .Where(a => a.Status == AnnouncementStatus.Scheduled
                    && a.ScheduledPublishDate != null
                    && a.ScheduledPublishDate <= now
                    && !a.IsDeleted)
                .ToListAsync();

            if (!scheduledAnnouncements.Any())
            {
                _logger.LogDebug("No scheduled announcements to publish");
                return;
            }

            foreach (var announcement in scheduledAnnouncements)
            {
                announcement.Status = AnnouncementStatus.Published;
                announcement.PublishedAt = now;
                announcement.ModifiedAtUtc = now;
                announcement.ModifiedBy = "SYSTEM";
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Published {Count} scheduled announcements", scheduledAnnouncements.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running announcement scheduler job");
            throw;
        }
    }
}
