using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.SetLeaveEntitlement;

/// <summary>
/// CQRS command for setting or updating employee leave entitlement configuration.
/// Defines annual leave allocation, carry-over rules, and effective date ranges
/// with comprehensive validation and policy enforcement.
/// </summary>
/// <param name="EmployeeId">ID of the employee receiving the entitlement (required)</param>
/// <param name="VacationTypeId">ID of the vacation type being entitled (required)</param>
/// <param name="Year">Calendar year for this entitlement (required)</param>
/// <param name="AnnualDays">Total annual leave days entitled (required, must be > 0)</param>
/// <param name="CarryOverDays">Days carried over from previous year (optional, default 0)</param>
/// <param name="MaxCarryOverDays">Maximum days allowed to carry over (optional)</param>
/// <param name="ExpiresAtYearEnd">Whether unused leave expires at year end (default true)</param>
/// <param name="EffectiveStartDate">Date when entitlement becomes effective (optional, for mid-year hires)</param>
/// <param name="EffectiveEndDate">Date when entitlement ends (optional, for terminations)</param>
/// <param name="Notes">Administrative notes about the entitlement (optional)</param>
/// <remarks>
/// Command Validation Rules:
/// - EmployeeId must reference an existing active employee
/// - VacationTypeId must reference an existing active vacation type
/// - Year must be a valid 4-digit year (2000-2100)
/// - AnnualDays must be greater than 0 and reasonable (typically 0-90 days)
/// - CarryOverDays must be non-negative
/// - MaxCarryOverDays if provided must be >= CarryOverDays
/// - EffectiveStartDate if provided must be within the entitlement year
/// - EffectiveEndDate if provided must be >= EffectiveStartDate
/// - Unique constraint: One entitlement per employee per vacation type per year
///
/// Business Rules:
/// - Setting entitlement automatically creates/updates leave balance for the year
/// - If entitlement already exists for year, it will be updated (not duplicated)
/// - Carry-over days are typically set during year-end processing
/// - Proration applies if effective dates are within the year
/// - Changes to entitlement recalculate monthly accrual amounts
/// - Entitlement must align with vacation type's accrual policy
///
/// Security Considerations:
/// - User must have leave entitlement management permissions
/// - Branch access validated through employee's branch assignment
/// - Audit trail created for all entitlement changes
/// - Input validation prevents data integrity issues
/// - Changes to existing entitlements require justification in notes
///
/// Integration Points:
/// - Creates or updates LeaveEntitlement domain entity
/// - Automatically initializes corresponding LeaveBalance record
/// - Integrates with LeaveAccrualService for balance calculations
/// - Affects monthly accrual processing for the employee
/// - Supports year-end carry-over and balance reconciliation
///
/// Response Information:
/// - Returns Result&lt;long&gt; with entitlement ID on success
/// - Provides detailed error messages for validation failures
/// - Includes warnings for potential balance impacts
/// - Supports localized error messages based on user language
/// </remarks>
public record SetLeaveEntitlementCommand(
    long EmployeeId,
    long VacationTypeId,
    int Year,
    decimal AnnualDays,
    decimal CarryOverDays = 0,
    decimal? MaxCarryOverDays = null,
    bool ExpiresAtYearEnd = true,
    DateTime? EffectiveStartDate = null,
    DateTime? EffectiveEndDate = null,
    string? Notes = null
) : IRequest<Result<long>>;
