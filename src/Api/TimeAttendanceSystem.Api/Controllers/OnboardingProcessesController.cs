using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/onboarding-processes")]
[Authorize]
public class OnboardingProcessesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public OnboardingProcessesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists onboarding processes with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] OnboardingStatus? status,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.OnboardingProcesses
            .Include(p => p.Employee)
            .Include(p => p.OnboardingTemplate)
            .Where(p => !p.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(p => _currentUser.BranchIds.Contains(p.Employee.BranchId));

        if (employeeId.HasValue)
            query = query.Where(p => p.EmployeeId == employeeId.Value);
        if (status.HasValue)
            query = query.Where(p => p.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p =>
                p.Employee.FirstName.Contains(search) ||
                p.Employee.LastName.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(p => p.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new OnboardingProcessListDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                TemplateName = p.OnboardingTemplate.Name,
                StartDate = p.StartDate,
                ExpectedCompletionDate = p.ExpectedCompletionDate,
                ActualCompletionDate = p.ActualCompletionDate,
                Status = p.Status,
                TotalTasks = p.TotalTasks,
                CompletedTasks = p.CompletedTasks,
                ProgressPercentage = p.TotalTasks > 0 ? (int)((double)p.CompletedTasks / p.TotalTasks * 100) : 0,
                CreatedAtUtc = p.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets an onboarding process by ID with tasks and documents.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.OnboardingProcesses
            .Include(p => p.Employee)
            .Include(p => p.OnboardingTemplate)
            .Include(p => p.BuddyEmployee)
            .Include(p => p.MentorEmployee)
            .Include(p => p.Tasks.Where(t => !t.IsDeleted).OrderBy(t => t.DueDate))
                .ThenInclude(t => t.AssignedToEmployee)
            .Include(p => p.Documents.Where(d => !d.IsDeleted))
            .Where(p => p.Id == id && !p.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Onboarding process not found." });

        return Ok(new OnboardingProcessDetailDto
        {
            Id = item.Id,
            EmployeeId = item.EmployeeId,
            EmployeeName = item.Employee.FirstName + " " + item.Employee.LastName,
            OnboardingTemplateId = item.OnboardingTemplateId,
            TemplateName = item.OnboardingTemplate.Name,
            StartDate = item.StartDate,
            ExpectedCompletionDate = item.ExpectedCompletionDate,
            ActualCompletionDate = item.ActualCompletionDate,
            Status = item.Status,
            BuddyEmployeeId = item.BuddyEmployeeId,
            BuddyEmployeeName = item.BuddyEmployee != null ? item.BuddyEmployee.FirstName + " " + item.BuddyEmployee.LastName : null,
            MentorEmployeeId = item.MentorEmployeeId,
            MentorEmployeeName = item.MentorEmployee != null ? item.MentorEmployee.FirstName + " " + item.MentorEmployee.LastName : null,
            TotalTasks = item.TotalTasks,
            CompletedTasks = item.CompletedTasks,
            ProgressPercentage = item.TotalTasks > 0 ? (int)((double)item.CompletedTasks / item.TotalTasks * 100) : 0,
            Notes = item.Notes,
            OfferLetterId = item.OfferLetterId,
            Tasks = item.Tasks.Select(t => new OnboardingTaskDto
            {
                Id = t.Id,
                TaskName = t.TaskName,
                TaskNameAr = t.TaskNameAr,
                Description = t.Description,
                Category = t.Category,
                AssignedToEmployeeId = t.AssignedToEmployeeId,
                AssignedToEmployeeName = t.AssignedToEmployee != null ? t.AssignedToEmployee.FirstName + " " + t.AssignedToEmployee.LastName : null,
                Status = t.Status,
                DueDate = t.DueDate,
                CompletedDate = t.CompletedDate,
                IsRequired = t.IsRequired,
                Priority = t.Priority,
                Notes = t.Notes
            }).ToList(),
            Documents = item.Documents.Select(d => new OnboardingDocumentDto
            {
                Id = d.Id,
                DocumentType = d.DocumentType,
                DocumentTypeAr = d.DocumentTypeAr,
                DocumentName = d.DocumentName,
                IsRequired = d.IsRequired,
                Status = d.Status,
                FileUrl = d.FileUrl,
                SubmittedDate = d.SubmittedDate,
                VerifiedDate = d.VerifiedDate,
                RejectionReason = d.RejectionReason,
                Notes = d.Notes
            }).ToList(),
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates an onboarding process manually (for non-recruitment hires).</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOnboardingProcessRequest request)
    {
        // Validate employee
        var employee = await _context.Employees
            .AnyAsync(e => e.Id == request.EmployeeId && !e.IsDeleted && e.IsActive);

        if (!employee)
            return NotFound(new { error = "Employee not found." });

        // Validate template
        var template = await _context.OnboardingTemplates
            .Include(t => t.Tasks.Where(task => !task.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == request.OnboardingTemplateId && !t.IsDeleted && t.IsActive);

        if (template == null)
            return NotFound(new { error = "Onboarding template not found." });

        var activeTasks = template.Tasks.Where(t => !t.IsDeleted).ToList();

        var process = new OnboardingProcess
        {
            EmployeeId = request.EmployeeId,
            OnboardingTemplateId = request.OnboardingTemplateId,
            StartDate = request.StartDate,
            ExpectedCompletionDate = request.StartDate.AddDays(activeTasks.Any()
                ? activeTasks.Max(t => t.DueDaysAfterJoining)
                : 30),
            Status = OnboardingStatus.InProgress,
            BuddyEmployeeId = request.BuddyEmployeeId,
            MentorEmployeeId = request.MentorEmployeeId,
            TotalTasks = activeTasks.Count,
            CompletedTasks = 0,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.OnboardingProcesses.Add(process);
        await _context.SaveChangesAsync();

        // Create tasks from template
        foreach (var templateTask in activeTasks.OrderBy(t => t.DisplayOrder))
        {
            var task = new OnboardingTask
            {
                OnboardingProcessId = process.Id,
                OnboardingTemplateTaskId = templateTask.Id,
                TaskName = templateTask.TaskName,
                TaskNameAr = templateTask.TaskNameAr,
                Description = templateTask.Description,
                Category = templateTask.Category,
                DueDate = request.StartDate.AddDays(templateTask.DueDaysAfterJoining),
                IsRequired = templateTask.IsRequired,
                Priority = templateTask.Priority,
                Status = OnboardingTaskStatus.Pending,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };
            _context.OnboardingTasks.Add(task);
        }

        await _context.SaveChangesAsync();

        return Ok(new { id = process.Id, taskCount = activeTasks.Count });
    }

    /// <summary>Marks an onboarding process as complete (only if all required tasks are done).</summary>
    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(long id)
    {
        var process = await _context.OnboardingProcesses
            .Include(p => p.Tasks.Where(t => !t.IsDeleted))
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (process == null)
            return NotFound(new { error = "Onboarding process not found." });

        if (process.Status == OnboardingStatus.Completed)
            return BadRequest(new { error = "Process is already completed." });

        // Check all required tasks are completed or skipped
        var pendingRequired = process.Tasks
            .Where(t => t.IsRequired && t.Status != OnboardingTaskStatus.Completed && t.Status != OnboardingTaskStatus.Skipped)
            .ToList();

        if (pendingRequired.Any())
            return BadRequest(new
            {
                error = $"Cannot complete: {pendingRequired.Count} required task(s) are not yet completed.",
                pendingTasks = pendingRequired.Select(t => new { t.Id, t.TaskName, t.Status })
            });

        process.Status = OnboardingStatus.Completed;
        process.ActualCompletionDate = DateTime.UtcNow;
        process.ModifiedAtUtc = DateTime.UtcNow;
        process.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Onboarding process completed." });
    }

    /// <summary>Cancels an onboarding process.</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var process = await _context.OnboardingProcesses
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (process == null)
            return NotFound(new { error = "Onboarding process not found." });

        if (process.Status == OnboardingStatus.Completed || process.Status == OnboardingStatus.Cancelled)
            return BadRequest(new { error = "Cannot cancel a completed or already cancelled process." });

        process.Status = OnboardingStatus.Cancelled;
        process.ModifiedAtUtc = DateTime.UtcNow;
        process.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Onboarding process cancelled." });
    }

    /// <summary>Gets dashboard summary stats for onboarding.</summary>
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var query = _context.OnboardingProcesses.Where(p => !p.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(p => _currentUser.BranchIds.Contains(p.Employee.BranchId));

        var activeCount = await query.CountAsync(p => p.Status == OnboardingStatus.InProgress);
        var completedCount = await query.CountAsync(p => p.Status == OnboardingStatus.Completed);
        var notStartedCount = await query.CountAsync(p => p.Status == OnboardingStatus.NotStarted);

        var overdueTasks = await _context.OnboardingTasks
            .Where(t => !t.IsDeleted
                && t.Status == OnboardingTaskStatus.Pending
                && t.DueDate < DateTime.UtcNow
                && t.OnboardingProcess.Status == OnboardingStatus.InProgress)
            .CountAsync();

        return Ok(new
        {
            activeProcesses = activeCount,
            completedProcesses = completedCount,
            notStartedProcesses = notStartedCount,
            overdueTasks
        });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateOnboardingProcessRequest(
    long EmployeeId,
    long OnboardingTemplateId,
    DateTime StartDate,
    long? BuddyEmployeeId,
    long? MentorEmployeeId,
    string? Notes
);

public class OnboardingProcessListDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string TemplateName { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? ExpectedCompletionDate { get; set; }
    public DateTime? ActualCompletionDate { get; set; }
    public OnboardingStatus Status { get; set; }
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int ProgressPercentage { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class OnboardingProcessDetailDto : OnboardingProcessListDto
{
    public long OnboardingTemplateId { get; set; }
    public long? BuddyEmployeeId { get; set; }
    public string? BuddyEmployeeName { get; set; }
    public long? MentorEmployeeId { get; set; }
    public string? MentorEmployeeName { get; set; }
    public string? Notes { get; set; }
    public long? OfferLetterId { get; set; }
    public List<OnboardingTaskDto> Tasks { get; set; } = new();
    public List<OnboardingDocumentDto> Documents { get; set; } = new();
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}

public class OnboardingTaskDto
{
    public long Id { get; set; }
    public string TaskName { get; set; } = string.Empty;
    public string? TaskNameAr { get; set; }
    public string? Description { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public long? AssignedToEmployeeId { get; set; }
    public string? AssignedToEmployeeName { get; set; }
    public OnboardingTaskStatus Status { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public bool IsRequired { get; set; }
    public int Priority { get; set; }
    public string? Notes { get; set; }
}

public class OnboardingDocumentDto
{
    public long Id { get; set; }
    public string DocumentType { get; set; } = string.Empty;
    public string? DocumentTypeAr { get; set; }
    public string? DocumentName { get; set; }
    public bool IsRequired { get; set; }
    public DocumentCollectionStatus Status { get; set; }
    public string? FileUrl { get; set; }
    public DateTime? SubmittedDate { get; set; }
    public DateTime? VerifiedDate { get; set; }
    public string? RejectionReason { get; set; }
    public string? Notes { get; set; }
}
