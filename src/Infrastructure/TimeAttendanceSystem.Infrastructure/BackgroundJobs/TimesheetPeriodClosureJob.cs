using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that auto-closes timesheet periods whose submission deadline
/// has passed. Runs daily.
/// </summary>
public class TimesheetPeriodClosureJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<TimesheetPeriodClosureJob> _logger;

    public TimesheetPeriodClosureJob(
        IApplicationDbContext context,
        ILogger<TimesheetPeriodClosureJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting timesheet period closure job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Find open periods past their submission deadline
            var expiredPeriods = await _context.TimesheetPeriods
                .Where(p => p.Status == TimesheetPeriodStatus.Open
                    && !p.IsDeleted
                    && p.SubmissionDeadline.Date < today)
                .ToListAsync();

            if (!expiredPeriods.Any())
            {
                _logger.LogDebug("No timesheet periods to close");
                return;
            }

            foreach (var period in expiredPeriods)
            {
                period.Status = TimesheetPeriodStatus.Closed;
                period.ModifiedAtUtc = DateTime.UtcNow;
                period.ModifiedBy = "SYSTEM";

                _logger.LogInformation(
                    "Auto-closed timesheet period {PeriodId}: {PeriodName} (deadline was {Deadline})",
                    period.Id, period.Name, period.SubmissionDeadline);
            }

            await _context.SaveChangesAsync(default);

            _logger.LogInformation("Timesheet period closure completed. Closed {Count} periods", expiredPeriods.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running timesheet period closure job");
            throw;
        }
    }
}
