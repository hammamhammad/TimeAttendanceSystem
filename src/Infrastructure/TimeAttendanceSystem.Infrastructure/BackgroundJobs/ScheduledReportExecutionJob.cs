using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that processes scheduled reports whose NextRunAt has passed.
/// Currently implements the scheduling framework only - logs execution rather than
/// generating actual report output.
/// </summary>
public class ScheduledReportExecutionJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<ScheduledReportExecutionJob> _logger;

    public ScheduledReportExecutionJob(IApplicationDbContext context, ILogger<ScheduledReportExecutionJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        var now = DateTime.UtcNow;

        var dueSchedules = await _context.ScheduledReports
            .Include(s => s.CustomReportDefinition)
            .Where(s => s.IsActive
                && !s.IsDeleted
                && s.NextRunAt.HasValue
                && s.NextRunAt.Value <= now
                && !s.CustomReportDefinition.IsDeleted)
            .ToListAsync();

        if (!dueSchedules.Any())
        {
            return;
        }

        _logger.LogInformation("Processing {Count} due scheduled report(s)", dueSchedules.Count);

        foreach (var schedule in dueSchedules)
        {
            try
            {
                _logger.LogInformation(
                    "Executing scheduled report: {ScheduleId} for report '{ReportName}' (format: {Format}, recipients: {Recipients})",
                    schedule.Id,
                    schedule.CustomReportDefinition.Name,
                    schedule.Format,
                    schedule.EmailRecipients
                );

                // TODO: Implement actual report generation and email delivery here
                // For now, we just update the scheduling metadata

                schedule.LastRunAt = now;
                schedule.LastRunStatus = "Completed";
                schedule.NextRunAt = CalculateNextRunAt(schedule.CronExpression);
                schedule.ModifiedAtUtc = now;
                schedule.ModifiedBy = "SYSTEM";

                _logger.LogInformation(
                    "Scheduled report {ScheduleId} executed successfully. Next run at: {NextRunAt}",
                    schedule.Id,
                    schedule.NextRunAt
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to execute scheduled report {ScheduleId}", schedule.Id);
                schedule.LastRunAt = now;
                schedule.LastRunStatus = $"Failed: {ex.Message}";
                schedule.ModifiedAtUtc = now;
                schedule.ModifiedBy = "SYSTEM";
            }
        }

        await _context.SaveChangesAsync(default);

        _logger.LogInformation("Completed processing {Count} scheduled report(s)", dueSchedules.Count);
    }

    /// <summary>
    /// Calculates the next run time based on a simplified cron expression.
    /// </summary>
    private static DateTime? CalculateNextRunAt(string cronExpression)
    {
        var now = DateTime.UtcNow;
        var parts = cronExpression.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length < 5)
        {
            return now.Date.AddDays(1);
        }

        var minute = parts[0] == "*" ? 0 : int.TryParse(parts[0], out var m) ? m : 0;
        var hour = parts[1] == "*" ? 0 : int.TryParse(parts[1], out var h) ? h : 0;

        // Daily schedule
        if (parts[2] == "*" && parts[4] == "*")
        {
            var next = now.Date.AddHours(hour).AddMinutes(minute);
            if (next <= now) next = next.AddDays(1);
            return next;
        }

        // Monthly schedule
        if (parts[2] != "*" && int.TryParse(parts[2], out var dayOfMonth))
        {
            var next = new DateTime(now.Year, now.Month, Math.Min(dayOfMonth, DateTime.DaysInMonth(now.Year, now.Month)), hour, minute, 0, DateTimeKind.Utc);
            if (next <= now)
            {
                var nextMonth = now.AddMonths(1);
                next = new DateTime(nextMonth.Year, nextMonth.Month, Math.Min(dayOfMonth, DateTime.DaysInMonth(nextMonth.Year, nextMonth.Month)), hour, minute, 0, DateTimeKind.Utc);
            }
            return next;
        }

        // Weekly schedule
        if (parts[4] != "*" && int.TryParse(parts[4], out var dayOfWeek))
        {
            var targetDay = (DayOfWeek)dayOfWeek;
            var daysUntilTarget = ((int)targetDay - (int)now.DayOfWeek + 7) % 7;
            if (daysUntilTarget == 0 && now.TimeOfDay >= new TimeSpan(hour, minute, 0))
            {
                daysUntilTarget = 7;
            }
            return now.Date.AddDays(daysUntilTarget).AddHours(hour).AddMinutes(minute);
        }

        return now.Date.AddDays(1).AddHours(hour).AddMinutes(minute);
    }
}
