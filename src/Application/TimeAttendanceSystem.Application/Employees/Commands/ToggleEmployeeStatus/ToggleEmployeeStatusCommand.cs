using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.ToggleEmployeeStatus;

/// <summary>
/// Command to toggle employee active/inactive status
/// </summary>
public record ToggleEmployeeStatusCommand : IRequest<Result<bool>>
{
    /// <summary>
    /// Employee ID to toggle status
    /// </summary>
    public long Id { get; init; }
}
