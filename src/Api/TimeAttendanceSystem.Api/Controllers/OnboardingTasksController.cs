using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/onboarding-tasks")]
[Authorize]
public class OnboardingTasksController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public OnboardingTasksController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists onboarding tasks with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? processId,
        [FromQuery] long? assignedToId,
        [FromQuery] OnboardingTaskStatus? status,
        [FromQuery] OnboardingTaskCategory? category,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.OnboardingTasks
            .Include(t => t.OnboardingProcess).ThenInclude(p => p.Employee)
            .Include(t => t.AssignedToEmployee)
            .Where(t => !t.IsDeleted);

        if (processId.HasValue)
            query = query.Where(t => t.OnboardingProcessId == processId.Value);
        if (assignedToId.HasValue)
            query = query.Where(t => t.AssignedToEmployeeId == assignedToId.Value);
        if (status.HasValue)
            query = query.Where(t => t.Status == status.Value);
        if (category.HasValue)
            query = query.Where(t => t.Category == category.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(t => t.DueDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new OnboardingTaskListDto
            {
                Id = t.Id,
                OnboardingProcessId = t.OnboardingProcessId,
                EmployeeName = t.OnboardingProcess.Employee.FirstName + " " + t.OnboardingProcess.Employee.LastName,
                TaskName = t.TaskName,
                TaskNameAr = t.TaskNameAr,
                Category = t.Category,
                AssignedToEmployeeId = t.AssignedToEmployeeId,
                AssignedToEmployeeName = t.AssignedToEmployee != null ? t.AssignedToEmployee.FirstName + " " + t.AssignedToEmployee.LastName : null,
                Status = t.Status,
                DueDate = t.DueDate,
                CompletedDate = t.CompletedDate,
                IsRequired = t.IsRequired,
                Priority = t.Priority,
                IsOverdue = t.Status == OnboardingTaskStatus.Pending && t.DueDate < DateTime.UtcNow
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Completes an onboarding task and updates process progress.</summary>
    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(long id, [FromBody] CompleteOnboardingTaskRequest? request = null)
    {
        var task = await _context.OnboardingTasks
            .Include(t => t.OnboardingProcess)
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (task == null)
            return NotFound(new { error = "Onboarding task not found." });

        if (task.Status == OnboardingTaskStatus.Completed)
            return BadRequest(new { error = "Task is already completed." });

        task.Status = OnboardingTaskStatus.Completed;
        task.CompletedDate = DateTime.UtcNow;
        task.CompletedByUserId = _currentUser.UserId;
        task.Notes = request?.Notes ?? task.Notes;
        task.ModifiedAtUtc = DateTime.UtcNow;
        task.ModifiedBy = _currentUser.Username;

        // Update process completed tasks count
        task.OnboardingProcess.CompletedTasks++;
        task.OnboardingProcess.ModifiedAtUtc = DateTime.UtcNow;
        task.OnboardingProcess.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Task completed.",
            completedTasks = task.OnboardingProcess.CompletedTasks,
            totalTasks = task.OnboardingProcess.TotalTasks
        });
    }

    /// <summary>Skips an onboarding task (only non-required).</summary>
    [HttpPost("{id}/skip")]
    public async Task<IActionResult> Skip(long id, [FromBody] SkipOnboardingTaskRequest? request = null)
    {
        var task = await _context.OnboardingTasks
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (task == null)
            return NotFound(new { error = "Onboarding task not found." });

        if (task.IsRequired)
            return BadRequest(new { error = "Cannot skip a required task." });

        if (task.Status == OnboardingTaskStatus.Completed || task.Status == OnboardingTaskStatus.Skipped)
            return BadRequest(new { error = "Task is already completed or skipped." });

        task.Status = OnboardingTaskStatus.Skipped;
        task.Notes = request?.Reason ?? task.Notes;
        task.ModifiedAtUtc = DateTime.UtcNow;
        task.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Task skipped." });
    }

    /// <summary>Assigns a task to an employee.</summary>
    [HttpPost("{id}/assign")]
    public async Task<IActionResult> Assign(long id, [FromBody] AssignOnboardingTaskRequest request)
    {
        var task = await _context.OnboardingTasks
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (task == null)
            return NotFound(new { error = "Onboarding task not found." });

        // Validate assignee
        var employee = await _context.Employees
            .AnyAsync(e => e.Id == request.AssignedToEmployeeId && !e.IsDeleted && e.IsActive);

        if (!employee)
            return NotFound(new { error = "Employee not found." });

        task.AssignedToEmployeeId = request.AssignedToEmployeeId;
        task.ModifiedAtUtc = DateTime.UtcNow;
        task.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Task assigned." });
    }

    /// <summary>Gets onboarding tasks assigned to the current user (self-service).</summary>
    [HttpGet("my-tasks")]
    public async Task<IActionResult> GetMyTasks(
        [FromQuery] OnboardingTaskStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        // Find employee linked to current user
        var employeeLink = await _context.EmployeeUserLinks
            .Where(l => l.UserId == _currentUser.UserId)
            .Select(l => l.EmployeeId)
            .FirstOrDefaultAsync();

        if (employeeLink == 0)
            return Ok(new { data = new List<object>(), totalCount = 0, pageNumber = page, pageSize });

        var query = _context.OnboardingTasks
            .Include(t => t.OnboardingProcess).ThenInclude(p => p.Employee)
            .Where(t => !t.IsDeleted
                && t.AssignedToEmployeeId == employeeLink
                && t.OnboardingProcess.Status == OnboardingStatus.InProgress);

        if (status.HasValue)
            query = query.Where(t => t.Status == status.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(t => t.DueDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new OnboardingTaskListDto
            {
                Id = t.Id,
                OnboardingProcessId = t.OnboardingProcessId,
                EmployeeName = t.OnboardingProcess.Employee.FirstName + " " + t.OnboardingProcess.Employee.LastName,
                TaskName = t.TaskName,
                TaskNameAr = t.TaskNameAr,
                Category = t.Category,
                AssignedToEmployeeId = t.AssignedToEmployeeId,
                AssignedToEmployeeName = null,
                Status = t.Status,
                DueDate = t.DueDate,
                CompletedDate = t.CompletedDate,
                IsRequired = t.IsRequired,
                Priority = t.Priority,
                IsOverdue = t.Status == OnboardingTaskStatus.Pending && t.DueDate < DateTime.UtcNow
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CompleteOnboardingTaskRequest(string? Notes);
public record SkipOnboardingTaskRequest(string? Reason);
public record AssignOnboardingTaskRequest(long AssignedToEmployeeId);

public class OnboardingTaskListDto
{
    public long Id { get; set; }
    public long OnboardingProcessId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string TaskName { get; set; } = string.Empty;
    public string? TaskNameAr { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public long? AssignedToEmployeeId { get; set; }
    public string? AssignedToEmployeeName { get; set; }
    public OnboardingTaskStatus Status { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public bool IsRequired { get; set; }
    public int Priority { get; set; }
    public bool IsOverdue { get; set; }
}
