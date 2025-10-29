using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;

/// <summary>
/// Query to get employee dashboard data
/// </summary>
public record GetEmployeeDashboardQuery : IRequest<Result<EmployeeDashboardDto>>;

/// <summary>
/// Handler for GetEmployeeDashboardQuery
/// </summary>
public class GetEmployeeDashboardQueryHandler : BaseHandler<GetEmployeeDashboardQuery, Result<EmployeeDashboardDto>>
{
    public GetEmployeeDashboardQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<EmployeeDashboardDto>> Handle(
        GetEmployeeDashboardQuery request,
        CancellationToken cancellationToken)
    {
        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await Context.EmployeeUserLinks
            .Include(eul => eul.Employee)
                .ThenInclude(e => e.Branch)
            .Include(eul => eul.Employee)
                .ThenInclude(e => e.Department)
            .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

        if (employeeLink == null)
            return Result.Failure<EmployeeDashboardDto>("Employee not found for current user");

        var employee = employeeLink.Employee;

        var now = DateTime.UtcNow;
        var currentMonth = new DateTime(now.Year, now.Month, 1);
        var lastMonth = currentMonth.AddMonths(-1);

        // Get attendance stats for current month
        var currentMonthAttendance = await Context.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id &&
                       a.AttendanceDate >= currentMonth &&
                       a.AttendanceDate < currentMonth.AddMonths(1) &&
                       !a.IsDeleted)
            .ToListAsync(cancellationToken);

