using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 2 (v14.2) completion: production implementation of <see cref="ILoanPolicyValidator"/>.
/// See the interface for enforcement rules + policy resolution order.
/// </summary>
public sealed class LoanPolicyValidator : ILoanPolicyValidator
{
    private readonly IApplicationDbContext _db;

    public LoanPolicyValidator(IApplicationDbContext db) => _db = db;

    public async Task<Result> ValidateAsync(long loanApplicationId, CancellationToken ct = default)
    {
        var loan = await _db.LoanApplications
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == loanApplicationId && !l.IsDeleted, ct);

        if (loan == null)
            return Result.Failure("Loan application not found.");

        var employee = await _db.Employees
            .AsNoTracking()
            .Where(e => e.Id == loan.EmployeeId && !e.IsDeleted)
            .Select(e => new { e.Id, e.BranchId, e.HireDate })
            .FirstOrDefaultAsync(ct);

        if (employee == null)
            return Result.Failure("Employee not found.");

        // Resolve effective policy: explicit > branch-scoped > org-wide.
        LoanPolicy? policy = null;
        if (loan.LoanPolicyId.HasValue)
        {
            policy = await _db.LoanPolicies.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == loan.LoanPolicyId.Value && p.IsActive && !p.IsDeleted, ct);
        }
        if (policy == null)
        {
            var matching = await _db.LoanPolicies.AsNoTracking()
                .Where(p => p.LoanTypeId == loan.LoanTypeId
                         && p.IsActive
                         && !p.IsDeleted
                         && (p.BranchId == employee.BranchId || p.BranchId == null))
                .OrderByDescending(p => p.BranchId != null) // branch-specific first
                .ToListAsync(ct);
            policy = matching.FirstOrDefault();
        }

        // No policy → nothing to enforce (documented as pass-through).
        if (policy == null) return Result.Success();

        var violations = new List<string>();

        // --- Rule 1: MaxConcurrentLoans ---
        if (policy.MaxConcurrentLoans > 0)
        {
            var active = await _db.LoanApplications.AsNoTracking()
                .CountAsync(l => l.EmployeeId == employee.Id
                              && l.Id != loan.Id
                              && !l.IsDeleted
                              && (l.Status == LoanApplicationStatus.Active
                                  || l.Status == LoanApplicationStatus.Approved
                                  || l.Status == LoanApplicationStatus.Pending), ct);
            if (active >= policy.MaxConcurrentLoans)
            {
                violations.Add(
                    $"Employee already has {active} active/pending loan(s); policy allows at most {policy.MaxConcurrentLoans}.");
            }
        }

        // --- Rule 2: MinServiceMonths ---
        if (policy.MinServiceMonths > 0)
        {
            var monthsOfService = MonthsBetween(employee.HireDate, DateTime.UtcNow.Date);
            if (monthsOfService < policy.MinServiceMonths)
            {
                violations.Add(
                    $"Employee has {monthsOfService} months of service; policy requires at least {policy.MinServiceMonths}.");
            }
        }

        // --- Rule 3: MaxPercentageOfSalary ---
        if (policy.MaxPercentageOfSalary > 0 && loan.RequestedAmount > 0)
        {
            var currentSalary = await _db.EmployeeSalaries.AsNoTracking()
                .Where(s => s.EmployeeId == employee.Id && s.IsCurrent && !s.IsDeleted)
                .OrderByDescending(s => s.EffectiveDate)
                .Select(s => (decimal?)s.BaseSalary)
                .FirstOrDefaultAsync(ct);

            if (!currentSalary.HasValue || currentSalary.Value <= 0)
            {
                violations.Add("Employee has no current salary record; cannot evaluate MaxPercentageOfSalary.");
            }
            else
            {
                var maxAllowed = Math.Round(
                    currentSalary.Value * policy.MaxPercentageOfSalary / 100m,
                    2, MidpointRounding.AwayFromZero);
                if (loan.RequestedAmount > maxAllowed)
                {
                    violations.Add(
                        $"Requested amount {loan.RequestedAmount:0.00} exceeds policy limit: {policy.MaxPercentageOfSalary}% of current salary ({currentSalary.Value:0.00}) = {maxAllowed:0.00}.");
                }
            }
        }

        return violations.Count == 0
            ? Result.Success()
            : Result.Failure("Loan policy violations: " + string.Join(" ", violations));
    }

    private static int MonthsBetween(DateTime from, DateTime to)
    {
        if (to < from) return 0;
        var months = ((to.Year - from.Year) * 12) + (to.Month - from.Month);
        if (to.Day < from.Day) months--;
        return Math.Max(0, months);
    }
}
