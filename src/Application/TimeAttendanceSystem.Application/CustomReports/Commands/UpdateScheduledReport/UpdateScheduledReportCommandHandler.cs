using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Commands.UpdateScheduledReport;

/// <summary>
/// Handler for updating an existing scheduled report.
/// Verifies ownership of the parent report or admin privileges.
/// </summary>
public class UpdateScheduledReportCommandHandler : BaseHandler<UpdateScheduledReportCommand, Result>
{
    public UpdateScheduledReportCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateScheduledReportCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.CronExpression))
        {
            return Result.Failure("Cron expression is required");
        }

        if (string.IsNullOrWhiteSpace(request.EmailRecipients))
        {
            return Result.Failure("At least one email recipient is required");
        }

        var schedule = await Context.ScheduledReports
            .Include(s => s.CustomReportDefinition)
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (schedule == null)
        {
            return Result.Failure("Scheduled report not found");
        }

        // Verify ownership of parent report or admin
        if (!CurrentUser.IsSystemAdmin && schedule.CustomReportDefinition.CreatedByUserId != CurrentUser.UserId)
        {
            return Result.Failure("You do not have permission to update this schedule");
        }

        schedule.CronExpression = request.CronExpression.Trim();
        schedule.EmailRecipients = request.EmailRecipients.Trim();
        schedule.Format = request.Format;
        schedule.IsActive = request.IsActive;
        schedule.NextRunAt = CalculateNextRunAt(request.CronExpression.Trim());
        schedule.ModifiedAtUtc = DateTime.UtcNow;
        schedule.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
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

        if (parts[2] == "*" && parts[4] == "*")
        {
            var next = now.Date.AddHours(hour).AddMinutes(minute);
            if (next <= now) next = next.AddDays(1);
            return next;
        }

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
