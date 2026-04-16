using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Performance;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/pips")]
[Authorize]
[RequiresModuleEndpoint(SystemModule.Performance)]
public class PerformanceImprovementPlansController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public PerformanceImprovementPlansController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists performance improvement plans with optional filters.</summary>
    [HttpGet]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] PipStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.PerformanceImprovementPlans
            .Include(p => p.Employee)
            .Include(p => p.ManagerEmployee)
            .Where(p => !p.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(p => _currentUser.BranchIds.Contains(p.Employee.BranchId));

        if (employeeId.HasValue)
            query = query.Where(p => p.EmployeeId == employeeId.Value);
        if (status.HasValue)
            query = query.Where(p => p.Status == status.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(p => p.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PipListDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                ManagerEmployeeId = p.ManagerEmployeeId,
                ManagerName = p.ManagerEmployee.FirstName + " " + p.ManagerEmployee.LastName,
                PerformanceReviewId = p.PerformanceReviewId,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Status = p.Status,
                Reason = p.Reason,
                CreatedAtUtc = p.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a PIP by ID.</summary>
    [HttpGet("{id}")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.PerformanceImprovementPlans
            .Include(p => p.Employee)
            .Include(p => p.ManagerEmployee)
            .Include(p => p.PerformanceReview).ThenInclude(r => r!.ReviewCycle)
            .Where(p => p.Id == id && !p.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Performance improvement plan not found." });

        return Ok(new PipDetailDto
        {
            Id = item.Id,
            EmployeeId = item.EmployeeId,
            EmployeeName = item.Employee.FirstName + " " + item.Employee.LastName,
            ManagerEmployeeId = item.ManagerEmployeeId,
            ManagerName = item.ManagerEmployee.FirstName + " " + item.ManagerEmployee.LastName,
            PerformanceReviewId = item.PerformanceReviewId,
            ReviewCycleName = item.PerformanceReview?.ReviewCycle.Name,
            StartDate = item.StartDate,
            EndDate = item.EndDate,
            Reason = item.Reason,
            ReasonAr = item.ReasonAr,
            Goals = item.Goals,
            Milestones = item.Milestones,
            Status = item.Status,
            OutcomeNotes = item.OutcomeNotes,
            ApprovedByUserId = item.ApprovedByUserId,
            ApprovedAt = item.ApprovedAt,
            WorkflowInstanceId = item.WorkflowInstanceId,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new PIP.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePipRequest request)
    {
        var entity = new PerformanceImprovementPlan
        {
            EmployeeId = request.EmployeeId,
            ManagerEmployeeId = request.ManagerEmployeeId,
            PerformanceReviewId = request.PerformanceReviewId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Goals = request.Goals,
            Milestones = request.Milestones,
            Status = PipStatus.Draft,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.PerformanceImprovementPlans.Add(entity);
        await _context.SaveChangesAsync();

        // Check for workflow
        var workflow = await _context.WorkflowDefinitions
            .Where(w => w.EntityType == WorkflowEntityType.PerformanceImprovementPlan && w.IsActive && !w.IsDeleted)
            .FirstOrDefaultAsync();

        if (workflow != null)
        {
            var instance = new WorkflowInstance
            {
                WorkflowDefinitionId = workflow.Id,
                EntityType = WorkflowEntityType.PerformanceImprovementPlan,
                EntityId = entity.Id,
                Status = WorkflowStatus.Pending,
                RequestedByUserId = _currentUser.UserId ?? 0,
                RequestedAt = DateTime.UtcNow,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };
            _context.WorkflowInstances.Add(instance);
            await _context.SaveChangesAsync();

            entity.WorkflowInstanceId = instance.Id;
            await _context.SaveChangesAsync();
        }

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a PIP.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdatePipRequest request)
    {
        var entity = await _context.PerformanceImprovementPlans
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Performance improvement plan not found." });

        if (entity.Status != PipStatus.Draft && entity.Status != PipStatus.Active)
            return BadRequest(new { error = "Can only update PIPs in Draft or Active status." });

        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.Reason = request.Reason;
        entity.ReasonAr = request.ReasonAr;
        entity.Goals = request.Goals;
        entity.Milestones = request.Milestones;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Approves a PIP (activates it).</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.PerformanceImprovementPlans
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Performance improvement plan not found." });

        if (entity.Status != PipStatus.Draft)
            return BadRequest(new { error = "Can only approve PIPs in Draft status." });

        entity.Status = PipStatus.Active;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "PIP approved and activated." });
    }

    /// <summary>Extends a PIP's end date.</summary>
    [HttpPost("{id}/extend")]
    public async Task<IActionResult> Extend(long id, [FromBody] ExtendPipRequest request)
    {
        var entity = await _context.PerformanceImprovementPlans
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Performance improvement plan not found." });

        if (entity.Status != PipStatus.Active)
            return BadRequest(new { error = "Can only extend active PIPs." });

        if (request.NewEndDate <= entity.EndDate)
            return BadRequest(new { error = "New end date must be after the current end date." });

        entity.EndDate = request.NewEndDate;
        entity.Status = PipStatus.Extended;
        entity.OutcomeNotes = (entity.OutcomeNotes ?? "") + $"\nExtended to {request.NewEndDate:yyyy-MM-dd}. Reason: {request.Reason}";
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "PIP extended." });
    }

    /// <summary>Marks PIP as completed successfully.</summary>
    [HttpPost("{id}/complete-successful")]
    public async Task<IActionResult> CompleteSuccessful(long id, [FromBody] CompletePipRequest? request = null)
    {
        var entity = await _context.PerformanceImprovementPlans
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Performance improvement plan not found." });

        if (entity.Status != PipStatus.Active && entity.Status != PipStatus.Extended)
            return BadRequest(new { error = "Can only complete active or extended PIPs." });

        entity.Status = PipStatus.CompletedSuccessful;
        entity.OutcomeNotes = request?.OutcomeNotes ?? entity.OutcomeNotes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "PIP completed successfully." });
    }

    /// <summary>Marks PIP as completed unsuccessfully.</summary>
    [HttpPost("{id}/complete-unsuccessful")]
    public async Task<IActionResult> CompleteUnsuccessful(long id, [FromBody] CompletePipRequest? request = null)
    {
        var entity = await _context.PerformanceImprovementPlans
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Performance improvement plan not found." });

        if (entity.Status != PipStatus.Active && entity.Status != PipStatus.Extended)
            return BadRequest(new { error = "Can only complete active or extended PIPs." });

        entity.Status = PipStatus.CompletedUnsuccessful;
        entity.OutcomeNotes = request?.OutcomeNotes ?? entity.OutcomeNotes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "PIP completed as unsuccessful." });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreatePipRequest(
    long EmployeeId,
    long ManagerEmployeeId,
    long? PerformanceReviewId,
    DateTime StartDate,
    DateTime EndDate,
    string? Reason,
    string? ReasonAr,
    string? Goals,
    string? Milestones
);

public record UpdatePipRequest(
    DateTime StartDate,
    DateTime EndDate,
    string? Reason,
    string? ReasonAr,
    string? Goals,
    string? Milestones
);

public record ExtendPipRequest(DateTime NewEndDate, string? Reason);
public record CompletePipRequest(string? OutcomeNotes);

public class PipListDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public long ManagerEmployeeId { get; set; }
    public string ManagerName { get; set; } = string.Empty;
    public long? PerformanceReviewId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public PipStatus Status { get; set; }
    public string? Reason { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class PipDetailDto : PipListDto
{
    public string? ReviewCycleName { get; set; }
    public string? ReasonAr { get; set; }
    public string? Goals { get; set; }
    public string? Milestones { get; set; }
    public string? OutcomeNotes { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
