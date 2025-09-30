using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.UpdateEmployeeVacation;

/// <summary>
/// CQRS command for updating an existing employee vacation record.
/// Handles vacation period modification with validation and attendance integration.
/// </summary>
/// <param name="Id">Unique identifier of the vacation to update</param>
/// <param name="VacationTypeId">Vacation type identifier for categorization</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="IsApproved">Whether vacation is approved (affects attendance)</param>
/// <param name="Notes">Optional notes about the vacation</param>
/// <remarks>
/// Command Processing:
/// - Validates vacation exists and belongs to requesting user's scope
/// - Validates vacation type exists and is active
/// - Checks for overlapping vacation periods (excluding current vacation)
/// - Updates vacation record with new values
/// - Recalculates total days from new date range
/// - Updates attendance records based on approval status changes
///
/// Business Rules Enforced:
/// - Vacation must exist and not be soft deleted
/// - End date must be after or equal to start date
/// - No overlapping vacations for same employee (excluding current)
/// - Vacation type must be active
/// - Total days recalculated automatically
///
/// Integration Effects:
/// - Approval status changes update attendance records
/// - Date changes update affected attendance records
/// - Previous attendance records reverted if vacation dates change
/// - New attendance records created for new vacation dates
/// </remarks>
public record UpdateEmployeeVacationCommand(
    long Id,
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved,
    string? Notes = null
) : IRequest<Result>;