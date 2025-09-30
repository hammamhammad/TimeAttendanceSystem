using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateEmployeeVacation;

/// <summary>
/// CQRS command for creating a new employee vacation record.
/// Handles vacation period creation with validation and business rule enforcement.
/// </summary>
/// <param name="EmployeeId">Employee identifier for vacation assignment</param>
/// <param name="VacationTypeId">Vacation type identifier for categorization</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="IsApproved">Whether vacation is approved (affects attendance)</param>
/// <param name="Notes">Optional notes about the vacation</param>
/// <remarks>
/// Command Processing:
/// - Validates employee exists and is active
/// - Validates vacation type exists and is active
/// - Checks for overlapping vacation periods
/// - Calculates total days from date range
/// - Creates vacation record with business rule compliance
/// - Updates attendance records if approved
///
/// Business Rules Enforced:
/// - End date must be after or equal to start date
/// - No overlapping vacations for same employee
/// - Employee must be active
/// - Vacation type must be active
/// - Total days calculated automatically
///
/// Integration Effects:
/// - Approved vacations update attendance status to OnLeave
/// - Historical attendance records updated if vacation is in past
/// - Future attendance processing considers vacation periods
/// </remarks>
public record CreateEmployeeVacationCommand(
    long EmployeeId,
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved = true,
    string? Notes = null
) : IRequest<Result<long>>;