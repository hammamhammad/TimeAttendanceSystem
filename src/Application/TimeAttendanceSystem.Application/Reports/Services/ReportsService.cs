using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Reports.DTOs;
using TimeAttendanceSystem.Application.Reports.Queries;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Reports.Services;

public interface IReportsService
{
    Task<AttendanceReportSummary> GetAttendanceReportAsync(ReportFilter filter);
    Task<byte[]> GetAttendanceReportCsvAsync(ReportFilter filter);
    Task<LeaveReportSummary> GetLeaveReportAsync(ReportFilter filter);
}

public class ReportsService : IReportsService
{
    private readonly IApplicationDbContext _context;

    public ReportsService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AttendanceReportSummary> GetAttendanceReportAsync(ReportFilter filter)
    {
        var query = _context.AttendanceRecords
            .Include(r => r.Employee)
                .ThenInclude(e => e.Department)
            .Include(r => r.ShiftAssignment)
                .ThenInclude(sa => sa.Shift)
            .Where(r => r.AttendanceDate >= filter.FromDate.Date && r.AttendanceDate <= filter.ToDate.Date);

        if (filter.BranchId.HasValue)
            query = query.Where(r => r.Employee.BranchId == filter.BranchId.Value);

        if (filter.DepartmentId.HasValue)
            query = query.Where(r => r.Employee.DepartmentId == filter.DepartmentId.Value);

        if (filter.EmployeeId.HasValue)
            query = query.Where(r => r.EmployeeId == filter.EmployeeId.Value);

        var records = await query.ToListAsync();

        var items = records.Select(r => new AttendanceReportItem
        {
            EmployeeId = r.EmployeeId,
            EmployeeName = r.Employee.FullName,
            DepartmentName = r.Employee.Department?.Name ?? "N/A",
            Date = r.AttendanceDate,
            ShiftName = r.ShiftAssignment?.Shift?.Name ?? "N/A",
            CheckIn = r.ActualCheckInTime?.TimeOfDay,
            CheckOut = r.ActualCheckOutTime?.TimeOfDay,
            Status = r.Status.ToString(),
            WorkedHours = (double)r.WorkingHours,
            LateMinutes = r.LateMinutes,
            OvertimeMinutes = (int)(r.OvertimeHours * 60), // Convert decimal hours to minutes
            IsRegularHoliday = r.Status == AttendanceStatus.Holiday,
            IsPublicHoliday = r.Status == AttendanceStatus.Holiday,
            WeeklyRequiredHours = (double)(r.ShiftAssignment?.Shift?.RequiredWeeklyHours ?? 0)
        }).OrderBy(i => i.Date).ThenBy(i => i.EmployeeName).ToList();

        // Calculate Weekly Totals
        CalculateWeeklyStats(items);

        return new AttendanceReportSummary
        {
            Filter = filter,
            Items = items,
            TotalDays = items.Count,
            TotalPresent = items.Count(i => i.Status == AttendanceStatus.Present.ToString()),
            TotalAbsent = items.Count(i => i.Status == AttendanceStatus.Absent.ToString()),
            TotalLate = items.Count(i => i.LateMinutes > 0),
            TotalLeaves = items.Count(i => i.Status == AttendanceStatus.OnLeave.ToString())
        };
    }

    private void CalculateWeeklyStats(List<AttendanceReportItem> items)
    {
        var employeeGroups = items.GroupBy(i => i.EmployeeId);
        
        foreach (var empGroup in employeeGroups)
        {
            // Group by week (Sunday start)
            var weekGroups = empGroup.GroupBy(i => GetStartOfWeek(i.Date));
            
            foreach (var week in weekGroups)
            {
                var totalWorked = week.Sum(i => i.WorkedHours);
                // Use the maximum required hours found in the week (in case of shift change, take the higher requirement)
                var required = week.Max(i => i.WeeklyRequiredHours);
                
                var overtime = Math.Max(0, totalWorked - required);
                var shortage = Math.Max(0, required - totalWorked);
                
                // Only apply if there IS a requirement
                if (required <= 0)
                {
                    overtime = 0;
                    shortage = 0;
                }

                foreach (var item in week)
                {
                    item.WeeklyTotalHours = totalWorked;
                    item.WeeklyOvertimeHours = overtime;
                    item.WeeklyShortageHours = shortage;
                }
            }
        }
    }

