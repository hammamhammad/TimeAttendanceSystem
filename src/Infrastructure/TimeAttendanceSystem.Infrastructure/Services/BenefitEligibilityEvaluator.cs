using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 2 (v14.2) completion: production implementation of <see cref="IBenefitEligibilityEvaluator"/>.
/// Every active rule on the plan is evaluated; violations are aggregated into a single error message.
/// </summary>
public sealed class BenefitEligibilityEvaluator : IBenefitEligibilityEvaluator
{
    private readonly IApplicationDbContext _db;

    public BenefitEligibilityEvaluator(IApplicationDbContext db) => _db = db;

    public async Task<Result> EvaluateAsync(long employeeId, long benefitPlanId, CancellationToken ct = default)
    {
        var employee = await _db.Employees.AsNoTracking()
            .Where(e => e.Id == employeeId && !e.IsDeleted)
            .Select(e => new
            {
                e.Id,
                e.BranchId,
                e.DepartmentId,
                e.HireDate,
                e.EmploymentStatus,
                e.JobGradeId
            })
            .FirstOrDefaultAsync(ct);

        if (employee == null)
            return Result.Failure("Employee not found.");

        var planExists = await _db.BenefitPlans.AsNoTracking()
            .AnyAsync(p => p.Id == benefitPlanId && p.IsActive && !p.IsDeleted, ct);
        if (!planExists)
            return Result.Failure("Benefit plan not found or inactive.");

        var rules = await _db.BenefitEligibilityRules.AsNoTracking()
            .Where(r => r.BenefitPlanId == benefitPlanId && r.IsActive && !r.IsDeleted)
            .ToListAsync(ct);

        // No rules configured → eligible (explicit opt-in model).
        if (rules.Count == 0) return Result.Success();

        // Data we may need — fetch lazily to keep the fast path cheap.
        int? jobGradeLevel = null;
        if (employee.JobGradeId.HasValue)
        {
            jobGradeLevel = await _db.JobGrades.AsNoTracking()
                .Where(g => g.Id == employee.JobGradeId.Value && !g.IsDeleted)
                .Select(g => (int?)g.Level)
                .FirstOrDefaultAsync(ct);
        }

        ContractType? effectiveContractType = null;
        if (rules.Any(r => r.RuleType == EligibilityRuleType.ContractType))
        {
            var today = DateTime.UtcNow.Date;
            effectiveContractType = await _db.EmployeeContracts.AsNoTracking()
                .Where(c => c.EmployeeId == employeeId && !c.IsDeleted
                         && c.StartDate.Date <= today
                         && (c.EndDate == null || c.EndDate.Value.Date >= today))
                .OrderByDescending(c => c.StartDate)
                .Select(c => (ContractType?)c.ContractType)
                .FirstOrDefaultAsync(ct);
        }

        var violations = new List<string>();

        foreach (var r in rules)
        {
            switch (r.RuleType)
            {
                case EligibilityRuleType.ServiceLength:
                    if (r.MinServiceMonths.HasValue && r.MinServiceMonths.Value > 0)
                    {
                        var months = MonthsBetween(employee.HireDate, DateTime.UtcNow.Date);
                        if (months < r.MinServiceMonths.Value)
                            violations.Add(
                                $"Service length {months} months is below the minimum {r.MinServiceMonths.Value} required by this plan.");
                    }
                    break;

                case EligibilityRuleType.JobGrade:
                    if (!jobGradeLevel.HasValue)
                    {
                        violations.Add("Employee has no JobGrade assigned; plan requires a specific grade range.");
                        break;
                    }
                    if (r.MinJobGradeLevel.HasValue && jobGradeLevel.Value < r.MinJobGradeLevel.Value)
                        violations.Add(
                            $"Employee job grade level {jobGradeLevel.Value} is below the minimum {r.MinJobGradeLevel.Value} required by this plan.");
                    if (r.MaxJobGradeLevel.HasValue && jobGradeLevel.Value > r.MaxJobGradeLevel.Value)
                        violations.Add(
                            $"Employee job grade level {jobGradeLevel.Value} exceeds the maximum {r.MaxJobGradeLevel.Value} allowed by this plan.");
                    break;

                case EligibilityRuleType.EmploymentStatus:
                    if (r.EmploymentStatusRequired.HasValue
                        && r.EmploymentStatusRequired.Value != employee.EmploymentStatus)
                    {
                        violations.Add(
                            $"Employee status {employee.EmploymentStatus} does not match required {r.EmploymentStatusRequired.Value}.");
                    }
                    break;

                case EligibilityRuleType.ContractType:
                    if (r.ContractTypeRequired.HasValue)
                    {
                        if (!effectiveContractType.HasValue)
                        {
                            violations.Add("Employee has no effective contract; plan requires a specific contract type.");
                        }
                        else if (effectiveContractType.Value != r.ContractTypeRequired.Value)
                        {
                            violations.Add(
                                $"Employee contract type {effectiveContractType.Value} does not match required {r.ContractTypeRequired.Value}.");
                        }
                    }
                    break;

                case EligibilityRuleType.Department:
                    if (r.DepartmentId.HasValue && r.DepartmentId.Value != employee.DepartmentId)
                    {
                        violations.Add(
                            $"Employee department does not match the department required by this plan (#{r.DepartmentId.Value}).");
                    }
                    break;

                case EligibilityRuleType.Branch:
                    if (r.BranchId.HasValue && r.BranchId.Value != employee.BranchId)
                    {
                        violations.Add(
                            $"Employee branch does not match the branch required by this plan (#{r.BranchId.Value}).");
                    }
                    break;
            }
        }

        return violations.Count == 0
            ? Result.Success()
            : Result.Failure("Benefit eligibility failed: " + string.Join(" ", violations));
    }

    private static int MonthsBetween(DateTime from, DateTime to)
    {
        if (to < from) return 0;
        var months = ((to.Year - from.Year) * 12) + (to.Month - from.Month);
        if (to.Day < from.Day) months--;
        return Math.Max(0, months);
    }
}
