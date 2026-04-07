namespace TecAxle.Hrms.Domain.Common;

/// <summary>
/// Represents a file attachment stored on disk with metadata linking it to domain entities.
/// Supports uploading, downloading, and organizing files by entity type, field, and category.
/// </summary>
public class FileAttachment : BaseEntity
{
    /// <summary>
    /// The original file name as uploaded by the user.
    /// </summary>
    public string OriginalFileName { get; set; } = string.Empty;

    /// <summary>
    /// GUID-based unique file name used for on-disk storage to prevent collisions.
    /// </summary>
    public string StoredFileName { get; set; } = string.Empty;

    /// <summary>
    /// Relative path on disk where the file is stored (e.g., "resumes/abc123.pdf").
    /// </summary>
    public string FilePath { get; set; } = string.Empty;

    /// <summary>
    /// MIME content type of the file (e.g., "application/pdf", "image/jpeg").
    /// </summary>
    public string ContentType { get; set; } = string.Empty;

    /// <summary>
    /// File size in bytes.
    /// </summary>
    public long FileSize { get; set; }

    /// <summary>
    /// Optional description of the file provided by the uploader.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// The type of entity this file is associated with (e.g., "Candidate", "EmployeeContract").
    /// </summary>
    public string? EntityType { get; set; }

    /// <summary>
    /// The ID of the related entity.
    /// </summary>
    public long? EntityId { get; set; }

    /// <summary>
    /// The field name on the entity this file belongs to (e.g., "ResumeUrl", "DocumentUrl").
    /// </summary>
    public string? FieldName { get; set; }

    /// <summary>
    /// The ID of the user who uploaded the file.
    /// </summary>
    public long? UploadedByUserId { get; set; }

    /// <summary>
    /// File category for organizing files (e.g., "resume", "contract", "certificate").
    /// </summary>
    public string? Category { get; set; }
}