    private DateTime GetStartOfWeek(DateTime dt)
    {
        int diff = (7 + (dt.DayOfWeek - DayOfWeek.Sunday)) % 7;
        return dt.Date.AddDays(-1 * diff);
    }

    public async Task<byte[]> GetAttendanceReportCsvAsync(ReportFilter filter)
    {
        var report = await GetAttendanceReportAsync(filter);
        var sb = new System.Text.StringBuilder();

        // Header
        sb.AppendLine("Date,Employee,Department,Shift,CheckIn,CheckOut,Worked(Hrs),Late(Min),Status,WeeklyTotal,WeeklyOT");

        foreach (var item in report.Items)
        {
            var checkIn = item.CheckIn.HasValue ? item.CheckIn.Value.ToString(@"hh\:mm") : "-";
            var checkOut = item.CheckOut.HasValue ? item.CheckOut.Value.ToString(@"hh\:mm") : "-";
            var weeklyTotal = item.WeeklyTotalHours.ToString("F1");
            var weeklyOt = item.WeeklyOvertimeHours > 0 ? $"+{item.WeeklyOvertimeHours:F1}" : (item.WeeklyShortageHours > 0 ? $"-{item.WeeklyShortageHours:F1}" : "0");

            sb.AppendLine($"{item.Date:yyyy-MM-dd},{EscapeCsv(item.EmployeeName)},{EscapeCsv(item.DepartmentName)},{EscapeCsv(item.ShiftName)},{checkIn},{checkOut},{item.WorkedHours:F2},{item.LateMinutes},{item.Status},{weeklyTotal},{weeklyOt}");
        }

        return System.Text.Encoding.UTF8.GetBytes(sb.ToString());
    }

    private string EscapeCsv(string field)
    {
        if (string.IsNullOrEmpty(field)) return "";
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n"))
        {
            return $"\"{field.Replace("\"", "\"\"")}\"";
        }
        return field;
    }

    public async Task<LeaveReportSummary> GetLeaveReportAsync(ReportFilter filter)
    {
        var query = _context.EmployeeVacations
            .Include(v => v.Employee)
                .ThenInclude(e => e.Department)
            .Include(v => v.VacationType)
            .Include(v => v.WorkflowInstance)
            .Where(v => v.StartDate <= filter.ToDate && v.EndDate >= filter.FromDate);

        if (filter.BranchId.HasValue)
            query = query.Where(v => v.Employee.BranchId == filter.BranchId.Value);

        if (filter.DepartmentId.HasValue)
            query = query.Where(v => v.Employee.DepartmentId == filter.DepartmentId.Value);

        if (filter.EmployeeId.HasValue)
            query = query.Where(v => v.EmployeeId == filter.EmployeeId.Value);

        var vacations = await query.ToListAsync();

        var items = vacations.Select(v => new LeaveReportItem
        {
            EmployeeId = v.EmployeeId,
            EmployeeName = v.Employee.FullName,
            DepartmentName = v.Employee.Department?.Name ?? "N/A",
            LeaveType = v.VacationType?.Name ?? "N/A",
            StartDate = v.StartDate,
            EndDate = v.EndDate,
            TotalDays = v.TotalDays,
            Status = v.WorkflowInstance != null ? v.WorkflowInstance.Status.ToString() : (v.IsApproved ? "Approved" : "Pending"),
            Reason = v.Notes ?? string.Empty
        }).OrderBy(i => i.StartDate).ToList();

        return new LeaveReportSummary
        {
            Filter = filter,
            Items = items,
            TotalRequests = items.Count,
            TotalApprovedDays = items.Where(i => i.Status == WorkflowStatus.Approved.ToString() || i.Status == "Approved").Sum(i => i.TotalDays)
        };
    }
}
