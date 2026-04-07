using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that synchronizes talent profile PerformanceRating from the latest completed performance review.
/// Runs monthly on the 1st.
/// </summary>
public class TalentProfileSyncJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<TalentProfileSyncJob> _logger;

    public TalentProfileSyncJob(IApplicationDbContext context, ILogger<TalentProfileSyncJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting talent profile sync job at {Time}", DateTime.UtcNow);

        try
        {
            var profiles = await _context.TalentProfiles
                .Where(x => x.IsActive && !x.IsDeleted)
                .ToListAsync();

            int syncedCount = 0;

            foreach (var profile in profiles)
            {
                // Get the latest completed/approved performance review for this employee
                var latestReview = await _context.PerformanceReviews
                    .Where(r => r.EmployeeId == profile.EmployeeId
                        && !r.IsDeleted
                        && r.FinalRating != null
                        && (r.Status == ReviewStatus.Approved || r.Status == ReviewStatus.Acknowledged))
                    .OrderByDescending(r => r.ApprovedDate ?? r.ManagerReviewDate ?? r.CreatedAtUtc)
                    .FirstOrDefaultAsync();

                if (latestReview != null && latestReview.FinalRating != null
                    && profile.PerformanceRating != latestReview.FinalRating)
                {
                    profile.PerformanceRating = latestReview.FinalRating;
                    profile.ModifiedAtUtc = DateTime.UtcNow;
                    profile.ModifiedBy = "SYSTEM";
                    syncedCount++;
                }
            }

            if (syncedCount > 0)
            {
                await _context.SaveChangesAsync(default);
            }

            _logger.LogInformation(
                "Talent profile sync job completed. Synced {Count} profiles out of {Total}",
                syncedCount, profiles.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running talent profile sync job");
            throw;
        }
    }
}
