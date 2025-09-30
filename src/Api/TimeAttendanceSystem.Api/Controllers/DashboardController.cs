using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Api.Models;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for comprehensive dashboard data.
/// Provides system-wide statistics and overview across all modules.
/// </summary>
/// <remarks>
/// This controller aggregates data from multiple system modules to provide a unified dashboard view:
/// - Organization structure (branches, departments)
/// - Human resources (employees, users, roles)
/// - Attendance management (daily stats, trends)
/// - Leave management (vacation requests, balances)
/// - Shift management (coverage, assignments)
/// - System health (sessions, activities)
///
/// The dashboard provides role-based data visibility:
/// - System Admins: Full system overview
/// - Admins: Organization-wide data
/// - Managers: Department/branch specific data
/// - Employees: Personal dashboard elements
/// </remarks>
[ApiController]
[Route("api/v1/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceRepository _attendanceRepository;
    private readonly IAttendanceTransactionRepository _transactionRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(
        IApplicationDbContext context,
        IAttendanceRepository attendanceRepository,
        IAttendanceTransactionRepository transactionRepository,
        ICurrentUser currentUser,
        ILogger<DashboardController> logger)
    {
        _context = context;
        _attendanceRepository = attendanceRepository;
        _transactionRepository = transactionRepository;
        _currentUser = currentUser;
        _logger = logger;
    }

    /// <summary>
    /// Gets comprehensive dashboard overview with system-wide statistics.
    /// Returns aggregated data from all system modules based on user permissions.
    /// </summary>
    /// <param name="branchId">Optional branch filter for scoped data</param>
    /// <param name="departmentId">Optional department filter for scoped data</param>
    /// <returns>Complete dashboard overview with role-based data visibility</returns>
    /// <response code="200">Dashboard data retrieved successfully</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    /// <response code="500">Internal server error occurred</response>
    [HttpGet("overview")]
    public async Task<ActionResult<DashboardOverviewResponse>> GetDashboardOverview(
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null)
    {
        try
        {
            // Apply permission-based filtering
            var (effectiveBranchId, effectiveDepartmentId) = ApplyUserScopeFilters(branchId, departmentId);

            var today = DateTime.UtcNow.Date;
            var weekAgo = today.AddDays(-7);

            // Execute all statistics gathering sequentially to avoid DbContext concurrency issues
            var organizationStats = CanViewOrganizationData() ? await GetOrganizationStatistics(effectiveBranchId, effectiveDepartmentId) : new OrganizationStatistics();
            var humanResourcesStats = CanViewHumanResourcesData() ? await GetHumanResourcesStatistics(effectiveBranchId, effectiveDepartmentId) : new HumanResourcesStatistics();
            var attendanceStats = CanViewAttendanceData() ? await GetAttendanceStatistics(effectiveBranchId, effectiveDepartmentId, today, weekAgo) : new DashboardAttendanceStatistics();
            var leaveStats = CanViewVacationData() ? await GetLeaveStatistics(effectiveBranchId, effectiveDepartmentId, today) : new LeaveStatistics();
            var shiftStats = CanViewShiftData() ? await GetShiftStatistics(effectiveBranchId, effectiveDepartmentId) : new ShiftStatistics();
            var systemStats = CanViewSystemData() ? await GetSystemStatistics() : new SystemStatistics();

            var response = new DashboardOverviewResponse
            {
                Organization = organizationStats,
                HumanResources = humanResourcesStats,
                Attendance = attendanceStats,
                Leaves = leaveStats,
                Shifts = shiftStats,
                System = systemStats
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving dashboard overview");
            return StatusCode(500, "An error occurred while retrieving dashboard data");
        }
    }

    /// <summary>
    /// Gets organization structure statistics.
    /// </summary>
    private async Task<OrganizationStatistics> GetOrganizationStatistics(long? branchId, long? departmentId)
    {
        var branchesQuery = _context.Branches.AsQueryable();
        var departmentsQuery = _context.Departments.AsQueryable();

        if (branchId.HasValue)
        {
            branchesQuery = branchesQuery.Where(b => b.Id == branchId.Value);
            departmentsQuery = departmentsQuery.Where(d => d.BranchId == branchId.Value);
        }

        var branches = await branchesQuery
            .Select(b => new BranchSummary
            {
                Id = b.Id,
                Name = b.Name,
                EmployeeCount = b.Departments.SelectMany(d => d.Employees).Count(),
                ActiveEmployees = b.Departments.SelectMany(d => d.Employees).Count(e => !e.IsDeleted),
                IsActive = b.IsActive
            })
            .ToListAsync();

        var departments = await departmentsQuery
            .Select(d => new DepartmentSummary
            {
                Id = d.Id,
                Name = d.Name,
                BranchName = d.Branch.Name,
                EmployeeCount = d.Employees.Count(),
                ActiveEmployees = d.Employees.Count(e => !e.IsDeleted),
                IsActive = d.IsActive
            })
            .ToListAsync();

        return new OrganizationStatistics
        {
            TotalBranches = branches.Count,
            ActiveBranches = branches.Count(b => b.IsActive),
            TotalDepartments = departments.Count,
            ActiveDepartments = departments.Count(d => d.IsActive),
            BranchSummaries = branches,
            DepartmentSummaries = departments
        };
    }

    /// <summary>
    /// Gets human resources statistics.
    /// </summary>
    private async Task<HumanResourcesStatistics> GetHumanResourcesStatistics(long? branchId, long? departmentId)
    {
        var employeesQuery = _context.Employees.AsQueryable();
        var usersQuery = _context.Users.AsQueryable();

        if (branchId.HasValue)
        {
            employeesQuery = employeesQuery.Where(e => e.BranchId == branchId.Value);
        }
        if (departmentId.HasValue)
        {
            employeesQuery = employeesQuery.Where(e => e.DepartmentId == departmentId.Value);
        }

        var totalEmployees = await employeesQuery.CountAsync();

        // Create separate query for active employees count to avoid DbContext concurrency
        var activeEmployeesQuery = _context.Employees.AsQueryable();
        if (branchId.HasValue)
        {
            activeEmployeesQuery = activeEmployeesQuery.Where(e => e.BranchId == branchId.Value);
        }
        if (departmentId.HasValue)
        {
            activeEmployeesQuery = activeEmployeesQuery.Where(e => e.DepartmentId == departmentId.Value);
        }
        var activeEmployees = await activeEmployeesQuery.CountAsync(e => !e.IsDeleted);

        var totalUsers = await usersQuery.CountAsync();

        // Create separate query for active users count
        var activeUsersQuery = _context.Users.AsQueryable();
        var activeUsers = await activeUsersQuery.CountAsync(u => u.IsActive);

        // Create separate query instances to avoid DbContext concurrency issues
        var roleUsersQuery = _context.Users.AsQueryable();
        if (branchId.HasValue)
        {
            // Apply the same filtering if needed
        }
        if (departmentId.HasValue)
        {
            // Apply the same filtering if needed
        }

        var roleDistribution = await roleUsersQuery
            .Where(u => u.IsActive)
            .SelectMany(u => u.UserRoles)
            .GroupBy(ur => ur.Role.Name)
            .Select(g => new RoleDistribution
            {
                RoleName = g.Key,
                UserCount = g.Count(),
                Percentage = totalUsers > 0 ? (double)g.Count() / totalUsers * 100 : 0
            })
            .ToListAsync();

        // Create separate query instance for employment status
        var employmentEmployeesQuery = _context.Employees.AsQueryable();
        if (branchId.HasValue)
        {
            employmentEmployeesQuery = employmentEmployeesQuery.Where(e => e.BranchId == branchId.Value);
        }
        if (departmentId.HasValue)
        {
            employmentEmployeesQuery = employmentEmployeesQuery.Where(e => e.DepartmentId == departmentId.Value);
        }

        var employmentStatusDistribution = await employmentEmployeesQuery
            .Where(e => !e.IsDeleted)
            .GroupBy(e => e.EmploymentStatus.ToString())
            .Select(g => new EmploymentStatusDistribution
            {
                Status = g.Key,
                Count = g.Count(),
                Percentage = activeEmployees > 0 ? (double)g.Count() / activeEmployees * 100 : 0
            })
            .ToListAsync();

        return new HumanResourcesStatistics
        {
            TotalEmployees = totalEmployees,
            ActiveEmployees = activeEmployees,
            InactiveEmployees = totalEmployees - activeEmployees,
            TotalUsers = totalUsers,
            ActiveUsers = activeUsers,
            InactiveUsers = totalUsers - activeUsers,
            RoleDistribution = roleDistribution,
            EmploymentStatusDistribution = employmentStatusDistribution
        };
    }

    /// <summary>
    /// Gets attendance statistics and trends.
    /// </summary>
    private async Task<DashboardAttendanceStatistics> GetAttendanceStatistics(long? branchId, long? departmentId, DateTime today, DateTime weekAgo)
    {
        // Get today's attendance statistics
        var todayStats = await _attendanceRepository.GetStatisticsAsync(branchId, departmentId, today, today);

        // Get weekly trend
        var weeklyTrend = new List<DailyAttendanceTrend>();
        for (var date = weekAgo; date <= today; date = date.AddDays(1))
        {
            var dayStats = await _attendanceRepository.GetStatisticsAsync(branchId, departmentId, date, date);
            weeklyTrend.Add(new DailyAttendanceTrend
            {
                Date = date,
                TotalEmployees = dayStats.TotalRecords,
                PresentEmployees = dayStats.PresentCount,
                AbsentEmployees = dayStats.AbsentCount,
                LateEmployees = dayStats.LateCount,
                AttendanceRate = (double)dayStats.AttendanceRate
            });
        }

        // Get incomplete records
        var incompleteRecords = await _attendanceRepository.GetIncompleteRecordsAsync(branchId, today);
        var incompleteRecordsSummary = incompleteRecords.Take(10).Select(r => new IncompleteAttendanceRecord
        {
            EmployeeId = r.EmployeeId,
            EmployeeNumber = r.Employee.EmployeeNumber,
            EmployeeName = $"{r.Employee.FirstName} {r.Employee.LastName}",
            Date = r.AttendanceDate,
            Status = r.Status.ToString(),
            CheckInTime = r.ActualCheckInTime,
            CheckOutTime = r.ActualCheckOutTime
        }).ToList();

        return new DashboardAttendanceStatistics
        {
            TodayPresent = todayStats.PresentCount,
            TodayAbsent = todayStats.AbsentCount,
            TodayLate = todayStats.LateCount,
            AttendanceRate = (double)todayStats.AttendanceRate,
            TodayOvertime = 0, // Calculate overtime employees count separately
            WeeklyTrend = weeklyTrend,
            IncompleteRecords = incompleteRecordsSummary
        };
    }

    /// <summary>
    /// Gets leave/vacation statistics.
    /// </summary>
    private async Task<LeaveStatistics> GetLeaveStatistics(long? branchId, long? departmentId, DateTime today)
    {
        var vacationsQuery = _context.EmployeeVacations.AsQueryable();

        if (branchId.HasValue)
        {
            vacationsQuery = vacationsQuery.Where(v => v.Employee.BranchId == branchId.Value);
        }
        if (departmentId.HasValue)
        {
            vacationsQuery = vacationsQuery.Where(v => v.Employee.DepartmentId == departmentId.Value);
        }

        var pendingRequests = await vacationsQuery.CountAsync(v => !v.IsApproved && !v.IsDeleted);
        var approvedToday = await vacationsQuery.CountAsync(v => v.IsApproved && v.CreatedAtUtc.Date == today);
        var onLeaveToday = await vacationsQuery.CountAsync(v => v.IsApproved &&
                                                               v.StartDate <= today && v.EndDate >= today);
        var rejectedToday = 0; // No rejected status in current model

        // Get upcoming vacations (next 30 days)
        var upcomingVacations = await vacationsQuery
            .Where(v => v.IsApproved &&
                       v.StartDate >= today && v.StartDate <= today.AddDays(30))
            .OrderBy(v => v.StartDate)
            .Take(10)
            .Select(v => new VacationSummary
            {
                VacationId = v.Id,
                EmployeeId = v.EmployeeId,
                EmployeeNumber = v.Employee.EmployeeNumber,
                EmployeeName = $"{v.Employee.FirstName} {v.Employee.LastName}",
                VacationType = v.VacationType.Name,
                StartDate = v.StartDate,
                EndDate = v.EndDate,
                DaysCount = v.TotalDays,
                Status = v.IsApproved ? "Approved" : "Pending"
            })
            .ToListAsync();

        // Get vacation type breakdown
        var vacationTypeBreakdown = await vacationsQuery
            .GroupBy(v => v.VacationType.Name)
            .Select(g => new VacationTypeSummary
            {
                VacationType = g.Key,
                TotalRequests = g.Count(),
                PendingRequests = g.Count(v => !v.IsApproved),
                ApprovedRequests = g.Count(v => v.IsApproved),
                RejectedRequests = 0 // No rejected status in current model
            })
            .ToListAsync();

        return new LeaveStatistics
        {
            PendingRequests = pendingRequests,
            ApprovedToday = approvedToday,
            OnLeaveToday = onLeaveToday,
            RejectedToday = rejectedToday,
            UpcomingVacations = upcomingVacations,
            VacationTypeBreakdown = vacationTypeBreakdown
        };
    }

    /// <summary>
    /// Gets shift management statistics.
    /// </summary>
    private async Task<ShiftStatistics> GetShiftStatistics(long? branchId, long? departmentId)
    {
        var shiftsQuery = _context.Shifts.Where(s => !s.IsDeleted);
        var assignmentsQuery = _context.ShiftAssignments.AsQueryable();

        if (branchId.HasValue)
        {
            assignmentsQuery = assignmentsQuery.Where(sa => sa.Employee.BranchId == branchId.Value);
        }
        if (departmentId.HasValue)
        {
            assignmentsQuery = assignmentsQuery.Where(sa => sa.Employee.DepartmentId == departmentId.Value);
        }

        var activeShifts = await shiftsQuery.CountAsync();
        var totalAssignments = await assignmentsQuery.CountAsync();
        var todayAssignments = await assignmentsQuery.CountAsync(sa => !sa.IsDeleted);

        // Get shift coverage summary
        var shiftCoverage = await shiftsQuery
            .Select(s => new ShiftCoverageSummary
            {
                ShiftId = s.Id,
                ShiftName = s.Name,
                TimeRange = s.ShiftPeriods.Any() ?
                    $"{s.ShiftPeriods.First().StartTime:HH:mm} - {s.ShiftPeriods.First().EndTime:HH:mm}" :
                    "No periods defined",
                RequiredEmployees = 0, // RequiredEmployees property doesn't exist in current model
                AssignedEmployees = _context.ShiftAssignments.Count(sa => sa.ShiftId == s.Id && !sa.IsDeleted),
                CoveragePercentage = 100 // Simplified for now
            })
            .ToListAsync();

        return new ShiftStatistics
        {
            ActiveShifts = activeShifts,
            TotalShiftAssignments = totalAssignments,
            TodayCoverage = todayAssignments,
            UnassignedShifts = shiftCoverage.Count(sc => sc.CoveragePercentage < 100),
            ShiftCoverage = shiftCoverage
        };
    }

    /// <summary>
    /// Gets system health and activity statistics.
    /// </summary>
    private async Task<SystemStatistics> GetSystemStatistics()
    {
        var today = DateTime.UtcNow.Date;

        // Get active sessions
        var activeSessions = await _context.UserSessions
            .CountAsync(s => !s.IsDeleted);

        // Get today's login count
        var todayLogins = await _context.UserSessions
            .CountAsync(s => s.CreatedAtUtc.Date == today);

        // Get recent activities (audit logs if available, or use recent transactions)
        var recentTransactions = await _transactionRepository.GetRecentTransactionsAsync(10);
        var recentActivities = recentTransactions.Select(t => new RecentActivity
        {
            Id = t.Id,
            ActivityType = "Attendance",
            Description = $"Employee {t.EmployeeId} - Transaction {t.TransactionType}",
            UserName = "System",
            Timestamp = t.TransactionTimeUtc,
            Module = "Attendance",
            Action = t.TransactionType.ToString()
        }).ToList();

        return new SystemStatistics
        {
            ActiveSessions = activeSessions,
            LastBackup = DateTime.UtcNow.AddHours(-6), // Mock data - replace with actual backup info
            SystemUptime = TimeSpan.FromDays(15).ToString(@"dd\.hh\:mm"), // Mock data
            RecentActivities = recentActivities,
            TodayLogins = todayLogins,
            TodayApiCalls = 0 // This would need actual API usage tracking
        };
    }

    /// <summary>
    /// Gets specific widget data for incremental updates.
    /// </summary>
    /// <param name="widgetName">Name of the widget to refresh</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="departmentId">Optional department filter</param>
    /// <returns>Widget-specific data</returns>
    [HttpGet("widgets/{widgetName}")]
    public async Task<ActionResult<object>> GetWidgetData(
        string widgetName,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null)
    {
        try
        {
            // Apply permission-based filtering
            var (effectiveBranchId, effectiveDepartmentId) = ApplyUserScopeFilters(branchId, departmentId);
            var today = DateTime.UtcNow.Date;

            return widgetName.ToLower() switch
            {
                "attendance" when CanViewAttendanceData() => Ok(await GetAttendanceStatistics(effectiveBranchId, effectiveDepartmentId, today, today.AddDays(-7))),
                "organization" when CanViewOrganizationData() => Ok(await GetOrganizationStatistics(effectiveBranchId, effectiveDepartmentId)),
                "humanresources" when CanViewHumanResourcesData() => Ok(await GetHumanResourcesStatistics(effectiveBranchId, effectiveDepartmentId)),
                "leaves" when CanViewVacationData() => Ok(await GetLeaveStatistics(effectiveBranchId, effectiveDepartmentId, today)),
                "shifts" when CanViewShiftData() => Ok(await GetShiftStatistics(effectiveBranchId, effectiveDepartmentId)),
                "system" when CanViewSystemData() => Ok(await GetSystemStatistics()),
                "attendance" or "organization" or "humanresources" or "leaves" or "shifts" or "system" =>
                    Forbid($"Insufficient permissions to access {widgetName} data"),
                _ => BadRequest($"Unknown widget: {widgetName}")
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving widget data for {WidgetName}", widgetName);
            return StatusCode(500, $"An error occurred while retrieving {widgetName} data");
        }
    }

    #region Permission Checking Methods

    /// <summary>
    /// Applies user scope filters based on permissions and branch access.
    /// </summary>
    private (long? branchId, long? departmentId) ApplyUserScopeFilters(long? requestedBranchId, long? requestedDepartmentId)
    {
        // System admin can access all data
        if (_currentUser.IsSystemAdmin)
        {
            return (requestedBranchId, requestedDepartmentId);
        }

        // If user has branch restrictions, apply them
        if (_currentUser.BranchIds.Any())
        {
            // User can only access their assigned branches
            var effectiveBranchId = requestedBranchId.HasValue && _currentUser.BranchIds.Contains(requestedBranchId.Value)
                ? requestedBranchId
                : _currentUser.BranchIds.First(); // Default to first accessible branch

            // If department is requested, validate it belongs to an accessible branch
            if (requestedDepartmentId.HasValue)
            {
                var department = _context.Departments.FirstOrDefault(d => d.Id == requestedDepartmentId.Value);
                if (department == null || !_currentUser.BranchIds.Contains(department.BranchId))
                {
                    requestedDepartmentId = null; // Invalid department access
                }
            }

            return (effectiveBranchId, requestedDepartmentId);
        }

        // User has access to all branches
        return (requestedBranchId, requestedDepartmentId);
    }

    /// <summary>
    /// Checks if the current user can view organization data.
    /// </summary>
    private bool CanViewOrganizationData()
    {
        return _currentUser.IsSystemAdmin ||
               _currentUser.Permissions.Contains("branch.read") ||
               _currentUser.Permissions.Contains("department.read") ||
               _currentUser.Roles.Contains("Admin") ||
               _currentUser.Roles.Contains("Manager");
    }

    /// <summary>
    /// Checks if the current user can view human resources data.
    /// </summary>
    private bool CanViewHumanResourcesData()
    {
        return _currentUser.IsSystemAdmin ||
               _currentUser.Permissions.Contains("user.read") ||
               _currentUser.Permissions.Contains("employee.read") ||
               _currentUser.Roles.Contains("Admin") ||
               _currentUser.Roles.Contains("Manager") ||
               _currentUser.Roles.Contains("HR");
    }

    /// <summary>
    /// Checks if the current user can view attendance data.
    /// </summary>
    private bool CanViewAttendanceData()
    {
        return _currentUser.IsSystemAdmin ||
               _currentUser.Permissions.Contains("attendance.read") ||
               _currentUser.Roles.Contains("Admin") ||
               _currentUser.Roles.Contains("Manager") ||
               _currentUser.Roles.Contains("HR");
    }

    /// <summary>
    /// Checks if the current user can view vacation/leave data.
    /// </summary>
    private bool CanViewVacationData()
    {
        return _currentUser.IsSystemAdmin ||
               _currentUser.Permissions.Contains("vacation.read") ||
               _currentUser.Permissions.Contains("vacationType.read") ||
               _currentUser.Roles.Contains("Admin") ||
               _currentUser.Roles.Contains("Manager") ||
               _currentUser.Roles.Contains("HR");
    }

    /// <summary>
    /// Checks if the current user can view shift data.
    /// </summary>
    private bool CanViewShiftData()
    {
        return _currentUser.IsSystemAdmin ||
               _currentUser.Permissions.Contains("shift.read") ||
               _currentUser.Permissions.Contains("shift.assign") ||
               _currentUser.Roles.Contains("Admin") ||
               _currentUser.Roles.Contains("Manager");
    }

    /// <summary>
    /// Checks if the current user can view system statistics.
    /// </summary>
    private bool CanViewSystemData()
    {
        return _currentUser.IsSystemAdmin ||
               _currentUser.Roles.Contains("Admin");
    }

    #endregion
}