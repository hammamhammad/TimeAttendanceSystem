using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/onboarding-templates")]
[Authorize]
public class OnboardingTemplatesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public OnboardingTemplatesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists onboarding templates with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? departmentId,
        [FromQuery] long? branchId,
        [FromQuery] bool? isActive,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.OnboardingTemplates
            .Include(t => t.Department)
            .Include(t => t.Branch)
            .Where(t => !t.IsDeleted);

        if (departmentId.HasValue)
            query = query.Where(t => t.DepartmentId == departmentId.Value);
        if (branchId.HasValue)
            query = query.Where(t => t.BranchId == branchId.Value);
        if (isActive.HasValue)
            query = query.Where(t => t.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(t => t.Name.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(t => t.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new OnboardingTemplateListDto
            {
                Id = t.Id,
                Name = t.Name,
                NameAr = t.NameAr,
                Description = t.Description,
                DepartmentId = t.DepartmentId,
                DepartmentName = t.Department != null ? t.Department.Name : null,
                BranchId = t.BranchId,
                BranchName = t.Branch != null ? t.Branch.Name : null,
                IsActive = t.IsActive,
                IsDefault = t.IsDefault,
                TaskCount = t.Tasks.Count(task => !task.IsDeleted),
                CreatedAtUtc = t.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets an onboarding template by ID with tasks.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.OnboardingTemplates
            .Include(t => t.Department)
            .Include(t => t.Branch)
            .Include(t => t.Tasks.Where(task => !task.IsDeleted).OrderBy(task => task.DisplayOrder))
            .Where(t => t.Id == id && !t.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Onboarding template not found." });

        return Ok(new OnboardingTemplateDetailDto
        {
            Id = item.Id,
            Name = item.Name,
            NameAr = item.NameAr,
            Description = item.Description,
            DescriptionAr = item.DescriptionAr,
            DepartmentId = item.DepartmentId,
            DepartmentName = item.Department?.Name,
            BranchId = item.BranchId,
            BranchName = item.Branch?.Name,
            IsActive = item.IsActive,
            IsDefault = item.IsDefault,
            Tasks = item.Tasks.Select(task => new OnboardingTemplateTaskDto
            {
                Id = task.Id,
                TaskName = task.TaskName,
                TaskNameAr = task.TaskNameAr,
                Description = task.Description,
                DescriptionAr = task.DescriptionAr,
                Category = task.Category,
                DueDaysAfterJoining = task.DueDaysAfterJoining,
                Priority = task.Priority,
                DisplayOrder = task.DisplayOrder,
                IsRequired = task.IsRequired
            }).ToList(),
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new onboarding template with tasks.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOnboardingTemplateRequest request)
    {
        var entity = new OnboardingTemplate
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            DepartmentId = request.DepartmentId,
            BranchId = request.BranchId,
            IsActive = request.IsActive,
            IsDefault = request.IsDefault,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        // Add template tasks
        if (request.Tasks != null)
        {
            var order = 1;
            foreach (var taskReq in request.Tasks)
            {
                entity.Tasks.Add(new OnboardingTemplateTask
                {
                    TaskName = taskReq.TaskName,
                    TaskNameAr = taskReq.TaskNameAr,
                    Description = taskReq.Description,
                    DescriptionAr = taskReq.DescriptionAr,
                    Category = taskReq.Category,
                    DueDaysAfterJoining = taskReq.DueDaysAfterJoining,
                    Priority = taskReq.Priority,
                    DisplayOrder = taskReq.DisplayOrder ?? order++,
                    IsRequired = taskReq.IsRequired,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                });
            }
        }

        _context.OnboardingTemplates.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an onboarding template and its tasks.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateOnboardingTemplateRequest request)
    {
        var entity = await _context.OnboardingTemplates
            .Include(t => t.Tasks.Where(task => !task.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Onboarding template not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.DepartmentId = request.DepartmentId;
        entity.BranchId = request.BranchId;
        entity.IsActive = request.IsActive;
        entity.IsDefault = request.IsDefault;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Update tasks: soft-delete existing, add new ones
        if (request.Tasks != null)
        {
            // Soft-delete all existing tasks
            foreach (var existing in entity.Tasks)
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
            }

            // Add new tasks
            var order = 1;
            foreach (var taskReq in request.Tasks)
            {
                var newTask = new OnboardingTemplateTask
                {
                    OnboardingTemplateId = entity.Id,
                    TaskName = taskReq.TaskName,
                    TaskNameAr = taskReq.TaskNameAr,
                    Description = taskReq.Description,
                    DescriptionAr = taskReq.DescriptionAr,
                    Category = taskReq.Category,
                    DueDaysAfterJoining = taskReq.DueDaysAfterJoining,
                    Priority = taskReq.Priority,
                    DisplayOrder = taskReq.DisplayOrder ?? order++,
                    IsRequired = taskReq.IsRequired,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                };
                _context.OnboardingTemplateTasks.Add(newTask);
            }
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Soft-deletes an onboarding template.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.OnboardingTemplates
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Onboarding template not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Toggles the active status of a template.</summary>
    [HttpPost("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(long id)
    {
        var entity = await _context.OnboardingTemplates
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Onboarding template not found." });

        entity.IsActive = !entity.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { isActive = entity.IsActive });
    }

    /// <summary>Gets templates for dropdown/select components.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown([FromQuery] long? departmentId, [FromQuery] long? branchId)
    {
        var query = _context.OnboardingTemplates
            .Where(t => !t.IsDeleted && t.IsActive);

        if (departmentId.HasValue)
            query = query.Where(t => t.DepartmentId == departmentId.Value || t.DepartmentId == null);
        if (branchId.HasValue)
            query = query.Where(t => t.BranchId == branchId.Value || t.BranchId == null);

        var items = await query
            .OrderBy(t => t.Name)
            .Select(t => new { t.Id, t.Name, t.NameAr, t.IsDefault })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateOnboardingTemplateTaskRequest(
    string TaskName,
    string? TaskNameAr,
    string? Description,
    string? DescriptionAr,
    OnboardingTaskCategory Category,
    int DueDaysAfterJoining,
    int Priority,
    int? DisplayOrder,
    bool IsRequired
);

public record CreateOnboardingTemplateRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? DepartmentId,
    long? BranchId,
    bool IsActive,
    bool IsDefault,
    List<CreateOnboardingTemplateTaskRequest>? Tasks
);

public record UpdateOnboardingTemplateRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? DepartmentId,
    long? BranchId,
    bool IsActive,
    bool IsDefault,
    List<CreateOnboardingTemplateTaskRequest>? Tasks
);

public class OnboardingTemplateListDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public long? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public bool IsActive { get; set; }
    public bool IsDefault { get; set; }
    public int TaskCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class OnboardingTemplateDetailDto : OnboardingTemplateListDto
{
    public string? DescriptionAr { get; set; }
    public List<OnboardingTemplateTaskDto> Tasks { get; set; } = new();
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}

public class OnboardingTemplateTaskDto
{
    public long Id { get; set; }
    public string TaskName { get; set; } = string.Empty;
    public string? TaskNameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public int DueDaysAfterJoining { get; set; }
    public int Priority { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsRequired { get; set; }
}
