using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Excuses.Queries.GetEmployeeExcuses;
using TecAxle.Hrms.Application.Features.Portal.EmployeeDashboard.Queries;
using TecAxle.Hrms.Application.Features.Portal.ManagerDashboard.Queries;
using TecAxle.Hrms.Application.Features.Portal.Team.Queries;
using TecAxle.Hrms.Application.Workflows.Queries.GetPendingApprovals;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Excuses;
using TecAxle.Hrms.Domain.Offboarding;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Domain.Documents;
using TecAxle.Hrms.Domain.Expenses;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Announcements;
using TecAxle.Hrms.Domain.Training;
using TecAxle.Hrms.Domain.EmployeeRelations;
using TecAxle.Hrms.Domain.Assets;
using TecAxle.Hrms.Domain.Surveys;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Workflows.Enums;
using TecAxle.Hrms.Domain.Timesheets;
using TecAxle.Hrms.Domain.Succession;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Api.Controllers;

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
                    VacationTypeNameAr = ev.VacationType.NameAr,
                    ev.StartDate,
                    ev.EndDate,
                    ev.TotalDays,
                    ev.IsApproved,
                    ev.Notes,
                    ev.CreatedAtUtc,
                    ev.CreatedBy,
                    ev.ModifiedAtUtc,
                    ev.ModifiedBy,
                    ev.IsHalfDay,
                    ev.HalfDayType
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
                vacation.VacationTypeNameAr,
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
                workflow?.Id,
                IsHalfDay: vacation.IsHalfDay,
                HalfDayType: vacation.HalfDayType?.ToString(),
                HalfDayTypeName: vacation.HalfDayType?.ToString()
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
                    VacationTypeNameAr = ev.VacationType.NameAr,
                    ev.StartDate,
                    ev.EndDate,
                    ev.TotalDays,
                    ev.IsApproved,
                    ev.Notes,
                    ev.CreatedAtUtc,
                    ev.CreatedBy,
                    ev.ModifiedAtUtc,
                    ev.ModifiedBy,
                    ev.IsHalfDay,
                    ev.HalfDayType
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
                vacation.VacationTypeNameAr,
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
                workflow?.Id,
                IsHalfDay: vacation.IsHalfDay,
                HalfDayType: vacation.HalfDayType?.ToString(),
                HalfDayTypeName: vacation.HalfDayType?.ToString()
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

    /// <summary>
    /// Get current employee's active allowances
    /// </summary>
    [HttpGet("my-allowances")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyAllowances()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var allowances = await _context.AllowanceAssignments
                .Include(a => a.AllowanceType)
                .Where(a => a.EmployeeId == employeeLink.EmployeeId
                    && a.Status == AllowanceAssignmentStatus.Active
                    && !a.IsDeleted)
                .Select(a => new
                {
                    a.Id,
                    a.AllowanceTypeId,
                    AllowanceTypeName = a.AllowanceType != null ? a.AllowanceType.Name : "Unknown",
                    AllowanceTypeNameAr = a.AllowanceType != null ? a.AllowanceType.NameAr : (string?)null,
                    a.Amount,
                    a.Percentage,
                    a.Currency,
                    a.EffectiveFromDate,
                    a.EffectiveToDate,
                    Status = a.Status.ToString(),
                    a.Reason
                })
                .ToListAsync();

            return Ok(allowances);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee allowances");
            return StatusCode(500, new { error = "An error occurred while retrieving allowances" });
        }
    }

    /// <summary>
    /// Get current employee's allowance summary (total)
    /// </summary>
    [HttpGet("my-allowances/summary")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyAllowanceSummary()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var total = await _context.AllowanceAssignments
                .Where(a => a.EmployeeId == employeeLink.EmployeeId
                    && a.Status == AllowanceAssignmentStatus.Active
                    && !a.IsDeleted)
                .SumAsync(a => a.Amount);

            return Ok(new { totalAllowances = total });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee allowance summary");
            return StatusCode(500, new { error = "An error occurred while retrieving allowance summary" });
        }
    }

    // ============================================================
    // Payroll & Compensation Endpoints
    // ============================================================

    /// <summary>
    /// Get current employee's payslip history
    /// </summary>
    [HttpGet("my-payslips")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyPayslips([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            var query = _context.PayrollRecords
                .Include(pr => pr.PayrollPeriod)
                .Include(pr => pr.Details)
                .Where(pr => pr.EmployeeId == employeeId && !pr.IsDeleted)
                .OrderByDescending(pr => pr.PayrollPeriod.EndDate);

            var totalCount = await query.CountAsync();

            var payslips = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(pr => new
                {
                    pr.Id,
                    periodName = pr.PayrollPeriod.Name,
                    periodNameAr = pr.PayrollPeriod.NameAr,
                    periodStart = pr.PayrollPeriod.StartDate,
                    periodEnd = pr.PayrollPeriod.EndDate,
                    pr.BaseSalary,
                    pr.TotalAllowances,
                    pr.GrossEarnings,
                    pr.TotalDeductions,
                    pr.TaxAmount,
                    pr.SocialInsuranceEmployee,
                    pr.OvertimePay,
                    pr.AbsenceDeduction,
                    pr.LoanDeduction,
                    pr.OtherDeductions,
                    pr.NetSalary,
                    pr.WorkingDays,
                    pr.PaidDays,
                    pr.OvertimeHours,
                    pr.AbsentDays,
                    status = pr.Status.ToString(),
                    pr.PaySlipGeneratedAt,
                    details = pr.Details.Select(d => new
                    {
                        d.ComponentName,
                        d.ComponentNameAr,
                        componentType = d.ComponentType.ToString(),
                        d.Amount,
                        d.Notes
                    }).ToList()
                })
                .ToListAsync();

            return Ok(new
            {
                isSuccess = true,
                value = new
                {
                    items = payslips,
                    totalCount,
                    page,
                    pageSize,
                    totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee payslips");
            return StatusCode(500, new { error = "An error occurred while retrieving payslips" });
        }
    }

    /// <summary>
    /// Get current employee's salary details
    /// </summary>
    [HttpGet("my-salary")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMySalary()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            var currentSalary = await _context.EmployeeSalaries
                .Include(s => s.Components)
                    .ThenInclude(c => c.SalaryComponent)
                .Where(s => s.EmployeeId == employeeId && s.IsCurrent && !s.IsDeleted)
                .Select(s => new
                {
                    s.Id,
                    s.BaseSalary,
                    s.Currency,
                    s.EffectiveDate,
                    s.EndDate,
                    components = s.Components.Select(c => new
                    {
                        c.Id,
                        componentName = c.SalaryComponent.Name,
                        componentNameAr = c.SalaryComponent.NameAr,
                        componentType = c.SalaryComponent.ComponentType.ToString(),
                        c.Amount
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (currentSalary == null)
            {
                return Ok(new { isSuccess = true, value = (object?)null });
            }

            return Ok(new { isSuccess = true, value = currentSalary });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee salary details");
            return StatusCode(500, new { error = "An error occurred while retrieving salary details" });
        }
    }

    // ============================================================
    // Resignation Endpoints
    // ============================================================

    /// <summary>
    /// Get current employee's resignation request (if any)
    /// </summary>
    [HttpGet("my-resignation")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyResignation()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            var resignations = await _context.ResignationRequests
                .Where(r => r.EmployeeId == employeeId && !r.IsDeleted)
                .OrderByDescending(r => r.CreatedAtUtc)
                .Select(r => new
                {
                    r.Id,
                    r.ResignationDate,
                    r.LastWorkingDate,
                    r.NoticePeriodDays,
                    r.WaivedNoticeDays,
                    r.Reason,
                    r.ReasonAr,
                    status = r.Status.ToString(),
                    r.RejectionReason,
                    r.Notes,
                    r.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { isSuccess = true, value = resignations });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee resignation");
            return StatusCode(500, new { error = "An error occurred while retrieving resignation" });
        }
    }

    /// <summary>
    /// Submit a resignation request for the current employee
    /// </summary>
    [HttpPost("my-resignation")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SubmitMyResignation([FromBody] SubmitResignationRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            {
                return Unauthorized(new { error = "User not authenticated" });
            }

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
            {
                return NotFound(new { error = "Employee profile not found for current user" });
            }

            var employeeId = employeeLink.EmployeeId;

            // Check for existing pending resignation
            var existingPending = await _context.ResignationRequests
                .AnyAsync(r => r.EmployeeId == employeeId
                    && r.Status == ResignationStatus.Pending
                    && !r.IsDeleted);

            if (existingPending)
            {
                return BadRequest(new { error = "You already have a pending resignation request" });
            }

            // Validate resignation date is in the future
            if (request.ResignationDate.Date <= DateTime.UtcNow.Date)
            {
                return BadRequest(new { error = "Resignation date must be in the future" });
            }

            // Validate last working date is on or after resignation date
            if (request.LastWorkingDate.Date < request.ResignationDate.Date)
            {
                return BadRequest(new { error = "Last working date cannot be before resignation date" });
            }

            var noticePeriodDays = (request.LastWorkingDate.Date - request.ResignationDate.Date).Days;

            var resignation = new ResignationRequest
            {
                EmployeeId = employeeId,
                ResignationDate = request.ResignationDate,
                LastWorkingDate = request.LastWorkingDate,
                NoticePeriodDays = noticePeriodDays,
                Reason = request.Reason,
                ReasonAr = request.ReasonAr,
                Status = ResignationStatus.Pending,
                SubmittedByUserId = _currentUser.UserId,
                CreatedBy = _currentUser.Username ?? "system"
            };

            _context.ResignationRequests.Add(resignation);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                isSuccess = true,
                value = new
                {
                    resignation.Id,
                    resignation.ResignationDate,
                    resignation.LastWorkingDate,
                    resignation.NoticePeriodDays,
                    resignation.Reason,
                    resignation.ReasonAr,
                    status = resignation.Status.ToString(),
                    resignation.CreatedAtUtc
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error submitting resignation request");
            return StatusCode(500, new { error = "An error occurred while submitting resignation request" });
        }
    }

    // ============================================================
    // Phase 3: Documents, Expenses & Loans Self-Service Endpoints
    // ============================================================

    /// <summary>
    /// Get current employee's documents
    /// </summary>
    [HttpGet("my-documents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyDocuments()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.EmployeeDocuments
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new
                {
                    x.Id,
                    x.DocumentName,
                    x.DocumentNameAr,
                    DocumentType = x.DocumentType.ToString(),
                    x.FileUrl,
                    x.ExpiryDate,
                    x.IssuedDate,
                    VerificationStatus = x.VerificationStatus.ToString(),
                    x.Notes,
                    CategoryName = x.DocumentCategory != null ? x.DocumentCategory.Name : (string?)null,
                    CategoryNameAr = x.DocumentCategory != null ? x.DocumentCategory.NameAr : (string?)null,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee documents");
            return StatusCode(500, new { error = "An error occurred while retrieving documents" });
        }
    }

    /// <summary>
    /// Get company policies with acknowledgment status for the current employee
    /// </summary>
    [HttpGet("company-policies")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCompanyPolicies()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.CompanyPolicies
                .Where(x => x.Status == PolicyStatus.Published && !x.IsDeleted)
                .OrderByDescending(x => x.EffectiveDate)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.TitleAr,
                    x.Description,
                    x.DescriptionAr,
                    x.DocumentUrl,
                    x.Version,
                    x.EffectiveDate,
                    Status = x.Status.ToString(),
                    x.RequiresAcknowledgment,
                    CategoryName = x.DocumentCategory != null ? x.DocumentCategory.Name : (string?)null,
                    CategoryNameAr = x.DocumentCategory != null ? x.DocumentCategory.NameAr : (string?)null,
                    Acknowledged = x.Acknowledgments.Any(a => a.EmployeeId == employeeId),
                    AcknowledgedAt = x.Acknowledgments
                        .Where(a => a.EmployeeId == employeeId)
                        .Select(a => (DateTime?)a.AcknowledgedAt)
                        .FirstOrDefault(),
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving company policies");
            return StatusCode(500, new { error = "An error occurred while retrieving company policies" });
        }
    }

    /// <summary>
    /// Get current employee's letter requests
    /// </summary>
    [HttpGet("my-letter-requests")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyLetterRequests()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.LetterRequests
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new
                {
                    x.Id,
                    LetterType = x.LetterType.ToString(),
                    x.Purpose,
                    x.PurposeAr,
                    x.AdditionalNotes,
                    Status = x.Status.ToString(),
                    x.RejectionReason,
                    x.GeneratedDocumentUrl,
                    x.GeneratedAt,
                    x.TemplateId,
                    TemplateName = x.Template != null ? x.Template.Name : (string?)null,
                    x.ApprovedAt,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee letter requests");
            return StatusCode(500, new { error = "An error occurred while retrieving letter requests" });
        }
    }

    /// <summary>
    /// Get current employee's expense claims
    /// </summary>
    [HttpGet("my-expense-claims")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyExpenseClaims()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.ExpenseClaims
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new
                {
                    x.Id,
                    x.ClaimNumber,
                    x.TotalAmount,
                    x.Currency,
                    x.Description,
                    Status = x.Status.ToString(),
                    x.RejectionReason,
                    x.ApprovedAt,
                    PolicyName = x.ExpensePolicy != null ? x.ExpensePolicy.Name : (string?)null,
                    ItemCount = x.Items.Count,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee expense claims");
            return StatusCode(500, new { error = "An error occurred while retrieving expense claims" });
        }
    }

    /// <summary>
    /// Get current employee's loan applications
    /// </summary>
    [HttpGet("my-loan-applications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyLoanApplications()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.LoanApplications
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new
                {
                    x.Id,
                    LoanTypeName = x.LoanType.Name,
                    LoanTypeNameAr = x.LoanType.NameAr,
                    x.RequestedAmount,
                    x.ApprovedAmount,
                    x.RepaymentMonths,
                    x.MonthlyInstallment,
                    x.InterestRate,
                    x.Purpose,
                    x.PurposeAr,
                    Status = x.Status.ToString(),
                    x.StartDate,
                    x.EndDate,
                    x.RejectionReason,
                    x.OutstandingBalance,
                    x.Notes,
                    x.ApprovedAt,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee loan applications");
            return StatusCode(500, new { error = "An error occurred while retrieving loan applications" });
        }
    }

    /// <summary>
    /// Get current employee's salary advances
    /// </summary>
    [HttpGet("my-salary-advances")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMySalaryAdvances()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.SalaryAdvances
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new
                {
                    x.Id,
                    x.Amount,
                    x.Currency,
                    x.RequestDate,
                    x.DeductionMonth,
                    x.Reason,
                    x.ReasonAr,
                    Status = x.Status.ToString(),
                    x.RejectionReason,
                    x.ApprovedAt,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee salary advances");
            return StatusCode(500, new { error = "An error occurred while retrieving salary advances" });
        }
    }

    // ===== ANNOUNCEMENTS (PORTAL) =====

    /// <summary>
    /// Get published announcements for the current employee, filtered by branch/department/role targeting.
    /// Includes acknowledged flag for each announcement.
    /// </summary>
    [HttpGet("announcements")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAnnouncements()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            // Get employee details for targeting
            var employee = await _context.Employees.AsNoTracking()
                .Where(e => e.Id == employeeId)
                .Select(e => new { e.BranchId, e.DepartmentId })
                .FirstOrDefaultAsync();

            if (employee == null)
                return NotFound(new { error = "Employee not found" });

            // Get the user's role IDs
            var userRoleIds = await _context.UserRoles
                .Where(ur => ur.UserId == _currentUser.UserId)
                .Select(ur => ur.RoleId)
                .ToListAsync();

            var now = DateTime.UtcNow;

            // Get published, non-expired announcements
            var allAnnouncements = await _context.Announcements.AsNoTracking()
                .Where(x => x.Status == AnnouncementStatus.Published
                    && !x.IsDeleted
                    && (x.ExpiryDate == null || x.ExpiryDate > now))
                .OrderByDescending(x => x.IsPinned)
                .ThenByDescending(x => x.PublishedAt)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.TitleAr,
                    x.Content,
                    x.ContentAr,
                    Priority = x.Priority.ToString(),
                    TargetAudience = x.TargetAudience,
                    x.TargetIds,
                    CategoryName = x.Category != null ? x.Category.Name : (string?)null,
                    CategoryNameAr = x.Category != null ? x.Category.NameAr : (string?)null,
                    x.IsPinned,
                    x.RequiresAcknowledgment,
                    x.PublishedAt,
                    x.ExpiryDate,
                    Acknowledged = x.Acknowledgments.Any(a => a.EmployeeId == employeeId),
                    AcknowledgedAt = x.Acknowledgments
                        .Where(a => a.EmployeeId == employeeId)
                        .Select(a => (DateTime?)a.AcknowledgedAt)
                        .FirstOrDefault(),
                    Attachments = x.Attachments
                        .Where(a => !a.IsDeleted)
                        .OrderBy(a => a.SortOrder)
                        .Select(a => new
                        {
                            a.FileAttachmentId,
                            FileName = a.FileAttachment.OriginalFileName,
                            StoredFileName = a.FileAttachment.StoredFileName,
                            ContentType = a.FileAttachment.ContentType,
                            FileSize = a.FileAttachment.FileSize
                        })
                        .ToList(),
                    x.CreatedAtUtc
                })
                .ToListAsync();

            // Filter by target audience in memory (TargetIds is a JSON array string)
            var branchIdStr = employee.BranchId.ToString();
            var deptIdStr = employee.DepartmentId?.ToString();
            var roleIdStrs = userRoleIds.Select(r => r.ToString()).ToHashSet();

            var filtered = allAnnouncements.Where(a =>
            {
                if (a.TargetAudience == AnnouncementTargetAudience.All)
                    return true;

                if (string.IsNullOrWhiteSpace(a.TargetIds))
                    return true; // No specific targets = all

                var ids = a.TargetIds.Trim('[', ']').Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(s => s.Trim('"', ' ')).ToHashSet();

                return a.TargetAudience switch
                {
                    AnnouncementTargetAudience.Branch => ids.Contains(branchIdStr),
                    AnnouncementTargetAudience.Department => deptIdStr != null && ids.Contains(deptIdStr),
                    AnnouncementTargetAudience.Role => roleIdStrs.Any(r => ids.Contains(r)),
                    _ => true
                };
            }).Select(a => new
            {
                a.Id,
                a.Title,
                a.TitleAr,
                a.Content,
                a.ContentAr,
                a.Priority,
                TargetAudience = a.TargetAudience.ToString(),
                a.CategoryName,
                a.CategoryNameAr,
                a.IsPinned,
                a.RequiresAcknowledgment,
                a.PublishedAt,
                a.ExpiryDate,
                a.Acknowledged,
                a.AcknowledgedAt,
                a.Attachments,
                a.CreatedAtUtc
            }).ToList();

            return Ok(new { data = filtered, totalCount = filtered.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving announcements for portal");
            return StatusCode(500, new { error = "An error occurred while retrieving announcements" });
        }
    }

    /// <summary>
    /// Acknowledge an announcement for the current employee.
    /// </summary>
    [HttpPost("announcements/{id}/acknowledge")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AcknowledgeAnnouncement(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var announcement = await _context.Announcements
                .FirstOrDefaultAsync(x => x.Id == id && x.Status == AnnouncementStatus.Published && !x.IsDeleted);

            if (announcement == null)
                return NotFound(new { error = "Announcement not found or not published." });

            if (!announcement.RequiresAcknowledgment)
                return BadRequest(new { error = "This announcement does not require acknowledgment." });

            // Check if already acknowledged
            var alreadyAcknowledged = await _context.AnnouncementAcknowledgments
                .AnyAsync(x => x.AnnouncementId == id && x.EmployeeId == employeeId && !x.IsDeleted);

            if (alreadyAcknowledged)
                return Ok(new { message = "Already acknowledged." });

            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

            var acknowledgment = new AnnouncementAcknowledgment
            {
                AnnouncementId = id,
                EmployeeId = employeeId,
                AcknowledgedAt = DateTime.UtcNow,
                IpAddress = ipAddress,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "system"
            };

            _context.AnnouncementAcknowledgments.Add(acknowledgment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Announcement acknowledged successfully." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error acknowledging announcement {AnnouncementId}", id);
            return StatusCode(500, new { error = "An error occurred while acknowledging the announcement" });
        }
    }

    // ===== TRAINING & DEVELOPMENT (PORTAL) =====

    /// <summary>
    /// Get current employee's training enrollments with session/course info
    /// </summary>
    [HttpGet("my-training")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyTraining()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.TrainingEnrollments
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.EnrolledAt)
                .Select(x => new
                {
                    x.Id,
                    x.TrainingSessionId,
                    SessionTitle = x.Session != null ? x.Session.Title : (string?)null,
                    CourseTitle = x.Session != null ? x.Session.Course.Title : (string?)null,
                    CourseTitleAr = x.Session != null ? x.Session.Course.TitleAr : (string?)null,
                    CourseCode = x.Session != null ? x.Session.Course.Code : (string?)null,
                    SessionStartDate = x.Session != null ? x.Session.StartDate : (DateTime?)null,
                    SessionEndDate = x.Session != null ? x.Session.EndDate : (DateTime?)null,
                    SessionLocation = x.Session != null ? x.Session.Location : (string?)null,
                    SessionLocationAr = x.Session != null ? x.Session.LocationAr : (string?)null,
                    InstructorName = x.Session != null ? x.Session.InstructorName : (string?)null,
                    InstructorNameAr = x.Session != null ? x.Session.InstructorNameAr : (string?)null,
                    x.TrainingProgramId,
                    ProgramTitle = x.Program != null ? x.Program.Title : (string?)null,
                    ProgramTitleAr = x.Program != null ? x.Program.TitleAr : (string?)null,
                    Status = x.Status.ToString(),
                    x.EnrolledAt,
                    x.CompletedAt,
                    x.CancelledAt,
                    x.CancellationReason,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee training enrollments");
            return StatusCode(500, new { error = "An error occurred while retrieving training enrollments" });
        }
    }

    /// <summary>
    /// Get current employee's certifications
    /// </summary>
    [HttpGet("my-certifications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyCertifications()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var items = await _context.EmployeeCertifications
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.IssueDate)
                .Select(x => new
                {
                    x.Id,
                    x.CertificationName,
                    x.CertificationNameAr,
                    x.IssuingAuthority,
                    x.IssuingAuthorityAr,
                    x.CertificationNumber,
                    x.IssueDate,
                    x.ExpiryDate,
                    Status = x.Status.ToString(),
                    x.DocumentUrl,
                    x.RenewalRequired,
                    x.RenewalReminderDays,
                    CourseTitle = x.Course != null ? x.Course.Title : (string?)null,
                    CourseTitleAr = x.Course != null ? x.Course.TitleAr : (string?)null,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount = items.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee certifications");
            return StatusCode(500, new { error = "An error occurred while retrieving certifications" });
        }
    }

    /// <summary>
    /// Get training catalog - active sessions and programs available for enrollment
    /// </summary>
    [HttpGet("training-catalog")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetTrainingCatalog()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var sessions = await _context.TrainingSessions.AsNoTracking()
                .Where(x => (x.Status == TrainingSessionStatus.Scheduled || x.Status == TrainingSessionStatus.InProgress)
                    && x.StartDate >= DateTime.UtcNow.Date
                    && !x.IsDeleted)
                .OrderBy(x => x.StartDate)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    CourseCode = x.Course.Code,
                    CourseTitle = x.Course.Title,
                    CourseTitleAr = x.Course.TitleAr,
                    DeliveryMethod = x.Course.DeliveryMethod.ToString(),
                    CourseDurationHours = x.Course.DurationHours,
                    CategoryName = x.Course.Category != null ? x.Course.Category.Name : (string?)null,
                    CategoryNameAr = x.Course.Category != null ? x.Course.Category.NameAr : (string?)null,
                    x.Location,
                    x.LocationAr,
                    x.InstructorName,
                    x.InstructorNameAr,
                    x.StartDate,
                    x.EndDate,
                    x.StartTime,
                    x.EndTime,
                    x.MaxParticipants,
                    Status = x.Status.ToString(),
                    BranchName = x.Branch != null ? x.Branch.Name : (string?)null,
                    CurrentEnrollments = x.Enrollments.Count(e => !e.IsDeleted && e.Status != TrainingEnrollmentStatus.Cancelled && e.Status != TrainingEnrollmentStatus.Rejected),
                    IsEnrolled = x.Enrollments.Any(e => e.EmployeeId == employeeId && !e.IsDeleted && e.Status != TrainingEnrollmentStatus.Cancelled && e.Status != TrainingEnrollmentStatus.Rejected),
                    ProgramTitle = x.Program != null ? x.Program.Title : (string?)null,
                    ProgramTitleAr = x.Program != null ? x.Program.TitleAr : (string?)null
                })
                .ToListAsync();

            var programs = await _context.TrainingPrograms.AsNoTracking()
                .Where(x => x.IsActive && x.Status == TrainingProgramStatus.Active && !x.IsDeleted)
                .OrderBy(x => x.Title)
                .Select(x => new
                {
                    x.Id,
                    x.Code,
                    x.Title,
                    x.TitleAr,
                    x.Description,
                    x.DescriptionAr,
                    x.TotalDurationHours,
                    x.StartDate,
                    x.EndDate,
                    CourseCount = x.ProgramCourses.Count(pc => !pc.IsDeleted),
                    IsEnrolled = x.Enrollments.Any(e => e.EmployeeId == employeeId && !e.IsDeleted && e.Status != TrainingEnrollmentStatus.Cancelled && e.Status != TrainingEnrollmentStatus.Rejected)
                })
                .ToListAsync();

            return Ok(new { sessions, programs });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving training catalog");
            return StatusCode(500, new { error = "An error occurred while retrieving training catalog" });
        }
    }

    // ============================
    // Employee Relations Endpoints
    // ============================

    /// <summary>
    /// Get current employee's grievances
    /// </summary>
    [HttpGet("my-grievances")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyGrievances(
        [FromQuery] GrievanceStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var query = _context.Grievances.AsNoTracking()
                .Where(x => x.EmployeeId == employeeId);

            if (status.HasValue) query = query.Where(x => x.Status == status.Value);

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderByDescending(x => x.CreatedAtUtc)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new
                {
                    x.Id,
                    x.GrievanceNumber,
                    GrievanceType = x.GrievanceType.ToString(),
                    x.Subject,
                    x.SubjectAr,
                    Priority = x.Priority.ToString(),
                    Status = x.Status.ToString(),
                    x.FiledDate,
                    x.DueDate,
                    x.ResolutionDate,
                    x.ResolutionSummary,
                    x.ResolutionSummaryAr,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount, pageNumber, pageSize });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee grievances");
            return StatusCode(500, new { error = "An error occurred while retrieving grievances" });
        }
    }

    /// <summary>
    /// File a new grievance as current employee
    /// </summary>
    [HttpPost("my-grievances")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> FileMyGrievance([FromBody] PortalFileGrievanceRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            // Generate auto-number
            var lastNumber = await _context.Grievances
                .IgnoreQueryFilters()
                .OrderByDescending(x => x.Id)
                .Select(x => x.GrievanceNumber)
                .FirstOrDefaultAsync();

            var nextSeq = 1;
            if (!string.IsNullOrEmpty(lastNumber) && lastNumber.StartsWith("GRV-"))
            {
                if (int.TryParse(lastNumber.Substring(4), out var parsed)) nextSeq = parsed + 1;
            }
            var grievanceNumber = $"GRV-{nextSeq:D6}";

            var entity = new Grievance
            {
                GrievanceNumber = grievanceNumber,
                EmployeeId = employeeLink.EmployeeId,
                GrievanceType = request.GrievanceType,
                Subject = request.Subject,
                SubjectAr = request.SubjectAr,
                Description = request.Description,
                DescriptionAr = request.DescriptionAr,
                Priority = request.Priority,
                Status = GrievanceStatus.Filed,
                IsConfidential = request.IsConfidential,
                AgainstEmployeeId = request.AgainstEmployeeId,
                FiledDate = DateTime.UtcNow,
                Notes = request.Notes,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "system"
            };

            _context.Grievances.Add(entity);

            // Notify HR about new grievance
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HR" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            foreach (var hrUserId in hrUserIds)
            {
                _context.Notifications.Add(new Notification
                {
                    UserId = hrUserId,
                    Type = NotificationType.RequestSubmitted,
                    TitleEn = "New Grievance Filed",
                    TitleAr = "شكوى جديدة مقدمة",
                    MessageEn = $"A new grievance ({grievanceNumber}) has been filed and requires attention.",
                    MessageAr = $"تم تقديم شكوى جديدة ({grievanceNumber}) وتحتاج إلى اهتمام.",
                    EntityType = "Grievance",
                    EntityId = entity.Id,
                    IsRead = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                });
            }

            await _context.SaveChangesAsync();

            return Created($"/api/v1/portal/my-grievances", new { id = entity.Id, grievanceNumber });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error filing grievance");
            return StatusCode(500, new { error = "An error occurred while filing the grievance" });
        }
    }

    /// <summary>
    /// Get current employee's disciplinary actions
    /// </summary>
    [HttpGet("my-disciplinary-actions")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyDisciplinaryActions(
        [FromQuery] DisciplinaryActionStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var query = _context.DisciplinaryActions.AsNoTracking()
                .Where(x => x.EmployeeId == employeeId);

            if (status.HasValue) query = query.Where(x => x.Status == status.Value);

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderByDescending(x => x.CreatedAtUtc)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new
                {
                    x.Id,
                    x.ActionNumber,
                    ActionType = x.ActionType.ToString(),
                    Severity = x.Severity.ToString(),
                    x.Subject,
                    x.SubjectAr,
                    x.Description,
                    x.DescriptionAr,
                    Status = x.Status.ToString(),
                    x.IncidentDate,
                    x.ActionDate,
                    x.EndDate,
                    x.AcknowledgedByEmployee,
                    x.AcknowledgedAt,
                    x.AppealSubmitted,
                    x.AppealDate,
                    x.AppealOutcome,
                    x.AppealResolvedDate,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount, pageNumber, pageSize });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee disciplinary actions");
            return StatusCode(500, new { error = "An error occurred while retrieving disciplinary actions" });
        }
    }

    /// <summary>
    /// Employee acknowledges a disciplinary action via portal
    /// </summary>
    [HttpPost("my-disciplinary-actions/{id}/acknowledge")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AcknowledgeMyDisciplinaryAction(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.DisciplinaryActions
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId);

            if (entity == null)
                return NotFound(new { error = "Disciplinary action not found." });

            if (entity.Status != DisciplinaryActionStatus.Approved)
                return BadRequest(new { error = "Only approved disciplinary actions can be acknowledged." });

            entity.AcknowledgedByEmployee = true;
            entity.AcknowledgedAt = DateTime.UtcNow;
            entity.Status = DisciplinaryActionStatus.Acknowledged;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username;

            // Notify HR about acknowledgement
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HR" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            foreach (var hrUserId in hrUserIds)
            {
                _context.Notifications.Add(new Notification
                {
                    UserId = hrUserId,
                    Type = NotificationType.RequestApproved,
                    TitleEn = "Disciplinary Action Acknowledged",
                    TitleAr = "تم الإقرار بالإجراء التأديبي",
                    MessageEn = $"Disciplinary action {entity.ActionNumber} has been acknowledged by the employee.",
                    MessageAr = $"تم الإقرار بالإجراء التأديبي {entity.ActionNumber} من قبل الموظف.",
                    EntityType = "DisciplinaryAction",
                    EntityId = entity.Id,
                    IsRead = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                });
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Disciplinary action acknowledged." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error acknowledging disciplinary action");
            return StatusCode(500, new { error = "An error occurred while acknowledging the disciplinary action" });
        }
    }

    // =====================================================
    // ASSET MANAGEMENT - My Assets
    // =====================================================

    /// <summary>
    /// Gets the current employee's active asset assignments
    /// </summary>
    [HttpGet("my-assets")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyAssets(
        [FromQuery] AssetAssignmentStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var query = _context.AssetAssignments.AsNoTracking()
                .Where(x => x.EmployeeId == employeeId);

            if (status.HasValue)
                query = query.Where(x => x.Status == status.Value);
            else
                query = query.Where(x => x.Status == AssetAssignmentStatus.Active || x.Status == AssetAssignmentStatus.Overdue);

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderByDescending(x => x.AssignedDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new
                {
                    x.Id,
                    x.AssetId,
                    AssetName = x.Asset.Name,
                    AssetNameAr = x.Asset.NameAr,
                    AssetTag = x.Asset.AssetTag,
                    AssetSerialNumber = x.Asset.SerialNumber,
                    AssetModel = x.Asset.Model,
                    AssetManufacturer = x.Asset.Manufacturer,
                    CategoryName = x.Asset.Category.Name,
                    CategoryNameAr = x.Asset.Category.NameAr,
                    AssetCondition = x.Asset.Condition.ToString(),
                    x.AssignedDate,
                    x.ExpectedReturnDate,
                    x.ActualReturnDate,
                    Status = x.Status.ToString(),
                    x.AssignmentNotes,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount, pageNumber, pageSize });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee assets");
            return StatusCode(500, new { error = "An error occurred while retrieving your assets" });
        }
    }

    // =====================================================
    // EMPLOYEE ENGAGEMENT & SURVEYS - My Surveys
    // =====================================================

    /// <summary>
    /// Gets current employee's pending and completed surveys
    /// </summary>
    [HttpGet("my-surveys")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMySurveys(
        [FromQuery] SurveyParticipantStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var query = _context.SurveyParticipants.AsNoTracking()
                .Where(x => x.EmployeeId == employeeId
                    && x.Distribution.Status == SurveyDistributionStatus.Active);

            if (status.HasValue)
                query = query.Where(x => x.Status == status.Value);

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderByDescending(x => x.InvitedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new
                {
                    x.Id,
                    x.SurveyDistributionId,
                    DistributionTitle = x.Distribution.Title,
                    DistributionTitleAr = x.Distribution.TitleAr,
                    SurveyType = x.Distribution.Template.SurveyType.ToString(),
                    IsAnonymous = x.Distribution.Template.IsAnonymous,
                    EstimatedDurationMinutes = x.Distribution.Template.EstimatedDurationMinutes,
                    Status = x.Status.ToString(),
                    x.InvitedAt,
                    x.CompletedAt,
                    EndDate = x.Distribution.EndDate,
                    QuestionCount = x.Distribution.Template.Questions.Count(q => !q.IsDeleted)
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount, pageNumber, pageSize });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee surveys");
            return StatusCode(500, new { error = "An error occurred while retrieving your surveys" });
        }
    }

    /// <summary>
    /// Gets survey questions for a distribution (for the employee to respond to)
    /// </summary>
    [HttpGet("my-surveys/{distributionId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMySurveyQuestions(long distributionId)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            // Find participant record
            var participant = await _context.SurveyParticipants.AsNoTracking()
                .Where(x => x.EmployeeId == employeeId && x.SurveyDistributionId == distributionId)
                .Select(x => new
                {
                    x.Id,
                    x.AnonymousToken,
                    x.Status,
                    DistributionStatus = x.Distribution.Status,
                    x.Distribution.SurveyTemplateId,
                    x.Distribution.Title,
                    x.Distribution.TitleAr,
                    x.Distribution.EndDate,
                    SurveyType = x.Distribution.Template.SurveyType.ToString(),
                    IsAnonymous = x.Distribution.Template.IsAnonymous,
                    Description = x.Distribution.Template.Description,
                    DescriptionAr = x.Distribution.Template.DescriptionAr,
                    EstimatedDurationMinutes = x.Distribution.Template.EstimatedDurationMinutes
                })
                .FirstOrDefaultAsync();

            if (participant == null)
                return NotFound(new { error = "You are not a participant in this survey." });

            if (participant.DistributionStatus != SurveyDistributionStatus.Active)
                return BadRequest(new { error = "This survey is not currently active." });

            // Get questions
            var questions = await _context.SurveyQuestions.AsNoTracking()
                .Where(q => q.SurveyTemplateId == participant.SurveyTemplateId && !q.IsDeleted)
                .OrderBy(q => q.DisplayOrder)
                .Select(q => new
                {
                    q.Id,
                    q.QuestionText,
                    q.QuestionTextAr,
                    QuestionType = q.QuestionType.ToString(),
                    q.IsRequired,
                    q.DisplayOrder,
                    q.SectionName,
                    q.SectionNameAr,
                    q.OptionsJson,
                    q.MinValue,
                    q.MaxValue,
                    q.MinLabel,
                    q.MaxLabel,
                    q.MinLabelAr,
                    q.MaxLabelAr
                })
                .ToListAsync();

            return Ok(new
            {
                participant.AnonymousToken,
                Status = participant.Status.ToString(),
                participant.Title,
                participant.TitleAr,
                participant.SurveyType,
                participant.IsAnonymous,
                participant.Description,
                participant.DescriptionAr,
                participant.EstimatedDurationMinutes,
                participant.EndDate,
                Questions = questions
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving survey questions for distribution {DistributionId}", distributionId);
            return StatusCode(500, new { error = "An error occurred while retrieving survey questions" });
        }
    }

    /// <summary>
    /// Submits anonymous survey responses for the current employee.
    /// Validates the participant token, marks participant as completed.
    /// </summary>
    [HttpPost("my-surveys/{distributionId}/submit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SubmitMySurvey(long distributionId, [FromBody] PortalSubmitSurveyRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            // Find participant record
            var participant = await _context.SurveyParticipants
                .Include(p => p.Distribution)
                .FirstOrDefaultAsync(p => p.EmployeeId == employeeId
                    && p.SurveyDistributionId == distributionId
                    && !p.IsDeleted);

            if (participant == null)
                return NotFound(new { error = "You are not a participant in this survey." });

            if (participant.Status == SurveyParticipantStatus.Completed)
                return BadRequest(new { error = "You have already completed this survey." });

            if (participant.Distribution.Status != SurveyDistributionStatus.Active)
                return BadRequest(new { error = "This survey is not currently active." });

            if (DateTime.UtcNow > participant.Distribution.EndDate)
                return BadRequest(new { error = "Survey deadline has passed." });

            if (request.Responses == null || !request.Responses.Any())
                return BadRequest(new { error = "At least one response is required." });

            // Validate question IDs
            var validQuestionIds = await _context.SurveyQuestions.AsNoTracking()
                .Where(q => q.SurveyTemplateId == participant.Distribution.SurveyTemplateId && !q.IsDeleted)
                .Select(q => q.Id)
                .ToListAsync();

            var now = DateTime.UtcNow;
            var token = participant.AnonymousToken ?? Guid.NewGuid().ToString("N");

            // Save responses using anonymous token (NOT employee identity)
            foreach (var resp in request.Responses)
            {
                if (!validQuestionIds.Contains(resp.QuestionId))
                    continue;

                var response = new SurveyResponse
                {
                    SurveyDistributionId = distributionId,
                    SurveyQuestionId = resp.QuestionId,
                    ParticipantToken = token,
                    ResponseText = resp.ResponseText,
                    ResponseValue = resp.ResponseValue,
                    SelectedOptions = resp.SelectedOptions,
                    CreatedAtUtc = now,
                    CreatedBy = "ANONYMOUS"
                };
                _context.SurveyResponses.Add(response);
            }

            // Update participant status
            participant.Status = SurveyParticipantStatus.Completed;
            participant.CompletedAt = now;
            participant.ModifiedAtUtc = now;
            participant.ModifiedBy = "SYSTEM";

            // Update distribution response count
            participant.Distribution.TotalResponses = await _context.SurveyParticipants
                .CountAsync(p => p.SurveyDistributionId == distributionId
                    && p.Status == SurveyParticipantStatus.Completed) + 1;
            participant.Distribution.ModifiedAtUtc = now;
            participant.Distribution.ModifiedBy = "SYSTEM";

            await _context.SaveChangesAsync();
            return Ok(new { message = "Survey responses submitted successfully." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error submitting survey responses for distribution {DistributionId}", distributionId);
            return StatusCode(500, new { error = "An error occurred while submitting your survey responses" });
        }
    }

    // ══════════════════════════════════════════════════════════
    //  Timesheet Self-Service Endpoints
    // ══════════════════════════════════════════════════════════

    /// <summary>Gets the current employee's timesheets (paginated).</summary>
    [HttpGet("my-timesheets")]
    public async Task<IActionResult> GetMyTimesheets(
        [FromQuery] TimesheetStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var query = _context.Timesheets.AsNoTracking()
                .Where(x => x.EmployeeId == employeeLink.EmployeeId);

            if (status.HasValue)
                query = query.Where(x => x.Status == status.Value);

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(x => x.CreatedAtUtc)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new
                {
                    x.Id,
                    x.TimesheetPeriodId,
                    PeriodName = x.TimesheetPeriod.Name,
                    PeriodStartDate = x.TimesheetPeriod.StartDate,
                    PeriodEndDate = x.TimesheetPeriod.EndDate,
                    x.Status,
                    x.TotalHours,
                    x.RegularHours,
                    x.OvertimeHours,
                    x.SubmittedAt,
                    x.ApprovedAt,
                    x.RejectedAt,
                    x.RejectionReason,
                    x.Notes,
                    EntryCount = x.Entries.Count(e => !e.IsDeleted),
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = items, totalCount, pageNumber, pageSize });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving my timesheets");
            return StatusCode(500, new { error = "An error occurred while retrieving timesheets" });
        }
    }

    /// <summary>Gets a specific timesheet for the current employee with entries.</summary>
    [HttpGet("my-timesheets/{id}")]
    public async Task<IActionResult> GetMyTimesheetById(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var item = await _context.Timesheets.AsNoTracking()
                .Where(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId)
                .Select(x => new
                {
                    x.Id,
                    x.TimesheetPeriodId,
                    PeriodName = x.TimesheetPeriod.Name,
                    PeriodStartDate = x.TimesheetPeriod.StartDate,
                    PeriodEndDate = x.TimesheetPeriod.EndDate,
                    PeriodStatus = x.TimesheetPeriod.Status,
                    x.Status,
                    x.TotalHours,
                    x.RegularHours,
                    x.OvertimeHours,
                    x.SubmittedAt,
                    x.ApprovedAt,
                    x.RejectedAt,
                    x.RejectionReason,
                    x.Notes,
                    x.CreatedAtUtc,
                    Entries = x.Entries
                        .Where(e => !e.IsDeleted)
                        .OrderBy(e => e.EntryDate)
                        .ThenBy(e => e.ProjectId)
                        .Select(e => new
                        {
                            e.Id,
                            e.ProjectId,
                            ProjectName = e.Project.Name,
                            ProjectCode = e.Project.Code,
                            e.ProjectTaskId,
                            ProjectTaskName = e.ProjectTask != null ? e.ProjectTask.Name : null,
                            e.EntryDate,
                            e.Hours,
                            e.OvertimeHours,
                            e.Notes,
                            e.IsAutoPopulated,
                            e.AttendanceRecordId
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (item == null)
                return NotFound(new { error = "Timesheet not found." });

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving timesheet {TimesheetId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving the timesheet" });
        }
    }

    /// <summary>Creates a timesheet for the current employee.</summary>
    [HttpPost("my-timesheets")]
    public async Task<IActionResult> CreateMyTimesheet([FromBody] PortalCreateTimesheetRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            // Validate period
            var period = await _context.TimesheetPeriods.FindAsync(request.TimesheetPeriodId);
            if (period == null || period.IsDeleted)
                return BadRequest(new { error = "Timesheet period not found." });

            if (period.Status != TimesheetPeriodStatus.Open)
                return BadRequest(new { error = "Timesheet period is not open." });

            // Check for duplicate
            var exists = await _context.Timesheets
                .AnyAsync(x => x.TimesheetPeriodId == request.TimesheetPeriodId
                    && x.EmployeeId == employeeLink.EmployeeId);
            if (exists)
                return BadRequest(new { error = "A timesheet already exists for this period." });

            var entity = new Timesheet
            {
                TimesheetPeriodId = request.TimesheetPeriodId,
                EmployeeId = employeeLink.EmployeeId,
                Status = TimesheetStatus.Draft,
                TotalHours = 0,
                RegularHours = 0,
                OvertimeHours = 0,
                Notes = request.Notes,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };

            _context.Timesheets.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating my timesheet");
            return StatusCode(500, new { error = "An error occurred while creating the timesheet" });
        }
    }

    /// <summary>Updates a timesheet and its entries for the current employee.</summary>
    [HttpPut("my-timesheets/{id}")]
    public async Task<IActionResult> UpdateMyTimesheet(long id, [FromBody] PortalUpdateTimesheetRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.Timesheets
                .Include(x => x.Entries.Where(e => !e.IsDeleted))
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted);

            if (entity == null)
                return NotFound(new { error = "Timesheet not found." });

            if (entity.Status != TimesheetStatus.Draft && entity.Status != TimesheetStatus.Rejected)
                return BadRequest(new { error = "Only draft or rejected timesheets can be updated." });

            entity.Notes = request.Notes;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

            // Remove existing entries
            foreach (var existing in entity.Entries.ToList())
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username ?? "SYSTEM";
            }

            // Add new entries
            if (request.Entries != null)
            {
                foreach (var entryReq in request.Entries)
                {
                    var entry = new TimesheetEntry
                    {
                        TimesheetId = entity.Id,
                        ProjectId = entryReq.ProjectId,
                        ProjectTaskId = entryReq.ProjectTaskId,
                        EntryDate = entryReq.EntryDate,
                        Hours = entryReq.Hours,
                        OvertimeHours = entryReq.OvertimeHours,
                        Notes = entryReq.Notes,
                        IsAutoPopulated = false,
                        AttendanceRecordId = entryReq.AttendanceRecordId,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = _currentUser.Username ?? "SYSTEM"
                    };
                    _context.TimesheetEntries.Add(entry);
                }
            }

            // Recalculate totals
            var newEntries = request.Entries ?? new List<PortalTimesheetEntryRequest>();
            entity.TotalHours = newEntries.Sum(e => e.Hours + e.OvertimeHours);
            entity.RegularHours = newEntries.Sum(e => e.Hours);
            entity.OvertimeHours = newEntries.Sum(e => e.OvertimeHours);

            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating my timesheet {TimesheetId}", id);
            return StatusCode(500, new { error = "An error occurred while updating the timesheet" });
        }
    }

    /// <summary>Submits a timesheet for approval for the current employee.</summary>
    [HttpPost("my-timesheets/{id}/submit")]
    public async Task<IActionResult> SubmitMyTimesheet(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.Timesheets
                .Include(x => x.TimesheetPeriod)
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted);

            if (entity == null)
                return NotFound(new { error = "Timesheet not found." });

            if (entity.Status != TimesheetStatus.Draft && entity.Status != TimesheetStatus.Rejected)
                return BadRequest(new { error = "Only draft or rejected timesheets can be submitted." });

            if (entity.TimesheetPeriod.Status != TimesheetPeriodStatus.Open)
                return BadRequest(new { error = "Timesheet period is not open for submissions." });

            var hasEntries = await _context.TimesheetEntries
                .AnyAsync(x => x.TimesheetId == id && !x.IsDeleted);
            if (!hasEntries)
                return BadRequest(new { error = "Cannot submit a timesheet with no entries." });

            entity.Status = TimesheetStatus.Submitted;
            entity.SubmittedAt = DateTime.UtcNow;
            entity.SubmittedByUserId = _currentUser.UserId;
            entity.RejectedAt = null;
            entity.RejectionReason = null;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id, status = entity.Status });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error submitting my timesheet {TimesheetId}", id);
            return StatusCode(500, new { error = "An error occurred while submitting the timesheet" });
        }
    }

    /// <summary>Recalls a submitted timesheet for the current employee.</summary>
    [HttpPost("my-timesheets/{id}/recall")]
    public async Task<IActionResult> RecallMyTimesheet(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.Timesheets
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted);

            if (entity == null)
                return NotFound(new { error = "Timesheet not found." });

            if (entity.Status != TimesheetStatus.Submitted)
                return BadRequest(new { error = "Only submitted timesheets can be recalled." });

            entity.Status = TimesheetStatus.Recalled;
            entity.SubmittedAt = null;
            entity.SubmittedByUserId = null;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id, status = entity.Status });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error recalling my timesheet {TimesheetId}", id);
            return StatusCode(500, new { error = "An error occurred while recalling the timesheet" });
        }
    }

    /// <summary>Auto-populates a timesheet from attendance records for the current employee.</summary>
    [HttpGet("my-timesheets/{id}/auto-populate")]
    public async Task<IActionResult> GetMyTimesheetAutoPopulate(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var timesheet = await _context.Timesheets
                .Include(x => x.TimesheetPeriod)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted);

            if (timesheet == null)
                return NotFound(new { error = "Timesheet not found." });

            // Get attendance records for the period
            var attendanceRecords = await _context.AttendanceRecords
                .AsNoTracking()
                .Where(ar => ar.EmployeeId == employeeLink.EmployeeId
                    && ar.AttendanceDate >= timesheet.TimesheetPeriod.StartDate
                    && ar.AttendanceDate <= timesheet.TimesheetPeriod.EndDate
                    && !ar.IsDeleted)
                .OrderBy(ar => ar.AttendanceDate)
                .Select(ar => new
                {
                    ar.Id,
                    Date = ar.AttendanceDate,
                    ar.WorkingHours,
                    ar.OvertimeHours,
                    ar.Status
                })
                .ToListAsync();

            return Ok(new
            {
                timesheetId = id,
                periodStartDate = timesheet.TimesheetPeriod.StartDate,
                periodEndDate = timesheet.TimesheetPeriod.EndDate,
                attendanceRecords
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error auto-populating timesheet {TimesheetId}", id);
            return StatusCode(500, new { error = "An error occurred while retrieving attendance data" });
        }
    }

    /// <summary>Gets active projects for dropdown (self-service).</summary>
    [HttpGet("projects/dropdown")]
    public async Task<IActionResult> GetPortalProjectsDropdown()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var items = await _context.Projects.AsNoTracking()
                .Where(x => x.IsActive && x.Status == ProjectStatus.Active)
                .OrderBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Code,
                    x.Name,
                    x.NameAr,
                    x.BranchId
                })
                .ToListAsync();

            return Ok(items);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving projects dropdown");
            return StatusCode(500, new { error = "An error occurred while retrieving projects" });
        }
    }

    /// <summary>Gets active project tasks for dropdown (self-service).</summary>
    [HttpGet("project-tasks/dropdown")]
    public async Task<IActionResult> GetPortalProjectTasksDropdown([FromQuery] long? projectId = null)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var query = _context.ProjectTasks.AsNoTracking()
                .Where(x => x.IsActive);

            if (projectId.HasValue)
                query = query.Where(x => x.ProjectId == projectId.Value);

            var items = await query
                .OrderBy(x => x.DisplayOrder)
                .ThenBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Code,
                    x.Name,
                    x.NameAr,
                    x.ProjectId
                })
                .ToListAsync();

            return Ok(items);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving project tasks dropdown");
            return StatusCode(500, new { error = "An error occurred while retrieving project tasks" });
        }
    }

    // ══════════════════════════════════════════════════════════
    //  Succession Planning & Career Self-Service Endpoints
    // ══════════════════════════════════════════════════════════

    /// <summary>Gets the current employee's talent profile.</summary>
    [HttpGet("my-career/talent-profile")]
    public async Task<IActionResult> GetMyTalentProfile()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var profile = await _context.TalentProfiles.AsNoTracking()
                .Where(x => x.EmployeeId == employeeLink.EmployeeId && x.IsActive)
                .Select(x => new
                {
                    x.Id,
                    x.EmployeeId,
                    PerformanceRating = x.PerformanceRating != null ? x.PerformanceRating.ToString() : null,
                    PotentialRating = x.PotentialRating.ToString(),
                    NineBoxPosition = x.NineBoxPosition.ToString(),
                    ReadinessLevel = x.ReadinessLevel.ToString(),
                    RetentionRisk = x.RetentionRisk.ToString(),
                    x.CareerAspiration,
                    x.CareerAspirationAr,
                    x.StrengthsSummary,
                    x.DevelopmentAreas,
                    x.LastAssessmentDate,
                    x.IsHighPotential,
                    Skills = x.Skills.Where(s => !s.IsDeleted).Select(s => new
                    {
                        s.Id,
                        s.SkillName,
                        s.SkillNameAr,
                        ProficiencyLevel = s.ProficiencyLevel.ToString(),
                        s.YearsOfExperience,
                        s.IsVerified,
                        s.VerifiedDate
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (profile == null)
                return Ok(new { hasProfile = false });

            return Ok(new { hasProfile = true, profile });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving talent profile for current user");
            return StatusCode(500, new { error = "An error occurred while retrieving talent profile" });
        }
    }

    /// <summary>Gets career paths available for the current employee.</summary>
    [HttpGet("my-career/career-paths")]
    public async Task<IActionResult> GetMyCareerPaths()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var careerPaths = await _context.CareerPaths.AsNoTracking()
                .Where(x => x.IsActive)
                .OrderBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.NameAr,
                    x.Description,
                    x.DescriptionAr,
                    Steps = x.Steps.Where(s => !s.IsDeleted)
                        .OrderBy(s => s.StepOrder)
                        .Select(s => new
                        {
                            s.Id,
                            s.JobTitle,
                            s.JobTitleAr,
                            s.FromJobGradeId,
                            FromJobGradeName = s.FromJobGrade != null ? s.FromJobGrade.Name : null,
                            s.ToJobGradeId,
                            ToJobGradeName = s.ToJobGrade.Name,
                            ToJobGradeNameAr = s.ToJobGrade.NameAr,
                            s.TypicalDurationMonths,
                            s.RequiredCompetencies,
                            s.StepOrder
                        }).ToList()
                })
                .ToListAsync();

            return Ok(careerPaths);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving career paths for current user");
            return StatusCode(500, new { error = "An error occurred while retrieving career paths" });
        }
    }

    /// <summary>Gets development suggestions for the current employee based on their talent profile.</summary>
    [HttpGet("my-career/development-suggestions")]
    public async Task<IActionResult> GetMyDevelopmentSuggestions()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            // Get talent profile
            var profile = await _context.TalentProfiles.AsNoTracking()
                .Include(x => x.Skills)
                .FirstOrDefaultAsync(x => x.EmployeeId == employeeId && x.IsActive);

            // Get succession candidacies for this employee
            var candidacies = await _context.SuccessionCandidates.AsNoTracking()
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted && x.Status == CandidateSuccessionStatus.Active)
                .Select(x => new
                {
                    x.Id,
                    SuccessionPlanName = x.SuccessionPlan.Name,
                    SuccessionPlanNameAr = x.SuccessionPlan.NameAr,
                    KeyPositionTitle = x.SuccessionPlan.KeyPosition.JobTitle,
                    KeyPositionTitleAr = x.SuccessionPlan.KeyPosition.JobTitleAr,
                    ReadinessLevel = x.ReadinessLevel.ToString(),
                    ReadinessTimeline = x.ReadinessTimeline.ToString(),
                    x.Priority,
                    x.DevelopmentPlan,
                    x.DevelopmentPlanAr,
                    x.GapAnalysis
                })
                .ToListAsync();

            return Ok(new
            {
                hasProfile = profile != null,
                developmentAreas = profile?.DevelopmentAreas,
                strengthsSummary = profile?.StrengthsSummary,
                readinessLevel = profile?.ReadinessLevel.ToString(),
                retentionRisk = profile?.RetentionRisk.ToString(),
                skillGaps = profile?.Skills?
                    .Where(s => !s.IsDeleted && s.ProficiencyLevel <= ProficiencyLevel.Intermediate)
                    .Select(s => new
                    {
                        s.SkillName,
                        s.SkillNameAr,
                        currentLevel = s.ProficiencyLevel.ToString(),
                        s.YearsOfExperience
                    }).ToList(),
                successionCandidacies = candidacies
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving development suggestions for current user");
            return StatusCode(500, new { error = "An error occurred while retrieving development suggestions" });
        }
    }

    // ===== BENEFITS ADMINISTRATION (PORTAL) =====

    /// <summary>Gets current employee's benefit enrollments summary.</summary>
    [HttpGet("my-benefits")]
    public async Task<IActionResult> GetMyBenefits()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var enrollments = await _context.BenefitEnrollments
                .AsNoTracking()
                .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new
                {
                    x.Id,
                    x.BenefitPlanId,
                    BenefitPlanName = x.BenefitPlan.Name,
                    BenefitPlanNameAr = x.BenefitPlan.NameAr,
                    BenefitPlanCode = x.BenefitPlan.Code,
                    BenefitType = x.BenefitPlan.BenefitType.ToString(),
                    PlanOptionName = x.PlanOption != null ? x.PlanOption.Name : null,
                    PlanOptionNameAr = x.PlanOption != null ? x.PlanOption.NameAr : null,
                    Status = x.Status.ToString(),
                    x.EnrollmentDate,
                    x.EffectiveDate,
                    x.TerminationDate,
                    x.EmployeeMonthlyContribution,
                    x.EmployerMonthlyContribution,
                    x.Currency,
                    DependentsCount = x.Dependents.Count(d => !d.IsDeleted && d.IsActive),
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = enrollments, totalCount = enrollments.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee benefits");
            return StatusCode(500, new { error = "An error occurred while retrieving benefits" });
        }
    }

    /// <summary>Gets available benefit plans filtered by eligibility for current employee.</summary>
    [HttpGet("my-benefits/available-plans")]
    public async Task<IActionResult> GetAvailableBenefitPlans()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            var employee = await _context.Employees
                .AsNoTracking()
                .Where(x => x.Id == employeeId)
                .Select(x => new
                {
                    x.Id,
                    x.BranchId,
                    x.DepartmentId,
                    x.HireDate
                })
                .FirstOrDefaultAsync();

            if (employee == null)
                return NotFound(new { error = "Employee not found" });

            var today = DateTime.UtcNow.Date;

            // Get active plans where effective date range covers today
            var plans = await _context.BenefitPlans
                .AsNoTracking()
                .Where(x => x.IsActive && x.EffectiveStartDate <= today && x.EffectiveEndDate >= today)
                .Include(x => x.Options.Where(o => !o.IsDeleted && o.IsActive))
                .Select(x => new
                {
                    x.Id,
                    x.Code,
                    x.Name,
                    x.NameAr,
                    x.Description,
                    x.DescriptionAr,
                    BenefitType = x.BenefitType.ToString(),
                    x.EmployeePremiumAmount,
                    x.EmployerPremiumAmount,
                    x.Currency,
                    x.CoverageDetails,
                    x.CoverageDetailsAr,
                    x.MaxDependents,
                    x.DependentPremiumAmount,
                    Options = x.Options.Where(o => !o.IsDeleted && o.IsActive).Select(o => new
                    {
                        o.Id,
                        o.Name,
                        o.NameAr,
                        o.Description,
                        o.EmployeeCost,
                        o.EmployerCost,
                        o.Currency,
                        CoverageLevel = o.CoverageLevel.ToString(),
                        o.IsDefault
                    }),
                    AlreadyEnrolled = x.Enrollments.Any(e =>
                        e.EmployeeId == employeeId &&
                        e.Status == BenefitEnrollmentStatus.Active &&
                        !e.IsDeleted)
                })
                .ToListAsync();

            return Ok(new { data = plans, totalCount = plans.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving available benefit plans");
            return StatusCode(500, new { error = "An error occurred while retrieving available benefit plans" });
        }
    }

    /// <summary>Enrolls the current employee in a benefit plan.</summary>
    [HttpPost("my-benefits/enroll")]
    public async Task<IActionResult> EnrollInBenefitPlan([FromBody] PortalBenefitEnrollRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            // Validate plan
            var plan = await _context.BenefitPlans.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BenefitPlanId && x.IsActive);

            if (plan == null)
                return BadRequest(new { error = "Benefit plan not found or inactive." });

            // Check duplicate
            var hasDuplicate = await _context.BenefitEnrollments
                .AnyAsync(x => x.EmployeeId == employeeId
                    && x.BenefitPlanId == request.BenefitPlanId
                    && x.Status == BenefitEnrollmentStatus.Active);

            if (hasDuplicate)
                return BadRequest(new { error = "You already have an active enrollment for this benefit plan." });

            var entity = new BenefitEnrollment
            {
                EmployeeId = employeeId,
                BenefitPlanId = request.BenefitPlanId,
                BenefitPlanOptionId = request.BenefitPlanOptionId,
                OpenEnrollmentPeriodId = request.OpenEnrollmentPeriodId,
                Status = BenefitEnrollmentStatus.PendingApproval,
                EnrollmentDate = DateTime.UtcNow,
                EffectiveDate = request.EffectiveDate,
                EmployeeMonthlyContribution = request.EmployeeMonthlyContribution,
                EmployerMonthlyContribution = request.EmployerMonthlyContribution,
                Currency = request.Currency ?? "SAR",
                LifeEventType = request.LifeEventType,
                LifeEventDate = request.LifeEventDate,
                Notes = request.Notes,
                CreatedBy = _currentUser.Username ?? "system"
            };

            _context.BenefitEnrollments.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error enrolling in benefit plan");
            return StatusCode(500, new { error = "An error occurred while enrolling in benefit plan" });
        }
    }

    /// <summary>Updates current employee's benefit enrollment (only pending).</summary>
    [HttpPut("my-benefits/enrollments/{id}")]
    public async Task<IActionResult> UpdateMyEnrollment(long id, [FromBody] PortalUpdateBenefitEnrollRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.BenefitEnrollments
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId);

            if (entity == null)
                return NotFound(new { error = "Benefit enrollment not found." });

            if (entity.Status != BenefitEnrollmentStatus.PendingApproval && entity.Status != BenefitEnrollmentStatus.Pending)
                return BadRequest(new { error = "Can only update enrollments in Draft or PendingApproval status." });

            entity.BenefitPlanOptionId = request.BenefitPlanOptionId;
            entity.EffectiveDate = request.EffectiveDate;
            entity.EmployeeMonthlyContribution = request.EmployeeMonthlyContribution;
            entity.EmployerMonthlyContribution = request.EmployerMonthlyContribution;
            entity.Notes = request.Notes;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating benefit enrollment");
            return StatusCode(500, new { error = "An error occurred while updating benefit enrollment" });
        }
    }

    /// <summary>Cancels current employee's benefit enrollment.</summary>
    [HttpPost("my-benefits/enrollments/{id}/cancel")]
    public async Task<IActionResult> CancelMyEnrollment(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.BenefitEnrollments
                .FirstOrDefaultAsync(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId);

            if (entity == null)
                return NotFound(new { error = "Benefit enrollment not found." });

            if (entity.Status == BenefitEnrollmentStatus.Terminated || entity.Status == BenefitEnrollmentStatus.Cancelled)
                return BadRequest(new { error = "Enrollment is already terminated or cancelled." });

            entity.Status = BenefitEnrollmentStatus.Cancelled;
            entity.TerminationDate = DateTime.UtcNow;
            entity.TerminationReason = "Cancelled by employee";
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username;

            await _context.SaveChangesAsync();
            return Ok(new { status = entity.Status.ToString() });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cancelling benefit enrollment");
            return StatusCode(500, new { error = "An error occurred while cancelling benefit enrollment" });
        }
    }

    /// <summary>Gets current employee's benefit dependents across all enrollments.</summary>
    [HttpGet("my-benefits/dependents")]
    public async Task<IActionResult> GetMyBenefitDependents()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var dependents = await _context.BenefitDependents
                .AsNoTracking()
                .Where(x => x.BenefitEnrollment.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted)
                .Select(x => new
                {
                    x.Id,
                    x.BenefitEnrollmentId,
                    BenefitPlanName = x.BenefitEnrollment.BenefitPlan.Name,
                    x.FirstName,
                    x.FirstNameAr,
                    x.LastName,
                    x.LastNameAr,
                    Relationship = x.Relationship.ToString(),
                    x.DateOfBirth,
                    x.NationalId,
                    x.CoverageStartDate,
                    x.CoverageEndDate,
                    x.AdditionalPremium,
                    x.Currency,
                    x.IsActive
                })
                .ToListAsync();

            return Ok(new { data = dependents, totalCount = dependents.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving benefit dependents");
            return StatusCode(500, new { error = "An error occurred while retrieving benefit dependents" });
        }
    }

    /// <summary>Adds a dependent to current employee's benefit enrollment.</summary>
    [HttpPost("my-benefits/dependents")]
    public async Task<IActionResult> AddMyBenefitDependent([FromBody] PortalAddBenefitDependentRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var enrollment = await _context.BenefitEnrollments
                .Include(x => x.BenefitPlan)
                .Include(x => x.Dependents.Where(d => !d.IsDeleted))
                .FirstOrDefaultAsync(x => x.Id == request.BenefitEnrollmentId && x.EmployeeId == employeeLink.EmployeeId);

            if (enrollment == null)
                return NotFound(new { error = "Benefit enrollment not found." });

            if (enrollment.Status != BenefitEnrollmentStatus.Active && enrollment.Status != BenefitEnrollmentStatus.PendingApproval)
                return BadRequest(new { error = "Cannot add dependents to this enrollment." });

            if (enrollment.BenefitPlan.MaxDependents.HasValue &&
                enrollment.Dependents.Count >= enrollment.BenefitPlan.MaxDependents.Value)
                return BadRequest(new { error = $"Maximum number of dependents ({enrollment.BenefitPlan.MaxDependents.Value}) reached." });

            var entity = new BenefitDependent
            {
                BenefitEnrollmentId = request.BenefitEnrollmentId,
                EmployeeDependentId = request.EmployeeDependentId,
                FirstName = request.FirstName,
                FirstNameAr = request.FirstNameAr,
                LastName = request.LastName,
                LastNameAr = request.LastNameAr,
                Relationship = request.Relationship,
                DateOfBirth = request.DateOfBirth,
                NationalId = request.NationalId,
                CoverageStartDate = request.CoverageStartDate,
                CoverageEndDate = request.CoverageEndDate,
                AdditionalPremium = request.AdditionalPremium,
                Currency = request.Currency ?? "SAR",
                IsActive = true,
                CreatedBy = _currentUser.Username ?? "system"
            };

            _context.BenefitDependents.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding benefit dependent");
            return StatusCode(500, new { error = "An error occurred while adding benefit dependent" });
        }
    }

    /// <summary>Removes a dependent from current employee's benefit enrollment.</summary>
    [HttpDelete("my-benefits/dependents/{id}")]
    public async Task<IActionResult> RemoveMyBenefitDependent(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var entity = await _context.BenefitDependents
                .Include(x => x.BenefitEnrollment)
                .FirstOrDefaultAsync(x => x.Id == id && x.BenefitEnrollment.EmployeeId == employeeLink.EmployeeId);

            if (entity == null)
                return NotFound(new { error = "Benefit dependent not found." });

            entity.IsDeleted = true;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = _currentUser.Username;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing benefit dependent");
            return StatusCode(500, new { error = "An error occurred while removing benefit dependent" });
        }
    }

    /// <summary>Gets current employee's benefit claims.</summary>
    [HttpGet("my-benefits/claims")]
    public async Task<IActionResult> GetMyBenefitClaims()
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var claims = await _context.BenefitClaims
                .AsNoTracking()
                .Where(x => x.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted)
                .OrderByDescending(x => x.ClaimDate)
                .Select(x => new
                {
                    x.Id,
                    x.BenefitEnrollmentId,
                    BenefitPlanName = x.BenefitEnrollment.BenefitPlan.Name,
                    BenefitPlanNameAr = x.BenefitEnrollment.BenefitPlan.NameAr,
                    x.ClaimDate,
                    x.ClaimAmount,
                    x.ApprovedAmount,
                    x.Currency,
                    ClaimType = x.ClaimType.ToString(),
                    x.Description,
                    x.DescriptionAr,
                    Status = x.Status.ToString(),
                    x.ProcessedAt,
                    x.RejectionReason,
                    x.CreatedAtUtc
                })
                .ToListAsync();

            return Ok(new { data = claims, totalCount = claims.Count });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee benefit claims");
            return StatusCode(500, new { error = "An error occurred while retrieving benefit claims" });
        }
    }

    /// <summary>Creates a benefit claim for the current employee.</summary>
    [HttpPost("my-benefits/claims")]
    public async Task<IActionResult> CreateMyBenefitClaim([FromBody] PortalCreateBenefitClaimRequest request)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var employeeId = employeeLink.EmployeeId;

            // Validate enrollment belongs to employee and is active
            var enrollment = await _context.BenefitEnrollments
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BenefitEnrollmentId && x.EmployeeId == employeeId);

            if (enrollment == null)
                return BadRequest(new { error = "Benefit enrollment not found." });

            if (enrollment.Status != BenefitEnrollmentStatus.Active)
                return BadRequest(new { error = "Claims can only be submitted against active enrollments." });

            var entity = new BenefitClaim
            {
                BenefitEnrollmentId = request.BenefitEnrollmentId,
                EmployeeId = employeeId,
                ClaimDate = DateTime.UtcNow,
                ClaimAmount = request.ClaimAmount,
                Currency = request.Currency ?? "SAR",
                ClaimType = request.ClaimType,
                Description = request.Description,
                DescriptionAr = request.DescriptionAr,
                Status = BenefitClaimStatus.Submitted,
                Notes = request.Notes,
                CreatedBy = _currentUser.Username ?? "system"
            };

            _context.BenefitClaims.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { id = entity.Id });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating benefit claim");
            return StatusCode(500, new { error = "An error occurred while creating benefit claim" });
        }
    }

    /// <summary>Gets a specific benefit claim for the current employee.</summary>
    [HttpGet("my-benefits/claims/{id}")]
    public async Task<IActionResult> GetMyBenefitClaimById(long id)
    {
        try
        {
            if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
                return Unauthorized(new { error = "User not authenticated" });

            var employeeLink = await _context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

            if (employeeLink == null)
                return NotFound(new { error = "Employee profile not found for current user" });

            var item = await _context.BenefitClaims
                .AsNoTracking()
                .Where(x => x.Id == id && x.EmployeeId == employeeLink.EmployeeId && !x.IsDeleted)
                .Select(x => new
                {
                    x.Id,
                    x.BenefitEnrollmentId,
                    BenefitPlanName = x.BenefitEnrollment.BenefitPlan.Name,
                    BenefitPlanNameAr = x.BenefitEnrollment.BenefitPlan.NameAr,
                    BenefitPlanCode = x.BenefitEnrollment.BenefitPlan.Code,
                    BenefitType = x.BenefitEnrollment.BenefitPlan.BenefitType.ToString(),
                    x.ClaimDate,
                    x.ClaimAmount,
                    x.ApprovedAmount,
                    x.Currency,
                    ClaimType = x.ClaimType.ToString(),
                    x.Description,
                    x.DescriptionAr,
                    Status = x.Status.ToString(),
                    x.ProcessedAt,
                    x.RejectionReason,
                    x.Notes,
                    x.CreatedAtUtc
                })
                .FirstOrDefaultAsync();

            if (item == null)
                return NotFound(new { error = "Benefit claim not found." });

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving benefit claim");
            return StatusCode(500, new { error = "An error occurred while retrieving benefit claim" });
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

/// <summary>
/// Request for submitting a resignation
/// </summary>
public class PortalFileGrievanceRequest
{
    public GrievanceType GrievanceType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public GrievancePriority Priority { get; set; }
    public bool IsConfidential { get; set; }
    public long? AgainstEmployeeId { get; set; }
    public string? Notes { get; set; }
}

public class SubmitResignationRequest
{
    public DateTime ResignationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
}

public class PortalSubmitSurveyRequest
{
    public List<PortalSurveyResponseItem> Responses { get; set; } = new();
}

public class PortalSurveyResponseItem
{
    public long QuestionId { get; set; }
    public string? ResponseText { get; set; }
    public int? ResponseValue { get; set; }
    public string? SelectedOptions { get; set; }
}

public class PortalCreateTimesheetRequest
{
    public long TimesheetPeriodId { get; set; }
    public string? Notes { get; set; }
}

public class PortalUpdateTimesheetRequest
{
    public string? Notes { get; set; }
    public List<PortalTimesheetEntryRequest>? Entries { get; set; }
}

public class PortalTimesheetEntryRequest
{
    public long ProjectId { get; set; }
    public long? ProjectTaskId { get; set; }
    public DateTime EntryDate { get; set; }
    public decimal Hours { get; set; }
    public decimal OvertimeHours { get; set; }
    public string? Notes { get; set; }
    public long? AttendanceRecordId { get; set; }
}

// Benefits Portal DTOs
public class PortalBenefitEnrollRequest
{
    public long BenefitPlanId { get; set; }
    public long? BenefitPlanOptionId { get; set; }
    public long? OpenEnrollmentPeriodId { get; set; }
    public DateTime EffectiveDate { get; set; }
    public decimal EmployeeMonthlyContribution { get; set; }
    public decimal EmployerMonthlyContribution { get; set; }
    public string? Currency { get; set; }
    public LifeEventType? LifeEventType { get; set; }
    public DateTime? LifeEventDate { get; set; }
    public string? Notes { get; set; }
}

public class PortalUpdateBenefitEnrollRequest
{
    public long? BenefitPlanOptionId { get; set; }
    public DateTime EffectiveDate { get; set; }
    public decimal EmployeeMonthlyContribution { get; set; }
    public decimal EmployerMonthlyContribution { get; set; }
    public string? Notes { get; set; }
}

public class PortalAddBenefitDependentRequest
{
    public long BenefitEnrollmentId { get; set; }
    public long? EmployeeDependentId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string? LastNameAr { get; set; }
    public DependentRelationship Relationship { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? NationalId { get; set; }
    public DateTime CoverageStartDate { get; set; }
    public DateTime? CoverageEndDate { get; set; }
    public decimal AdditionalPremium { get; set; }
    public string? Currency { get; set; }
}

public class PortalCreateBenefitClaimRequest
{
    public long BenefitEnrollmentId { get; set; }
    public decimal ClaimAmount { get; set; }
    public string? Currency { get; set; }
    public BenefitClaimType ClaimType { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Notes { get; set; }
}
