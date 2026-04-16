using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.EmployeeRelations;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/investigations")]
[Authorize]
public class InvestigationsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly INotificationRecipientResolver _recipientResolver;

    public InvestigationsController(
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

    /// <summary>Lists investigations with optional filters. Confidential records filtered.</summary>
    [HttpGet]
    [Authorize(Policy = "InvestigationRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? subjectEmployeeId = null,
        [FromQuery] InvestigationStatus? status = null,
        [FromQuery] long? investigatorUserId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var canViewConf = CanViewConfidential();
        var userId = _currentUser.UserId;

        var query = _context.Investigations.AsNoTracking().AsQueryable();

        // Confidentiality filter: non-privileged users can only see non-confidential + where they are investigator
        if (!canViewConf)
            query = query.Where(x => !x.IsConfidential || x.InvestigatorUserId == userId);

        if (subjectEmployeeId.HasValue) query = query.Where(x => x.SubjectEmployeeId == subjectEmployeeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (investigatorUserId.HasValue) query = query.Where(x => x.InvestigatorUserId == investigatorUserId.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.InvestigationNumber.Contains(search) || x.Title.Contains(search) || (x.TitleAr != null && x.TitleAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.InvestigationNumber,
                x.SubjectEmployeeId,
                SubjectEmployeeName = x.SubjectEmployee.FullName,
                SubjectEmployeeNameAr = x.SubjectEmployee.FullNameAr,
                x.Title,
                x.TitleAr,
                Status = x.Status.ToString(),
                x.IsConfidential,
                x.InvestigatorUserId,
                x.RelatedGrievanceId,
                RelatedGrievanceNumber = x.RelatedGrievance != null ? x.RelatedGrievance.GrievanceNumber : (string?)null,
                x.StartDate,
                x.DueDate,
                x.CompletedDate,
                NoteCount = x.InvestigationNotes.Count(n => !n.IsDeleted),
                AttachmentCount = x.InvestigationAttachments.Count(a => !a.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single investigation by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "InvestigationRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Investigations.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.InvestigationNumber,
                x.SubjectEmployeeId,
                SubjectEmployeeName = x.SubjectEmployee.FullName,
                SubjectEmployeeNameAr = x.SubjectEmployee.FullNameAr,
                x.Title,
                x.TitleAr,
                x.Description,
                x.DescriptionAr,
                Status = x.Status.ToString(),
                x.IsConfidential,
                x.InvestigatorUserId,
                x.RelatedGrievanceId,
                RelatedGrievanceNumber = x.RelatedGrievance != null ? x.RelatedGrievance.GrievanceNumber : (string?)null,
                x.StartDate,
                x.DueDate,
                x.CompletedDate,
                x.Findings,
                x.FindingsAr,
                x.Recommendation,
                x.RecommendationAr,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy,
                Notes = x.InvestigationNotes.Where(n => !n.IsDeleted).OrderByDescending(n => n.CreatedAtUtc).Select(n => new
                {
                    n.Id,
                    n.AuthorUserId,
                    n.Content,
                    n.IsInternal,
                    n.CreatedAtUtc,
                    n.CreatedBy
                }).ToList(),
                Attachments = x.InvestigationAttachments.Where(a => !a.IsDeleted).Select(a => new
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

        if (item == null) return NotFound(new { error = "Investigation not found." });

        // Confidentiality check
        if (item.IsConfidential && !CanViewConfidential() && item.InvestigatorUserId != _currentUser.UserId)
            return Forbid();

        return Ok(item);
    }

    /// <summary>Creates a new investigation with auto-generated number.</summary>
    [HttpPost]
    [Authorize(Policy = "InvestigationManagement")]
    public async Task<IActionResult> Create([FromBody] CreateInvestigationRequest request)
    {
        // Generate auto-number
        var lastNumber = await _context.Investigations
            .IgnoreQueryFilters()
            .OrderByDescending(x => x.Id)
            .Select(x => x.InvestigationNumber)
            .FirstOrDefaultAsync();

        var nextSeq = 1;
        if (!string.IsNullOrEmpty(lastNumber) && lastNumber.StartsWith("INV-"))
        {
            if (int.TryParse(lastNumber.Substring(4), out var parsed)) nextSeq = parsed + 1;
        }
        var investigationNumber = $"INV-{nextSeq:D6}";

        var entity = new Investigation
        {
            InvestigationNumber = investigationNumber,
            SubjectEmployeeId = request.SubjectEmployeeId,
            Title = request.Title,
            TitleAr = request.TitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Status = InvestigationStatus.Open,
            IsConfidential = request.IsConfidential,
            InvestigatorUserId = request.InvestigatorUserId,
            RelatedGrievanceId = request.RelatedGrievanceId,
            StartDate = request.StartDate,
            DueDate = request.DueDate,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.Investigations.Add(entity);

        // Notify assigned investigator
        _context.Notifications.Add(new Notification
        {
            UserId = request.InvestigatorUserId,
            Type = NotificationType.ApprovalPending,
            TitleEn = "Investigation Assigned",
            TitleAr = "تم تعيين تحقيق",
            MessageEn = $"Investigation {investigationNumber} has been assigned to you.",
            MessageAr = $"تم تعيين التحقيق {investigationNumber} إليك.",
            EntityType = "Investigation",
            EntityId = entity.Id,
            IsRead = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        });

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id, investigationNumber });
    }

    /// <summary>Updates an existing investigation.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "InvestigationManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateInvestigationRequest request)
    {
        var entity = await _context.Investigations.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Investigation not found." });

        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.IsConfidential = request.IsConfidential;
        entity.RelatedGrievanceId = request.RelatedGrievanceId;
        entity.DueDate = request.DueDate;
        entity.Findings = request.Findings;
        entity.FindingsAr = request.FindingsAr;
        entity.Recommendation = request.Recommendation;
        entity.RecommendationAr = request.RecommendationAr;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Investigation updated." });
    }

    /// <summary>Assigns/reassigns an investigator.</summary>
    [HttpPost("{id}/assign")]
    [Authorize(Policy = "InvestigationManagement")]
    public async Task<IActionResult> Assign(long id, [FromBody] AssignInvestigationRequest request)
    {
        var entity = await _context.Investigations.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Investigation not found." });

        entity.InvestigatorUserId = request.InvestigatorUserId;
        if (entity.Status == InvestigationStatus.Open)
            entity.Status = InvestigationStatus.InProgress;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify newly assigned investigator
        _context.Notifications.Add(new Notification
        {
            UserId = request.InvestigatorUserId,
            Type = NotificationType.ApprovalPending,
            TitleEn = "Investigation Assigned",
            TitleAr = "تم تعيين تحقيق",
            MessageEn = $"Investigation {entity.InvestigationNumber} has been assigned to you.",
            MessageAr = $"تم تعيين التحقيق {entity.InvestigationNumber} إليك.",
            EntityType = "Investigation",
            EntityId = entity.Id,
            IsRead = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        });

        await _context.SaveChangesAsync();
        return Ok(new { message = "Investigation assigned." });
    }

    /// <summary>Completes an investigation with findings and recommendation.</summary>
    [HttpPost("{id}/complete")]
    [Authorize(Policy = "InvestigationManagement")]
    public async Task<IActionResult> Complete(long id, [FromBody] CompleteInvestigationRequest request)
    {
        var entity = await _context.Investigations.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Investigation not found." });

        if (entity.Status == InvestigationStatus.Completed || entity.Status == InvestigationStatus.Closed || entity.Status == InvestigationStatus.Cancelled)
            return BadRequest(new { error = "Investigation is already completed, closed, or cancelled." });

        entity.Findings = request.Findings;
        entity.FindingsAr = request.FindingsAr;
        entity.Recommendation = request.Recommendation;
        entity.RecommendationAr = request.RecommendationAr;
        entity.CompletedDate = DateTime.UtcNow;
        entity.Status = InvestigationStatus.Completed;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Notify HR users
        var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync(new[] { "HR" });

        foreach (var hrUserId in hrUserIds)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = hrUserId,
                Type = NotificationType.RequestApproved,
                TitleEn = "Investigation Completed",
                TitleAr = "اكتمل التحقيق",
                MessageEn = $"Investigation {entity.InvestigationNumber} has been completed.",
                MessageAr = $"اكتمل التحقيق {entity.InvestigationNumber}.",
                EntityType = "Investigation",
                EntityId = entity.Id,
                IsRead = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Investigation completed." });
    }

    /// <summary>Adds a note to an investigation.</summary>
    [HttpPost("{id}/notes")]
    [Authorize(Policy = "InvestigationManagement")]
    public async Task<IActionResult> AddNote(long id, [FromBody] AddInvestigationNoteRequest request)
    {
        var exists = await _context.Investigations.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound(new { error = "Investigation not found." });

        var note = new InvestigationNote
        {
            InvestigationId = id,
            AuthorUserId = _currentUser.UserId!.Value,
            Content = request.Content,
            IsInternal = request.IsInternal,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.InvestigationNotes.Add(note);
        await _context.SaveChangesAsync();

        return Ok(new { id = note.Id, message = "Note added." });
    }

    /// <summary>Gets notes for an investigation.</summary>
    [HttpGet("{id}/notes")]
    [Authorize(Policy = "InvestigationRead")]
    public async Task<IActionResult> GetNotes(long id)
    {
        var exists = await _context.Investigations.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound(new { error = "Investigation not found." });

        var notes = await _context.InvestigationNotes.AsNoTracking()
            .Where(x => x.InvestigationId == id)
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

    /// <summary>Soft deletes an investigation.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "InvestigationManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Investigations.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Investigation not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Investigation deleted." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateInvestigationRequest
{
    public long SubjectEmployeeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public bool IsConfidential { get; set; } = true;
    public long InvestigatorUserId { get; set; }
    public long? RelatedGrievanceId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? DueDate { get; set; }
}

public class UpdateInvestigationRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public bool IsConfidential { get; set; } = true;
    public long? RelatedGrievanceId { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Findings { get; set; }
    public string? FindingsAr { get; set; }
    public string? Recommendation { get; set; }
    public string? RecommendationAr { get; set; }
}

public class AssignInvestigationRequest
{
    public long InvestigatorUserId { get; set; }
}

public class CompleteInvestigationRequest
{
    public string Findings { get; set; } = string.Empty;
    public string? FindingsAr { get; set; }
    public string? Recommendation { get; set; }
    public string? RecommendationAr { get; set; }
}

public class AddInvestigationNoteRequest
{
    public string Content { get; set; } = string.Empty;
    public bool IsInternal { get; set; } = true;
}
