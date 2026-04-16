using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Attendance.Queries.GetMonthlyReport;

public record GetMonthlyReportQuery(
    int Month,
    int Year,
    List<int>? BranchIds = null,
    List<int>? DepartmentIds = null,
    List<int>? EmployeeIds = null
) : IRequest<Result<MonthlyReportResponse>>;