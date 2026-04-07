using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Shifts.Commands.DeleteShift;

/// <summary>
/// Command for soft deleting a shift from the system.
/// Implements soft delete to preserve audit trails and referential integrity.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record DeleteShiftCommand(long Id) : ICommand<Result>;