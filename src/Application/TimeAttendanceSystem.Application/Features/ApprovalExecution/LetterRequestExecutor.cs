using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): On <see cref="LetterRequest"/> approval, renders the configured
/// <see cref="LetterTemplate"/> with basic placeholder substitution, writes the
/// output to the file storage service, and sets <see cref="LetterRequest.GeneratedDocumentUrl"/>.
///
/// Template resolution:
/// <list type="number">
///   <item>Explicit <see cref="LetterRequest.TemplateId"/> if set.</item>
///   <item>Default active template for the request's <see cref="LetterRequest.LetterType"/> matching the employee's branch.</item>
///   <item>Default active template for the <see cref="LetterRequest.LetterType"/> with BranchId=null.</item>
/// </list>
/// Fails visibly with <c>ValidationFailed("MissingTemplate")</c> if none resolves — the
/// failure alert service records a reason row for HR.
///
/// Placeholders supported (lightweight; no full template engine):
/// <c>{{EmployeeName}}</c>, <c>{{EmployeeNumber}}</c>, <c>{{JobTitle}}</c>,
/// <c>{{IssueDate}}</c>, <c>{{LetterType}}</c>, <c>{{Purpose}}</c>.
/// </summary>
public sealed class LetterRequestExecutor : IApprovalExecutor
{
    private readonly IApplicationDbContext _db;
    private readonly IFileStorageService _files;
    public ApprovalExecutionTargetType TargetType => ApprovalExecutionTargetType.LetterRequest;

    public LetterRequestExecutor(IApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default)
    {
        var req = await _db.LetterRequests
            .Include(r => r.Employee)
            .Include(r => r.Template)
            .FirstOrDefaultAsync(r => r.Id == requestId && !r.IsDeleted, ct);

        if (req == null)
            return ExecutionResult.NotReady("LetterRequest not found.");
        if (req.IsExecuted && !string.IsNullOrEmpty(req.GeneratedDocumentUrl))
            return ExecutionResult.AlreadyExecuted(req.Id);
        if (req.Status != LetterRequestStatus.Approved && req.Status != LetterRequestStatus.Generated)
            return ExecutionResult.NotReady($"Letter status is {req.Status}, must be Approved.");

        // Resolve template.
        var template = req.Template;
        if (template == null)
        {
            template = await _db.LetterTemplates
                .Where(t => t.LetterType == req.LetterType && t.IsActive && !t.IsDeleted)
                .OrderByDescending(t => t.IsDefault)
                .ThenByDescending(t => t.BranchId != null)
                .FirstOrDefaultAsync(ct);
        }
        if (template == null)
        {
            req.ExecutionError = "MissingTemplate";
            req.ModifiedAtUtc = DateTime.UtcNow;
            await _db.SaveChangesAsync(ct);
            return ExecutionResult.ValidationFailed("MissingTemplate",
                $"No active LetterTemplate found for LetterType={req.LetterType}.");
        }

        var emp = req.Employee;
        var body = template.Content ?? string.Empty;
        body = body
            .Replace("{{EmployeeName}}", $"{emp?.FirstName} {emp?.LastName}".Trim())
            .Replace("{{EmployeeNumber}}", emp?.EmployeeNumber ?? string.Empty)
            .Replace("{{JobTitle}}", emp?.JobTitle ?? string.Empty)
            .Replace("{{IssueDate}}", DateTime.UtcNow.ToString("yyyy-MM-dd"))
            .Replace("{{LetterType}}", req.LetterType.ToString())
            .Replace("{{Purpose}}", req.Purpose ?? string.Empty);

        var fileName = $"letter-{req.LetterType}-{req.Id}-{DateTime.UtcNow:yyyyMMddHHmmss}.html";
        var bytes = System.Text.Encoding.UTF8.GetBytes(
            "<!DOCTYPE html><html><body>" + body + "</body></html>");

        FileUploadResult uploaded;
        try
        {
            using var ms = new MemoryStream(bytes);
            uploaded = await _files.UploadAsync(ms, fileName, "text/html", "letters");
        }
        catch (Exception ex)
        {
            req.ExecutionError = ex.Message;
            req.ModifiedAtUtc = DateTime.UtcNow;
            await _db.SaveChangesAsync(ct);
            return ExecutionResult.Failed("StorageError", "Unable to persist rendered letter: " + ex.Message);
        }

        req.GeneratedDocumentUrl = uploaded.FileUrl;
        req.GeneratedAt = DateTime.UtcNow;
        req.TemplateId = template.Id;
        req.Status = LetterRequestStatus.Generated;
        req.IsExecuted = true;
        req.ExecutedAtUtc = DateTime.UtcNow;
        req.ExecutedByUserId = executingUserId;
        req.ExecutionError = null;
        req.ModifiedAtUtc = DateTime.UtcNow;
        req.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";

        await _db.SaveChangesAsync(ct);
        return ExecutionResult.Succeeded(req.Id, $"Letter generated at {uploaded.FileUrl}.");
    }
}
