using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Employees.Commands.ToggleEmployeeStatus;

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
