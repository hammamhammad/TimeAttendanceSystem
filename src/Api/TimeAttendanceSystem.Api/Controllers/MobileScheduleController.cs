using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Shifts;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Controller for mobile schedule data.
/// Provides shift schedule information for the Flutter ESS mobile app.
/// </summary>
[ApiController]
[Route("api/v1/mobile/schedule")]
[Authorize]
public class MobileScheduleController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<MobileScheduleController> _logger;

    public MobileScheduleController(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILogger<MobileScheduleController> logger)
    {
        _context = context;
        _currentUser = currentUser;
        _logger = logger;
    }

    /// <summary>
    /// Get today's schedule for the current employee.
    /// Returns the assigned shift with periods and off-day status for today.
    /// </summary>
    [HttpGet("today")]
    [ProducesResponseType(typeof(DailyScheduleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTodaySchedule()
    {
        var employeeResult = await GetCurrentEmployeeAsync();
        if (employeeResult.ActionResult != null)
            return employeeResult.ActionResult;

        var today = DateTime.UtcNow.Date;
        var schedule = await BuildDailyScheduleAsync(employeeResult.EmployeeId, employeeResult.DepartmentId, employeeResult.BranchId, today);

        return Ok(schedule);
    }

    /// <summary>
    /// Get weekly schedule for the current employee.
    /// Returns 7 days of schedule starting from the specified weekStart date.
    /// </summary>
    /// <param name="weekStart">Start date of the week (defaults to current week's Sunday)</param>
    [HttpGet("weekly")]
    [ProducesResponseType(typeof(List<DailyScheduleDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetWeeklySchedule([FromQuery] DateTime? weekStart)
    {
        var employeeResult = await GetCurrentEmployeeAsync();
        if (employeeResult.ActionResult != null)
            return employeeResult.ActionResult;

        var start = weekStart?.Date ?? GetCurrentWeekStart();
        var schedules = new List<DailyScheduleDto>();

        for (int i = 0; i < 7; i++)
        {
            var date = start.AddDays(i);
            var schedule = await BuildDailyScheduleAsync(employeeResult.EmployeeId, employeeResult.DepartmentId, employeeResult.BranchId, date);
            schedules.Add(schedule);
        }

        return Ok(schedules);
    }

    /// <summary>
    /// Get schedule for a date range for the current employee.
    /// </summary>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    [HttpGet]
    [ProducesResponseType(typeof(List<DailyScheduleDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetScheduleRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        if (startDate > endDate)
        {
            return BadRequest(new { error = "startDate must be before or equal to endDate" });
        }

        var totalDays = (endDate.Date - startDate.Date).Days + 1;
        if (totalDays > 31)
        {
            return BadRequest(new { error = "Date range cannot exceed 31 days" });
        }

        var employeeResult = await GetCurrentEmployeeAsync();
        if (employeeResult.ActionResult != null)
            return employeeResult.ActionResult;

        var schedules = new List<DailyScheduleDto>();

        for (int i = 0; i < totalDays; i++)
        {
            var date = startDate.Date.AddDays(i);
            var schedule = await BuildDailyScheduleAsync(employeeResult.EmployeeId, employeeResult.DepartmentId, employeeResult.BranchId, date);
            schedules.Add(schedule);
        }

        return Ok(schedules);
    }

    /// <summary>
    /// Resolves the current authenticated user to their employee profile.
    /// </summary>
    private async Task<EmployeeResolutionResult> GetCurrentEmployeeAsync()
    {
        if (_currentUser.UserId == null)
        {
            return new EmployeeResolutionResult { ActionResult = Unauthorized(new { error = "User not authenticated" }) };
        }

        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

        if (employeeLink == null)
        {
            return new EmployeeResolutionResult { ActionResult = NotFound(new { error = "Employee profile not found for current user" }) };
        }

        return new EmployeeResolutionResult
        {
            EmployeeId = employeeLink.EmployeeId,
            DepartmentId = employeeLink.Employee.DepartmentId,
            BranchId = employeeLink.Employee.BranchId
        };
    }

    /// <summary>
    /// Builds the daily schedule for an employee on a given date by resolving
    /// the effective shift assignment using the priority hierarchy:
    /// Employee (highest) > Department > Branch (lowest).
    /// </summary>
    private async Task<DailyScheduleDto> BuildDailyScheduleAsync(long employeeId, long? departmentId, long branchId, DateTime date)
    {
        var shift = await ResolveShiftForDateAsync(employeeId, departmentId, branchId, date);

        if (shift == null)
        {
            return new DailyScheduleDto
            {
                Date = date.ToString("yyyy-MM-dd"),
                ShiftName = null,
                ShiftId = null,
                Periods = new List<ShiftPeriodDto>(),
                IsOffDay = false,
                IsWorkingDay = false,
                TotalHours = 0
            };
        }

        var isWorkingDay = IsWorkingDay(shift, date);

        var periods = shift.ShiftPeriods
            .OrderBy(p => p.PeriodOrder)
            .Select(p => new ShiftPeriodDto
            {
                PeriodOrder = p.PeriodOrder,
                StartTime = p.StartTime.ToString("HH:mm"),
                EndTime = p.EndTime.ToString("HH:mm"),
                Hours = p.Hours
            })
            .ToList();

        return new DailyScheduleDto
        {
            Date = date.ToString("yyyy-MM-dd"),
            ShiftName = shift.Name,
            ShiftId = shift.Id,
            Periods = periods,
            IsOffDay = !isWorkingDay,
            IsWorkingDay = isWorkingDay,
            TotalHours = shift.CalculateTotalHours()
        };
    }

    /// <summary>
    /// Resolves the effective shift for an employee on a given date.
    /// Checks assignments in priority order: Employee > Department > Branch.
    /// Within each level, higher Priority value wins; if tied, the most recently created wins.
    /// </summary>
    private async Task<Shift?> ResolveShiftForDateAsync(long employeeId, long? departmentId, long branchId, DateTime date)
    {
        // 1. Employee-level assignment (highest priority)
        var employeeAssignment = await _context.ShiftAssignments
            .Include(sa => sa.Shift)
                .ThenInclude(s => s.ShiftPeriods)
            .Where(sa => sa.AssignmentType == ShiftAssignmentType.Employee
                         && sa.EmployeeId == employeeId
                         && sa.Status == ShiftAssignmentStatus.Active
                         && sa.EffectiveFromDate.Date <= date.Date
                         && (!sa.EffectiveToDate.HasValue || sa.EffectiveToDate.Value.Date >= date.Date))
            .OrderByDescending(sa => sa.Priority)
            .ThenByDescending(sa => sa.CreatedAtUtc)
            .FirstOrDefaultAsync();

        if (employeeAssignment != null)
            return employeeAssignment.Shift;

        // 2. Department-level assignment (medium priority)
        if (departmentId.HasValue)
        {
            var departmentAssignment = await _context.ShiftAssignments
                .Include(sa => sa.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
                .Where(sa => sa.AssignmentType == ShiftAssignmentType.Department
                             && sa.DepartmentId == departmentId.Value
                             && sa.Status == ShiftAssignmentStatus.Active
                             && sa.EffectiveFromDate.Date <= date.Date
                             && (!sa.EffectiveToDate.HasValue || sa.EffectiveToDate.Value.Date >= date.Date))
                .OrderByDescending(sa => sa.Priority)
                .ThenByDescending(sa => sa.CreatedAtUtc)
                .FirstOrDefaultAsync();

            if (departmentAssignment != null)
                return departmentAssignment.Shift;
        }

        // 3. Branch-level assignment (lowest priority)
        var branchAssignment = await _context.ShiftAssignments
            .Include(sa => sa.Shift)
                .ThenInclude(s => s.ShiftPeriods)
            .Where(sa => sa.AssignmentType == ShiftAssignmentType.Branch
                         && sa.BranchId == branchId
                         && sa.Status == ShiftAssignmentStatus.Active
                         && sa.EffectiveFromDate.Date <= date.Date
                         && (!sa.EffectiveToDate.HasValue || sa.EffectiveToDate.Value.Date >= date.Date))
            .OrderByDescending(sa => sa.Priority)
            .ThenByDescending(sa => sa.CreatedAtUtc)
            .FirstOrDefaultAsync();

        return branchAssignment?.Shift;
    }

    /// <summary>
    /// Determines whether the given date is a working day for the shift
    /// by checking the shift's day-of-week flags.
    /// </summary>
    private static bool IsWorkingDay(Shift shift, DateTime date)
    {
        return date.DayOfWeek switch
        {
            DayOfWeek.Sunday => shift.IsSunday,
            DayOfWeek.Monday => shift.IsMonday,
            DayOfWeek.Tuesday => shift.IsTuesday,
            DayOfWeek.Wednesday => shift.IsWednesday,
            DayOfWeek.Thursday => shift.IsThursday,
            DayOfWeek.Friday => shift.IsFriday,
            DayOfWeek.Saturday => shift.IsSaturday,
            _ => false
        };
    }

    /// <summary>
    /// Gets the start of the current week (Sunday).
    /// </summary>
    private static DateTime GetCurrentWeekStart()
    {
        var today = DateTime.UtcNow.Date;
        int diff = (int)today.DayOfWeek - (int)DayOfWeek.Sunday;
        return today.AddDays(-diff);
    }

    private class EmployeeResolutionResult
    {
        public IActionResult? ActionResult { get; set; }
        public long EmployeeId { get; set; }
        public long? DepartmentId { get; set; }
        public long BranchId { get; set; }
    }
}

// --- DTOs ---

public class DailyScheduleDto
{
    /// <summary>Date in yyyy-MM-dd format.</summary>
    public string Date { get; set; } = string.Empty;

    /// <summary>Name of the assigned shift, or null if no shift is assigned.</summary>
    public string? ShiftName { get; set; }

    /// <summary>ID of the assigned shift, or null if no shift is assigned.</summary>
    public long? ShiftId { get; set; }

    /// <summary>Working periods within the shift.</summary>
    public List<ShiftPeriodDto> Periods { get; set; } = new();

    /// <summary>True if this date is an off day (weekend per shift configuration).</summary>
    public bool IsOffDay { get; set; }

    /// <summary>True if this date is a working day per shift configuration.</summary>
    public bool IsWorkingDay { get; set; }

    /// <summary>Total required working hours for this shift.</summary>
    public decimal TotalHours { get; set; }
}

public class ShiftPeriodDto
{
    /// <summary>Period order within the shift (1 = first period, 2 = second period).</summary>
    public int PeriodOrder { get; set; }

    /// <summary>Start time in HH:mm format.</summary>
    public string StartTime { get; set; } = string.Empty;

    /// <summary>End time in HH:mm format.</summary>
    public string EndTime { get; set; } = string.Empty;

    /// <summary>Duration of this period in hours.</summary>
    public decimal Hours { get; set; }
}
