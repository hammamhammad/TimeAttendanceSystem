using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Features.Portal.ManagerDashboard.Queries;

/// <summary>
/// Query to get manager dashboard data for self-service portal
/// </summary>
public record GetManagerDashboardQuery : IRequest<Result<ManagerDashboardDto>>;

/// <summary>
/// Handler for GetManagerDashboardQuery
/// </summary>
public class GetManagerDashboardQueryHandler : IRequestHandler<GetManagerDashboardQuery, Result<ManagerDashboardDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly IWorkflowEngine _workflowEngine;

    public GetManagerDashboardQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IWorkflowEngine workflowEngine)
    {
        _context = context;
        _currentUser = currentUser;
        _workflowEngine = workflowEngine;
    }

    public async Task<Result<ManagerDashboardDto>> Handle(
        GetManagerDashboardQuery request,
        CancellationToken cancellationToken)
    {
        if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
        {
            return Result.Failure<ManagerDashboardDto>("User not authenticated");
        }

        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId, cancellationToken);

        if (employeeLink == null)
        {
            return Result.Failure<ManagerDashboardDto>("Employee profile not found for current user");
        }

        var managerEmployee = employeeLink.Employee;
        var now = DateTime.UtcNow;
        var today = now.Date;
        var todayDateOnly = DateOnly.FromDateTime(now);
        var currentMonthStart = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var nextMonthStart = currentMonthStart.AddMonths(1);

        // Get all team members (full hierarchy - recursive)
        var allTeamMembers = await GetAllTeamMembersRecursiveAsync(managerEmployee.Id, cancellationToken);
        var teamMemberIds = allTeamMembers.Select(e => e.Id).ToList();

        // Get direct reports count
        var directReportsCount = allTeamMembers.Count(e => e.ManagerEmployeeId == managerEmployee.Id);

        // Get today's attendance for team
        var todayAttendance = await _context.AttendanceRecords
            .Where(a => teamMemberIds.Contains(a.EmployeeId) &&
                       a.AttendanceDate.Date == today &&
                       !a.IsDeleted)
            .ToListAsync(cancellationToken);

        var presentToday = todayAttendance.Count(a => a.Status == AttendanceStatus.Present);
        var lateToday = todayAttendance.Count(a => a.Status == AttendanceStatus.Late);
        var earlyLeaveToday = todayAttendance.Count(a => a.Status == AttendanceStatus.EarlyLeave);

        // Get employees on vacation today (EmployeeVacation uses DateTime)
        var onVacationToday = await _context.EmployeeVacations
            .Where(v => teamMemberIds.Contains(v.EmployeeId) &&
                       v.IsApproved &&
                       v.StartDate <= today &&
                       v.EndDate >= today &&
                       !v.IsDeleted)
            .Select(v => v.EmployeeId)
            .Distinct()
            .CountAsync(cancellationToken);

        // Get employees working remote today (RemoteWorkRequest uses DateOnly)
        var remoteWorkToday = await _context.RemoteWorkRequests
            .Where(r => teamMemberIds.Contains(r.EmployeeId) &&
                       r.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Approved &&
                       r.StartDate <= todayDateOnly &&
                       r.EndDate >= todayDateOnly &&
                       !r.IsDeleted)
            .Select(r => r.EmployeeId)
            .Distinct()
            .CountAsync(cancellationToken);

        // Calculate absent (team members who have no attendance, not on vacation, not remote)
        var employeesWithRecords = todayAttendance.Select(a => a.EmployeeId).ToHashSet();
        var employeesOnVacation = await _context.EmployeeVacations
            .Where(v => teamMemberIds.Contains(v.EmployeeId) &&
                       v.IsApproved &&
                       v.StartDate <= today &&
                       v.EndDate >= today &&
                       !v.IsDeleted)
            .Select(v => v.EmployeeId)
            .ToListAsync(cancellationToken);

        var employeesRemote = await _context.RemoteWorkRequests
            .Where(r => teamMemberIds.Contains(r.EmployeeId) &&
                       r.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Approved &&
                       r.StartDate <= todayDateOnly &&
                       r.EndDate >= todayDateOnly &&
                       !r.IsDeleted)
            .Select(r => r.EmployeeId)
            .ToListAsync(cancellationToken);

        var absentToday = teamMemberIds
            .Where(id => !employeesWithRecords.Contains(id) &&
                        !employeesOnVacation.Contains(id) &&
                        !employeesRemote.Contains(id))
            .Count();

        // Get pending approvals using workflow engine
        var pendingApprovals = await _workflowEngine.GetPendingApprovalsAsync(_currentUser.UserId.Value);

        // Filter to only approvals for team members
        var teamMemberUserIds = await _context.EmployeeUserLinks
            .Where(eul => teamMemberIds.Contains(eul.EmployeeId))
            .Select(eul => eul.UserId)
            .ToListAsync(cancellationToken);

        // Get pending approvals summary by type
        var pendingVacations = pendingApprovals.Count(p => p.EntityType == WorkflowEntityType.Vacation);
        var pendingExcuses = pendingApprovals.Count(p => p.EntityType == WorkflowEntityType.Excuse);
        var pendingRemoteWork = pendingApprovals.Count(p => p.EntityType == WorkflowEntityType.RemoteWork);
        var overdueApprovals = pendingApprovals.Count(p => p.IsOverdue);

        // Get team attendance for current month (for attendance rate)
        var monthlyAttendance = await _context.AttendanceRecords
            .Where(a => teamMemberIds.Contains(a.EmployeeId) &&
                       a.AttendanceDate >= currentMonthStart &&
                       a.AttendanceDate < nextMonthStart &&
                       !a.IsDeleted)
            .ToListAsync(cancellationToken);

        var totalAttendanceDays = monthlyAttendance.Count;
        var presentDays = monthlyAttendance.Count(a =>
            a.Status == AttendanceStatus.Present ||
            a.Status == AttendanceStatus.Late ||
            a.Status == AttendanceStatus.EarlyLeave);
        var teamAttendanceRate = totalAttendanceDays > 0
            ? Math.Round((decimal)presentDays / totalAttendanceDays * 100, 1)
            : 0;

        // Calculate team overtime for current month
        var teamOvertimeHours = monthlyAttendance.Sum(a =>
            a.PreShiftOvertimeHours + a.PostShiftOvertimeHours);

        // Get recent pending approvals (top 5)
        var recentPendingApprovals = pendingApprovals
            .OrderBy(p => p.IsOverdue ? 0 : 1)
            .ThenByDescending(p => p.RequestedAt)
            .Take(5)
            .Select(p => new RecentPendingApprovalDto
            {
                WorkflowInstanceId = p.WorkflowInstanceId,
                RequestType = p.EntityType.ToString(),
                EmployeeName = p.RequestedByUserName,
                Summary = p.EntityDescription,
                SubmittedAt = p.RequestedAt,
                IsOverdue = p.IsOverdue
            })
            .ToList();

        // Get team status for today (employees with issues - late, absent)
        var teamStatusToday = new List<TeamMemberStatusDto>();

        // Add late employees
        foreach (var attendance in todayAttendance.Where(a => a.Status == AttendanceStatus.Late))
        {
            var employee = allTeamMembers.FirstOrDefault(e => e.Id == attendance.EmployeeId);
            if (employee != null)
            {
                teamStatusToday.Add(new TeamMemberStatusDto
                {
                    EmployeeId = employee.Id,
                    EmployeeName = $"{employee.FirstName} {employee.LastName}",
                    EmployeeCode = employee.EmployeeNumber,
                    Status = "Late",
                    CheckInTime = attendance.ActualCheckInTime,
                    LateMinutes = attendance.LateMinutes
                });
            }
        }

        // Add absent employees (limit to 5)
        var absentEmployeeIds = teamMemberIds
            .Where(id => !employeesWithRecords.Contains(id) &&
                        !employeesOnVacation.Contains(id) &&
                        !employeesRemote.Contains(id))
            .Take(5);

        foreach (var employeeId in absentEmployeeIds)
        {
            var employee = allTeamMembers.FirstOrDefault(e => e.Id == employeeId);
            if (employee != null)
            {
                teamStatusToday.Add(new TeamMemberStatusDto
                {
                    EmployeeId = employee.Id,
                    EmployeeName = $"{employee.FirstName} {employee.LastName}",
                    EmployeeCode = employee.EmployeeNumber,
                    Status = "Absent"
                });
            }
        }

        // Build and return DTO
        var dto = new ManagerDashboardDto
        {
            ManagerId = managerEmployee.Id,
            ManagerName = $"{managerEmployee.FirstName} {managerEmployee.LastName}",
            TeamSize = allTeamMembers.Count,
            DirectReportsCount = directReportsCount,
            PresentToday = presentToday + earlyLeaveToday,
            AbsentToday = absentToday,
            LateToday = lateToday,
            OnVacationToday = onVacationToday,
            RemoteWorkToday = remoteWorkToday,
            PendingApprovals = pendingApprovals.Count,
            TeamAttendanceRate = teamAttendanceRate,
            TeamOvertimeHours = Math.Round(teamOvertimeHours, 1),
            PendingApprovalsSummary = new PendingApprovalsSummaryDto
            {
                PendingVacations = pendingVacations,
                PendingExcuses = pendingExcuses,
                PendingRemoteWorkRequests = pendingRemoteWork,
                OverdueApprovals = overdueApprovals
            },
            RecentPendingApprovals = recentPendingApprovals,
            TeamStatusToday = teamStatusToday.Take(10).ToList()
        };

        return Result.Success(dto);
    }

    /// <summary>
    /// Recursively gets all employees in the manager's reporting chain (full hierarchy)
    /// </summary>
    private async Task<List<Employee>> GetAllTeamMembersRecursiveAsync(
        long managerEmployeeId,
        CancellationToken cancellationToken)
    {
        var allTeamMembers = new List<Employee>();
        var queue = new Queue<long>();
        queue.Enqueue(managerEmployeeId);

        while (queue.Count > 0)
        {
            var currentManagerId = queue.Dequeue();

            var directReports = await _context.Employees
                .Where(e => e.ManagerEmployeeId == currentManagerId && e.IsActive && !e.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var report in directReports)
            {
                allTeamMembers.Add(report);
                queue.Enqueue(report.Id);
            }
        }

        return allTeamMembers;
    }
}
