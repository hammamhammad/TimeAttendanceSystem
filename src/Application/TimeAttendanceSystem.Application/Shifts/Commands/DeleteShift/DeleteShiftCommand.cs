using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Commands.DeleteShift;

/// <summary>
/// Command for soft deleting a shift from the system.
/// Implements soft delete to preserve audit trails and referential integrity.
/// </summary>
public record DeleteShiftCommand(long Id) : ICommand<Result>;