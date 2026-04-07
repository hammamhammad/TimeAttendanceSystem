using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.EmployeeRelations;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/grievances")]
[Authorize]
public class GrievancesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GrievancesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Helper: checks if current user can see confidential records.</summary>
    private bool CanViewConfidential()
    {
        return _currentUser.Roles.Any(r => r is "SystemAdmin" or "Admin" or "HR");
    }

    /// <summary>Helper: checks if a specific grievance is visible to the current user.</summary>
    private bool IsVisibleToUser(bool isConfidential, long? assignedToUserId, long? escalatedToUserId)
    {
        if (!isConfidential) return true;
        if (CanViewConfidential()) return true;
        if (assignedToUserId == _currentUser.UserId) return true;
        if (escalatedToUserId == _currentUser.UserId) return true;
        return false;
    }

    /// <summary>Lists grievances with optional filters. Confidential records filtered.</summary>
    [HttpGet]
    [Authorize(Policy = "GrievanceRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] GrievanceStatus? status = null,
        [FromQuery] GrievancePriority? priority = null,
        [FromQuery] GrievanceType? grievanceType = null,
        [FromQuery] bool? isConfidential = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var canViewConf = CanViewConfidential();
        var userId = _currentUser.UserId;

        var query = _context.Grievances.AsNoTracking().AsQueryable();

        // Confidentiality filter
        if (!canViewConf)
            query = query.Where(x => !x.IsConfidential || x.AssignedToUserId == userId || x.EscalatedToUserId == userId);

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (priority.HasValue) query = query.Where(x => x.Priority == priority.Value);
        if (grievanceType.HasValue) query = query.Where(x => x.GrievanceType == grievanceType.Value);
        if (isConfidential.HasValue) query = query.Where(x => x.IsConfidential == isConfidential.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.GrievanceNumber.Contains(search) || x.Subject.Contains(search) || (x.SubjectAr != null && x.SubjectAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.GrievanceNumber,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                GrievanceType = x.GrievanceType.ToString(),
                x.Subject,
                x.SubjectAr,
                Priority = x.Priority.ToString(),
                Status = x.Status.ToString(),
                x.IsConfidential,
                x.AssignedToUserId,
                x.AgainstEmployeeId,
                AgainstEmployeeName = x.AgainstEmployee != null ? x.AgainstEmployee.FullName : (string?)null,
                x.FiledDate,
                x.DueDate,
                x.ResolutionDate,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single grievance by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "GrievanceRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Grievances.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.GrievanceNumber,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                GrievanceType = x.GrievanceType.ToString(),
                x.Subject,
                x.SubjectAr,
                x.Description,
                x.DescriptionAr,
                Priority = x.Priority.ToString(),
                Status = x.Status.ToString(),
                x.IsConfidential,
                x.AssignedToUserId,
                x.AgainstEmployeeId,
                AgainstEmployeeName = x.AgainstEmployee != null ? x.AgainstEmployee.FullName : (string?)null,
                AgainstEmployeeNameAr = x.AgainstEmployee != null ? x.AgainstEmployee.FullNameAr : (string?)null,
                x.ResolutionSummary,
                x.ResolutionSummaryAr,
                x.ResolutionDate,
                x.FiledDate,
                x.DueDate,
                x.ClosedByUserId,
                x.EscalatedToUserId,
                x.EscalationDate,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy,
                Notes2 = x.GrievanceNotes.Where(n => !n.IsDeleted).OrderByDescending(n => n.CreatedAtUtc).Select(n => new
                {
                    n.Id,
                    n.AuthorUserId,
                    n.Content,
                    n.IsInternal,
                    n.CreatedAtUtc,
                    n.CreatedBy
                }).ToList(),
                Attachments = x.GrievanceAttachments.Where(a => !a.IsDeleted).Select(a => new
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

        if (item == null) return NotFound(new { error = "Grievance not found." });

        // Confidentiality check
        if (item.IsConfidential && !IsVisibleToUser(item.IsConfidential, item.AssignedToUserId, item.EscalatedToUserId))
            return Forbid();

        return Ok(item);
    }

    /// <summary>Gets grievances for the current employee (self-service).</summary>
    [HttpGet("my-grievances")]
    public async Task<IActionResult> GetMyGrievances(
        [FromQuery] GrievanceStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        if (!_currentUser.IsAuthenticated || _currentUser.UserId == null)
            return Unauthorized(new { error = "User not authenticated" });

        var employeeLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);
        if (employeeLink == null)
            return NotFound(new { error = "Employee profile not found for current user" });

        var query = _context.Grievances.AsNoTracking()
            .Where(x => x.EmployeeId == employeeLink.EmployeeId);

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

    /// <summary>Creates a new grievance with auto-generated number.</summary>
    [HttpPost]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Create([FromBody] CreateGrievanceRequest request)
    {
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
            EmployeeId = request.EmployeeId,
            GrievanceType = request.GrievanceType,
            Subject = request.Subject,
            SubjectAr = request.SubjectAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Priority = request.Priority,
            Status = GrievanceStatus.Filed,
            IsConfidential = request.IsConfidential,
            AssignedToUserId = request.AssignedToUserId,
            AgainstEmployeeId = request.AgainstEmployeeId,
            FiledDate = DateTime.UtcNow,
            DueDate = request.DueDate,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.Grievances.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id, grievanceNumber });
    }

    /// <summary>Updates an existing grievance.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateGrievanceRequest request)
    {
        var entity = await _context.Grievances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Grievance not found." });

        entity.GrievanceType = request.GrievanceType;
        entity.Subject = request.Subject;
        entity.SubjectAr = request.SubjectAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.Priority = request.Priority;
        entity.IsConfidential = request.IsConfidential;
        entity.AgainstEmployeeId = request.AgainstEmployeeId;
        entity.DueDate = request.DueDate;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Grievance updated." });
    }

    /// <summary>Assigns a grievance to a user for handling.</summary>
    [HttpPost("{id}/assign")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Assign(long id, [FromBody] AssignGrievanceRequest request)
    {
        var entity = await _context.Grievances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Grievance not found." });

        entity.AssignedToUserId = request.AssignedToUserId;
        entity.Status = GrievanceStatus.UnderReview;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify assigned user
        _context.Notifications.Add(new Notification
        {
            UserId = request.AssignedToUserId,
            Type = NotificationType.ApprovalPending,
            TitleEn = "Grievance Assigned",
            TitleAr = "تم تعيين شكوى",
            MessageEn = $"Grievance {entity.GrievanceNumber} has been assigned to you.",
            MessageAr = $"تم تعيين الشكوى {entity.GrievanceNumber} إليك.",
            EntityType = "Grievance",
            EntityId = entity.Id,
            IsRead = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        });

        await _context.SaveChangesAsync();
        return Ok(new { message = "Grievance assigned." });
    }

    /// <summary>Escalates a grievance to another user.</summary>
    [HttpPost("{id}/escalate")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Escalate(long id, [FromBody] EscalateGrievanceRequest request)
    {
        var entity = await _context.Grievances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Grievance not found." });

        entity.EscalatedToUserId = request.EscalatedToUserId;
        entity.EscalationDate = DateTime.UtcNow;
        entity.Status = GrievanceStatus.Escalated;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify escalated user
        _context.Notifications.Add(new Notification
        {
            UserId = request.EscalatedToUserId,
            Type = NotificationType.RequestEscalated,
            TitleEn = "Grievance Escalated",
            TitleAr = "تم تصعيد شكوى",
            MessageEn = $"Grievance {entity.GrievanceNumber} has been escalated to you.",
            MessageAr = $"تم تصعيد الشكوى {entity.GrievanceNumber} إليك.",
            EntityType = "Grievance",
            EntityId = entity.Id,
            IsRead = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        });

        await _context.SaveChangesAsync();
        return Ok(new { message = "Grievance escalated." });
    }

    /// <summary>Resolves a grievance.</summary>
    [HttpPost("{id}/resolve")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Resolve(long id, [FromBody] ResolveGrievanceRequest request)
    {
        var entity = await _context.Grievances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Grievance not found." });

        entity.Status = GrievanceStatus.Resolved;
        entity.ResolutionSummary = request.ResolutionSummary;
        entity.ResolutionSummaryAr = request.ResolutionSummaryAr;
        entity.ResolutionDate = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify the filing employee
        var empLink = await _context.EmployeeUserLinks.FirstOrDefaultAsync(eul => eul.EmployeeId == entity.EmployeeId);
        if (empLink != null)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = empLink.UserId,
                Type = NotificationType.RequestApproved,
                TitleEn = "Grievance Resolved",
                TitleAr = "تم حل الشكوى",
                MessageEn = $"Your grievance {entity.GrievanceNumber} has been resolved.",
                MessageAr = $"تم حل شكواك {entity.GrievanceNumber}.",
                EntityType = "Grievance",
                EntityId = entity.Id,
                IsRead = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Grievance resolved." });
    }

    /// <summary>Closes a grievance.</summary>
    [HttpPost("{id}/close")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Close(long id)
    {
        var entity = await _context.Grievances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Grievance not found." });

        entity.Status = GrievanceStatus.Closed;
        entity.ClosedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Grievance closed." });
    }

    /// <summary>Adds a note to a grievance.</summary>
    [HttpPost("{id}/notes")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> AddNote(long id, [FromBody] AddGrievanceNoteRequest request)
    {
        var exists = await _context.Grievances.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound(new { error = "Grievance not found." });

        var note = new GrievanceNote
        {
            GrievanceId = id,
            AuthorUserId = _currentUser.UserId!.Value,
            Content = request.Content,
            IsInternal = request.IsInternal,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.GrievanceNotes.Add(note);
        await _context.SaveChangesAsync();

        return Ok(new { id = note.Id, message = "Note added." });
    }

    /// <summary>Gets notes for a grievance.</summary>
    [HttpGet("{id}/notes")]
    [Authorize(Policy = "GrievanceRead")]
    public async Task<IActionResult> GetNotes(long id)
    {
        var exists = await _context.Grievances.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound(new { error = "Grievance not found." });

        var notes = await _context.GrievanceNotes.AsNoTracking()
            .Where(x => x.GrievanceId == id)
            .OrderByDescending(x => x.CreatedAtUtc)
            .Select(x => new
            {
                x.Id,
                x.AuthorUserId,
                x.Content,
                x.IsInternal,
                x.CreatedAtUtc,
                x.CreatedBy
            })
            .ToListAsync();

        return Ok(new { data = notes });
    }

    /// <summary>Soft deletes a grievance.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "GrievanceManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Grievances.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Grievance not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Grievance deleted." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateGrievanceRequest
{
    public long EmployeeId { get; set; }
    public GrievanceType GrievanceType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public GrievancePriority Priority { get; set; }
    public bool IsConfidential { get; set; }
    public long? AssignedToUserId { get; set; }
    public long? AgainstEmployeeId { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Notes { get; set; }
}

public class UpdateGrievanceRequest
{
    public GrievanceType GrievanceType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public GrievancePriority Priority { get; set; }
    public bool IsConfidential { get; set; }
    public long? AgainstEmployeeId { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Notes { get; set; }
}

public class AssignGrievanceRequest
{
    public long AssignedToUserId { get; set; }
}

public class EscalateGrievanceRequest
{
    public long EscalatedToUserId { get; set; }
}

public class ResolveGrievanceRequest
{
    public string ResolutionSummary { get; set; } = string.Empty;
    public string? ResolutionSummaryAr { get; set; }
}

public class AddGrievanceNoteRequest
{
    public string Content { get; set; } = string.Empty;
    public bool IsInternal { get; set; } = true;
}
