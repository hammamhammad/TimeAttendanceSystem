using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/files")]
public class FilesController : ControllerBase
{
    private readonly IFileStorageService _fileStorage;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    // Allowed file extensions
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".xlsx", ".xls", ".gif", ".txt", ".csv"
    };

    public FilesController(
        IFileStorageService fileStorage,
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _fileStorage = fileStorage;
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Uploads a file and creates a FileAttachment record.
    /// </summary>
    /// <param name="file">The file to upload (multipart/form-data).</param>
    /// <param name="entityType">Optional: type of entity this file belongs to.</param>
    /// <param name="entityId">Optional: ID of the related entity.</param>
    /// <param name="fieldName">Optional: field name on the entity.</param>
    /// <param name="category">Optional: file category (e.g., "resume", "contract").</param>
    /// <param name="description">Optional: description of the file.</param>
    /// <returns>The created file attachment metadata.</returns>
    [HttpPost("upload")]
    [Authorize]
    [RequestSizeLimit(104_857_600)] // 100 MB transport cap; per-tenant size enforced below.
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Upload(
        IFormFile file,
        [FromQuery] string? entityType = null,
        [FromQuery] long? entityId = null,
        [FromQuery] string? fieldName = null,
        [FromQuery] string? category = null,
        [FromQuery] string? description = null)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "No file provided or file is empty." });
        }

        // Validate file extension
        var extension = Path.GetExtension(file.FileName);
        if (string.IsNullOrEmpty(extension) || !AllowedExtensions.Contains(extension))
        {
            return BadRequest(new { message = $"File type '{extension}' is not allowed. Allowed types: {string.Join(", ", AllowedExtensions)}" });
        }

        // Validate file size against tenant-configured cap (default 10 MB).
        var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync(s => !s.IsDeleted);
        var maxMb = settings?.MaxUploadSizeMb > 0 ? settings.MaxUploadSizeMb : 10;
        var maxBytes = (long)maxMb * 1024L * 1024L;
        if (file.Length > maxBytes)
        {
            return BadRequest(new { message = $"File size exceeds the maximum allowed ({maxMb} MB)." });
        }

        // Upload to storage
        await using var stream = file.OpenReadStream();
        var uploadResult = await _fileStorage.UploadAsync(stream, file.FileName, file.ContentType, category);

        // Create FileAttachment record
        var attachment = new FileAttachment
        {
            OriginalFileName = file.FileName,
            StoredFileName = uploadResult.StoredFileName,
            FilePath = uploadResult.FilePath,
            ContentType = file.ContentType,
            FileSize = uploadResult.FileSize,
            Description = description,
            EntityType = entityType,
            EntityId = entityId,
            FieldName = fieldName,
            UploadedByUserId = _currentUser.UserId,
            Category = category,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.FileAttachments.Add(attachment);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            id = attachment.Id,
            originalFileName = attachment.OriginalFileName,
            storedFileName = attachment.StoredFileName,
            fileUrl = uploadResult.FileUrl,
            contentType = attachment.ContentType,
            fileSize = attachment.FileSize
        });
    }

    /// <summary>
    /// Downloads a file by its stored file name.
    /// </summary>
    /// <param name="storedFileName">The GUID-based stored file name.</param>
    /// <returns>The file content with appropriate content type.</returns>
    [HttpGet("{storedFileName}")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Download(string storedFileName)
    {
        // Look up the attachment record for the original file name
        var attachment = await _context.FileAttachments
            .FirstOrDefaultAsync(f => f.StoredFileName == storedFileName);

        var result = await _fileStorage.DownloadAsync(storedFileName);
        if (result == null)
        {
            return NotFound(new { message = "File not found." });
        }

        var (stream, contentType, _) = result.Value;
        var originalName = attachment?.OriginalFileName ?? storedFileName;

        return File(stream, contentType, originalName);
    }

    /// <summary>
    /// Soft-deletes a file attachment record and removes the physical file.
    /// </summary>
    /// <param name="id">The file attachment ID.</param>
    [HttpDelete("{id:long}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Delete(long id)
    {
        var attachment = await _context.FileAttachments.FindAsync(id);
        if (attachment == null)
        {
            return NotFound(new { message = "File attachment not found." });
        }

        // Delete physical file
        await _fileStorage.DeleteAsync(attachment.StoredFileName);

        // Soft delete the record
        attachment.IsDeleted = true;
        attachment.ModifiedBy = _currentUser.Username ?? "system";
        await _context.SaveChangesAsync();

        return Ok(new { message = "File deleted successfully." });
    }

    /// <summary>
    /// Gets all file attachments associated with a specific entity.
    /// </summary>
    /// <param name="entityType">The entity type (e.g., "Candidate", "EmployeeContract").</param>
    /// <param name="entityId">The entity ID.</param>
    [HttpGet("entity/{entityType}/{entityId:long}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetEntityFiles(string entityType, long entityId)
    {
        var files = await _context.FileAttachments
            .Where(f => f.EntityType == entityType && f.EntityId == entityId)
            .OrderByDescending(f => f.CreatedAtUtc)
            .Select(f => new
            {
                id = f.Id,
                originalFileName = f.OriginalFileName,
                storedFileName = f.StoredFileName,
                fileUrl = _fileStorage.GetFileUrl(f.StoredFileName),
                contentType = f.ContentType,
                fileSize = f.FileSize,
                description = f.Description,
                fieldName = f.FieldName,
                category = f.Category,
                uploadedAt = f.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(files);
    }
}
