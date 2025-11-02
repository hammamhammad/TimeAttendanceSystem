using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.UpdateEmployee;

public record UpdateEmployeeCommand : IRequest<Result<Unit>>
{
    public long Id { get; init; }
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string? FirstNameAr { get; init; }
    public string? LastNameAr { get; init; }
    public string? NationalId { get; init; }
    public string? Email { get; init; }
    public string? Phone { get; init; }
    public DateTime? DateOfBirth { get; init; }
    public Gender? Gender { get; init; }
    // Note: HireDate is immutable and should not be updated after employee creation
    public EmploymentStatus EmploymentStatus { get; init; }
    public string JobTitle { get; init; } = string.Empty;
    public string? JobTitleAr { get; init; }
    public long? DepartmentId { get; init; }
    public long? ManagerEmployeeId { get; init; }
    public WorkLocationType WorkLocationType { get; init; }
    public string? PhotoUrl { get; init; }
}