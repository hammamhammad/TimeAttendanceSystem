using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Features.Portal.Team.Queries;

/// <summary>
/// Query to get team members for a manager (with recursive hierarchy support)
/// </summary>
public class GetTeamMembersQuery : IRequest<Result<TeamMembersPagedResult>>
{
    /// <summary>
    /// Include indirect reports (full hierarchy). Default: true
    /// </summary>
    public bool IncludeIndirectReports { get; set; } = true;

    /// <summary>
    /// Filter by department ID
    /// </summary>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Filter by active status
    /// </summary>
    public bool? IsActive { get; set; }

    /// <summary>
    /// Search term for name or employee code
    /// </summary>
    public string? SearchTerm { get; set; }

    /// <summary>
    /// Page number (1-based)
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// Page size
    /// </summary>
    public int PageSize { get; set; } = 20;

    /// <summary>
    /// Sort by field
    /// </summary>
    public string? SortBy { get; set; }

    /// <summary>
    /// Sort descending
    /// </summary>
    public bool SortDescending { get; set; }
}

/// <summary>
/// Handler for GetTeamMembersQuery
/// </summary>
public class GetTeamMembersQueryHandler : IRequestHandler<GetTeamMembersQuery, Result<TeamMembersPagedResult>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetTeamMembersQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Result<TeamMembersPagedResult>> Handle(
        GetTeamMembersQuery request,
        CancellationToken cancellationToken)
    {
        if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
        {
            return Result.Failure<TeamMembersPagedResult>("User not authenticated");
        }

        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId, cancellationToken);

        if (employeeLink == null)
        {
            return Result.Failure<TeamMembersPagedResult>("Employee profile not found for current user");
        }

        var managerEmployeeId = employeeLink.Employee.Id;
        var now = DateTime.UtcNow;
        var today = now.Date;
        var todayDateOnly = DateOnly.FromDateTime(now);

        // Get all team members (full hierarchy or direct reports only)
        List<(Employee Employee, int HierarchyLevel)> teamMembers;

        if (request.IncludeIndirectReports)
        {
            teamMembers = await GetAllTeamMembersWithLevelAsync(managerEmployeeId, cancellationToken);
        }
        else
        {
            // Only direct reports
            var directReports = await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.Branch)
                .Include(e => e.Manager)
                .Where(e => e.ManagerEmployeeId == managerEmployeeId && !e.IsDeleted)
                .ToListAsync(cancellationToken);

            teamMembers = directReports.Select(e => (e, 0)).ToList();
        }

        // Apply filters
        var filteredMembers = teamMembers.AsEnumerable();

        if (request.DepartmentId.HasValue)
        {
            filteredMembers = filteredMembers.Where(m => m.Employee.DepartmentId == request.DepartmentId);
        }

        if (request.IsActive.HasValue)
        {
            filteredMembers = filteredMembers.Where(m => m.Employee.IsActive == request.IsActive.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchLower = request.SearchTerm.ToLowerInvariant();
            filteredMembers = filteredMembers.Where(m =>
                m.Employee.FirstName.ToLowerInvariant().Contains(searchLower) ||
                m.Employee.LastName.ToLowerInvariant().Contains(searchLower) ||
                m.Employee.EmployeeNumber.ToLowerInvariant().Contains(searchLower) ||
                (m.Employee.Email != null && m.Employee.Email.ToLowerInvariant().Contains(searchLower)));
        }

        // Get total count before pagination
        var totalCount = filteredMembers.Count();

        // Apply sorting
        filteredMembers = ApplySorting(filteredMembers, request.SortBy, request.SortDescending);

        // Apply pagination
        var pagedMembers = filteredMembers
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToList();

        // Get employee IDs for additional data queries
        var employeeIds = pagedMembers.Select(m => m.Employee.Id).ToList();

        // Get today's attendance status for team members
        var todayAttendance = await _context.AttendanceRecords
            .Where(a => employeeIds.Contains(a.EmployeeId) &&
                       a.AttendanceDate.Date == today &&
                       !a.IsDeleted)
            .ToDictionaryAsync(a => a.EmployeeId, cancellationToken);

        // Get employees on vacation today (EmployeeVacation uses DateTime)
        var onVacationToday = await _context.EmployeeVacations
            .Where(v => employeeIds.Contains(v.EmployeeId) &&
                       v.IsApproved &&
                       v.StartDate <= today &&
                       v.EndDate >= today &&
                       !v.IsDeleted)
            .Select(v => v.EmployeeId)
            .ToListAsync(cancellationToken);

        // Get employees working remote today (RemoteWorkRequest uses DateOnly)
        var remoteWorkToday = await _context.RemoteWorkRequests
            .Where(r => employeeIds.Contains(r.EmployeeId) &&
                       r.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Approved &&
                       r.StartDate <= todayDateOnly &&
                       r.EndDate >= todayDateOnly &&
                       !r.IsDeleted)
            .Select(r => r.EmployeeId)
            .ToListAsync(cancellationToken);

        // Get pending requests count for each employee
        var pendingVacations = await _context.EmployeeVacations
            .Where(v => employeeIds.Contains(v.EmployeeId) && !v.IsApproved && !v.IsDeleted)
            .GroupBy(v => v.EmployeeId)
            .Select(g => new { EmployeeId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.EmployeeId, x => x.Count, cancellationToken);

        var pendingExcuses = await _context.EmployeeExcuses
            .Where(e => employeeIds.Contains(e.EmployeeId) &&
                       e.ApprovalStatus == ApprovalStatus.Pending &&
                       !e.IsDeleted)
            .GroupBy(e => e.EmployeeId)
            .Select(g => new { EmployeeId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.EmployeeId, x => x.Count, cancellationToken);

        var pendingRemoteWork = await _context.RemoteWorkRequests
            .Where(r => employeeIds.Contains(r.EmployeeId) &&
                       r.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Pending &&
                       !r.IsDeleted)
            .GroupBy(r => r.EmployeeId)
            .Select(g => new { EmployeeId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.EmployeeId, x => x.Count, cancellationToken);

        // Get direct reports count for each employee
        var directReportsCounts = await _context.Employees
            .Where(e => employeeIds.Contains(e.ManagerEmployeeId ?? 0) && e.IsActive && !e.IsDeleted)
            .GroupBy(e => e.ManagerEmployeeId)
            .Select(g => new { ManagerId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.ManagerId ?? 0, x => x.Count, cancellationToken);

        // Get user IDs for employees (from EmployeeUserLinks)
        var employeeUserIds = await _context.EmployeeUserLinks
            .Where(eul => employeeIds.Contains(eul.EmployeeId))
            .ToDictionaryAsync(eul => eul.EmployeeId, eul => eul.UserId, cancellationToken);

        // Build DTOs
        var items = pagedMembers.Select(m =>
        {
            var emp = m.Employee;
            var attendance = todayAttendance.GetValueOrDefault(emp.Id);
            var isOnVacation = onVacationToday.Contains(emp.Id);
            var isRemoteWork = remoteWorkToday.Contains(emp.Id);

            string todayStatus;
            if (isOnVacation)
                todayStatus = "OnVacation";
            else if (isRemoteWork)
                todayStatus = "RemoteWork";
            else if (attendance != null)
                todayStatus = attendance.Status.ToString();
            else
                todayStatus = "NotCheckedIn";

            var pendingCount =
                pendingVacations.GetValueOrDefault(emp.Id) +
                pendingExcuses.GetValueOrDefault(emp.Id) +
                pendingRemoteWork.GetValueOrDefault(emp.Id);

            return new TeamMemberDto
            {
                EmployeeId = emp.Id,
                UserId = employeeUserIds.GetValueOrDefault(emp.Id),
                EmployeeCode = emp.EmployeeNumber,
                FullName = $"{emp.FirstName} {emp.LastName}",
                FirstName = emp.FirstName,
                LastName = emp.LastName,
                Email = emp.Email,
                Phone = emp.Phone,
                DepartmentId = emp.DepartmentId,
                DepartmentName = emp.Department?.Name,
                BranchId = emp.BranchId,
                BranchName = emp.Branch?.Name,
                JobTitle = emp.JobTitle,
                ManagerEmployeeId = emp.ManagerEmployeeId,
                ManagerName = emp.Manager != null ? $"{emp.Manager.FirstName} {emp.Manager.LastName}" : null,
                HierarchyLevel = m.HierarchyLevel,
                IsDirectReport = m.HierarchyLevel == 0,
                IsActive = emp.IsActive,
                HireDate = emp.HireDate,
                PhotoUrl = emp.PhotoUrl,
                TodayStatus = todayStatus,
                PendingRequestsCount = pendingCount,
                DirectReportsCount = directReportsCounts.GetValueOrDefault(emp.Id)
            };
        }).ToList();

        return Result.Success(new TeamMembersPagedResult
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        });
    }

    /// <summary>
    /// Recursively gets all employees in the manager's reporting chain with hierarchy level
    /// </summary>
    private async Task<List<(Employee Employee, int HierarchyLevel)>> GetAllTeamMembersWithLevelAsync(
        long managerEmployeeId,
        CancellationToken cancellationToken)
    {
        var allTeamMembers = new List<(Employee Employee, int HierarchyLevel)>();
        var queue = new Queue<(long ManagerId, int Level)>();
        queue.Enqueue((managerEmployeeId, 0));

        while (queue.Count > 0)
        {
            var (currentManagerId, currentLevel) = queue.Dequeue();

            var directReports = await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.Branch)
                .Include(e => e.Manager)
                .Where(e => e.ManagerEmployeeId == currentManagerId && !e.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var report in directReports)
            {
                allTeamMembers.Add((report, currentLevel));
                queue.Enqueue((report.Id, currentLevel + 1));
            }
        }

        return allTeamMembers;
    }

    private static IEnumerable<(Employee Employee, int HierarchyLevel)> ApplySorting(
        IEnumerable<(Employee Employee, int HierarchyLevel)> members,
        string? sortBy,
        bool sortDescending)
    {
        if (string.IsNullOrEmpty(sortBy))
        {
            // Default: sort by hierarchy level then by name
            return sortDescending
                ? members.OrderByDescending(m => m.HierarchyLevel).ThenByDescending(m => m.Employee.FirstName)
                : members.OrderBy(m => m.HierarchyLevel).ThenBy(m => m.Employee.FirstName);
        }

        return sortBy.ToLowerInvariant() switch
        {
            "name" or "fullname" => sortDescending
                ? members.OrderByDescending(m => m.Employee.FirstName).ThenByDescending(m => m.Employee.LastName)
                : members.OrderBy(m => m.Employee.FirstName).ThenBy(m => m.Employee.LastName),
            "employeecode" or "code" => sortDescending
                ? members.OrderByDescending(m => m.Employee.EmployeeNumber)
                : members.OrderBy(m => m.Employee.EmployeeNumber),
            "department" => sortDescending
                ? members.OrderByDescending(m => m.Employee.Department?.Name)
                : members.OrderBy(m => m.Employee.Department?.Name),
            "hiredate" => sortDescending
                ? members.OrderByDescending(m => m.Employee.HireDate)
                : members.OrderBy(m => m.Employee.HireDate),
            "hierarchylevel" or "level" => sortDescending
                ? members.OrderByDescending(m => m.HierarchyLevel)
                : members.OrderBy(m => m.HierarchyLevel),
            _ => members.OrderBy(m => m.HierarchyLevel).ThenBy(m => m.Employee.FirstName)
        };
    }
}
