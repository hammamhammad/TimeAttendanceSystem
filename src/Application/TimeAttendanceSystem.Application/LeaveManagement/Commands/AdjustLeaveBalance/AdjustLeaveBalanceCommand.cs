using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.AdjustLeaveBalance;

/// <summary>
/// CQRS command for manually adjusting employee leave balance.
/// Allows HR administrators to make corrections or special adjustments to leave balances.
/// </summary>
/// <param name="EmployeeId">ID of the employee whose balance will be adjusted (required)</param>
/// <param name="VacationTypeId">ID of the vacation type to adjust (required)</param>
/// <param name="Year">Calendar year for the balance adjustment (required)</param>
/// <param name="AdjustmentDays">Number of days to adjust (positive = add, negative = subtract) (required)</param>
/// <param name="Reason">Reason for the adjustment (required for audit trail)</param>
/// <remarks>
/// Command Purpose:
/// - Manual correction of balance errors
/// - Special leave grants (e.g., discretionary leave)
/// - Balance adjustments for policy changes
/// - Corrections for system migrations
/// - Compensation for system issues
///
/// Validation Rules:
/// - EmployeeId must reference existing active employee
/// - VacationTypeId must reference existing active vacation type
/// - Year must be valid (2000-2100)
/// - AdjustmentDays can be positive or negative but not zero
/// - AdjustmentDays must not result in negative balance
/// - Reason must be provided and meaningful (min 10 characters)
/// - Leave balance must exist for the employee/type/year
///
/// Business Rules:
/// - Adjustment is added to the AdjustedDays field in LeaveBalance
/// - Creates audit transaction record for full traceability
/// - Does not affect accrued or used days directly
/// - Affects current balance calculation (AccruedDays + AdjustedDays - UsedDays - PendingDays)
/// - Requires administrative privileges
/// - Cannot result in negative total balance
///
/// Security Considerations:
/// - User must have leave balance adjustment permissions
/// - Branch access validated through employee's branch
/// - Full audit trail with user attribution
/// - Reason required for accountability
/// - Changes are permanent and tracked
///
/// Integration Points:
/// - Updates LeaveBalance.AdjustedDays field
/// - Creates LeaveTransaction with type Adjustment
/// - Validates sufficient balance after adjustment
/// - Integrates with audit logging system
/// - Affects employee leave balance display and validation
///
/// Response Information:
/// - Returns Result&lt;bool&gt; indicating success
/// - Provides detailed error messages for validation failures
/// - Includes new balance information in success message
/// - Supports localized error messages
/// </remarks>
public record AdjustLeaveBalanceCommand(
    long EmployeeId,
    long VacationTypeId,
    int Year,
    decimal AdjustmentDays,
    string Reason
) : IRequest<Result<bool>>;
