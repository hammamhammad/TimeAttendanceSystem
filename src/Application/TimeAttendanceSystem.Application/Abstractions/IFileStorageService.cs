namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Abstraction for file storage operations. Implementations handle the physical
/// storage of files (local disk, cloud blob, etc.) while the application layer
/// works only against this interface.
/// </summary>
public interface IFileStorageService
{
    /// <summary>
    /// Uploads a file to storage and returns metadata about the stored file.
    /// </summary>
    /// <param name="fileStream">The file content stream.</param>
    /// <param name="fileName">The original file name.</param>
    /// <param name="contentType">The MIME content type.</param>
    /// <param name="category">Optional category for organizing files into subdirectories.</param>
    /// <returns>Upload result containing stored file name, path, URL, and size.</returns>
    Task<FileUploadResult> UploadAsync(Stream fileStream, string fileName, string contentType, string? category = null);

    /// <summary>
    /// Downloads a file from storage by its stored file name.
    /// </summary>
    /// <param name="storedFileName">The GUID-based stored file name.</param>
    /// <returns>Tuple of stream, content type, and original file name; or null if not found.</returns>
    Task<(Stream stream, string contentType, string fileName)?> DownloadAsync(string storedFileName);

    /// <summary>
    /// Deletes a file from physical storage.
    /// </summary>
    /// <param name="storedFileName">The GUID-based stored file name.</param>
    /// <returns>True if the file was deleted; false if not found.</returns>
    Task<bool> DeleteAsync(string storedFileName);

    /// <summary>
    /// Gets the relative URL for accessing a stored file through the API.
    /// </summary>
    /// <param name="storedFileName">The GUID-based stored file name.</param>
    /// <returns>Relative URL path (e.g., "/api/v1/files/{storedFileName}").</returns>
    string GetFileUrl(string storedFileName);
}

/// <summary>
/// Result returned after a successful file upload operation.
/// </summary>
public class FileUploadResult
{
    /// <summary>
    /// The GUID-based file name used for storage.
    /// </summary>
    public string StoredFileName { get; set; } = string.Empty;

    /// <summary>
    /// The relative path where the file is stored on disk.
    /// </summary>
    public string FilePath { get; set; } = string.Empty;

    /// <summary>
    /// The relative URL for downloading the file through the API.
    /// </summary>
    public string FileUrl { get; set; } = string.Empty;

    /// <summary>
    /// The size of the stored file in bytes.
    /// </summary>
    public long FileSize { get; set; }
}
