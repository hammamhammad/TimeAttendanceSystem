using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 1 (v14.1): Production implementation of <see cref="IFailureAlertService"/>.
///
/// Persists a row to <see cref="OperationalFailureAlert"/> (deduplicated on
/// Category+SourceEntityType+SourceEntityId+FailureCode when an unresolved match exists)
/// and fires an in-app notification to the HR/SystemAdmin role set resolved via
/// <see cref="INotificationRecipientResolver"/>.
///
/// Notification failures are logged but do not propagate — the alert row is the durable record.
/// </summary>
public sealed class FailureAlertService : IFailureAlertService
{
    private readonly IApplicationDbContext _db;
    private readonly IInAppNotificationService _notifications;
    private readonly INotificationRecipientResolver _recipients;
    private readonly ILogger<FailureAlertService> _logger;

    public FailureAlertService(
        IApplicationDbContext db,
        IInAppNotificationService notifications,
        INotificationRecipientResolver recipients,
        ILogger<FailureAlertService> logger)
    {
        _db = db;
        _notifications = notifications;
        _recipients = recipients;
        _logger = logger;
    }

    public async Task<long> RaiseAsync(RaiseFailureAlertRequest request, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        // Idempotency: if there is an unresolved matching row, bump retry counter and reuse it.
        if (!request.ForceNew)
        {
            var existing = await _db.OperationalFailureAlerts
                .Where(a => !a.IsDeleted
                            && !a.IsResolved
                            && a.Category == request.Category
                            && a.SourceEntityType == request.SourceEntityType
                            && a.SourceEntityId == request.SourceEntityId
                            && a.FailureCode == request.FailureCode)
                .OrderByDescending(a => a.FailedAtUtc)
                .FirstOrDefaultAsync(ct);

            if (existing != null)
            {
                existing.RetryCount++;
                existing.LastRetryAtUtc = DateTime.UtcNow;
                // Update reason/error if the new one is more specific.
                if (!string.IsNullOrWhiteSpace(request.ErrorMessage) && string.IsNullOrWhiteSpace(existing.ErrorMessage))
                    existing.ErrorMessage = request.ErrorMessage;
                existing.Reason = request.Reason;
                await _db.SaveChangesAsync(ct);
                return existing.Id;
            }
        }

        var alert = new OperationalFailureAlert
        {
            Category = request.Category,
            SourceEntityType = request.SourceEntityType,
            SourceEntityId = request.SourceEntityId,
            EmployeeId = request.EmployeeId,
            FailureCode = request.FailureCode,
            Reason = request.Reason,
            ErrorMessage = request.ErrorMessage,
            Severity = request.Severity,
            FailedAtUtc = DateTime.UtcNow,
            IsRetryable = request.IsRetryable,
            RetryCount = 0,
            MetadataJson = request.MetadataJson,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        _db.OperationalFailureAlerts.Add(alert);
        await _db.SaveChangesAsync(ct);

        if (!request.SuppressNotification)
        {
            try
            {
                var userIds = await _recipients.GetRecipientUserIdsAsync(ct);
                if (userIds.Count > 0)
                {
                    var title = $"[{request.Severity}] {request.Category} failure";
                    var titleAr = $"[{request.Severity}] فشل {request.Category}";
                    var msg = $"{request.SourceEntityType}#{request.SourceEntityId}: {request.Reason}";
                    var bulk = userIds.Select(uid => new CreateNotificationRequest
                    {
                        UserId = uid,
                        Type = NotificationType.SystemAlert,
                        TitleEn = title,
                        TitleAr = titleAr,
                        MessageEn = msg,
                        MessageAr = msg,
                        EntityType = "OperationalFailureAlert",
                        EntityId = alert.Id,
                        ActionUrl = $"/operational-alerts/{alert.Id}"
                    });
                    await _notifications.SendBulkNotificationsAsync(bulk, ct);
                }
            }
            catch (Exception ex)
            {
                // Notification failure must NEVER prevent the alert row from being persisted.
                _logger.LogWarning(ex, "FailureAlertService: unable to send in-app notification for alert {AlertId}.", alert.Id);
            }
        }

        return alert.Id;
    }

    public async Task ResolveAsync(long alertId, long resolvedByUserId, string? notes, CancellationToken ct = default)
    {
        var alert = await _db.OperationalFailureAlerts.FirstOrDefaultAsync(a => a.Id == alertId && !a.IsDeleted, ct);
        if (alert == null || alert.IsResolved) return;

        alert.IsResolved = true;
        alert.ResolvedAtUtc = DateTime.UtcNow;
        alert.ResolvedByUserId = resolvedByUserId;
        alert.ResolutionNotes = notes;
        alert.ModifiedAtUtc = DateTime.UtcNow;
        alert.ModifiedBy = resolvedByUserId.ToString();
        await _db.SaveChangesAsync(ct);
    }

    public async Task RecordRetryAsync(long alertId, CancellationToken ct = default)
    {
        var alert = await _db.OperationalFailureAlerts.FirstOrDefaultAsync(a => a.Id == alertId && !a.IsDeleted, ct);
        if (alert == null) return;

        alert.RetryCount++;
        alert.LastRetryAtUtc = DateTime.UtcNow;
        alert.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);
    }
}
