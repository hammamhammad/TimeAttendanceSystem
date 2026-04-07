using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// File storage service that persists files to the local disk.
/// Files are organized into subdirectories by category and given GUID-based names
/// to prevent collisions. Suitable for development and single-server deployments.
/// </summary>
public class LocalDiskFileStorageService : IFileStorageService
{
    private readonly string _basePath;
    private readonly ILogger<LocalDiskFileStorageService> _logger;

    public LocalDiskFileStorageService(IConfiguration configuration, ILogger<LocalDiskFileStorageService> logger)
    {
        _logger = logger;

        // Read base path from configuration, default to "uploads" in the current directory
        _basePath = configuration.GetValue<string>("FileStorage:BasePath")
                    ?? Path.Combine(Directory.GetCurrentDirectory(), "uploads");

        // Ensure the base directory exists
        if (!Directory.Exists(_basePath))
        {
            Directory.CreateDirectory(_basePath);
            _logger.LogInformation("Created file storage directory: {BasePath}", _basePath);
        }
    }

    /// <inheritdoc />
    public async Task<FileUploadResult> UploadAsync(Stream fileStream, string fileName, string contentType, string? category = null)
    {
        // Determine subdirectory
        var subDir = string.IsNullOrWhiteSpace(category) ? "general" : category.Trim().ToLowerInvariant();
        var targetDir = Path.Combine(_basePath, subDir);

        if (!Directory.Exists(targetDir))
        {
            Directory.CreateDirectory(targetDir);
        }

        // Generate a unique stored file name
        var extension = Path.GetExtension(fileName);
        var storedFileName = $"{Guid.NewGuid()}{extension}";
        var relativePath = Path.Combine(subDir, storedFileName).Replace('\\', '/');
        var fullPath = Path.Combine(targetDir, storedFileName);

        // Write the file to disk
        await using var outputStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write);
        await fileStream.CopyToAsync(outputStream);
        var fileSize = outputStream.Length;

        _logger.LogInformation("File uploaded: {StoredFileName} ({FileSize} bytes) to {Path}", storedFileName, fileSize, relativePath);

        return new FileUploadResult
        {
            StoredFileName = storedFileName,
            FilePath = relativePath,
            FileUrl = GetFileUrl(storedFileName),
            FileSize = fileSize
        };
    }

    /// <inheritdoc />
    public Task<(Stream stream, string contentType, string fileName)?> DownloadAsync(string storedFileName)
    {
        // Search for the file across all subdirectories
        var filePath = FindFile(storedFileName);
        if (filePath == null)
        {
            return Task.FromResult<(Stream, string, string)?>(null);
        }

        var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        var contentType = GetContentType(storedFileName);

        return Task.FromResult<(Stream, string, string)?>((stream, contentType, storedFileName));
    }

    /// <inheritdoc />
    public Task<bool> DeleteAsync(string storedFileName)
    {
        var filePath = FindFile(storedFileName);
        if (filePath == null)
        {
            return Task.FromResult(false);
        }

        try
        {
            File.Delete(filePath);
            _logger.LogInformation("File deleted from disk: {StoredFileName}", storedFileName);
            return Task.FromResult(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete file from disk: {StoredFileName}", storedFileName);
            return Task.FromResult(false);
        }
    }

    /// <inheritdoc />
    public string GetFileUrl(string storedFileName)
    {
        return $"/api/v1/files/{storedFileName}";
    }

    /// <summary>
    /// Searches for a file by its stored file name across all subdirectories.
    /// </summary>
    private string? FindFile(string storedFileName)
    {
        // Search in all subdirectories of the base path
        var files = Directory.GetFiles(_basePath, storedFileName, SearchOption.AllDirectories);
        return files.Length > 0 ? files[0] : null;
    }

    /// <summary>
    /// Determines the MIME content type based on file extension.
    /// </summary>
    private static string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return extension switch
        {
            ".pdf" => "application/pdf",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls" => "application/vnd.ms-excel",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".txt" => "text/plain",
            ".csv" => "text/csv",
            _ => "application/octet-stream"
        };
    }
}
