using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuses;
using TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;
using TimeAttendanceSystem.Application.Features.Portal.ManagerDashboard.Queries;
using TimeAttendanceSystem.Application.Features.Portal.Team.Queries;
using TimeAttendanceSystem.Application.Workflows.Queries.GetPendingApprovals;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Domain.Workflows.Enums;

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
    private readonly IInAppNotificationService _notificationService;

    public PortalController(
        IMediator mediator,
        ILogger<PortalController> logger,
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IInAppNotificationService notificationService)
    {
        _mediator = mediator;
        _logger = logger;
        _context = context;
        _currentUser = currentUser;
        _notificationService = notificationService;
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
    /// Retrieves pending approvals for the current user (manager).
    /// Returns workflow items awaiting the user's approval action.
    /// </summary>
    /// <param name="entityType">Filter by entity type (Vacation, Excuse, RemoteWork, etc.)</param>
    /// <param name="isOverdue">Filter by overdue status</param>
    /// <param name="page">Page number (1-based). Default: 1</param>
    /// <param name="pageSize">Page size. Default: 10</param>
    /// <returns>Paginated list of pending approvals</returns>
    /// <response code="200">Pending approvals retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    [HttpGet("pending-approvals")]
    [ProducesResponseType(typeof(Result<PagedResult<PendingApprovalDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetPendingApprovals(
        [FromQuery] WorkflowEntityType? entityType = null,
        [FromQuery] bool? isOverdue = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var userId = _currentUser.UserId;
            if (userId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var query = new GetPendingApprovalsQuery
            {
                UserId = userId.Value,
                EntityType = entityType,
                IsOverdue = isOverdue,
                Page = page,
                PageSize = Math.Min(pageSize, 100) // Cap at 100
            };

            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                return BadRequest(new { error = result.Error });
            }

            // Return the value directly as an array for frontend compatibility
            return Ok(new { isSuccess = true, value = result.Value.Items, error = (string?)null });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving pending approvals");
            return StatusCode(500, new { error = "An error occurred while retrieving pending approvals" });
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
            // Fix: For past dates, convert invalid/undefined status values to Absent
            // This handles both AttendanceStatus.Pending (11) and undefined status (0)
            // Business rule: Default status should be "Absent" for working days with no check-in
            var today = DateTime.UtcNow.Date;
            var attendanceRecords = records.Select(a => {
                var statusValue = (int)a.Status;
                var isInvalidOrPending = statusValue == 0 ||
                                         statusValue == (int)AttendanceStatus.Pending ||
                                         !Enum.IsDefined(typeof(AttendanceStatus), a.Status);
                var effectiveStatus = (isInvalidOrPending && a.AttendanceDate.Date < today)
                    ? AttendanceStatus.Absent
                    : a.Status;

                return new MyAttendanceRecordDto
                {
                    Id = a.Id,
                    Date = a.AttendanceDate,
                    Status = effectiveStatus.ToString(),
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
                };
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

    /// <summary>
    /// Retrieves the current employee's vacation requests.
    /// </summary>
    /// <param name="page">Page number (1-based). Default: 1</param>
    /// <param name="pageSize">Page size. Default: 20</param>
    /// <returns>List of vacation requests for the current employee</returns>
    /// <response code="200">Vacation requests retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("my-vacations")]
    [ProducesResponseType(typeof(Result<object>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyVacations(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query vacations for the current employee
            var query = new Application.EmployeeVacations.Queries.GetEmployeeVacations.GetEmployeeVacationsQuery(
                EmployeeId: employeeId,
                Page: page,
                PageSize: pageSize,
                SortBy: "StartDate",
                SortDescending: true
            );

            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                return BadRequest(new { error = result.Error });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my vacation requests");
            return StatusCode(500, new { error = "An error occurred while retrieving vacation requests" });
        }
    }

    /// <summary>
    /// Retrieves a specific vacation request for the current employee.
    /// Only returns vacation if it belongs to the current employee.
    /// </summary>
    /// <param name="id">Vacation ID</param>
    /// <returns>Vacation request details</returns>
    /// <response code="200">Vacation request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Vacation not found or doesn't belong to current employee</response>
    [HttpGet("my-vacations/{id}")]
    [ProducesResponseType(typeof(Application.EmployeeVacations.Queries.Common.EmployeeVacationDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyVacationById(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query the vacation directly with employee filter for security
            var vacation = await _context.EmployeeVacations
                .Include(ev => ev.Employee)
                .Include(ev => ev.VacationType)
                .Where(ev => ev.Id == id && ev.EmployeeId == employeeId && !ev.IsDeleted)
                .Select(ev => new
                {
                    ev.Id,
                    ev.EmployeeId,
                    ev.Employee.EmployeeNumber,
                    EmployeeName = $"{ev.Employee.FirstName} {ev.Employee.LastName}",
                    ev.VacationTypeId,
                    VacationTypeName = ev.VacationType.Name,
                    ev.StartDate,
                    ev.EndDate,
                    ev.TotalDays,
                    ev.IsApproved,
                    ev.Notes,
                    ev.CreatedAtUtc,
                    ev.CreatedBy,
                    ev.ModifiedAtUtc,
                    ev.ModifiedBy
                })
                .FirstOrDefaultAsync();

            if (vacation == null)
            {
                return NotFound(new { error = $"Vacation with ID {id} not found" });
            }

            // Get workflow instance for this vacation
            var workflow = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverUser)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .Where(wi => wi.EntityType == Domain.Workflows.Enums.WorkflowEntityType.Vacation && wi.EntityId == id)
                .FirstOrDefaultAsync();

            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                if (currentStep.ApproverType == Domain.Workflows.Enums.ApproverType.DirectManager)
                {
                    approverRole = "Direct Manager";
                }
                else if (currentStep.ApproverType == Domain.Workflows.Enums.ApproverType.DepartmentHead)
                {
                    approverRole = "Department Head";
                }
                else if (currentStep.ApproverType == Domain.Workflows.Enums.ApproverType.Role && currentStep.ApproverRole != null)
                {
                    approverRole = currentStep.ApproverRole.Name;
                }
                else if (currentStep.ApproverType == Domain.Workflows.Enums.ApproverType.SpecificUser && currentStep.ApproverUser != null)
                {
                    approverName = currentStep.ApproverUser.Username;
                }
            }

            // Build approval history
            List<Application.EmployeeVacations.Queries.Common.ApprovalStepDto>? approvalHistory = null;
            if (workflow != null)
            {
                var stepExecutions = await _context.WorkflowStepExecutions
                    .Include(wse => wse.Step)
                    .Include(wse => wse.AssignedToUser)
                    .Include(wse => wse.ActionTakenByUser)
                    .Where(wse => wse.WorkflowInstanceId == workflow.Id)
                    .OrderBy(wse => wse.Step.StepOrder)
                    .ThenBy(wse => wse.AssignedAt)
                    .ToListAsync();

                if (stepExecutions.Any())
                {
                    approvalHistory = stepExecutions.Select(exec => new Application.EmployeeVacations.Queries.Common.ApprovalStepDto(
                        exec.Step.StepOrder,
                        exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                        exec.Action?.ToString() ?? "Pending",
                        exec.AssignedToUser?.Username ?? "Unknown",
                        exec.ActionTakenByUser?.Username,
                        exec.AssignedAt,
                        exec.ActionTakenAt,
                        exec.Comments
                    )).ToList();
                }
            }

            // Calculate derived fields
            var today = DateTime.Today;
            var isCurrentlyActive = vacation.IsApproved && vacation.StartDate.Date <= today && vacation.EndDate.Date >= today;
            var isUpcoming = vacation.StartDate.Date > today;
            var isCompleted = vacation.EndDate.Date < today;
            var businessDays = CalculateBusinessDays(vacation.StartDate, vacation.EndDate);

            var dto = new Application.EmployeeVacations.Queries.Common.EmployeeVacationDto(
                vacation.Id,
                vacation.EmployeeId,
                vacation.EmployeeNumber,
                vacation.EmployeeName,
                vacation.VacationTypeId,
                vacation.VacationTypeName,
                vacation.StartDate,
                vacation.EndDate,
                vacation.TotalDays,
                businessDays,
                vacation.IsApproved,
                vacation.Notes,
                isCurrentlyActive,
                isUpcoming,
                isCompleted,
                vacation.CreatedAtUtc,
                vacation.CreatedBy,
                vacation.ModifiedAtUtc,
                vacation.ModifiedBy,
                workflow?.Status.ToString(),
                approverName,
                approverRole,
                currentStep?.StepOrder,
                totalSteps > 0 ? totalSteps : null,
                approvalHistory,
                workflow?.Id
            );

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving vacation request {VacationId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving vacation request" });
        }
    }

    /// <summary>
    /// Retrieves a vacation request for approval purposes (manager view).
    /// Returns vacation details if the current user is an approver for this request.
    /// </summary>
    /// <param name="id">Vacation ID</param>
    /// <returns>Vacation request details for approval</returns>
    /// <response code="200">Vacation request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="403">Forbidden - user is not an approver for this request</response>
    /// <response code="404">Vacation not found</response>
    [HttpGet("approval-vacation/{id}")]
    [ProducesResponseType(typeof(Application.EmployeeVacations.Queries.Common.EmployeeVacationDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetVacationForApproval(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var userId = _currentUser.UserId.Value;

            // Check if user has a pending approval for this vacation
            var hasPendingApproval = await _context.WorkflowStepExecutions
                .Include(wse => wse.WorkflowInstance)
                .Where(wse => wse.AssignedToUserId == userId &&
                             wse.Action == null &&
                             !wse.IsDeleted &&
                             wse.WorkflowInstance.EntityType == Domain.Workflows.Enums.WorkflowEntityType.Vacation &&
                             wse.WorkflowInstance.EntityId == id &&
                             !wse.WorkflowInstance.IsDeleted)
                .AnyAsync();

            if (!hasPendingApproval)
            {
                // Also check if user is a manager of the requesting employee
                var employeeLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.UserId == userId);

                if (employeeLink != null)
                {
                    var managerEmployeeId = employeeLink.EmployeeId;

                    // Get the vacation to check if it belongs to a direct report
                    var vacationCheck = await _context.EmployeeVacations
                        .Include(ev => ev.Employee)
                        .Where(ev => ev.Id == id && !ev.IsDeleted)
                        .FirstOrDefaultAsync();

                    if (vacationCheck != null)
                    {
                        var isDirectReport = vacationCheck.Employee.ManagerEmployeeId == managerEmployeeId;
                        if (!isDirectReport && !hasPendingApproval)
                        {
                            return StatusCode(403, new { error = "You are not authorized to view this vacation request" });
                        }
                    }
                }
                else if (!hasPendingApproval)
                {
                    return StatusCode(403, new { error = "You are not authorized to view this vacation request" });
                }
            }

            // Query the vacation without employee filter (manager can view)
            var vacation = await _context.EmployeeVacations
                .Include(ev => ev.Employee)
                .Include(ev => ev.VacationType)
                .Where(ev => ev.Id == id && !ev.IsDeleted)
                .Select(ev => new
                {
                    ev.Id,
                    ev.EmployeeId,
                    ev.Employee.EmployeeNumber,
                    EmployeeName = $"{ev.Employee.FirstName} {ev.Employee.LastName}",
                    ev.VacationTypeId,
                    VacationTypeName = ev.VacationType.Name,
                    ev.StartDate,
                    ev.EndDate,
                    ev.TotalDays,
                    ev.IsApproved,
                    ev.Notes,
                    ev.CreatedAtUtc,
                    ev.CreatedBy,
                    ev.ModifiedAtUtc,
                    ev.ModifiedBy
                })
                .FirstOrDefaultAsync();

            if (vacation == null)
            {
                return NotFound(new { error = $"Vacation with ID {id} not found" });
            }

            // Get workflow instance for this vacation
            var workflow = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverUser)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .Where(wi => wi.EntityType == Domain.Workflows.Enums.WorkflowEntityType.Vacation && wi.EntityId == id)
                .FirstOrDefaultAsync();

            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                approverName = currentStep.ApproverUser != null
                    ? currentStep.ApproverUser.Username
                    : null;
                approverRole = currentStep.ApproverRole != null
                    ? currentStep.ApproverRole.Name
                    : currentStep.ApproverType.ToString();
            }

            var now = DateTime.UtcNow.Date;
            var startDate = vacation.StartDate.Date;
            var endDate = vacation.EndDate.Date;
            var isCurrentlyActive = vacation.IsApproved && startDate <= now && endDate >= now;
            var isUpcoming = vacation.IsApproved && startDate > now;
            var isCompleted = endDate < now;
            var businessDays = CalculateBusinessDays(startDate, endDate);

            // Get approval history
            List<Application.EmployeeVacations.Queries.Common.ApprovalStepDto>? approvalHistory = null;
            if (workflow != null)
            {
                var stepExecutions = await _context.WorkflowStepExecutions
                    .Include(wse => wse.Step)
                    .Include(wse => wse.AssignedToUser)
                    .Include(wse => wse.ActionTakenByUser)
                    .Where(wse => wse.WorkflowInstanceId == workflow.Id && !wse.IsDeleted)
                    .OrderBy(wse => wse.Step.StepOrder)
                    .ToListAsync();

                approvalHistory = stepExecutions.Select(exec => new Application.EmployeeVacations.Queries.Common.ApprovalStepDto(
                    exec.Step.StepOrder,
                    exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                    exec.Action?.ToString() ?? "Pending",
                    exec.AssignedToUser?.Username ?? "Unknown",
                    exec.ActionTakenByUser?.Username,
                    exec.AssignedAt,
                    exec.ActionTakenAt,
                    exec.Comments
                )).ToList();
            }

            var dto = new Application.EmployeeVacations.Queries.Common.EmployeeVacationDto(
                vacation.Id,
                vacation.EmployeeId,
                vacation.EmployeeNumber,
                vacation.EmployeeName,
                vacation.VacationTypeId,
                vacation.VacationTypeName,
                vacation.StartDate,
                vacation.EndDate,
                vacation.TotalDays,
                businessDays,
                vacation.IsApproved,
                vacation.Notes,
                isCurrentlyActive,
                isUpcoming,
                isCompleted,
                vacation.CreatedAtUtc,
                vacation.CreatedBy,
                vacation.ModifiedAtUtc,
                vacation.ModifiedBy,
                workflow?.Status.ToString(),
                approverName,
                approverRole,
                currentStep?.StepOrder,
                totalSteps > 0 ? totalSteps : null,
                approvalHistory,
                workflow?.Id
            );

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving vacation request for approval {VacationId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving vacation request" });
        }
    }

    #region Excuse Self-Service Endpoints

    /// <summary>
    /// Retrieves the current employee's excuse requests.
    /// </summary>
    /// <param name="page">Page number (1-based). Default: 1</param>
    /// <param name="pageSize">Page size. Default: 20</param>
    /// <returns>List of excuse requests for the current employee</returns>
    /// <response code="200">Excuse requests retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("my-excuses")]
    [ProducesResponseType(typeof(Result<PagedResult<EmployeeExcuseDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyExcuses(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query excuses for the current employee
            var query = new GetEmployeeExcusesQuery
            {
                EmployeeId = employeeId,
                PageNumber = page,
                PageSize = pageSize
            };

            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                return BadRequest(new { error = result.Error });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my excuse requests");
            return StatusCode(500, new { error = "An error occurred while retrieving excuse requests" });
        }
    }

    /// <summary>
    /// Retrieves a specific excuse request for the current employee.
    /// Only returns excuse if it belongs to the current employee.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <returns>Excuse request details</returns>
    /// <response code="200">Excuse request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Excuse not found or doesn't belong to current employee</response>
    [HttpGet("my-excuses/{id}")]
    [ProducesResponseType(typeof(EmployeeExcuseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyExcuseById(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query the excuse directly with employee filter for security
            var excuse = await _context.EmployeeExcuses
                .Include(ee => ee.Employee)
                    .ThenInclude(e => e.Department)
                .Include(ee => ee.Employee)
                    .ThenInclude(e => e.Branch)
                .Include(ee => ee.ApprovedBy)
                .Where(ee => ee.Id == id && ee.EmployeeId == employeeId && !ee.IsDeleted)
                .FirstOrDefaultAsync();

            if (excuse == null)
            {
                return NotFound(new { error = $"Excuse with ID {id} not found" });
            }

            // Get workflow instance for this excuse
            var workflow = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverUser)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .Where(wi => wi.EntityType == WorkflowEntityType.Excuse && wi.EntityId == id)
                .FirstOrDefaultAsync();

            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                if (currentStep.ApproverType == ApproverType.DirectManager)
                {
                    approverRole = "Direct Manager";
                }
                else if (currentStep.ApproverType == ApproverType.DepartmentHead)
                {
                    approverRole = "Department Head";
                }
                else if (currentStep.ApproverType == ApproverType.Role && currentStep.ApproverRole != null)
                {
                    approverRole = currentStep.ApproverRole.Name;
                }
                else if (currentStep.ApproverType == ApproverType.SpecificUser && currentStep.ApproverUser != null)
                {
                    approverName = currentStep.ApproverUser.Username;
                }
            }

            // Build approval history
            List<ExcuseApprovalStepDto>? approvalHistory = null;
            if (workflow != null)
            {
                var stepExecutions = await _context.WorkflowStepExecutions
                    .Include(wse => wse.Step)
                    .Include(wse => wse.AssignedToUser)
                    .Include(wse => wse.ActionTakenByUser)
                    .Where(wse => wse.WorkflowInstanceId == workflow.Id)
                    .OrderBy(wse => wse.Step.StepOrder)
                    .ThenBy(wse => wse.AssignedAt)
                    .ToListAsync();

                if (stepExecutions.Any())
                {
                    approvalHistory = stepExecutions.Select(exec => new ExcuseApprovalStepDto
                    {
                        StepOrder = exec.Step.StepOrder,
                        StepName = exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                        Status = exec.Action?.ToString() ?? "Pending",
                        AssignedToName = exec.AssignedToUser?.Username ?? "Unknown",
                        ActionByName = exec.ActionTakenByUser?.Username,
                        AssignedAt = exec.AssignedAt,
                        ActionAt = exec.ActionTakenAt,
                        Comments = exec.Comments
                    }).ToList();
                }
            }

            // Build the DTO
            var dto = new EmployeeExcuseDto
            {
                Id = excuse.Id,
                EmployeeId = excuse.EmployeeId,
                EmployeeName = $"{excuse.Employee.FirstName} {excuse.Employee.LastName}",
                EmployeeNumber = excuse.Employee.EmployeeNumber,
                DepartmentName = excuse.Employee.Department?.Name ?? "",
                BranchName = excuse.Employee.Branch?.Name ?? "",
                ExcuseDate = excuse.ExcuseDate,
                ExcuseType = excuse.ExcuseType,
                ExcuseTypeDisplay = excuse.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
                StartTime = excuse.StartTime,
                EndTime = excuse.EndTime,
                TimeRange = $"{excuse.StartTime:HH:mm} - {excuse.EndTime:HH:mm}",
                DurationHours = excuse.DurationHours,
                Reason = excuse.Reason,
                ApprovalStatus = excuse.ApprovalStatus,
                ApprovalStatusDisplay = excuse.ApprovalStatus.ToString(),
                ApprovedById = excuse.ApprovedById,
                ApprovedByName = excuse.ApprovedBy?.Username,
                ApprovedAt = excuse.ApprovedAt,
                RejectionReason = excuse.RejectionReason,
                AttachmentPath = excuse.AttachmentPath,
                AffectsSalary = excuse.AffectsSalary,
                ProcessingNotes = excuse.ProcessingNotes,
                CreatedAtUtc = excuse.CreatedAtUtc,
                CreatedBy = excuse.CreatedBy,
                ModifiedAtUtc = excuse.ModifiedAtUtc,
                ModifiedBy = excuse.ModifiedBy,
                CanBeModified = excuse.ApprovalStatus != ApprovalStatus.Approved && excuse.ExcuseDate.Date >= DateTime.Today,
                ExcuseSummary = $"{excuse.ExcuseDate:MMM dd, yyyy} {excuse.StartTime:HH:mm} - {excuse.EndTime:HH:mm} ({excuse.DurationHours:F1}h) - {(excuse.ExcuseType == ExcuseType.PersonalExcuse ? "Personal" : "Official Duty")} - {excuse.ApprovalStatus}",
                // Workflow information
                WorkflowInstanceId = workflow?.Id,
                WorkflowStatus = workflow?.Status.ToString(),
                CurrentApproverName = approverName,
                CurrentApproverRole = approverRole,
                CurrentStepOrder = currentStep?.StepOrder,
                TotalSteps = totalSteps > 0 ? totalSteps : null,
                ApprovalHistory = approvalHistory
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving excuse request {ExcuseId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving excuse request" });
        }
    }

    /// <summary>
    /// Retrieves an excuse request for approval purposes (manager view).
    /// Returns excuse details if the current user is an approver for this request.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <returns>Excuse request details for approval</returns>
    /// <response code="200">Excuse request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="403">Forbidden - user is not an approver for this request</response>
    /// <response code="404">Excuse not found</response>
    [HttpGet("approval-excuse/{id}")]
    [ProducesResponseType(typeof(EmployeeExcuseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetExcuseForApproval(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var userId = _currentUser.UserId.Value;

            // Check if user was ever assigned to approve this excuse (pending or completed/skipped)
            var wasAssignedToApprove = await _context.WorkflowStepExecutions
                .Include(wse => wse.WorkflowInstance)
                .Where(wse => wse.AssignedToUserId == userId &&
                             !wse.IsDeleted &&
                             wse.WorkflowInstance.EntityType == WorkflowEntityType.Excuse &&
                             wse.WorkflowInstance.EntityId == id &&
                             !wse.WorkflowInstance.IsDeleted)
                .AnyAsync();

            if (!wasAssignedToApprove)
            {
                // Also check if user is a manager of the requesting employee
                var employeeLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.UserId == userId);

                if (employeeLink != null)
                {
                    var managerEmployeeId = employeeLink.EmployeeId;

                    // Get the excuse to check if it belongs to a direct report
                    var excuseCheck = await _context.EmployeeExcuses
                        .Include(ee => ee.Employee)
                        .Where(ee => ee.Id == id && !ee.IsDeleted)
                        .FirstOrDefaultAsync();

                    if (excuseCheck != null)
                    {
                        var isDirectReport = excuseCheck.Employee.ManagerEmployeeId == managerEmployeeId;
                        if (!isDirectReport)
                        {
                            return StatusCode(403, new { error = "You are not authorized to view this excuse request" });
                        }
                    }
                }
                else
                {
                    return StatusCode(403, new { error = "You are not authorized to view this excuse request" });
                }
            }

            // Query the excuse without employee filter (manager can view)
            var excuse = await _context.EmployeeExcuses
                .Include(ee => ee.Employee)
                    .ThenInclude(e => e.Department)
                .Include(ee => ee.Employee)
                    .ThenInclude(e => e.Branch)
                .Include(ee => ee.ApprovedBy)
                .Where(ee => ee.Id == id && !ee.IsDeleted)
                .FirstOrDefaultAsync();

            if (excuse == null)
            {
                return NotFound(new { error = $"Excuse with ID {id} not found" });
            }

            // Get workflow instance for this excuse
            var workflow = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverUser)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .Where(wi => wi.EntityType == WorkflowEntityType.Excuse && wi.EntityId == id)
                .FirstOrDefaultAsync();

            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                approverName = currentStep.ApproverUser != null
                    ? currentStep.ApproverUser.Username
                    : null;
                approverRole = currentStep.ApproverRole != null
                    ? currentStep.ApproverRole.Name
                    : currentStep.ApproverType.ToString();
            }

            // Get approval history
            List<ExcuseApprovalStepDto>? approvalHistory = null;
            if (workflow != null)
            {
                var stepExecutions = await _context.WorkflowStepExecutions
                    .Include(wse => wse.Step)
                    .Include(wse => wse.AssignedToUser)
                    .Include(wse => wse.ActionTakenByUser)
                    .Where(wse => wse.WorkflowInstanceId == workflow.Id && !wse.IsDeleted)
                    .OrderBy(wse => wse.Step.StepOrder)
                    .ToListAsync();

                approvalHistory = stepExecutions.Select(exec => new ExcuseApprovalStepDto
                {
                    StepOrder = exec.Step.StepOrder,
                    StepName = exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                    Status = exec.Action?.ToString() ?? "Pending",
                    AssignedToName = exec.AssignedToUser?.Username ?? "Unknown",
                    ActionByName = exec.ActionTakenByUser?.Username,
                    AssignedAt = exec.AssignedAt,
                    ActionAt = exec.ActionTakenAt,
                    Comments = exec.Comments
                }).ToList();
            }

            // Build the DTO
            var dto = new EmployeeExcuseDto
            {
                Id = excuse.Id,
                EmployeeId = excuse.EmployeeId,
                EmployeeName = $"{excuse.Employee.FirstName} {excuse.Employee.LastName}",
                EmployeeNumber = excuse.Employee.EmployeeNumber,
                DepartmentName = excuse.Employee.Department?.Name ?? "",
                BranchName = excuse.Employee.Branch?.Name ?? "",
                ExcuseDate = excuse.ExcuseDate,
                ExcuseType = excuse.ExcuseType,
                ExcuseTypeDisplay = excuse.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
                StartTime = excuse.StartTime,
                EndTime = excuse.EndTime,
                TimeRange = $"{excuse.StartTime:HH:mm} - {excuse.EndTime:HH:mm}",
                DurationHours = excuse.DurationHours,
                Reason = excuse.Reason,
                ApprovalStatus = excuse.ApprovalStatus,
                ApprovalStatusDisplay = excuse.ApprovalStatus.ToString(),
                ApprovedById = excuse.ApprovedById,
                ApprovedByName = excuse.ApprovedBy?.Username,
                ApprovedAt = excuse.ApprovedAt,
                RejectionReason = excuse.RejectionReason,
                AttachmentPath = excuse.AttachmentPath,
                AffectsSalary = excuse.AffectsSalary,
                ProcessingNotes = excuse.ProcessingNotes,
                CreatedAtUtc = excuse.CreatedAtUtc,
                CreatedBy = excuse.CreatedBy,
                ModifiedAtUtc = excuse.ModifiedAtUtc,
                ModifiedBy = excuse.ModifiedBy,
                CanBeModified = excuse.ApprovalStatus != ApprovalStatus.Approved && excuse.ExcuseDate.Date >= DateTime.Today,
                ExcuseSummary = $"{excuse.ExcuseDate:MMM dd, yyyy} {excuse.StartTime:HH:mm} - {excuse.EndTime:HH:mm} ({excuse.DurationHours:F1}h) - {(excuse.ExcuseType == ExcuseType.PersonalExcuse ? "Personal" : "Official Duty")} - {excuse.ApprovalStatus}",
                // Workflow information
                WorkflowInstanceId = workflow?.Id,
                WorkflowStatus = workflow?.Status.ToString(),
                CurrentApproverName = approverName,
                CurrentApproverRole = approverRole,
                CurrentStepOrder = currentStep?.StepOrder,
                TotalSteps = totalSteps > 0 ? totalSteps : null,
                ApprovalHistory = approvalHistory
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving excuse request for approval {ExcuseId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving excuse request" });
        }
    }

    /// <summary>
    /// Cancels the current employee's own excuse request.
    /// Only pending excuses can be cancelled.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <returns>Success result</returns>
    /// <response code="200">Excuse cancelled successfully</response>
    /// <response code="400">Excuse cannot be cancelled (already approved/rejected)</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Excuse not found or doesn't belong to current employee</response>
    [HttpDelete("my-excuses/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CancelMyExcuse(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Find the excuse and verify it belongs to the current employee
            var excuse = await _context.EmployeeExcuses
                .Where(ee => ee.Id == id && ee.EmployeeId == employeeId && !ee.IsDeleted)
                .FirstOrDefaultAsync();

            if (excuse == null)
            {
                return NotFound(new { error = $"Excuse with ID {id} not found or doesn't belong to you" });
            }

            // Only allow cancellation of pending excuses
            if (excuse.ApprovalStatus != ApprovalStatus.Pending)
            {
                return BadRequest(new { error = $"Cannot cancel excuse with status '{excuse.ApprovalStatus}'. Only pending excuses can be cancelled." });
            }

            // Cancel the excuse by setting status to Cancelled
            excuse.ApprovalStatus = ApprovalStatus.Cancelled;
            excuse.ModifiedAtUtc = DateTime.UtcNow;
            excuse.ModifiedBy = _currentUser.Username;

            // Cancel any associated workflow and its pending steps
            if (excuse.WorkflowInstanceId.HasValue)
            {
                var workflow = await _context.WorkflowInstances
                    .Include(wi => wi.StepExecutions)
                    .FirstOrDefaultAsync(wi => wi.Id == excuse.WorkflowInstanceId);

                if (workflow != null && workflow.Status != WorkflowStatus.Approved && workflow.Status != WorkflowStatus.Rejected)
                {
                    workflow.Status = WorkflowStatus.Cancelled;
                    workflow.CompletedAt = DateTime.UtcNow;
                    workflow.ModifiedAtUtc = DateTime.UtcNow;

                    // Mark all pending step executions as skipped (cancelled)
                    foreach (var step in workflow.StepExecutions.Where(s => !s.Action.HasValue))
                    {
                        step.Skip("Request cancelled by employee");
                    }
                }
            }

            await _context.SaveChangesAsync();

            // Mark all notifications related to this excuse as read for all users
            await _notificationService.MarkEntityNotificationsAsReadAsync("Excuse", id);

            _logger.LogInformation("User {UserId} cancelled excuse {ExcuseId}", _currentUser.UserId, id);

            return Ok(new { message = "Excuse cancelled successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cancelling excuse request {ExcuseId}", id);
            return StatusCode(500, new { error = "An error occurred while cancelling excuse request" });
        }
    }

    #endregion

    #region Attendance Correction Self-Service Endpoints

    /// <summary>
    /// Retrieves the current employee's attendance correction requests.
    /// </summary>
    /// <param name="page">Page number (1-based). Default: 1</param>
    /// <param name="pageSize">Page size. Default: 20</param>
    /// <returns>List of attendance correction requests for the current employee</returns>
    /// <response code="200">Attendance correction requests retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("my-attendance-corrections")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyAttendanceCorrections(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query corrections for the current employee
            var query = new Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests.GetAttendanceCorrectionRequestsQuery(
                EmployeeId: employeeId,
                StartDate: null,
                EndDate: null,
                CorrectionType: null,
                ApprovalStatus: null,
                BranchId: null,
                PageNumber: page,
                PageSize: pageSize
            );

            var result = await _mediator.Send(query);

            if (!result.IsSuccess)
            {
                return BadRequest(new { error = result.Error });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my attendance correction requests");
            return StatusCode(500, new { error = "An error occurred while retrieving attendance correction requests" });
        }
    }

    /// <summary>
    /// Retrieves a specific attendance correction request for the current employee.
    /// Only returns correction if it belongs to the current employee.
    /// </summary>
    /// <param name="id">Correction request ID</param>
    /// <returns>Attendance correction request details</returns>
    /// <response code="200">Correction request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Correction not found or doesn't belong to current employee</response>
    [HttpGet("my-attendance-corrections/{id}")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyAttendanceCorrectionById(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query the correction by ID
            var query = new Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequestById.GetAttendanceCorrectionRequestByIdQuery(id);
            var result = await _mediator.Send(query);

            if (!result.IsSuccess || result.Value == null)
            {
                return NotFound(new { error = $"Correction request with ID {id} not found" });
            }

            // Security check: verify it belongs to the current employee
            if (result.Value.EmployeeId != employeeId)
            {
                return NotFound(new { error = $"Correction request with ID {id} not found" });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving attendance correction request {CorrectionId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving attendance correction request" });
        }
    }

    /// <summary>
    /// Cancels the current employee's own attendance correction request.
    /// Only pending corrections can be cancelled.
    /// </summary>
    /// <param name="id">Correction ID</param>
    /// <returns>Success result</returns>
    /// <response code="200">Correction cancelled successfully</response>
    /// <response code="400">Correction cannot be cancelled (already approved/rejected)</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Correction not found or doesn't belong to current employee</response>
    [HttpDelete("my-attendance-corrections/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CancelMyAttendanceCorrection(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Find the correction and verify it belongs to the current employee
            var correction = await _context.AttendanceCorrectionRequests
                .Where(acr => acr.Id == id && acr.EmployeeId == employeeId && !acr.IsDeleted)
                .FirstOrDefaultAsync();

            if (correction == null)
            {
                return NotFound(new { error = $"Correction request with ID {id} not found or doesn't belong to you" });
            }

            // Only allow cancellation of pending corrections
            if (correction.ApprovalStatus != ApprovalStatus.Pending)
            {
                return BadRequest(new { error = $"Cannot cancel correction with status '{correction.ApprovalStatus}'. Only pending corrections can be cancelled." });
            }

            // Cancel the correction by setting status to Cancelled
            correction.ApprovalStatus = ApprovalStatus.Cancelled;
            correction.ModifiedAtUtc = DateTime.UtcNow;
            correction.ModifiedBy = _currentUser.Username;

            // Cancel any associated workflow and its pending steps
            if (correction.WorkflowInstanceId.HasValue)
            {
                var workflow = await _context.WorkflowInstances
                    .Include(wi => wi.StepExecutions)
                    .FirstOrDefaultAsync(wi => wi.Id == correction.WorkflowInstanceId);

                if (workflow != null && workflow.Status != WorkflowStatus.Approved && workflow.Status != WorkflowStatus.Rejected)
                {
                    workflow.Status = WorkflowStatus.Cancelled;
                    workflow.CompletedAt = DateTime.UtcNow;
                    workflow.ModifiedAtUtc = DateTime.UtcNow;

                    // Mark all pending step executions as skipped (cancelled)
                    foreach (var step in workflow.StepExecutions.Where(s => !s.Action.HasValue))
                    {
                        step.Skip("Request cancelled by employee");
                    }
                }
            }

            await _context.SaveChangesAsync();

            // Mark all notifications related to this correction as read for all users
            await _notificationService.MarkEntityNotificationsAsReadAsync("AttendanceCorrection", id);

            _logger.LogInformation("User {UserId} cancelled attendance correction {CorrectionId}", _currentUser.UserId, id);

            return Ok(new { message = "Attendance correction request cancelled successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cancelling attendance correction request {CorrectionId}", id);
            return StatusCode(500, new { error = "An error occurred while cancelling attendance correction request" });
        }
    }

    /// <summary>
    /// Retrieves an attendance correction request for approval purposes (manager view).
    /// Returns correction details if the current user is an approver for this request.
    /// </summary>
    /// <param name="id">Correction ID</param>
    /// <returns>Correction request details for approval</returns>
    /// <response code="200">Correction request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="403">Forbidden - user is not an approver for this request</response>
    /// <response code="404">Correction not found</response>
    [HttpGet("approval-attendance-correction/{id}")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAttendanceCorrectionForApproval(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var userId = _currentUser.UserId.Value;

            // Check if user was ever assigned to approve this correction (pending or completed/skipped)
            var wasAssignedToApprove = await _context.WorkflowStepExecutions
                .Include(wse => wse.WorkflowInstance)
                .Where(wse => wse.AssignedToUserId == userId &&
                             !wse.IsDeleted &&
                             wse.WorkflowInstance.EntityType == WorkflowEntityType.AttendanceCorrection &&
                             wse.WorkflowInstance.EntityId == id &&
                             !wse.WorkflowInstance.IsDeleted)
                .AnyAsync();

            if (!wasAssignedToApprove)
            {
                // Also check if user is a manager of the requesting employee
                var employeeLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.UserId == userId);

                if (employeeLink != null)
                {
                    var managerEmployeeId = employeeLink.EmployeeId;

                    // Get the correction to check if it belongs to a direct report
                    var correctionCheck = await _context.AttendanceCorrectionRequests
                        .Include(acr => acr.Employee)
                        .Where(acr => acr.Id == id && !acr.IsDeleted)
                        .FirstOrDefaultAsync();

                    if (correctionCheck != null)
                    {
                        var isDirectReport = correctionCheck.Employee.ManagerEmployeeId == managerEmployeeId;
                        if (!isDirectReport)
                        {
                            return StatusCode(403, new { error = "You are not authorized to view this correction request" });
                        }
                    }
                }
                else
                {
                    return StatusCode(403, new { error = "You are not authorized to view this correction request" });
                }
            }

            // Query the correction by ID (without employee filter - manager can view)
            var query = new Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequestById.GetAttendanceCorrectionRequestByIdQuery(id);
            var result = await _mediator.Send(query);

            if (!result.IsSuccess || result.Value == null)
            {
                return NotFound(new { error = $"Correction request with ID {id} not found" });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving attendance correction request for approval {CorrectionId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving attendance correction request" });
        }
    }

    #endregion

    #region Remote Work Self-Service Endpoints

    /// <summary>
    /// Retrieves all remote work requests for the current employee.
    /// Returns a paginated list of the employee's remote work requests with workflow status.
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <returns>Paginated list of remote work requests</returns>
    /// <response code="200">Remote work requests retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile not found for current user</response>
    [HttpGet("my-remote-work-requests")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyRemoteWorkRequests(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            // Query remote work requests for the current employee only
            var query = _context.RemoteWorkRequests
                .Include(rw => rw.Employee)
                .Include(rw => rw.CreatedByUser)
                .Include(rw => rw.ApprovedByUser)
                .Where(rw => rw.EmployeeId == employeeId && !rw.IsDeleted)
                .AsQueryable();

            // Get total count
            var totalCount = await query.CountAsync();

            // Apply pagination
            var requests = await query
                .OrderByDescending(rw => rw.StartDate)
                .Skip((page - 1) * Math.Min(pageSize, 100))
                .Take(Math.Min(pageSize, 100))
                .ToListAsync();

            // Get workflow instances for all requests
            var requestIds = requests.Select(r => r.Id).ToList();
            var workflows = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .Where(wi => wi.EntityType == WorkflowEntityType.RemoteWork && requestIds.Contains(wi.EntityId))
                .ToListAsync();

            var workflowLookup = workflows.ToDictionary(w => w.EntityId);

            // Map to DTOs with workflow status
            var items = requests.Select(rw =>
            {
                workflowLookup.TryGetValue(rw.Id, out var workflow);
                var workflowStatus = workflow?.Status.ToString() ?? "Pending";
                var isApproved = workflow?.Status == WorkflowStatus.Approved;

                return new
                {
                    rw.Id,
                    rw.EmployeeId,
                    EmployeeName = $"{rw.Employee?.FirstName} {rw.Employee?.LastName}".Trim(),
                    rw.StartDate,
                    rw.EndDate,
                    rw.WorkingDaysCount,
                    rw.Reason,
                    Status = rw.Status,
                    rw.CreatedAtUtc,
                    rw.ModifiedAtUtc,
                    CreatedByUserName = rw.CreatedByUser?.Username,
                    ApprovedByUserName = rw.ApprovedByUser?.Username,
                    ApprovedAt = rw.ApprovedAt,
                    WorkflowStatus = workflowStatus,
                    WorkflowInstanceId = workflow?.Id,
                    CurrentStepOrder = workflow?.CurrentStep?.StepOrder,
                    TotalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0,
                    IsApproved = isApproved,
                    IsCurrentlyActive = isApproved && rw.StartDate <= today && rw.EndDate >= today,
                    IsCompleted = isApproved && rw.EndDate < today,
                    IsUpcoming = isApproved && rw.StartDate > today
                };
            }).ToList();

            return Ok(new
            {
                items,
                totalCount,
                page,
                pageSize = Math.Min(pageSize, 100),
                totalPages = (int)Math.Ceiling((double)totalCount / Math.Min(pageSize, 100))
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my remote work requests");
            return StatusCode(500, new { error = "An error occurred while retrieving remote work requests" });
        }
    }

    /// <summary>
    /// Retrieves a remote work request by ID for the current employee.
    /// Returns the request details with workflow status and approval history.
    /// </summary>
    /// <param name="id">Remote work request ID</param>
    /// <returns>Remote work request details</returns>
    /// <response code="200">Remote work request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Remote work request not found or doesn't belong to current employee</response>
    [HttpGet("my-remote-work-requests/{id}")]
    [ProducesResponseType(typeof(Application.Features.RemoteWorkRequests.Queries.RemoteWorkRequestDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyRemoteWorkRequestById(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            // Get current employee from user context
            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Query the remote work request directly with employee filter for security
            var remoteWorkRequest = await _context.RemoteWorkRequests
                .Include(rw => rw.Employee)
                    .ThenInclude(e => e.Department)
                .Include(rw => rw.Employee)
                    .ThenInclude(e => e.Branch)
                .Include(rw => rw.ApprovedByUser)
                .Include(rw => rw.CreatedByUser)
                .Where(rw => rw.Id == id && rw.EmployeeId == employeeId && !rw.IsDeleted)
                .FirstOrDefaultAsync();

            if (remoteWorkRequest == null)
            {
                return NotFound(new { error = $"Remote work request with ID {id} not found" });
            }

            // Get workflow instance for this remote work request
            var workflow = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverUser)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .Where(wi => wi.EntityType == WorkflowEntityType.RemoteWork && wi.EntityId == id)
                .FirstOrDefaultAsync();

            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            // Determine current approver name/role based on approver type
            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                if (currentStep.ApproverType == ApproverType.DirectManager)
                {
                    approverRole = "Direct Manager";
                }
                else if (currentStep.ApproverType == ApproverType.DepartmentHead)
                {
                    approverRole = "Department Head";
                }
                else if (currentStep.ApproverType == ApproverType.Role && currentStep.ApproverRole != null)
                {
                    approverRole = currentStep.ApproverRole.Name;
                }
                else if (currentStep.ApproverType == ApproverType.SpecificUser && currentStep.ApproverUser != null)
                {
                    approverName = currentStep.ApproverUser.Username;
                }
            }

            // Build approval history from workflow step executions
            var approvalHistory = new List<object>();
            if (workflow != null)
            {
                var stepExecutions = await _context.WorkflowStepExecutions
                    .Include(wse => wse.Step)
                        .ThenInclude(s => s.ApproverRole)
                    .Include(wse => wse.AssignedToUser)
                    .Include(wse => wse.ActionTakenByUser)
                    .Where(wse => wse.WorkflowInstanceId == workflow.Id && !wse.IsDeleted)
                    .OrderBy(wse => wse.Step.StepOrder)
                    .ToListAsync();

                approvalHistory = stepExecutions.Select(se => new
                {
                    stepOrder = se.Step.StepOrder,
                    stepName = se.Step.Name ?? $"Step {se.Step.StepOrder}",
                    status = se.Action?.ToString() ?? "Pending",
                    assignedToName = se.AssignedToUser?.Username ?? se.Step.ApproverRole?.Name ?? "Unknown",
                    actionByName = se.ActionTakenByUser?.Username,
                    assignedAt = se.AssignedAt.ToString("o"),
                    actionAt = se.ActionTakenAt?.ToString("o"),
                    comments = se.Comments
                }).ToList<object>();
            }

            // Map to DTO
            var dto = new
            {
                id = remoteWorkRequest.Id,
                employeeId = remoteWorkRequest.EmployeeId,
                employeeName = remoteWorkRequest.Employee.FullName,
                startDate = remoteWorkRequest.StartDate.ToString("yyyy-MM-dd"),
                endDate = remoteWorkRequest.EndDate.ToString("yyyy-MM-dd"),
                reason = remoteWorkRequest.Reason,
                status = (int)remoteWorkRequest.Status,
                workingDaysCount = remoteWorkRequest.WorkingDaysCount,
                createdByUserId = remoteWorkRequest.CreatedByUserId,
                createdByUserName = remoteWorkRequest.CreatedByUser?.Username,
                createdAtUtc = remoteWorkRequest.CreatedAtUtc.ToString("o"),
                modifiedAtUtc = remoteWorkRequest.ModifiedAtUtc?.ToString("o"),
                approvedByUserId = remoteWorkRequest.ApprovedByUserId,
                approvedByUserName = remoteWorkRequest.ApprovedByUser?.Username,
                approvedAt = remoteWorkRequest.ApprovedAt?.ToString("o"),
                rejectionReason = remoteWorkRequest.RejectionReason,
                approvalComments = remoteWorkRequest.ApprovalComments,

                // Workflow information
                workflowInstanceId = workflow?.Id,
                workflowStatus = workflow?.Status.ToString() ?? "None",
                currentApproverName = approverName,
                currentApproverRole = approverRole,
                currentStepOrder = currentStep?.StepOrder,
                totalSteps = totalSteps > 0 ? totalSteps : (int?)null,

                // Computed status flags
                isApproved = remoteWorkRequest.Status == RemoteWorkRequestStatus.Approved,
                isCurrentlyActive = remoteWorkRequest.Status == RemoteWorkRequestStatus.Approved &&
                                   remoteWorkRequest.StartDate <= DateOnly.FromDateTime(DateTime.Today) &&
                                   remoteWorkRequest.EndDate >= DateOnly.FromDateTime(DateTime.Today),
                isUpcoming = remoteWorkRequest.Status == RemoteWorkRequestStatus.Approved &&
                            remoteWorkRequest.StartDate > DateOnly.FromDateTime(DateTime.Today),
                isCompleted = remoteWorkRequest.Status == RemoteWorkRequestStatus.Approved &&
                             remoteWorkRequest.EndDate < DateOnly.FromDateTime(DateTime.Today),

                // Approval history
                approvalHistory = approvalHistory
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my remote work request {RequestId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving remote work request" });
        }
    }

    /// <summary>
    /// Retrieves a remote work request for approval purposes (manager view).
    /// Returns remote work details if the current user is an approver for this request.
    /// </summary>
    /// <param name="id">Remote work request ID</param>
    /// <returns>Remote work request details for approval</returns>
    /// <response code="200">Remote work request retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="403">Forbidden - user is not an approver for this request</response>
    /// <response code="404">Remote work request not found</response>
    [HttpGet("approval-remote-work/{id}")]
    [ProducesResponseType(typeof(Application.Features.RemoteWorkRequests.Queries.RemoteWorkRequestDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRemoteWorkForApproval(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var userId = _currentUser.UserId.Value;

            // Check if user was ever assigned to approve this remote work request
            var wasAssignedToApprove = await _context.WorkflowStepExecutions
                .Include(wse => wse.WorkflowInstance)
                .Where(wse => wse.AssignedToUserId == userId &&
                             !wse.IsDeleted &&
                             wse.WorkflowInstance.EntityType == WorkflowEntityType.RemoteWork &&
                             wse.WorkflowInstance.EntityId == id &&
                             !wse.WorkflowInstance.IsDeleted)
                .AnyAsync();

            if (!wasAssignedToApprove)
            {
                // Also check if user is a manager of the requesting employee
                var employeeLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.UserId == userId);

                if (employeeLink != null)
                {
                    var managerEmployeeId = employeeLink.EmployeeId;

                    // Get the remote work request to check if it belongs to a direct report
                    var requestCheck = await _context.RemoteWorkRequests
                        .Include(rw => rw.Employee)
                        .Where(rw => rw.Id == id && !rw.IsDeleted)
                        .FirstOrDefaultAsync();

                    if (requestCheck != null)
                    {
                        var isDirectReport = requestCheck.Employee.ManagerEmployeeId == managerEmployeeId;
                        if (!isDirectReport)
                        {
                            return StatusCode(403, new { error = "You are not authorized to view this remote work request" });
                        }
                    }
                }
                else
                {
                    return StatusCode(403, new { error = "You are not authorized to view this remote work request" });
                }
            }

            // Use MediatR to get the remote work request with workflow info
            var query = new Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById.GetRemoteWorkRequestByIdQuery { Id = id };
            var result = await _mediator.Send(query);

            if (!result.IsSuccess || result.Value == null)
            {
                return NotFound(new { error = $"Remote work request with ID {id} not found" });
            }

            return Ok(result.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving remote work request for approval {RequestId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving remote work request" });
        }
    }

    #endregion

    #region Delegation Search

    /// <summary>
    /// Searches for employees that can be delegated to.
    /// Returns all active employees with linked user accounts (excluding current user).
    /// </summary>
    /// <param name="searchTerm">Search term for name, employee code, or email</param>
    /// <param name="pageSize">Maximum number of results to return. Default: 20</param>
    /// <returns>List of employees available for delegation</returns>
    /// <response code="200">Employees retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    [HttpGet("delegation-employees")]
    [ProducesResponseType(typeof(List<DelegationEmployeeDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SearchDelegationEmployees(
        [FromQuery] string? searchTerm = null,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var currentUserId = _currentUser.UserId.Value;

            // Get current user's employee ID to exclude from results
            var currentEmployeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == currentUserId);
            var currentEmployeeId = currentEmployeeLink?.EmployeeId;

            // Query employees with linked user accounts
            var query = _context.Employees
                .Include(e => e.Department)
                .Include(e => e.Branch)
                .Where(e => e.IsActive && !e.IsDeleted);

            // Exclude current employee
            if (currentEmployeeId.HasValue)
            {
                query = query.Where(e => e.Id != currentEmployeeId.Value);
            }

            // Apply search filter
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                var searchLower = searchTerm.ToLower();
                query = query.Where(e =>
                    e.FirstName.ToLower().Contains(searchLower) ||
                    e.LastName.ToLower().Contains(searchLower) ||
                    e.EmployeeNumber.ToLower().Contains(searchLower) ||
                    (e.Email != null && e.Email.ToLower().Contains(searchLower)) ||
                    (e.FirstName + " " + e.LastName).ToLower().Contains(searchLower));
            }

            // Get employee IDs first
            var employees = await query
                .OrderBy(e => e.FirstName)
                .ThenBy(e => e.LastName)
                .Take(Math.Min(pageSize, 50))
                .ToListAsync();

            var employeeIds = employees.Select(e => e.Id).ToList();

            // Get user IDs for these employees
            var employeeUserLinks = await _context.EmployeeUserLinks
                .Where(eul => employeeIds.Contains(eul.EmployeeId))
                .ToDictionaryAsync(eul => eul.EmployeeId, eul => eul.UserId);

            // Build result - only include employees with linked user accounts
            var result = employees
                .Where(e => employeeUserLinks.ContainsKey(e.Id))
                .Select(e => new DelegationEmployeeDto
                {
                    EmployeeId = e.Id,
                    UserId = employeeUserLinks[e.Id],
                    FullName = $"{e.FirstName} {e.LastName}",
                    FullNameAr = e.FullNameAr,
                    EmployeeCode = e.EmployeeNumber,
                    Email = e.Email,
                    JobTitle = e.JobTitle,
                    DepartmentName = e.Department?.Name,
                    BranchName = e.Branch?.Name
                })
                .ToList();

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching delegation employees");
            return StatusCode(500, new { error = "An error occurred while searching employees" });
        }
    }

    #endregion

    /// <summary>
    /// Calculates business days between two dates (excluding weekends).
    /// </summary>
    private static int CalculateBusinessDays(DateTime startDate, DateTime endDate)
    {
        var businessDays = 0;
        var currentDate = startDate.Date;

        while (currentDate <= endDate.Date)
        {
            if (currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
            {
                businessDays++;
            }
            currentDate = currentDate.AddDays(1);
        }

        return businessDays;
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

/// <summary>
/// DTO for employees available for delegation
/// </summary>
public class DelegationEmployeeDto
{
    public long EmployeeId { get; set; }
    public long UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? FullNameAr { get; set; }
    public string EmployeeCode { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? JobTitle { get; set; }
    public string? DepartmentName { get; set; }
    public string? BranchName { get; set; }
}
