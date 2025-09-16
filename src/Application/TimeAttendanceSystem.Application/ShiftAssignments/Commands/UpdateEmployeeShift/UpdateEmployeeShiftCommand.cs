using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.ShiftAssignments.Commands.UpdateEmployeeShift;

/// <summary>
/// Command for updating an employee's current shift assignment.
/// This command handles the logic of deactivating the current assignment and creating a new one.
/// </summary>
/// <remarks>
/// This command provides a simplified interface for changing an employee's shift by:
/// - Deactivating any existing active shift assignments for the employee
/// - Creating a new active shift assignment with the specified shift
/// - Maintaining audit trail and proper effective dates
/// - Ensuring only one active shift assignment exists per employee
/// </remarks>
public record UpdateEmployeeShiftCommand(
    /// <summary>
    /// The employee identifier whose shift is being updated.
    /// </summary>
    long EmployeeId,

    /// <summary>
    /// The new shift identifier to assign to the employee.
    /// Must reference an active shift in the system.
    /// </summary>
    long NewShiftId,

    /// <summary>
    /// The date when the new shift assignment becomes effective.
    /// Defaults to today if not specified.
    /// </summary>
    DateTime? EffectiveDate = null,

    /// <summary>
    /// Optional notes about the shift change.
    /// </summary>
    string? Notes = null
) : ICommand<Result<bool>>;