        // Get last month attendance for trend calculation
        var lastMonthAttendance = await Context.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id &&
                       a.AttendanceDate >= lastMonth &&
                       a.AttendanceDate < currentMonth &&
                       !a.IsDeleted)
            .ToListAsync(cancellationToken);

        // Calculate attendance rate
        var totalWorkingDays = currentMonthAttendance.Count;
        var presentDays = currentMonthAttendance.Count(a => a.Status == AttendanceStatus.Present ||
                                                             a.Status == AttendanceStatus.Late ||
                                                             a.Status == AttendanceStatus.EarlyLeave);
        var attendanceRate = totalWorkingDays > 0
            ? Math.Round((decimal)presentDays / totalWorkingDays * 100, 1)
            : 0;

        // Calculate last month attendance rate for trend
        var lastMonthTotalDays = lastMonthAttendance.Count;
        var lastMonthPresentDays = lastMonthAttendance.Count(a => a.Status == AttendanceStatus.Present ||
                                                                   a.Status == AttendanceStatus.Late ||
                                                                   a.Status == AttendanceStatus.EarlyLeave);
        var lastMonthRate = lastMonthTotalDays > 0
            ? (decimal)lastMonthPresentDays / lastMonthTotalDays * 100
            : 0;

        var attendanceTrend = Math.Round(attendanceRate - lastMonthRate, 1);

        // Calculate working hours and overtime
        var totalWorkingHours = currentMonthAttendance.Sum(a => a.WorkingHours);
        var totalOvertimeHours = currentMonthAttendance.Sum(a =>
            a.PreShiftOvertimeHours + a.PostShiftOvertimeHours);

        // Get vacation balance (assuming 30 days annual)
        var usedVacationDays = await Context.EmployeeVacations
            .Where(v => v.EmployeeId == employee.Id &&
                       v.IsApproved &&
                       v.StartDate.Year == now.Year &&
                       !v.IsDeleted)
            .SumAsync(v => v.TotalDays, cancellationToken);

        var remainingVacationDays = 30 - usedVacationDays; // TODO: Make annual vacation days configurable

        // Get pending requests count
        var pendingVacations = await Context.EmployeeVacations
            .CountAsync(v => v.EmployeeId == employee.Id &&
                           !v.IsApproved &&
                           !v.IsDeleted,
                       cancellationToken);

        var pendingExcuses = await Context.EmployeeExcuses
            .CountAsync(e => e.EmployeeId == employee.Id &&
                           e.ApprovalStatus == Domain.Excuses.ApprovalStatus.Pending &&
                           !e.IsDeleted,
                       cancellationToken);

        // Build recent activity timeline
        var recentActivity = new List<ActivityDto>();

        // Add recent attendance records (last 5)
        var recentAttendanceActivities = currentMonthAttendance
            .OrderByDescending(a => a.AttendanceDate)
            .Take(5)
            .Select(a => new ActivityDto
            {
                Type = "Attendance",
                Description = $"Attended on {a.AttendanceDate:MMM dd, yyyy} - {a.WorkingHours:F1}h worked",
                Timestamp = a.CreatedAtUtc,
                Icon = GetAttendanceIcon(a.Status),
                Variant = GetAttendanceVariant(a.Status)
            });

        recentActivity.AddRange(recentAttendanceActivities);

        // Add recent vacation requests (last 3)
        var recentVacations = await Context.EmployeeVacations
            .Where(v => v.EmployeeId == employee.Id && !v.IsDeleted)
            .OrderByDescending(v => v.CreatedAtUtc)
            .Take(3)
            .Select(v => new ActivityDto
            {
                Type = "Vacation",
                Description = $"Vacation request from {v.StartDate:MMM dd} to {v.EndDate:MMM dd} - {(v.IsApproved ? "Approved" : "Pending")}",
                Timestamp = v.CreatedAtUtc,
                Icon = "fa-umbrella-beach",
                Variant = v.IsApproved ? "success" : "warning"
            })
            .ToListAsync(cancellationToken);

        recentActivity.AddRange(recentVacations);

        // Add recent excuse requests (last 3)
        var recentExcuses = await Context.EmployeeExcuses
            .Where(e => e.EmployeeId == employee.Id && !e.IsDeleted)
            .OrderByDescending(e => e.CreatedAtUtc)
            .Take(3)
            .Select(e => new ActivityDto
            {
                Type = "Excuse",
                Description = $"Excuse request for {e.ExcuseDate:MMM dd} - {e.ApprovalStatus}",
                Timestamp = e.CreatedAtUtc,
                Icon = "fa-comment-medical",
                Variant = GetExcuseStatusVariant(e.ApprovalStatus)
            })
            .ToListAsync(cancellationToken);

        recentActivity.AddRange(recentExcuses);

        // Build and return DTO
        var dto = new EmployeeDashboardDto
        {
            EmployeeId = employee.Id,
            EmployeeName = $"{employee.FirstName} {employee.LastName}",
            AttendanceRate = attendanceRate,
            AttendanceTrend = attendanceTrend,
            TotalWorkingHours = Math.Round(totalWorkingHours, 1),
            TotalOvertimeHours = Math.Round(totalOvertimeHours, 1),
            RemainingVacationDays = remainingVacationDays,
            PendingRequestsCount = pendingVacations + pendingExcuses,
            RecentActivity = recentActivity
                .OrderByDescending(a => a.Timestamp)
                .Take(10)
                .ToList()
        };

        return Result.Success(dto);
    }

    private static string GetAttendanceIcon(AttendanceStatus status)
    {
        return status switch
        {
            AttendanceStatus.Present => "fa-check-circle",
            AttendanceStatus.Absent => "fa-times-circle",
            AttendanceStatus.Late => "fa-clock",
            AttendanceStatus.EarlyLeave => "fa-door-open",
            AttendanceStatus.OnLeave => "fa-umbrella-beach",
            _ => "fa-calendar"
        };
    }

    private static string GetAttendanceVariant(AttendanceStatus status)
    {
        return status switch
        {
            AttendanceStatus.Present => "success",
            AttendanceStatus.Absent => "danger",
            AttendanceStatus.Late => "warning",
            AttendanceStatus.EarlyLeave => "warning",
            AttendanceStatus.OnLeave => "info",
            _ => "secondary"
        };
    }

    private static string GetExcuseStatusVariant(Domain.Excuses.ApprovalStatus status)
    {
        return status switch
        {
            Domain.Excuses.ApprovalStatus.Approved => "success",
            Domain.Excuses.ApprovalStatus.Rejected => "danger",
            Domain.Excuses.ApprovalStatus.Pending => "warning",
            _ => "info"
        };
    }
}
