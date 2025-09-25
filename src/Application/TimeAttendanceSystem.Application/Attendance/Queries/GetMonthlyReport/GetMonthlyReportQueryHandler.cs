using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.Attendance.Queries.GetMonthlyReport;

public class GetMonthlyReportQueryHandler : BaseHandler<GetMonthlyReportQuery, Result<MonthlyReportResponse>>
{
    public GetMonthlyReportQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<MonthlyReportResponse>> Handle(GetMonthlyReportQuery request, CancellationToken cancellationToken)
    {
        var startDate = new DateTime(request.Year, request.Month, 1);
        var endDate = startDate.AddMonths(1).AddDays(-1);

        var query = Context.AttendanceRecords
            .Include(ar => ar.Employee)
                .ThenInclude(e => e.Department)
            .Include(ar => ar.Employee)
                .ThenInclude(e => e.Branch)
            .Where(ar => ar.AttendanceDate >= startDate && ar.AttendanceDate <= endDate);

        if (request.BranchIds != null && request.BranchIds.Any())
        {
            query = query.Where(ar => request.BranchIds.Contains((int)ar.Employee.BranchId));
        }

        if (request.DepartmentIds != null && request.DepartmentIds.Any())
        {
            query = query.Where(ar => request.DepartmentIds.Contains((int)ar.Employee.DepartmentId));
        }

        if (request.EmployeeIds != null && request.EmployeeIds.Any())
        {
            query = query.Where(ar => request.EmployeeIds.Contains((int)ar.EmployeeId));
        }

        var attendanceRecords = await query.ToListAsync(cancellationToken);

        var employeeRecords = attendanceRecords
            .GroupBy(ar => ar.EmployeeId)
            .Select(g => new MonthlyEmployeeRecord
            {
                EmployeeId = (int)g.Key,
                EmployeeName = $"{g.First().Employee.FirstName} {g.First().Employee.LastName}",
                EmployeeNumber = g.First().Employee.EmployeeNumber,
                Department = g.First().Employee.Department?.Name ?? "N/A",
                Branch = g.First().Employee.Branch?.Name,
                TotalWorkingDays = GetWorkingDaysInMonth(request.Year, request.Month),
                PresentDays = g.Count(ar => ar.Status == AttendanceStatus.Present || ar.Status == AttendanceStatus.Late || ar.Status == AttendanceStatus.Overtime),
                AbsentDays = g.Count(ar => ar.Status == AttendanceStatus.Absent),
                LateDays = g.Count(ar => ar.Status == AttendanceStatus.Late),
                OvertimeDays = g.Count(ar => ar.OvertimeHours > 0),
                TotalWorkingHours = g.Sum(ar => ar.WorkingHours),
                TotalOvertimeHours = g.Sum(ar => ar.OvertimeHours),
                AttendanceRate = GetWorkingDaysInMonth(request.Year, request.Month) > 0
                    ? (decimal)g.Count(ar => ar.Status == AttendanceStatus.Present || ar.Status == AttendanceStatus.Late || ar.Status == AttendanceStatus.Overtime) / GetWorkingDaysInMonth(request.Year, request.Month) * 100
                    : 0,
                PerfectAttendance = g.All(ar => ar.Status == AttendanceStatus.Present || ar.Status == AttendanceStatus.Overtime) && !g.Any(ar => ar.Status == AttendanceStatus.Absent || ar.Status == AttendanceStatus.Late)
            })
            .ToList();

        var totalEmployees = employeeRecords.Count;
        var workingDays = GetWorkingDaysInMonth(request.Year, request.Month);

        var summaryStatistics = new MonthlyReportStatistics
        {
            TotalEmployees = totalEmployees,
            TotalPresentDays = employeeRecords.Sum(er => er.PresentDays),
            TotalAbsentDays = employeeRecords.Sum(er => er.AbsentDays),
            TotalLateDays = employeeRecords.Sum(er => er.LateDays),
            TotalOvertimeDays = employeeRecords.Sum(er => er.OvertimeDays),
            TotalOvertimeHours = employeeRecords.Sum(er => er.TotalOvertimeHours),
            AverageWorkingHours = totalEmployees > 0 ? employeeRecords.Average(er => er.TotalWorkingHours) : 0,
            AverageAttendanceRate = totalEmployees > 0 ? employeeRecords.Average(er => er.AttendanceRate) : 0,
            PerfectAttendanceEmployees = employeeRecords.Count(er => er.PerfectAttendance)
        };

        var dailyBreakdown = Enumerable.Range(0, (endDate - startDate).Days + 1)
            .Select(offset => startDate.AddDays(offset))
            .Select(date => new DailyBreakdown
            {
                Date = date,
                PresentEmployees = attendanceRecords.Count(ar => ar.AttendanceDate.Date == date.Date && (ar.Status == AttendanceStatus.Present || ar.Status == AttendanceStatus.Late || ar.Status == AttendanceStatus.Overtime)),
                AbsentEmployees = attendanceRecords.Count(ar => ar.AttendanceDate.Date == date.Date && ar.Status == AttendanceStatus.Absent),
                LateEmployees = attendanceRecords.Count(ar => ar.AttendanceDate.Date == date.Date && ar.Status == AttendanceStatus.Late),
                TotalOvertimeHours = attendanceRecords.Where(ar => ar.AttendanceDate.Date == date.Date).Sum(ar => ar.OvertimeHours)
            })
            .ToList();

        var response = new MonthlyReportResponse
        {
            Period = new MonthlyReportPeriod
            {
                StartDate = startDate,
                EndDate = endDate
            },
            Summary = new MonthlyReportSummary
            {
                TotalEmployees = totalEmployees,
                TotalWorkingDays = workingDays,
                TotalPresentDays = summaryStatistics.TotalPresentDays,
                TotalAbsentDays = summaryStatistics.TotalAbsentDays
            },
            SummaryStatistics = summaryStatistics,
            EmployeeRecords = employeeRecords,
            DailyBreakdown = dailyBreakdown
        };

        return Result<MonthlyReportResponse>.Success(response);
    }

    private int GetWorkingDaysInMonth(int year, int month)
    {
        var date = new DateTime(year, month, 1);
        var lastDay = new DateTime(year, month, DateTime.DaysInMonth(year, month));
        var workingDays = 0;

        for (var currentDate = date; currentDate <= lastDay; currentDate = currentDate.AddDays(1))
        {
            if (currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
            {
                workingDays++;
            }
        }

        return workingDays;
    }
}