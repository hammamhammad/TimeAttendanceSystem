using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Monthly job that syncs benefit enrollment employee contributions to PayrollAdjustment
/// for the current open payroll period. Creates deduction adjustments for active enrollments.
/// </summary>
public class BenefitDeductionSyncJob : IInvocable
{
    private readonly IApplicationDbContext _context;

    public BenefitDeductionSyncJob(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Invoke()
    {
        var today = DateTime.UtcNow.Date;

        // Find open payroll periods
        var openPeriods = await _context.PayrollPeriods
            .Where(x => x.Status == PayrollPeriodStatus.Draft && !x.IsDeleted)
            .ToListAsync();

        if (!openPeriods.Any())
        {
            Console.WriteLine("BenefitDeductionSync: No open payroll periods found");
            return;
        }

        var synced = 0;

        foreach (var period in openPeriods)
        {
            // Get active enrollments with employee contributions
            var activeEnrollments = await _context.BenefitEnrollments
                .AsNoTracking()
                .Include(x => x.BenefitPlan)
                .Where(x => x.Status == BenefitEnrollmentStatus.Active
                    && x.EmployeeMonthlyContribution > 0
                    && x.EffectiveDate <= period.EndDate
                    && (x.TerminationDate == null || x.TerminationDate >= period.StartDate)
                    && !x.IsDeleted)
                .ToListAsync();

            foreach (var enrollment in activeEnrollments)
            {
                // Check if deduction already exists for this enrollment in this period
                var existingAdjustment = await _context.PayrollAdjustments
                    .AnyAsync(x => x.PayrollPeriodId == period.Id
                        && x.EmployeeId == enrollment.EmployeeId
                        && x.AdjustmentType == PayrollAdjustmentType.InsuranceDeduction
                        && x.Description.Contains($"BenefitEnrollment:{enrollment.Id}")
                        && !x.IsDeleted);

                if (existingAdjustment)
                    continue;

                var adjustment = new PayrollAdjustment
                {
                    PayrollPeriodId = period.Id,
                    EmployeeId = enrollment.EmployeeId,
                    AdjustmentType = PayrollAdjustmentType.InsuranceDeduction,
                    Description = $"Benefit: {enrollment.BenefitPlan.Name} (BenefitEnrollment:{enrollment.Id})",
                    DescriptionAr = enrollment.BenefitPlan.NameAr != null
                        ? $"مزايا: {enrollment.BenefitPlan.NameAr} (BenefitEnrollment:{enrollment.Id})"
                        : null,
                    Amount = -enrollment.EmployeeMonthlyContribution, // Negative = deduction
                    IsRecurring = true,
                    Reason = "Automatic benefit deduction",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                };

                _context.PayrollAdjustments.Add(adjustment);
                synced++;
            }
        }

        if (synced > 0)
        {
            await _context.SaveChangesAsync(default);
            Console.WriteLine($"BenefitDeductionSync: Created {synced} payroll deduction(s) for benefit enrollments");
        }
        else
        {
            Console.WriteLine("BenefitDeductionSync: No new deductions to sync");
        }
    }
}
