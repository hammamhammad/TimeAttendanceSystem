using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.ToggleEmployeeVacationStatus;

/// <summary>
/// CQRS command for toggling the approval status of an employee vacation record.
/// Switches between approved and pending states for vacation management.
/// </summary>
/// <param name="Id">Unique identifier of the vacation to toggle status</param>
/// <remarks>
/// Command Processing:
/// - Validates vacation exists and belongs to requesting user's scope
/// - Toggles IsApproved status (true becomes false, false becomes true)
/// - Updates attendance records based on new approval status
/// - Maintains audit trail of status changes
///
/// Business Rules Enforced:
/// - Vacation must exist and not be soft deleted
/// - User must have vacation approval permissions
/// - Attendance records updated to reflect approval status change
///
/// Integration Effects:
/// - Approval: Creates attendance records for vacation period
/// - Rejection: Removes/reverts attendance records for vacation period
/// - Audit log entry created for status change
/// </remarks>
public record ToggleEmployeeVacationStatusCommand(
    long Id
) : IRequest<Result>;