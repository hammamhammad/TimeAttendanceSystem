using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Daily job that opens/closes open enrollment periods based on their start/end dates.
/// Scheduled periods whose start date has arrived are opened.
/// Open periods whose end date has passed are closed.
/// </summary>
public class OpenEnrollmentPeriodActivatorJob : IInvocable
{
    private readonly IApplicationDbContext _context;

    public OpenEnrollmentPeriodActivatorJob(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Invoke()
    {
        var today = DateTime.UtcNow.Date;

        // Open upcoming periods whose start date has arrived
        var periodsToOpen = await _context.OpenEnrollmentPeriods
            .Where(x => x.Status == EnrollmentPeriodStatus.Upcoming
                && x.StartDate.Date <= today
                && x.EndDate.Date >= today
                && x.IsActive
                && !x.IsDeleted)
            .ToListAsync();

        foreach (var period in periodsToOpen)
        {
            period.Status = EnrollmentPeriodStatus.Open;
            period.ModifiedAtUtc = DateTime.UtcNow;
            period.ModifiedBy = "SYSTEM";
        }

        // Close open periods whose end date has passed
        var periodsToClose = await _context.OpenEnrollmentPeriods
            .Where(x => x.Status == EnrollmentPeriodStatus.Open
                && x.EndDate.Date < today
                && !x.IsDeleted)
            .ToListAsync();

        foreach (var period in periodsToClose)
        {
            period.Status = EnrollmentPeriodStatus.Closed;
            period.ModifiedAtUtc = DateTime.UtcNow;
            period.ModifiedBy = "SYSTEM";
        }

        var totalChanged = periodsToOpen.Count + periodsToClose.Count;
        if (totalChanged > 0)
        {
            await _context.SaveChangesAsync(default);
            Console.WriteLine($"OpenEnrollmentPeriodActivator: Opened {periodsToOpen.Count}, Closed {periodsToClose.Count} enrollment period(s)");
        }
    }
}
