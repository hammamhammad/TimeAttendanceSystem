using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Attendance.Queries.GetMonthlyReport;

public record GetMonthlyReportQuery(
    int Month,
    int Year,
    List<int>? BranchIds = null,
    List<int>? DepartmentIds = null,
    List<int>? EmployeeIds = null
) : IRequest<Result<MonthlyReportResponse>>;