using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that auto-creates the next timesheet period for each branch
/// when the current period is nearing its end. Runs daily.
/// </summary>
public class TimesheetPeriodGenerationJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<TimesheetPeriodGenerationJob> _logger;

    public TimesheetPeriodGenerationJob(
        IApplicationDbContext context,
        ILogger<TimesheetPeriodGenerationJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting timesheet period generation job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Get all branches
            var branches = await _context.Branches
                .Where(b => !b.IsDeleted)
                .Select(b => new { b.Id, b.Name })
                .ToListAsync();

            var periodsCreated = 0;

            foreach (var branch in branches)
            {
                // Find the latest open or closed period for this branch
                var latestPeriod = await _context.TimesheetPeriods
                    .Where(p => p.BranchId == branch.Id && !p.IsDeleted)
                    .OrderByDescending(p => p.EndDate)
                    .FirstOrDefaultAsync();

                if (latestPeriod == null)
                    continue; // No periods configured for this branch yet - skip

                // Check if the latest period ends within the next 7 days and no future period exists
                if (latestPeriod.EndDate <= today.AddDays(7))
                {
                    // Calculate next period dates based on period type
                    DateTime nextStart = latestPeriod.EndDate.AddDays(1);
                    DateTime nextEnd;
                    int deadlineDaysAfterEnd;

                    switch (latestPeriod.PeriodType)
                    {
                        case TimesheetPeriodType.Weekly:
                            nextEnd = nextStart.AddDays(6);
                            deadlineDaysAfterEnd = 2;
                            break;
                        case TimesheetPeriodType.BiWeekly:
                            nextEnd = nextStart.AddDays(13);
                            deadlineDaysAfterEnd = 3;
                            break;
                        case TimesheetPeriodType.Monthly:
                        default:
                            nextEnd = nextStart.AddMonths(1).AddDays(-1);
                            deadlineDaysAfterEnd = 5;
                            break;
                    }

                    // Check that next period doesn't already exist
                    var nextExists = await _context.TimesheetPeriods
                        .AnyAsync(p => p.BranchId == branch.Id
                            && p.PeriodType == latestPeriod.PeriodType
                            && p.StartDate == nextStart
                            && !p.IsDeleted);

                    if (!nextExists)
                    {
                        var nextPeriod = new TimesheetPeriod
                        {
                            BranchId = branch.Id,
                            Name = $"{latestPeriod.PeriodType} - {nextStart:yyyy-MM-dd} to {nextEnd:yyyy-MM-dd}",
                            PeriodType = latestPeriod.PeriodType,
                            StartDate = nextStart,
                            EndDate = nextEnd,
                            SubmissionDeadline = nextEnd.AddDays(deadlineDaysAfterEnd),
                            Status = TimesheetPeriodStatus.Open,
                            IsActive = true,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };

                        _context.TimesheetPeriods.Add(nextPeriod);
                        periodsCreated++;

                        _logger.LogInformation(
                            "Created timesheet period for branch {BranchName}: {Start} to {End}",
                            branch.Name, nextStart, nextEnd);
                    }
                }
            }

            if (periodsCreated > 0)
            {
                await _context.SaveChangesAsync(default);
            }

            _logger.LogInformation("Timesheet period generation completed. Created {Count} periods", periodsCreated);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running timesheet period generation job");
            throw;
        }
    }
}
