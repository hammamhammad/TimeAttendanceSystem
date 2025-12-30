using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;
using TimeAttendanceSystem.Application.Features.Portal.ManagerDashboard.Queries;
using TimeAttendanceSystem.Application.Features.Portal.Team.Queries;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for employee self-service portal features.
/// Provides dashboard and portal-related functionality for employees and managers.
/// </summary>
/// <remarks>
/// This controller provides endpoints for:
/// - Employee dashboard (personal stats, attendance, activity)
/// - Manager dashboard (team stats, pending approvals)
/// - Team member listing (with recursive hierarchy)
/// </remarks>
[ApiController]
[Route("api/v1/portal")]
[Authorize]
public class PortalController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<PortalController> _logger;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public PortalController(
        IMediator mediator,
        ILogger<PortalController> logger,
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _mediator = mediator;
        _logger = logger;
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Retrieves the employee dashboard with attendance stats, vacation balance, and recent activity.
    /// </summary>
    /// <returns>Employee dashboard data including stats and activity timeline</returns>
    /// <response code="200">Dashboard data retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("employee-dashboard")]
    [ProducesResponseType(typeof(Result<EmployeeDashboardDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetEmployeeDashboard()
    {
        try
        {
            var query = new GetEmployeeDashboardQuery();
            var result = await _mediator.Send(query);

            // Return the full Result object for frontend compatibility
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee dashboard");
            return StatusCode(500, new { error = "An error occurred while retrieving dashboard data" });
        }
    }

    /// <summary>
    /// Retrieves the manager dashboard with team stats and pending approvals.
    /// Only accessible by users who are managers (have direct reports).
    /// </summary>
    /// <returns>Manager dashboard data including team overview and approval queue</returns>
    /// <response code="200">Manager dashboard data retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="403">Forbidden - user is not a manager</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("manager-dashboard")]
    [ProducesResponseType(typeof(Result<ManagerDashboardDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetManagerDashboard()
    {
        try
        {
            var query = new GetManagerDashboardQuery();
            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                if (result.Error.Contains("not found"))
                {
                    return NotFound(new { error = result.Error });
                }
                return BadRequest(new { error = result.Error });
            }

            // Check if user actually has team members
            if (result.Value.TeamSize == 0)
            {
                return Forbid("User does not have any direct reports");
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving manager dashboard");
            return StatusCode(500, new { error = "An error occurred while retrieving manager dashboard data" });
        }
    }

    /// <summary>
    /// Retrieves the list of team members under the current manager.
    /// Supports recursive hierarchy (all reports) or direct reports only.
    /// </summary>
    /// <param name="includeIndirectReports">Include indirect reports (full hierarchy). Default: true</param>
    /// <param name="departmentId">Filter by department ID</param>
    /// <param name="isActive">Filter by active status</param>
    /// <param name="searchTerm">Search term for name or employee code</param>
    /// <param name="page">Page number (1-based). Default: 1</param>
    /// <param name="pageSize">Page size. Default: 20</param>
    /// <param name="sortBy">Sort by field (name, code, department, hiredate, level)</param>
    /// <param name="sortDescending">Sort descending. Default: false</param>
    /// <returns>Paginated list of team members</returns>
    /// <response code="200">Team members retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("team-members")]
    [ProducesResponseType(typeof(TeamMembersPagedResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTeamMembers(
        [FromQuery] bool includeIndirectReports = true,
        [FromQuery] long? departmentId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? searchTerm = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? sortBy = null,
        [FromQuery] bool sortDescending = false)
    {
        try
        {
            var query = new GetTeamMembersQuery
            {
                IncludeIndirectReports = includeIndirectReports,
                DepartmentId = departmentId,
                IsActive = isActive,
                SearchTerm = searchTerm,
                Page = page,
                PageSize = Math.Min(pageSize, 100), // Cap at 100
                SortBy = sortBy,
                SortDescending = sortDescending
            };

            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                if (result.Error.Contains("not found"))
                {
                    return NotFound(new { error = result.Error });
                }
                return BadRequest(new { error = result.Error });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team members");
            return StatusCode(500, new { error = "An error occurred while retrieving team members" });
        }
    }

    /// <summary>
    /// Retrieves a specific team member's details.
    /// Only accessible for employees in the current manager's hierarchy.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <returns>Team member details</returns>
    /// <response code="200">Team member details retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="403">Forbidden - employee is not in manager's hierarchy</response>
    /// <response code="404">Employee not found</response>
    [HttpGet("team-members/{employeeId}")]
    [ProducesResponseType(typeof(TeamMemberDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTeamMember(long employeeId)
    {
        try
        {
            // Get all team members to validate access
            var query = new GetTeamMembersQuery
            {
                IncludeIndirectReports = true,
                Page = 1,
                PageSize = 10000 // Get all to find the specific employee
            };

            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                if (result.Error.Contains("not found"))
                {
                    return NotFound(new { error = result.Error });
                }
                return BadRequest(new { error = result.Error });
            }

            var teamMember = result.Value.Items.FirstOrDefault(m => m.EmployeeId == employeeId);

            if (teamMember == null)
            {
                return Forbid("Employee is not in your management hierarchy");
            }

            return Ok(teamMember);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team member {EmployeeId}", employeeId);
            return StatusCode(500, new { error = "An error occurred while retrieving team member details" });
        }
    }

    /// <summary>
    /// Retrieves the current employee's attendance records for a date range.
    /// Employees can only view their own attendance records.
    /// </summary>
    /// <param name="startDate">Start date for the report</param>
    /// <param name="endDate">End date for the report</param>
    /// <returns>List of attendance records for the current employee</returns>
    /// <response code="200">Attendance records retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("my-attendance")]
    [ProducesResponseType(typeof(Result<List<MyAttendanceRecordDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyAttendance(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context through EmployeeUserLink
            var employeeLink = await _context.EmployeeUserLinks
                .Include(eul => eul.Employee)
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Default to current month if no dates specified
            var now = DateTime.UtcNow;
            var start = startDate?.Date ?? new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
            var end = endDate?.Date ?? now.Date;

            // Limit date range to prevent performance issues
            var daysDifference = (end - start).Days;
            if (daysDifference > 90)
            {
                return BadRequest(new { error = "Date range cannot exceed 90 days" });
            }

            // Query attendance records for the employee
            var records = await _context.AttendanceRecords
                .Where(a => a.EmployeeId == employeeId &&
                           a.AttendanceDate >= start &&
                           a.AttendanceDate <= end &&
                           !a.IsDeleted)
                .OrderByDescending(a => a.AttendanceDate)
                .ToListAsync();

            // Map to DTOs with proper time conversions
            var attendanceRecords = records.Select(a => new MyAttendanceRecordDto
            {
                Id = a.Id,
                Date = a.AttendanceDate,
                Status = a.Status.ToString(),
                ScheduledStartTime = a.ScheduledStartTime.HasValue
                    ? a.AttendanceDate.Date.Add(a.ScheduledStartTime.Value.ToTimeSpan())
                    : null,
                ScheduledEndTime = a.ScheduledEndTime.HasValue
                    ? a.AttendanceDate.Date.Add(a.ScheduledEndTime.Value.ToTimeSpan())
                    : null,
                ActualCheckInTime = a.ActualCheckInTime,
                ActualCheckOutTime = a.ActualCheckOutTime,
                WorkingHours = a.WorkingHours,
                OvertimeHours = a.OvertimeHours,
                LateMinutes = a.LateMinutes,
                EarlyLeaveMinutes = a.EarlyLeaveMinutes,
                Notes = a.Notes
            }).ToList();

            var result = Result.Success(attendanceRecords);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my attendance records");
            return StatusCode(500, new { error = "An error occurred while retrieving attendance records" });
        }
    }

    /// <summary>
    /// Retrieves the current user's profile information including linked employee data.
    /// </summary>
    /// <returns>User profile with employee information</returns>
    /// <response code="200">Profile retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">User or employee profile not found</response>
    [HttpGet("my-profile")]
    [ProducesResponseType(typeof(Result<MyProfileDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyProfile()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get the user with roles
            var user = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Id == _currentUser.UserId && !u.IsDeleted);

            if (user == null)
            {
                return NotFound(new { error = "User not found" });
            }

            // Get linked employee if exists
            var employeeLink = await _context.EmployeeUserLinks
                .Include(eul => eul.Employee)
                    .ThenInclude(e => e.Department)
                .Include(eul => eul.Employee)
                    .ThenInclude(e => e.Branch)
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            var profile = new MyProfileDto
            {
                UserId = user.Id,
                UserName = user.Username,
                Email = user.Email,
                PhoneNumber = user.Phone,
                IsActive = user.IsActive,
                Roles = user.UserRoles?.Select(ur => ur.Role.Name).ToList() ?? new List<string>(),
                CreatedAtUtc = user.CreatedAtUtc
            };

            // Add employee info if linked
            if (employeeLink?.Employee != null)
            {
                var emp = employeeLink.Employee;
                // Set display name from employee if available
                profile.DisplayName = emp.FullName;
                profile.DisplayNameAr = emp.FullNameAr;

                profile.EmployeeInfo = new EmployeeInfoDto
                {
                    EmployeeId = emp.Id,
                    EmployeeCode = emp.EmployeeNumber,
                    FullName = emp.FullName,
                    FullNameAr = emp.FullNameAr,
                    Department = emp.Department?.Name,
                    DepartmentAr = emp.Department?.NameAr,
                    Branch = emp.Branch?.Name,
                    Position = emp.JobTitle,
                    PositionAr = emp.JobTitleAr,
                    HireDate = emp.HireDate,
                    Email = emp.Email,
                    Phone = emp.Phone
                };
            }

            var result = Result.Success(profile);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my profile");
            return StatusCode(500, new { error = "An error occurred while retrieving profile" });
        }
    }

    /// <summary>
    /// Updates the current user's profile information.
    /// Only allows updating limited fields for security.
    /// </summary>
    /// <param name="request">Profile update request</param>
    /// <returns>Success result</returns>
    /// <response code="200">Profile updated successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">User or employee profile not found</response>
    [HttpPut("my-profile")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateMyProfileRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get the user
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == _currentUser.UserId && !u.IsDeleted);

            if (user == null)
            {
                return NotFound(new { error = "User not found" });
            }

            // Update allowed user fields
            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                user.Phone = request.PhoneNumber;
            }

            // Note: User entity doesn't have FullName, so we can only update Phone for now
            // DisplayName would require updating the linked Employee's FirstName/LastName

            await _context.SaveChangesAsync(default);

            var result = Result.Success(true);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating my profile");
            return StatusCode(500, new { error = "An error occurred while updating profile" });
        }
    }
}

/// <summary>
/// Request for updating user's own profile
/// </summary>
public class UpdateMyProfileRequest
{
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? DisplayName { get; set; }
    public string? Address { get; set; }
    public string? EmergencyContact { get; set; }
    public string? EmergencyPhone { get; set; }
}

/// <summary>
/// DTO for user's own profile
/// </summary>
public class MyProfileDto
{
    public long UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? DisplayName { get; set; }
    public string? DisplayNameAr { get; set; }
    public bool IsActive { get; set; }
    public List<string> Roles { get; set; } = new();
    public DateTime CreatedAtUtc { get; set; }
    public EmployeeInfoDto? EmployeeInfo { get; set; }
}

/// <summary>
/// DTO for linked employee information
/// </summary>
public class EmployeeInfoDto
{
    public long EmployeeId { get; set; }
    public string EmployeeCode { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? FullNameAr { get; set; }
    public string? Department { get; set; }
    public string? DepartmentAr { get; set; }
    public string? Branch { get; set; }
    public string? Position { get; set; }
    public string? PositionAr { get; set; }
    public DateTime HireDate { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
}

/// <summary>
/// DTO for employee's own attendance records
/// </summary>
public class MyAttendanceRecordDto
{
    public long Id { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime? ScheduledStartTime { get; set; }
    public DateTime? ScheduledEndTime { get; set; }
    public DateTime? ActualCheckInTime { get; set; }
    public DateTime? ActualCheckOutTime { get; set; }
    public decimal WorkingHours { get; set; }
    public decimal OvertimeHours { get; set; }
    public int LateMinutes { get; set; }
    public int EarlyLeaveMinutes { get; set; }
    public string? Notes { get; set; }
}
