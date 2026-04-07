using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Attendance.Queries.GetMonthlyReport;

[RequiresModule(SystemModule.TimeAttendance, AllowReadWhenDisabled = true)]
public record GetMonthlyReportQuery(
    int Month,
    int Year,
    List<int>? BranchIds = null,
    List<int>? DepartmentIds = null,
    List<int>? EmployeeIds = null
) : IRequest<Result<MonthlyReportResponse>>;