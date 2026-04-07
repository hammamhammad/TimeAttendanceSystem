using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Commands.CreateScheduledReport;

/// <summary>
/// Handler for creating a new scheduled report.
/// Validates the parent report exists and the user has ownership.
/// </summary>
public class CreateScheduledReportCommandHandler : BaseHandler<CreateScheduledReportCommand, Result<long>>
{
    public CreateScheduledReportCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateScheduledReportCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.CronExpression))
        {
            return Result.Failure<long>("Cron expression is required");
        }

        if (string.IsNullOrWhiteSpace(request.EmailRecipients))
        {
            return Result.Failure<long>("At least one email recipient is required");
        }

        // Validate the parent report exists
        var report = await Context.CustomReportDefinitions
            .FirstOrDefaultAsync(r => r.Id == request.CustomReportDefinitionId && !r.IsDeleted, cancellationToken);

        if (report == null)
        {
            return Result.Failure<long>("Custom report not found");
        }

        // Verify ownership or admin
        if (!CurrentUser.IsSystemAdmin && report.CreatedByUserId != CurrentUser.UserId)
        {
            return Result.Failure<long>("You do not have permission to schedule this report");
        }

        var scheduledReport = new ScheduledReport
        {
            CustomReportDefinitionId = request.CustomReportDefinitionId,
            CronExpression = request.CronExpression.Trim(),
            EmailRecipients = request.EmailRecipients.Trim(),
            Format = request.Format,
            IsActive = request.IsActive,
            NextRunAt = CalculateNextRunAt(request.CronExpression.Trim()),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "System"
        };

        Context.ScheduledReports.Add(scheduledReport);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(scheduledReport.Id);
    }

    /// <summary>
    /// Calculates the next run time based on a simplified cron expression.
    /// Supports common patterns: daily, weekly, monthly.
    /// </summary>
    private static DateTime? CalculateNextRunAt(string cronExpression)
    {
        var now = DateTime.UtcNow;

        // Simple cron pattern matching for common schedules
        // Format: minute hour dayOfMonth month dayOfWeek
        var parts = cronExpression.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length < 5)
        {
            // Default to next day at midnight if cron is not parseable
            return now.Date.AddDays(1);
        }

        var minute = parts[0] == "*" ? 0 : int.TryParse(parts[0], out var m) ? m : 0;
        var hour = parts[1] == "*" ? 0 : int.TryParse(parts[1], out var h) ? h : 0;

        // Daily schedule (day-of-month and day-of-week are *)
        if (parts[2] == "*" && parts[4] == "*")
        {
            var next = now.Date.AddHours(hour).AddMinutes(minute);
            if (next <= now) next = next.AddDays(1);
            return next;
        }

        // Monthly schedule (specific day-of-month)
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

        // Weekly schedule (specific day-of-week)
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

        // Fallback: next day
        return now.Date.AddDays(1).AddHours(hour).AddMinutes(minute);
    }
}
