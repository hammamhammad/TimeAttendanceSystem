using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that activates scheduled survey distributions
/// whose start date has passed. Runs hourly.
/// </summary>
public class SurveyDistributionActivatorJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<SurveyDistributionActivatorJob> _logger;

    public SurveyDistributionActivatorJob(IApplicationDbContext context, ILogger<SurveyDistributionActivatorJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting survey distribution activator job at {Time}", DateTime.UtcNow);

        try
        {
            var now = DateTime.UtcNow;

            var scheduledDistributions = await _context.SurveyDistributions
                .Where(d => d.Status == SurveyDistributionStatus.Scheduled
                    && d.StartDate <= now
                    && !d.IsDeleted)
                .ToListAsync();

            if (!scheduledDistributions.Any())
            {
                _logger.LogDebug("No scheduled survey distributions to activate");
                return;
            }

            foreach (var distribution in scheduledDistributions)
            {
                distribution.Status = SurveyDistributionStatus.Active;
                distribution.ModifiedAtUtc = now;
                distribution.ModifiedBy = "SYSTEM";
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Activated {Count} scheduled survey distributions", scheduledDistributions.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running survey distribution activator job");
            throw;
        }
    }
}
