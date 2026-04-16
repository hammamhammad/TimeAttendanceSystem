using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.EmployeeRelations;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/disciplinary-actions")]
[Authorize]
public class DisciplinaryActionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly INotificationRecipientResolver _recipientResolver;

    public DisciplinaryActionsController(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        INotificationRecipientResolver recipientResolver)
    {
        _context = context;
        _currentUser = currentUser;
        _recipientResolver = recipientResolver;
    }

    private bool CanViewConfidential()
    {
        return _currentUser.Roles.Any(r => r is "SystemAdmin" or "Admin" or "HR");
    }

    /// <summary>Lists disciplinary actions with optional filters. Confidential records filtered.</summary>
    [HttpGet]
    [Authorize(Policy = "DisciplinaryActionRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] DisciplinaryActionStatus? status = null,
        [FromQuery] DisciplinaryActionType? actionType = null,
        [FromQuery] DisciplinarySeverity? severity = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var canViewConf = CanViewConfidential();

        var query = _context.DisciplinaryActions.AsNoTracking().AsQueryable();

        // Confidentiality filter
        if (!canViewConf)
            query = query.Where(x => !x.IsConfidential);

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (actionType.HasValue) query = query.Where(x => x.ActionType == actionType.Value);
        if (severity.HasValue) query = query.Where(x => x.Severity == severity.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.ActionNumber.Contains(search) || x.Subject.Contains(search) || (x.SubjectAr != null && x.SubjectAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.ActionNumber,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                ActionType = x.ActionType.ToString(),
                Severity = x.Severity.ToString(),
                x.Subject,
                x.SubjectAr,
                Status = x.Status.ToString(),
                x.IsConfidential,
                x.IncidentDate,
                x.ActionDate,
                x.EndDate,
                x.AcknowledgedByEmployee,
                x.AppealSubmitted,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single disciplinary action by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "DisciplinaryActionRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.DisciplinaryActions.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.ActionNumber,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                ActionType = x.ActionType.ToString(),
                Severity = x.Severity.ToString(),
                x.Subject,
                x.SubjectAr,
                x.Description,
                x.DescriptionAr,
                Status = x.Status.ToString(),
                x.IsConfidential,
                x.IncidentDate,
                x.ActionDate,
                x.EndDate,
                x.IssuedByUserId,
                x.AcknowledgedByEmployee,
                x.AcknowledgedAt,
                x.AppealSubmitted,
                x.AppealNotes,
                x.AppealDate,
                x.AppealResolvedDate,
                x.AppealOutcome,
                x.RelatedGrievanceId,
                RelatedGrievanceNumber = x.RelatedGrievance != null ? x.RelatedGrievance.GrievanceNumber : (string?)null,
                x.RelatedInvestigationId,
                RelatedInvestigationNumber = x.RelatedInvestigation != null ? x.RelatedInvestigation.InvestigationNumber : (string?)null,
                x.RelatedTerminationId,
                x.WorkflowInstanceId,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy,
                Attachments = x.DisciplinaryAttachments.Where(a => !a.IsDeleted).Select(a => new
                {
                    a.Id,
                    a.FileAttachmentId,
                    a.FileAttachment.OriginalFileName,
                    a.FileAttachment.StoredFileName,
                    a.FileAttachment.ContentType,
                    a.FileAttachment.FileSize,
                    a.CreatedAtUtc
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Disciplinary action not found." });

        // Confidentiality check
        if (item.IsConfidential && !CanViewConfidential())
            return Forbid();

        return Ok(item);
    }

    /// <summary>Gets a disciplinary summary for an employee.</summary>
    [HttpGet("employee/{employeeId}/summary")]
    [Authorize(Policy = "DisciplinaryActionRead")]
    public async Task<IActionResult> GetEmployeeSummary(long employeeId)
    {
        var canViewConf = CanViewConfidential();

        var query = _context.DisciplinaryActions.AsNoTracking()
            .Where(x => x.EmployeeId == employeeId);

        if (!canViewConf)
            query = query.Where(x => !x.IsConfidential);

        var actions = await query.ToListAsync();

        var summary = new
        {
            employeeId,
            totalActions = actions.Count,
            byType = actions.GroupBy(a => a.ActionType.ToString()).Select(g => new { type = g.Key, count = g.Count() }),
            bySeverity = actions.GroupBy(a => a.Severity.ToString()).Select(g => new { severity = g.Key, count = g.Count() }),
            byStatus = actions.GroupBy(a => a.Status.ToString()).Select(g => new { status = g.Key, count = g.Count() }),
            activeActions = actions.Count(a => a.Status != DisciplinaryActionStatus.Completed && a.Status != DisciplinaryActionStatus.Cancelled),
            pendingAcknowledgment = actions.Count(a => !a.AcknowledgedByEmployee && a.Status == DisciplinaryActionStatus.Approved),
            pendingAppeals = actions.Count(a => a.AppealSubmitted && a.AppealResolvedDate == null)
        };

        return Ok(summary);
    }

    /// <summary>Creates a new disciplinary action with auto-generated number.</summary>
    [HttpPost]
    [Authorize(Policy = "DisciplinaryActionManagement")]
    public async Task<IActionResult> Create([FromBody] CreateDisciplinaryActionRequest request)
    {
        // Generate auto-number
        var lastNumber = await _context.DisciplinaryActions
            .IgnoreQueryFilters()
            .OrderByDescending(x => x.Id)
            .Select(x => x.ActionNumber)
            .FirstOrDefaultAsync();

        var nextSeq = 1;
        if (!string.IsNullOrEmpty(lastNumber) && lastNumber.StartsWith("DA-"))
        {
            if (int.TryParse(lastNumber.Substring(3), out var parsed)) nextSeq = parsed + 1;
        }
        var actionNumber = $"DA-{nextSeq:D6}";

        var entity = new DisciplinaryAction
        {
            ActionNumber = actionNumber,
            EmployeeId = request.EmployeeId,
            ActionType = request.ActionType,
            Severity = request.Severity,
            Subject = request.Subject,
            SubjectAr = request.SubjectAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Status = DisciplinaryActionStatus.Draft,
            IncidentDate = request.IncidentDate,
            ActionDate = request.ActionDate,
            EndDate = request.EndDate,
            IsConfidential = request.IsConfidential,
            RelatedGrievanceId = request.RelatedGrievanceId,
            RelatedInvestigationId = request.RelatedInvestigationId,
            IssuedByUserId = _currentUser.UserId!.Value,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.DisciplinaryActions.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id, actionNumber });
    }

    /// <summary>Updates an existing disciplinary action.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "DisciplinaryActionManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateDisciplinaryActionRequest request)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        if (entity.Status != DisciplinaryActionStatus.Draft)
            return BadRequest(new { error = "Only draft disciplinary actions can be edited." });

        entity.ActionType = request.ActionType;
        entity.Severity = request.Severity;
        entity.Subject = request.Subject;
        entity.SubjectAr = request.SubjectAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.IncidentDate = request.IncidentDate;
        entity.ActionDate = request.ActionDate;
        entity.EndDate = request.EndDate;
        entity.IsConfidential = request.IsConfidential;
        entity.RelatedGrievanceId = request.RelatedGrievanceId;
        entity.RelatedInvestigationId = request.RelatedInvestigationId;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Disciplinary action updated." });
    }

    /// <summary>Approves a disciplinary action (moves from Pending to Approved).</summary>
    [HttpPost("{id}/approve")]
    [Authorize(Policy = "DisciplinaryActionManagement")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        if (entity.Status != DisciplinaryActionStatus.Pending)
            return BadRequest(new { error = "Only pending disciplinary actions can be approved." });

        entity.Status = DisciplinaryActionStatus.Approved;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify employee
        var empLink = await _context.EmployeeUserLinks.FirstOrDefaultAsync(eul => eul.EmployeeId == entity.EmployeeId);
        if (empLink != null)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = empLink.UserId,
                Type = NotificationType.RequestApproved,
                TitleEn = "Disciplinary Action Issued",
                TitleAr = "صدر إجراء تأديبي",
                MessageEn = $"Disciplinary action {entity.ActionNumber} has been approved and requires your acknowledgment.",
                MessageAr = $"تم اعتماد الإجراء التأديبي {entity.ActionNumber} ويتطلب إقرارك.",
                EntityType = "DisciplinaryAction",
                EntityId = entity.Id,
                IsRead = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Disciplinary action approved." });
    }

    /// <summary>Employee acknowledges a disciplinary action.</summary>
    [HttpPost("{id}/acknowledge")]
    public async Task<IActionResult> Acknowledge(long id)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        if (entity.Status != DisciplinaryActionStatus.Approved)
            return BadRequest(new { error = "Only approved disciplinary actions can be acknowledged." });

        // Verify the current user is the employee
        var empLink = await _context.EmployeeUserLinks.FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
        if (empLink == null || empLink.EmployeeId != entity.EmployeeId)
        {
            // Allow HR/Admin to also acknowledge
            if (!CanViewConfidential())
                return Forbid();
        }

        entity.AcknowledgedByEmployee = true;
        entity.AcknowledgedAt = DateTime.UtcNow;
        entity.Status = DisciplinaryActionStatus.Acknowledged;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Disciplinary action acknowledged." });
    }

    /// <summary>Employee submits an appeal for a disciplinary action.</summary>
    [HttpPost("{id}/appeal")]
    public async Task<IActionResult> Appeal(long id, [FromBody] AppealDisciplinaryActionRequest request)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        if (entity.Status != DisciplinaryActionStatus.Acknowledged && entity.Status != DisciplinaryActionStatus.Approved)
            return BadRequest(new { error = "Only acknowledged or approved disciplinary actions can be appealed." });

        // Verify the current user is the employee or HR
        var empLink = await _context.EmployeeUserLinks.FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
        if (empLink == null || empLink.EmployeeId != entity.EmployeeId)
        {
            if (!CanViewConfidential())
                return Forbid();
        }

        entity.AppealSubmitted = true;
        entity.AppealNotes = request.AppealNotes;
        entity.AppealDate = DateTime.UtcNow;
        entity.Status = DisciplinaryActionStatus.Appealed;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync(new[] { "HR" });

        foreach (var hrUserId in hrUserIds)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = hrUserId,
                Type = NotificationType.RequestSubmitted,
                TitleEn = "Disciplinary Action Appeal",
                TitleAr = "استئناف إجراء تأديبي",
                MessageEn = $"An appeal has been submitted for disciplinary action {entity.ActionNumber}.",
                MessageAr = $"تم تقديم استئناف للإجراء التأديبي {entity.ActionNumber}.",
                EntityType = "DisciplinaryAction",
                EntityId = entity.Id,
                IsRead = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Appeal submitted." });
    }

    /// <summary>Resolves an appeal for a disciplinary action.</summary>
    [HttpPost("{id}/resolve-appeal")]
    [Authorize(Policy = "DisciplinaryActionManagement")]
    public async Task<IActionResult> ResolveAppeal(long id, [FromBody] ResolveAppealRequest request)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        if (entity.Status != DisciplinaryActionStatus.Appealed)
            return BadRequest(new { error = "Only appealed disciplinary actions can have appeal resolved." });

        entity.AppealResolvedDate = DateTime.UtcNow;
        entity.AppealOutcome = request.AppealOutcome;
        entity.Status = DisciplinaryActionStatus.AppealResolved;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify employee
        var empLink = await _context.EmployeeUserLinks.FirstOrDefaultAsync(eul => eul.EmployeeId == entity.EmployeeId);
        if (empLink != null)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = empLink.UserId,
                Type = NotificationType.RequestApproved,
                TitleEn = "Disciplinary Action Appeal Resolved",
                TitleAr = "تم حل استئناف الإجراء التأديبي",
                MessageEn = $"The appeal for disciplinary action {entity.ActionNumber} has been resolved.",
                MessageAr = $"تم حل الاستئناف للإجراء التأديبي {entity.ActionNumber}.",
                EntityType = "DisciplinaryAction",
                EntityId = entity.Id,
                IsRead = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Appeal resolved." });
    }

    /// <summary>Submits a draft disciplinary action for approval.</summary>
    [HttpPost("{id}/submit")]
    [Authorize(Policy = "DisciplinaryActionManagement")]
    public async Task<IActionResult> Submit(long id)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        if (entity.Status != DisciplinaryActionStatus.Draft)
            return BadRequest(new { error = "Only draft disciplinary actions can be submitted." });

        entity.Status = DisciplinaryActionStatus.Pending;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Disciplinary action submitted for approval." });
    }

    /// <summary>Soft deletes a disciplinary action.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "DisciplinaryActionManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.DisciplinaryActions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Disciplinary action not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Disciplinary action deleted." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateDisciplinaryActionRequest
{
    public long EmployeeId { get; set; }
    public DisciplinaryActionType ActionType { get; set; }
    public DisciplinarySeverity Severity { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public DateTime IncidentDate { get; set; }
    public DateTime ActionDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsConfidential { get; set; } = true;
    public long? RelatedGrievanceId { get; set; }
    public long? RelatedInvestigationId { get; set; }
    public string? Notes { get; set; }
}

public class UpdateDisciplinaryActionRequest
{
    public DisciplinaryActionType ActionType { get; set; }
    public DisciplinarySeverity Severity { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public DateTime IncidentDate { get; set; }
    public DateTime ActionDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsConfidential { get; set; } = true;
    public long? RelatedGrievanceId { get; set; }
    public long? RelatedInvestigationId { get; set; }
    public string? Notes { get; set; }
}

public class AppealDisciplinaryActionRequest
{
    public string AppealNotes { get; set; } = string.Empty;
}

public class ResolveAppealRequest
{
    public string AppealOutcome { get; set; } = string.Empty;
}
