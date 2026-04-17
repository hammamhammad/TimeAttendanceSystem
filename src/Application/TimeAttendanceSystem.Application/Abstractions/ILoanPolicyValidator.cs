using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 2 (v14.2) completion: Server-side enforcement of <c>LoanPolicy</c> constraints that
/// were persisted but never validated. Called by the loan-submission path so draft loans cannot
/// pass into Pending state when they violate the employee's effective policy.
///
/// Constraints enforced (only those already in the domain model):
///   - <c>MaxConcurrentLoans</c>: count of the employee's existing Active/Pending/Approved
///     (non-soft-deleted, non-fully-paid) loans must be less than the policy limit.
///   - <c>MinServiceMonths</c>: calendar months since <c>Employee.HireDate</c> must be &gt;=
///     the policy minimum. Employees still in probation can't take a loan that requires more
///     service than they have.
///   - <c>MaxPercentageOfSalary</c>: requested amount must be &lt;= (current EmployeeSalary
///     base × max-percent / 100). Resolves the employee's *current* salary via
///     <c>EmployeeSalary.IsCurrent=true</c>; if none is present, returns a clear validation
///     failure rather than silently passing.
///
/// Policy resolution order:
///   1. The <c>loan.LoanPolicyId</c> if the caller specified one explicitly.
///   2. The active branch-scoped policy for the loan type (<c>Branch.Id = employee.BranchId</c>).
///   3. The active org-wide policy for the loan type (<c>BranchId = null</c>).
///   4. No policy → returns success (no constraints to enforce, by design).
/// </summary>
public interface ILoanPolicyValidator
{
    /// <summary>
    /// Validate a loan application against its effective policy. Pass-through (<c>Result.Success</c>)
    /// when no policy is resolvable OR all constraints hold. Aggregates every violation into the
    /// error message so the caller can show all issues at once.
    /// </summary>
    Task<Result> ValidateAsync(long loanApplicationId, CancellationToken ct = default);
}
