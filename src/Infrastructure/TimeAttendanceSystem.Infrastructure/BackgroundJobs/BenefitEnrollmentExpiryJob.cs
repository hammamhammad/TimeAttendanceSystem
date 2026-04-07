using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Daily job that terminates active benefit enrollments whose plan effective end date has passed
/// or whose explicit termination date has arrived.
/// </summary>
public class BenefitEnrollmentExpiryJob : IInvocable
{
    private readonly IApplicationDbContext _context;

    public BenefitEnrollmentExpiryJob(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Invoke()
    {
        var today = DateTime.UtcNow.Date;

        // Terminate enrollments where the plan's effective end date has passed
        var expiredEnrollments = await _context.BenefitEnrollments
            .Include(x => x.BenefitPlan)
            .Where(x => x.Status == BenefitEnrollmentStatus.Active
                && !x.IsDeleted
                && (x.BenefitPlan.EffectiveEndDate.Date < today
                    || (x.TerminationDate != null && x.TerminationDate.Value.Date <= today)))
            .ToListAsync();

        foreach (var enrollment in expiredEnrollments)
        {
            enrollment.Status = BenefitEnrollmentStatus.Terminated;
            enrollment.TerminationDate ??= today;
            enrollment.TerminationReason ??= "Plan effective period expired";
            enrollment.ModifiedAtUtc = DateTime.UtcNow;
            enrollment.ModifiedBy = "SYSTEM";
        }

        if (expiredEnrollments.Any())
        {
            await _context.SaveChangesAsync(default);
            Console.WriteLine($"BenefitEnrollmentExpiry: Terminated {expiredEnrollments.Count} expired enrollment(s)");
        }
    }
}
