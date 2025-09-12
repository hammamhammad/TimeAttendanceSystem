using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Commands.DeleteDepartment;

public record DeleteDepartmentCommand(long Id) : ICommand<Result>;