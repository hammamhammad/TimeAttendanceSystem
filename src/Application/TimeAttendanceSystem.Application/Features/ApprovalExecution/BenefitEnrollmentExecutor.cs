using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): On <see cref="BenefitEnrollment"/> approval, transitions status to
/// <c>Active</c> and flips <see cref="BenefitEnrollment.PayrollDeductionEnabled"/> so the
/// payroll engine includes <see cref="BenefitEnrollment.EmployeeMonthlyContribution"/>
/// as a payroll deduction line.
///
/// If the employee has no contribution (0), execution still succeeds — employer-only
/// coverage is valid — but no payroll deduction will be produced.
/// Idempotent.
/// </summary>
public sealed class BenefitEnrollmentExecutor : IApprovalExecutor
{
    private readonly IApplicationDbContext _db;
    public ApprovalExecutionTargetType TargetType => ApprovalExecutionTargetType.BenefitEnrollment;

    public BenefitEnrollmentExecutor(IApplicationDbContext db) => _db = db;

    public async Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default)
    {
        var e = await _db.BenefitEnrollments
            .Include(en => en.BenefitPlan)
            .FirstOrDefaultAsync(en => en.Id == requestId && !en.IsDeleted, ct);

        if (e == null)
            return ExecutionResult.NotReady("BenefitEnrollment not found.");

        if (e.IsExecuted && e.PayrollDeductionEnabled)
            return ExecutionResult.AlreadyExecuted(e.Id);

        if (e.Status != BenefitEnrollmentStatus.PendingApproval
            && e.Status != BenefitEnrollmentStatus.Pending
            && e.Status != BenefitEnrollmentStatus.Active)
            return ExecutionResult.NotReady($"Enrollment status is {e.Status}, must be Pending/PendingApproval/Active.");

        if (e.BenefitPlan == null || !e.BenefitPlan.IsActive)
            return ExecutionResult.ValidationFailed("InactivePlan",
                $"BenefitPlan #{e.BenefitPlanId} is missing or inactive.");
        if (e.EmployeeMonthlyContribution < 0)
            return ExecutionResult.ValidationFailed("InvalidContribution",
                "EmployeeMonthlyContribution cannot be negative.");

        e.Status = BenefitEnrollmentStatus.Active;
        e.PayrollDeductionEnabled = e.EmployeeMonthlyContribution > 0;

        e.IsExecuted = true;
        e.ExecutedAtUtc = DateTime.UtcNow;
        e.ExecutedByUserId = executingUserId;
        e.ExecutionError = null;
        e.ModifiedAtUtc = DateTime.UtcNow;
        e.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";

        await _db.SaveChangesAsync(ct);
        return ExecutionResult.Succeeded(e.Id,
            e.PayrollDeductionEnabled
                ? $"Enrollment active; payroll will deduct {e.EmployeeMonthlyContribution} {e.Currency}/month."
                : "Enrollment active (employer-paid; no payroll deduction).");
    }
}
