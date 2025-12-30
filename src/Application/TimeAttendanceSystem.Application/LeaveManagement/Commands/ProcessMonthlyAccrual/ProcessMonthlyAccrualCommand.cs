using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.ProcessMonthlyAccrual;

/// <summary>
/// CQRS command for processing monthly leave accrual for all eligible employees.
/// Executes automated monthly accrual calculations based on entitlements and policies.
/// </summary>
/// <param name="Year">Calendar year for accrual processing (required)</param>
/// <param name="Month">Month number (1-12) for accrual processing (required)</param>
/// <param name="EmployeeId">Optional employee ID to process specific employee only (null = all employees)</param>
/// <remarks>
/// Command Behavior:
/// - When EmployeeId is null: Processes accrual for ALL eligible employees
/// - When EmployeeId is specified: Processes accrual for that specific employee only
/// - Typically executed by background job on the first day of each month
/// - Can be manually triggered by HR administrators for corrections
///
/// Validation Rules:
/// - Year must be valid (2000-2100)
/// - Month must be 1-12
/// - EmployeeId if provided must reference existing active employee
/// - Accrual month should not be in the future
/// - Prevents duplicate processing for same month/year
///
/// Business Rules:
/// - Only accrues for employees with active entitlements
/// - Respects LeaveAccrualPolicy configurations
/// - Prorates for mid-year hires based on policy
/// - Respects minimum service months requirements
/// - Does not exceed entitled annual days
/// - Creates transaction record for audit trail
///
/// Security Considerations:
/// - User must have leave accrual management permissions (manual trigger)
/// - Background job executes with system privileges
/// - Audit trail created for all accrual operations
/// - Branch access validation for manual employee-specific processing
///
/// Integration Points:
/// - Calls LeaveAccrualService for calculation logic
/// - Updates LeaveBalance records
/// - Creates LeaveTransaction audit records
/// - Integrates with employee hire date for proration
/// - Respects vacation type accrual policies
///
/// Response Information:
/// - Returns Result&lt;int&gt; with count of employees processed
/// - Provides summary of successful and failed operations
/// - Includes detailed error messages for troubleshooting
/// - Logs comprehensive information for monitoring
/// </remarks>
public record ProcessMonthlyAccrualCommand(
    int Year,
    int Month,
    long? EmployeeId = null
) : IRequest<Result<int>>;
