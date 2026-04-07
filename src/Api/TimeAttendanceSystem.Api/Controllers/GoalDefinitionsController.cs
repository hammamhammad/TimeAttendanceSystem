using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/goals")]
[Authorize]
public class GoalDefinitionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GoalDefinitionsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists goals with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] long? reviewId,
        [FromQuery] GoalStatus? status,
        [FromQuery] GoalType? goalType,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.GoalDefinitions
            .Include(g => g.Employee)
            .Where(g => !g.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(g => _currentUser.BranchIds.Contains(g.Employee.BranchId));

        if (employeeId.HasValue)
            query = query.Where(g => g.EmployeeId == employeeId.Value);
        if (reviewId.HasValue)
            query = query.Where(g => g.PerformanceReviewId == reviewId.Value);
        if (status.HasValue)
            query = query.Where(g => g.Status == status.Value);
        if (goalType.HasValue)
            query = query.Where(g => g.GoalType == goalType.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(g => g.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(g => new GoalDefinitionListDto
            {
                Id = g.Id,
                PerformanceReviewId = g.PerformanceReviewId,
                EmployeeId = g.EmployeeId,
                EmployeeName = g.Employee.FirstName + " " + g.Employee.LastName,
                Title = g.Title,
                TitleAr = g.TitleAr,
                GoalType = g.GoalType,
                Weight = g.Weight,
                Priority = g.Priority,
                DueDate = g.DueDate,
                Status = g.Status,
                ProgressPercentage = g.ProgressPercentage,
                SelfRating = g.SelfRating,
                ManagerRating = g.ManagerRating,
                CreatedAtUtc = g.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a goal by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.GoalDefinitions
            .Include(g => g.Employee)
            .Include(g => g.PerformanceReview).ThenInclude(r => r!.ReviewCycle)
            .Where(g => g.Id == id && !g.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Goal not found." });

        return Ok(new GoalDefinitionDetailDto
        {
            Id = item.Id,
            PerformanceReviewId = item.PerformanceReviewId,
            CycleName = item.PerformanceReview?.ReviewCycle.Name,
            EmployeeId = item.EmployeeId,
            EmployeeName = item.Employee.FirstName + " " + item.Employee.LastName,
            Title = item.Title,
            TitleAr = item.TitleAr,
            Description = item.Description,
            DescriptionAr = item.DescriptionAr,
            GoalType = item.GoalType,
            TargetValue = item.TargetValue,
            CurrentValue = item.CurrentValue,
            Unit = item.Unit,
            Weight = item.Weight,
            Priority = item.Priority,
            DueDate = item.DueDate,
            Status = item.Status,
            SelfRating = item.SelfRating,
            ManagerRating = item.ManagerRating,
            SelfComments = item.SelfComments,
            ManagerComments = item.ManagerComments,
            ProgressPercentage = item.ProgressPercentage,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new goal.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateGoalRequest request)
    {
        var entity = new GoalDefinition
        {
            PerformanceReviewId = request.PerformanceReviewId,
            EmployeeId = request.EmployeeId,
            Title = request.Title,
            TitleAr = request.TitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            GoalType = request.GoalType,
            TargetValue = request.TargetValue,
            Unit = request.Unit,
            Weight = request.Weight,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Status = GoalStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.GoalDefinitions.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a goal.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateGoalRequest request)
    {
        var entity = await _context.GoalDefinitions
            .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Goal not found." });

        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.GoalType = request.GoalType;
        entity.TargetValue = request.TargetValue;
        entity.Unit = request.Unit;
        entity.Weight = request.Weight;
        entity.Priority = request.Priority;
        entity.DueDate = request.DueDate;
        entity.Status = request.Status;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Updates progress for a goal (CurrentValue and ProgressPercentage).</summary>
    [HttpPost("{id}/update-progress")]
    public async Task<IActionResult> UpdateProgress(long id, [FromBody] UpdateGoalProgressRequest request)
    {
        var entity = await _context.GoalDefinitions
            .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Goal not found." });

        entity.CurrentValue = request.CurrentValue;
        entity.ProgressPercentage = request.ProgressPercentage;

        // Auto-update status based on progress
        if (request.ProgressPercentage >= 100)
            entity.Status = GoalStatus.Completed;
        else if (request.ProgressPercentage > 0 && entity.Status == GoalStatus.Draft)
            entity.Status = GoalStatus.InProgress;

        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Goal progress updated.", status = entity.Status });
    }

    /// <summary>Soft-deletes a goal.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.GoalDefinitions
            .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Goal not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Gets current employee's own goals (self-service).</summary>
    [HttpGet("my-goals")]
    public async Task<IActionResult> GetMyGoals(
        [FromQuery] GoalStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var employeeLink = await _context.EmployeeUserLinks
            .Where(l => l.UserId == _currentUser.UserId)
            .Select(l => l.EmployeeId)
            .FirstOrDefaultAsync();

        if (employeeLink == 0)
            return Ok(new { data = new List<object>(), totalCount = 0, pageNumber = page, pageSize });

        var query = _context.GoalDefinitions
            .Where(g => !g.IsDeleted && g.EmployeeId == employeeLink);

        if (status.HasValue)
            query = query.Where(g => g.Status == status.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(g => g.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(g => new GoalDefinitionListDto
            {
                Id = g.Id,
                PerformanceReviewId = g.PerformanceReviewId,
                EmployeeId = g.EmployeeId,
                EmployeeName = "",
                Title = g.Title,
                TitleAr = g.TitleAr,
                GoalType = g.GoalType,
                Weight = g.Weight,
                Priority = g.Priority,
                DueDate = g.DueDate,
                Status = g.Status,
                ProgressPercentage = g.ProgressPercentage,
                SelfRating = g.SelfRating,
                ManagerRating = g.ManagerRating,
                CreatedAtUtc = g.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateGoalRequest(
    long? PerformanceReviewId,
    long EmployeeId,
    string Title,
    string? TitleAr,
    string? Description,
    string? DescriptionAr,
    GoalType GoalType,
    string? TargetValue,
    string? Unit,
    decimal Weight,
    GoalPriority Priority,
    DateTime? DueDate
);

public record UpdateGoalRequest(
    string Title,
    string? TitleAr,
    string? Description,
    string? DescriptionAr,
    GoalType GoalType,
    string? TargetValue,
    string? Unit,
    decimal Weight,
    GoalPriority Priority,
    DateTime? DueDate,
    GoalStatus Status
);

public record UpdateGoalProgressRequest(
    string CurrentValue,
    int ProgressPercentage
);

public class GoalDefinitionListDto
{
    public long Id { get; set; }
    public long? PerformanceReviewId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public GoalType GoalType { get; set; }
    public decimal Weight { get; set; }
    public GoalPriority Priority { get; set; }
    public DateTime? DueDate { get; set; }
    public GoalStatus Status { get; set; }
    public int ProgressPercentage { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class GoalDefinitionDetailDto : GoalDefinitionListDto
{
    public string? CycleName { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? TargetValue { get; set; }
    public string? CurrentValue { get; set; }
    public string? Unit { get; set; }
    public string? SelfComments { get; set; }
    public string? ManagerComments { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
