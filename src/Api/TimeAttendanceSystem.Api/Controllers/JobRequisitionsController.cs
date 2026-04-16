using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Recruitment;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/job-requisitions")]
[Authorize]
public class JobRequisitionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public JobRequisitionsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists job requisitions with optional filters and pagination.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] long? departmentId,
        [FromQuery] RequisitionStatus? status,
        [FromQuery] RequisitionPriority? priority,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.JobRequisitions
            .Include(r => r.Branch)
            .Include(r => r.Department)
            .Include(r => r.JobGrade)
            .Where(r => !r.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(r => _currentUser.BranchIds.Contains(r.BranchId));

        if (branchId.HasValue)
            query = query.Where(r => r.BranchId == branchId.Value);
        if (departmentId.HasValue)
            query = query.Where(r => r.DepartmentId == departmentId.Value);
        if (status.HasValue)
            query = query.Where(r => r.Status == status.Value);
        if (priority.HasValue)
            query = query.Where(r => r.Priority == priority.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(r => r.JobTitle.Contains(search) || r.RequisitionNumber.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(r => r.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new JobRequisitionListDto
            {
                Id = r.Id,
                RequisitionNumber = r.RequisitionNumber,
                JobTitle = r.JobTitle,
                JobTitleAr = r.JobTitleAr,
                BranchId = r.BranchId,
                BranchName = r.Branch.Name,
                DepartmentId = r.DepartmentId,
                DepartmentName = r.Department.Name,
                JobGradeName = r.JobGrade != null ? r.JobGrade.Name : null,
                EmploymentType = r.EmploymentType,
                NumberOfPositions = r.NumberOfPositions,
                FilledPositions = r.FilledPositions,
                Priority = r.Priority,
                Status = r.Status,
                TargetHireDate = r.TargetHireDate,
                CreatedAtUtc = r.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a job requisition by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.JobRequisitions
            .Include(r => r.Branch)
            .Include(r => r.Department)
            .Include(r => r.JobGrade)
            .Include(r => r.RequestedByEmployee)
            .Include(r => r.ReplacingEmployee)
            .Where(r => r.Id == id && !r.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Job requisition not found." });

        return Ok(new JobRequisitionDetailDto
        {
            Id = item.Id,
            RequisitionNumber = item.RequisitionNumber,
            JobTitle = item.JobTitle,
            JobTitleAr = item.JobTitleAr,
            Description = item.Description,
            DescriptionAr = item.DescriptionAr,
            BranchId = item.BranchId,
            BranchName = item.Branch.Name,
            DepartmentId = item.DepartmentId,
            DepartmentName = item.Department.Name,
            JobGradeId = item.JobGradeId,
            JobGradeName = item.JobGrade?.Name,
            EmploymentType = item.EmploymentType,
            NumberOfPositions = item.NumberOfPositions,
            FilledPositions = item.FilledPositions,
            Priority = item.Priority,
            BudgetedSalaryMin = item.BudgetedSalaryMin,
            BudgetedSalaryMax = item.BudgetedSalaryMax,
            Currency = item.Currency,
            RequiredSkills = item.RequiredSkills,
            RequiredQualifications = item.RequiredQualifications,
            RequiredQualificationsAr = item.RequiredQualificationsAr,
            RequiredExperienceYears = item.RequiredExperienceYears,
            TargetHireDate = item.TargetHireDate,
            Justification = item.Justification,
            JustificationAr = item.JustificationAr,
            IsReplacement = item.IsReplacement,
            ReplacingEmployeeId = item.ReplacingEmployeeId,
            ReplacingEmployeeName = item.ReplacingEmployee != null ? item.ReplacingEmployee.FirstName + " " + item.ReplacingEmployee.LastName : null,
            RequestedByEmployeeId = item.RequestedByEmployeeId,
            RequestedByEmployeeName = item.RequestedByEmployee != null ? item.RequestedByEmployee.FirstName + " " + item.RequestedByEmployee.LastName : null,
            Status = item.Status,
            RejectionReason = item.RejectionReason,
            ApprovedByUserId = item.ApprovedByUserId,
            ApprovedAt = item.ApprovedAt,
            Notes = item.Notes,
            WorkflowInstanceId = item.WorkflowInstanceId,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new job requisition.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateJobRequisitionRequest request)
    {
        // Auto-generate requisition number
        var year = DateTime.UtcNow.Year;
        var count = await _context.JobRequisitions.CountAsync(r => r.CreatedAtUtc.Year == year) + 1;
        var requisitionNumber = $"REQ-{year}-{count:D4}";

        var entity = new JobRequisition
        {
            BranchId = request.BranchId,
            DepartmentId = request.DepartmentId,
            RequisitionNumber = requisitionNumber,
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            JobGradeId = request.JobGradeId,
            EmploymentType = request.EmploymentType,
            NumberOfPositions = request.NumberOfPositions,
            Priority = request.Priority,
            BudgetedSalaryMin = request.BudgetedSalaryMin,
            BudgetedSalaryMax = request.BudgetedSalaryMax,
            Currency = request.Currency ?? "SAR",
            RequiredSkills = request.RequiredSkills,
            RequiredQualifications = request.RequiredQualifications,
            RequiredQualificationsAr = request.RequiredQualificationsAr,
            RequiredExperienceYears = request.RequiredExperienceYears,
            TargetHireDate = request.TargetHireDate,
            Justification = request.Justification,
            JustificationAr = request.JustificationAr,
            IsReplacement = request.IsReplacement,
            ReplacingEmployeeId = request.ReplacingEmployeeId,
            RequestedByEmployeeId = request.RequestedByEmployeeId,
            Notes = request.Notes,
            Status = RequisitionStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.JobRequisitions.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, requisitionNumber = entity.RequisitionNumber });
    }

    /// <summary>Updates a job requisition (only if Draft).</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateJobRequisitionRequest request)
    {
        var entity = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job requisition not found." });

        if (entity.Status != RequisitionStatus.Draft)
            return BadRequest(new { error = "Can only update requisitions in Draft status." });

        entity.BranchId = request.BranchId;
        entity.DepartmentId = request.DepartmentId;
        entity.JobTitle = request.JobTitle;
        entity.JobTitleAr = request.JobTitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.JobGradeId = request.JobGradeId;
        entity.EmploymentType = request.EmploymentType;
        entity.NumberOfPositions = request.NumberOfPositions;
        entity.Priority = request.Priority;
        entity.BudgetedSalaryMin = request.BudgetedSalaryMin;
        entity.BudgetedSalaryMax = request.BudgetedSalaryMax;
        entity.Currency = request.Currency ?? "SAR";
        entity.RequiredSkills = request.RequiredSkills;
        entity.RequiredQualifications = request.RequiredQualifications;
        entity.RequiredQualificationsAr = request.RequiredQualificationsAr;
        entity.RequiredExperienceYears = request.RequiredExperienceYears;
        entity.TargetHireDate = request.TargetHireDate;
        entity.Justification = request.Justification;
        entity.JustificationAr = request.JustificationAr;
        entity.IsReplacement = request.IsReplacement;
        entity.ReplacingEmployeeId = request.ReplacingEmployeeId;
        entity.RequestedByEmployeeId = request.RequestedByEmployeeId;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Submits a requisition for approval.</summary>
    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(long id)
    {
        var entity = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job requisition not found." });

        if (entity.Status != RequisitionStatus.Draft)
            return BadRequest(new { error = "Can only submit requisitions in Draft status." });

        entity.Status = RequisitionStatus.PendingApproval;
        entity.SubmittedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Create WorkflowInstance if a workflow exists for this entity type
        var workflow = await _context.WorkflowDefinitions
            .Where(w => w.EntityType == WorkflowEntityType.JobRequisition && w.IsActive && !w.IsDeleted)
            .FirstOrDefaultAsync();

        if (workflow != null)
        {
            var instance = new Domain.Workflows.WorkflowInstance
            {
                WorkflowDefinitionId = workflow.Id,
                EntityType = WorkflowEntityType.JobRequisition,
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
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Requisition submitted for approval." });
    }

    /// <summary>Approves a pending requisition.</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job requisition not found." });

        if (entity.Status != RequisitionStatus.PendingApproval)
            return BadRequest(new { error = "Can only approve requisitions in PendingApproval status." });

        entity.Status = RequisitionStatus.Approved;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Requisition approved." });
    }

    /// <summary>Rejects a pending requisition.</summary>
    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectRequisitionRequest request)
    {
        var entity = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job requisition not found." });

        if (entity.Status != RequisitionStatus.PendingApproval)
            return BadRequest(new { error = "Can only reject requisitions in PendingApproval status." });

        entity.Status = RequisitionStatus.Rejected;
        entity.RejectionReason = request.Reason;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Requisition rejected." });
    }

    /// <summary>Cancels a requisition.</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var entity = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job requisition not found." });

        if (entity.Status == RequisitionStatus.Filled || entity.Status == RequisitionStatus.Cancelled)
            return BadRequest(new { error = "Cannot cancel a requisition that is already Filled or Cancelled." });

        entity.Status = RequisitionStatus.Cancelled;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Requisition cancelled." });
    }

    /// <summary>Soft-deletes a draft requisition.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.JobRequisitions
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job requisition not found." });

        if (entity.Status != RequisitionStatus.Draft)
            return BadRequest(new { error = "Can only delete requisitions in Draft status." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateJobRequisitionRequest(
    long BranchId,
    long DepartmentId,
    string JobTitle,
    string? JobTitleAr,
    string? Description,
    string? DescriptionAr,
    long? JobGradeId,
    JobEmploymentType EmploymentType,
    int NumberOfPositions,
    RequisitionPriority Priority,
    decimal? BudgetedSalaryMin,
    decimal? BudgetedSalaryMax,
    string? Currency,
    string? RequiredSkills,
    string? RequiredQualifications,
    string? RequiredQualificationsAr,
    int? RequiredExperienceYears,
    DateTime? TargetHireDate,
    string? Justification,
    string? JustificationAr,
    bool IsReplacement,
    long? ReplacingEmployeeId,
    long? RequestedByEmployeeId,
    string? Notes
);

public record UpdateJobRequisitionRequest(
    long BranchId,
    long DepartmentId,
    string JobTitle,
    string? JobTitleAr,
    string? Description,
    string? DescriptionAr,
    long? JobGradeId,
    JobEmploymentType EmploymentType,
    int NumberOfPositions,
    RequisitionPriority Priority,
    decimal? BudgetedSalaryMin,
    decimal? BudgetedSalaryMax,
    string? Currency,
    string? RequiredSkills,
    string? RequiredQualifications,
    string? RequiredQualificationsAr,
    int? RequiredExperienceYears,
    DateTime? TargetHireDate,
    string? Justification,
    string? JustificationAr,
    bool IsReplacement,
    long? ReplacingEmployeeId,
    long? RequestedByEmployeeId,
    string? Notes
);

public record RejectRequisitionRequest(string Reason);

public class JobRequisitionListDto
{
    public long Id { get; set; }
    public string RequisitionNumber { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long BranchId { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public long DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
    public string? JobGradeName { get; set; }
    public JobEmploymentType EmploymentType { get; set; }
    public int NumberOfPositions { get; set; }
    public int FilledPositions { get; set; }
    public RequisitionPriority Priority { get; set; }
    public RequisitionStatus Status { get; set; }
    public DateTime? TargetHireDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class JobRequisitionDetailDto : JobRequisitionListDto
{
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? JobGradeId { get; set; }
    public decimal? BudgetedSalaryMin { get; set; }
    public decimal? BudgetedSalaryMax { get; set; }
    public string? Currency { get; set; }
    public string? RequiredSkills { get; set; }
    public string? RequiredQualifications { get; set; }
    public string? RequiredQualificationsAr { get; set; }
    public int? RequiredExperienceYears { get; set; }
    public string? Justification { get; set; }
    public string? JustificationAr { get; set; }
    public bool IsReplacement { get; set; }
    public long? ReplacingEmployeeId { get; set; }
    public string? ReplacingEmployeeName { get; set; }
    public long? RequestedByEmployeeId { get; set; }
    public string? RequestedByEmployeeName { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
