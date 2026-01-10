using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;

/// <summary>
/// Query to get employee dashboard data for self-service portal
/// </summary>
public record GetEmployeeDashboardQuery : IRequest<Result<EmployeeDashboardDto>>;

/// <summary>
/// Handler for GetEmployeeDashboardQuery
/// </summary>
public class GetEmployeeDashboardQueryHandler : IRequestHandler<GetEmployeeDashboardQuery, Result<EmployeeDashboardDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetEmployeeDashboardQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Result<EmployeeDashboardDto>> Handle(
        GetEmployeeDashboardQuery request,
        CancellationToken cancellationToken)
    {
        if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
        {
            return Result.Failure<EmployeeDashboardDto>("User not authenticated");
        }

        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
                .ThenInclude(e => e.Branch)
            .Include(eul => eul.Employee)
                .ThenInclude(e => e.Department)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId, cancellationToken);

        if (employeeLink == null)
        {
            return Result.Failure<EmployeeDashboardDto>("Employee profile not found for current user");
        }

        var employee = employeeLink.Employee;
        var now = DateTime.UtcNow;
        var today = now.Date;
        var currentMonthStart = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var nextMonthStart = currentMonthStart.AddMonths(1);
        var lastMonthStart = currentMonthStart.AddMonths(-1);

        var currentMonthAttendance = await _context.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id &&
                       a.AttendanceDate >= currentMonthStart &&
                       a.AttendanceDate < nextMonthStart &&
                       !a.IsDeleted)
            .ToListAsync(cancellationToken);

        // Get last month attendance for trend calculation
        var lastMonthAttendance = await _context.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id &&
                       a.AttendanceDate >= lastMonthStart &&
                       a.AttendanceDate < currentMonthStart &&
                       !a.IsDeleted)
            .ToListAsync(cancellationToken);

        // Calculate attendance rate
        var totalWorkingDays = currentMonthAttendance.Count;
        var presentDays = currentMonthAttendance.Count(a =>
            a.Status == AttendanceStatus.Present ||
            a.Status == AttendanceStatus.Late ||
            a.Status == AttendanceStatus.EarlyLeave);
        var attendanceRate = totalWorkingDays > 0
            ? Math.Round((decimal)presentDays / totalWorkingDays * 100, 1)
            : 0;

        // Calculate last month attendance rate for trend
        var lastMonthTotalDays = lastMonthAttendance.Count;
        var lastMonthPresentDays = lastMonthAttendance.Count(a =>
            a.Status == AttendanceStatus.Present ||
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

        // Get vacation balance from LeaveBalance table
        var remainingVacationDays = await _context.LeaveBalances
            .Where(lb => lb.EmployeeId == employee.Id && lb.Year == now.Year)
            .Select(lb => lb.CurrentBalance)
            .FirstOrDefaultAsync(cancellationToken);

        // Get pending requests count
        var pendingVacations = await _context.EmployeeVacations
            .CountAsync(v => v.EmployeeId == employee.Id &&
                           !v.IsApproved &&
                           !v.IsDeleted,
                       cancellationToken);

        var pendingExcuses = await _context.EmployeeExcuses
            .CountAsync(e => e.EmployeeId == employee.Id &&
                           e.ApprovalStatus == ApprovalStatus.Pending &&
                           !e.IsDeleted,
                       cancellationToken);

        var pendingRemoteWork = await _context.RemoteWorkRequests
            .CountAsync(r => r.EmployeeId == employee.Id &&
                           r.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Pending &&
                           !r.IsDeleted,
                       cancellationToken);

        // Build recent activity timeline
        var recentActivity = new List<ActivityDto>();

        // Add recent attendance records (last 5)
        var recentAttendanceActivities = currentMonthAttendance
            .OrderByDescending(a => a.AttendanceDate)
            .Take(5)
            .Select(a => new ActivityDto
            {
                EntityId = a.Id,
                Type = "Attendance",
                Description = $"Attended on {a.AttendanceDate:MMM dd, yyyy} - {a.WorkingHours:F1}h worked",
                Timestamp = a.CreatedAtUtc,
                Icon = GetAttendanceIcon(a.Status),
                Variant = GetAttendanceVariant(a.Status)
            });

        recentActivity.AddRange(recentAttendanceActivities);

        // Add recent vacation requests (last 3)
        var recentVacations = await _context.EmployeeVacations
            .Where(v => v.EmployeeId == employee.Id && !v.IsDeleted)
            .OrderByDescending(v => v.CreatedAtUtc)
            .Take(3)
            .Select(v => new ActivityDto
            {
                EntityId = v.Id,
                Type = "Vacation",
                Description = $"Vacation request from {v.StartDate:MMM dd} to {v.EndDate:MMM dd} - {(v.IsApproved ? "Approved" : "Pending")}",
                Timestamp = v.CreatedAtUtc,
                Icon = "fa-umbrella-beach",
                Variant = v.IsApproved ? "success" : "warning"
            })
            .ToListAsync(cancellationToken);

        recentActivity.AddRange(recentVacations);

        // Add recent excuse requests (last 3)
        var recentExcuses = await _context.EmployeeExcuses
            .Where(e => e.EmployeeId == employee.Id && !e.IsDeleted)
            .OrderByDescending(e => e.CreatedAtUtc)
            .Take(3)
            .Select(e => new ActivityDto
            {
                EntityId = e.Id,
                Type = "Excuse",
                Description = $"Excuse request for {e.ExcuseDate:MMM dd} - {e.ApprovalStatus}",
                Timestamp = e.CreatedAtUtc,
                Icon = "fa-comment-medical",
                Variant = GetExcuseStatusVariant(e.ApprovalStatus)
            })
            .ToListAsync(cancellationToken);

        recentActivity.AddRange(recentExcuses);

        // Add recent remote work requests (last 3)
        var recentRemoteWork = await _context.RemoteWorkRequests
            .Where(r => r.EmployeeId == employee.Id && !r.IsDeleted)
            .OrderByDescending(r => r.CreatedAtUtc)
            .Take(3)
            .Select(r => new ActivityDto
            {
                EntityId = r.Id,
                Type = "RemoteWork",
                Description = $"Remote work from {r.StartDate:MMM dd} to {r.EndDate:MMM dd} - {r.Status}",
                Timestamp = r.CreatedAtUtc,
                Icon = "fa-laptop",
                Variant = GetRemoteWorkStatusVariant(r.Status)
            })
            .ToListAsync(cancellationToken);

        recentActivity.AddRange(recentRemoteWork);

        // Get today's attendance
        var todayAttendance = await _context.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id && a.AttendanceDate.Date == today && !a.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        var todayVacation = await _context.EmployeeVacations
            .AnyAsync(v => v.EmployeeId == employee.Id &&
                          v.IsApproved &&
                          v.StartDate <= today &&
                          v.EndDate >= today &&
                          !v.IsDeleted, cancellationToken);

        // RemoteWorkRequest uses DateOnly for StartDate/EndDate
        var todayDateOnly = DateOnly.FromDateTime(now);
        var todayRemoteWork = await _context.RemoteWorkRequests
            .AnyAsync(r => r.EmployeeId == employee.Id &&
                          r.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Approved &&
                          r.StartDate <= todayDateOnly &&
                          r.EndDate >= todayDateOnly &&
                          !r.IsDeleted, cancellationToken);

        // Build and return DTO
        var dto = new EmployeeDashboardDto
        {
            EmployeeId = employee.Id,
            EmployeeName = $"{employee.FirstName} {employee.LastName}",
            EmployeeCode = employee.EmployeeNumber,
            DepartmentName = employee.Department?.Name,
            BranchName = employee.Branch?.Name,
            AttendanceRate = attendanceRate,
            AttendanceTrend = attendanceTrend,
            TotalWorkingHours = Math.Round(totalWorkingHours, 1),
            TotalOvertimeHours = Math.Round(totalOvertimeHours, 1),
            RemainingVacationDays = (int)remainingVacationDays,
            PendingRequestsCount = pendingVacations + pendingExcuses + pendingRemoteWork,
            RecentActivity = recentActivity
                .OrderByDescending(a => a.Timestamp)
                .Take(10)
                .ToList(),
            TodayAttendance = todayAttendance != null || todayVacation || todayRemoteWork
                ? new TodayAttendanceDto
                {
                    CheckInTime = todayAttendance?.ActualCheckInTime,
                    CheckOutTime = todayAttendance?.ActualCheckOutTime,
                    Status = todayVacation ? "OnVacation" :
                            todayRemoteWork ? "RemoteWork" :
                            todayAttendance?.Status.ToString() ?? "NotCheckedIn",
                    WorkingHours = todayAttendance?.WorkingHours ?? 0,
                    IsRemoteWork = todayRemoteWork,
                    IsOnVacation = todayVacation
                }
                : null
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

    private static string GetExcuseStatusVariant(ApprovalStatus status)
    {
        return status switch
        {
            ApprovalStatus.Approved => "success",
            ApprovalStatus.Rejected => "danger",
            ApprovalStatus.Pending => "warning",
            _ => "info"
        };
    }

    private static string GetRemoteWorkStatusVariant(Domain.RemoteWork.RemoteWorkRequestStatus status)
    {
        return status switch
        {
            Domain.RemoteWork.RemoteWorkRequestStatus.Approved => "success",
            Domain.RemoteWork.RemoteWorkRequestStatus.Rejected => "danger",
            Domain.RemoteWork.RemoteWorkRequestStatus.Pending => "warning",
            Domain.RemoteWork.RemoteWorkRequestStatus.Cancelled => "secondary",
            _ => "info"
        };
    }
}
