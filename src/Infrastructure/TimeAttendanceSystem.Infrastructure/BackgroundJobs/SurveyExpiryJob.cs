using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that closes active survey distributions that have passed
/// their end date and marks pending participants as Expired. Runs hourly.
/// </summary>
public class SurveyExpiryJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<SurveyExpiryJob> _logger;

    public SurveyExpiryJob(IApplicationDbContext context, ILogger<SurveyExpiryJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting survey expiry job at {Time}", DateTime.UtcNow);

        try
        {
            var now = DateTime.UtcNow;

            var expiredDistributions = await _context.SurveyDistributions
                .Where(d => d.Status == SurveyDistributionStatus.Active
                    && d.EndDate <= now
                    && !d.IsDeleted)
                .ToListAsync();

            if (!expiredDistributions.Any())
            {
                _logger.LogDebug("No expired survey distributions to close");
                return;
            }

            foreach (var distribution in expiredDistributions)
            {
                distribution.Status = SurveyDistributionStatus.Closed;
                distribution.ModifiedAtUtc = now;
                distribution.ModifiedBy = "SYSTEM";

                // Mark pending participants as Expired
                var pendingParticipants = await _context.SurveyParticipants
                    .Where(p => p.SurveyDistributionId == distribution.Id
                        && (p.Status == SurveyParticipantStatus.Invited || p.Status == SurveyParticipantStatus.Started)
                        && !p.IsDeleted)
                    .ToListAsync();

                foreach (var participant in pendingParticipants)
                {
                    participant.Status = SurveyParticipantStatus.Expired;
                    participant.ModifiedAtUtc = now;
                    participant.ModifiedBy = "SYSTEM";
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Closed {Count} expired survey distributions", expiredDistributions.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running survey expiry job");
            throw;
        }
    }
}
