using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 2 (v14.2) completion: Evaluates <c>BenefitEligibilityRule</c> rows for a prospective
/// enrollment. Called during enrollment creation so ineligible employees cannot enroll in a plan.
///
/// Rule semantics (one row per rule, all active rules on a plan must pass — AND-logic):
///   - <c>ServiceLength</c>: months since <c>Employee.HireDate</c> must be &gt;= <c>MinServiceMonths</c>.
///   - <c>JobGrade</c>: <c>Employee.JobGrade.Level</c> must satisfy the (inclusive) bounds in
///     <c>MinJobGradeLevel</c> and/or <c>MaxJobGradeLevel</c>.
///   - <c>EmploymentStatus</c>: <c>Employee.EmploymentStatus</c> must equal <c>EmploymentStatusRequired</c>.
///   - <c>ContractType</c>: employee's currently effective contract's <c>ContractType</c> must equal
///     <c>ContractTypeRequired</c>.
///   - <c>Department</c>: <c>Employee.DepartmentId</c> must equal <c>DepartmentId</c>.
///   - <c>Branch</c>: <c>Employee.BranchId</c> must equal <c>BranchId</c>.
///
/// If a plan has no active eligibility rules, the employee is eligible (documented behaviour —
/// explicit opt-in model: rules must be configured to restrict access).
/// Missing employee data the rule needs (e.g. JobGrade rule but employee has no grade) is
/// reported as an explicit eligibility failure rather than silently passing.
/// </summary>
public interface IBenefitEligibilityEvaluator
{
    /// <summary>
    /// Evaluate all active eligibility rules on the plan against the employee.
    /// Aggregates every violation so HR sees all issues at once.
    /// </summary>
    Task<Result> EvaluateAsync(long employeeId, long benefitPlanId, CancellationToken ct = default);
}
