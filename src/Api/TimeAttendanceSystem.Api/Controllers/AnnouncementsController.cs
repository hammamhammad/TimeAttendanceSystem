using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Announcements;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/announcements")]
[Authorize]
public class AnnouncementsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AnnouncementsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists announcements with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "AnnouncementRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] AnnouncementStatus? status = null,
        [FromQuery] long? categoryId = null,
        [FromQuery] AnnouncementPriority? priority = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Announcements.AsNoTracking().AsQueryable();

        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (categoryId.HasValue) query = query.Where(x => x.AnnouncementCategoryId == categoryId.Value);
        if (priority.HasValue) query = query.Where(x => x.Priority == priority.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Title.Contains(search) || (x.TitleAr != null && x.TitleAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.IsPinned).ThenByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                Priority = x.Priority.ToString(),
                Status = x.Status.ToString(),
                TargetAudience = x.TargetAudience.ToString(),
                CategoryName = x.Category != null ? x.Category.Name : (string?)null,
                CategoryNameAr = x.Category != null ? x.Category.NameAr : (string?)null,
                x.IsPinned,
                x.RequiresAcknowledgment,
                x.PublishedAt,
                x.ScheduledPublishDate,
                x.ExpiryDate,
                x.CreatedAtUtc,
                AcknowledgmentCount = x.Acknowledgments.Count()
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single announcement by ID with acknowledgment stats and attachments.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "AnnouncementRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Announcements.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                x.Content,
                x.ContentAr,
                Priority = x.Priority.ToString(),
                Status = x.Status.ToString(),
                TargetAudience = x.TargetAudience.ToString(),
                x.TargetIds,
                x.AnnouncementCategoryId,
                CategoryName = x.Category != null ? x.Category.Name : (string?)null,
                CategoryNameAr = x.Category != null ? x.Category.NameAr : (string?)null,
                x.IsPinned,
                x.RequiresAcknowledgment,
                x.SendNotification,
                x.PublishedByUserId,
                x.PublishedAt,
                x.ScheduledPublishDate,
                x.ExpiryDate,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy,
                AcknowledgmentCount = x.Acknowledgments.Count(),
                Attachments = x.Attachments
                    .Where(a => !a.IsDeleted)
                    .OrderBy(a => a.SortOrder)
                    .Select(a => new
                    {
                        a.Id,
                        a.FileAttachmentId,
                        a.SortOrder,
                        FileName = a.FileAttachment.OriginalFileName,
                        StoredFileName = a.FileAttachment.StoredFileName,
                        ContentType = a.FileAttachment.ContentType,
                        FileSize = a.FileAttachment.FileSize
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Announcement not found." });
        return Ok(item);
    }

    /// <summary>Creates a new announcement.</summary>
    [HttpPost]
    [Authorize(Policy = "AnnouncementManagement")]
    public async Task<IActionResult> Create([FromBody] CreateAnnouncementRequest request)
    {
        var entity = new Announcement
        {
            Title = request.Title,
            TitleAr = request.TitleAr,
            Content = request.Content,
            ContentAr = request.ContentAr,
            Priority = request.Priority,
            Status = AnnouncementStatus.Draft,
            TargetAudience = request.TargetAudience,
            TargetIds = request.TargetIds,
            AnnouncementCategoryId = request.AnnouncementCategoryId,
            IsPinned = request.IsPinned,
            RequiresAcknowledgment = request.RequiresAcknowledgment,
            SendNotification = request.SendNotification,
            ScheduledPublishDate = request.ScheduledPublishDate,
            ExpiryDate = request.ExpiryDate,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.Announcements.Add(entity);
        await _context.SaveChangesAsync();

        // Add attachments if provided
        if (request.AttachmentFileIds != null && request.AttachmentFileIds.Any())
        {
            var sortOrder = 0;
            foreach (var fileId in request.AttachmentFileIds)
            {
                var attachment = new AnnouncementAttachment
                {
                    AnnouncementId = entity.Id,
                    FileAttachmentId = fileId,
                    SortOrder = sortOrder++,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                };
                _context.AnnouncementAttachments.Add(attachment);
            }
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing announcement (only if Draft or Scheduled).</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "AnnouncementManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAnnouncementRequest request)
    {
        var entity = await _context.Announcements
            .Include(x => x.Attachments)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return NotFound(new { error = "Announcement not found." });

        if (entity.Status != AnnouncementStatus.Draft && entity.Status != AnnouncementStatus.Scheduled)
            return BadRequest(new { error = "Only Draft or Scheduled announcements can be edited." });

        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Content = request.Content;
        entity.ContentAr = request.ContentAr;
        entity.Priority = request.Priority;
        entity.TargetAudience = request.TargetAudience;
        entity.TargetIds = request.TargetIds;
        entity.AnnouncementCategoryId = request.AnnouncementCategoryId;
        entity.IsPinned = request.IsPinned;
        entity.RequiresAcknowledgment = request.RequiresAcknowledgment;
        entity.SendNotification = request.SendNotification;
        entity.ScheduledPublishDate = request.ScheduledPublishDate;
        entity.ExpiryDate = request.ExpiryDate;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // If ScheduledPublishDate is set and status is Draft, move to Scheduled
        if (request.ScheduledPublishDate.HasValue && entity.Status == AnnouncementStatus.Draft)
            entity.Status = AnnouncementStatus.Scheduled;

        // Update attachments: remove existing and re-add
        if (request.AttachmentFileIds != null)
        {
            // Soft-delete existing attachments
            foreach (var existing in entity.Attachments.Where(a => !a.IsDeleted))
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
            }

            // Add new attachments
            var sortOrder = 0;
            foreach (var fileId in request.AttachmentFileIds)
            {
                var attachment = new AnnouncementAttachment
                {
                    AnnouncementId = entity.Id,
                    FileAttachmentId = fileId,
                    SortOrder = sortOrder++,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                };
                _context.AnnouncementAttachments.Add(attachment);
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Announcement updated." });
    }

    /// <summary>Publishes an announcement immediately.</summary>
    [HttpPost("{id}/publish")]
    [Authorize(Policy = "AnnouncementManagement")]
    public async Task<IActionResult> Publish(long id)
    {
        var entity = await _context.Announcements.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Announcement not found." });

        if (entity.Status != AnnouncementStatus.Draft && entity.Status != AnnouncementStatus.Scheduled)
            return BadRequest(new { error = "Only Draft or Scheduled announcements can be published." });

        entity.Status = AnnouncementStatus.Published;
        entity.PublishedAt = DateTime.UtcNow;
        entity.PublishedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Announcement published." });
    }

    /// <summary>Archives a published or expired announcement.</summary>
    [HttpPost("{id}/archive")]
    [Authorize(Policy = "AnnouncementManagement")]
    public async Task<IActionResult> Archive(long id)
    {
        var entity = await _context.Announcements.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Announcement not found." });

        if (entity.Status != AnnouncementStatus.Published && entity.Status != AnnouncementStatus.Expired)
            return BadRequest(new { error = "Only Published or Expired announcements can be archived." });

        entity.Status = AnnouncementStatus.Archived;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Announcement archived." });
    }

    /// <summary>Soft deletes an announcement.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AnnouncementManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Announcements.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Announcement not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Announcement deleted." });
    }

    /// <summary>Gets acknowledgments for an announcement.</summary>
    [HttpGet("{id}/acknowledgments")]
    [Authorize(Policy = "AnnouncementRead")]
    public async Task<IActionResult> GetAcknowledgments(long id,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var exists = await _context.Announcements.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound(new { error = "Announcement not found." });

        var query = _context.AnnouncementAcknowledgments.AsNoTracking()
            .Where(x => x.AnnouncementId == id);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.AcknowledgedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.AcknowledgedAt,
                x.IpAddress
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateAnnouncementRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ContentAr { get; set; }
    public AnnouncementPriority Priority { get; set; } = AnnouncementPriority.Normal;
    public AnnouncementTargetAudience TargetAudience { get; set; } = AnnouncementTargetAudience.All;
    public string? TargetIds { get; set; }
    public long? AnnouncementCategoryId { get; set; }
    public bool IsPinned { get; set; }
    public bool RequiresAcknowledgment { get; set; }
    public bool SendNotification { get; set; } = true;
    public DateTime? ScheduledPublishDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public List<long>? AttachmentFileIds { get; set; }
}

public class UpdateAnnouncementRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ContentAr { get; set; }
    public AnnouncementPriority Priority { get; set; } = AnnouncementPriority.Normal;
    public AnnouncementTargetAudience TargetAudience { get; set; } = AnnouncementTargetAudience.All;
    public string? TargetIds { get; set; }
    public long? AnnouncementCategoryId { get; set; }
    public bool IsPinned { get; set; }
    public bool RequiresAcknowledgment { get; set; }
    public bool SendNotification { get; set; } = true;
    public DateTime? ScheduledPublishDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public List<long>? AttachmentFileIds { get; set; }
}
