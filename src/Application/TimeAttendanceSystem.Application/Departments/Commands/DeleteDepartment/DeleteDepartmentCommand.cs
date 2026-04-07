using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Departments.Commands.DeleteDepartment;

public record DeleteDepartmentCommand(long Id) : ICommand<Result>;