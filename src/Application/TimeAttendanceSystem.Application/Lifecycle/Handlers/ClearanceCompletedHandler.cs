using MediatR;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.FinalSettlements.Commands.CalculateFinalSettlement;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

public class ClearanceCompletedHandler
    : LifecycleAutomationBase, INotificationHandler<ClearanceCompletedEvent>
{
    private const LifecycleAutomationType AutoType = LifecycleAutomationType.ClearanceCompletedEnableSettlement;
    private const string SourceType = "ClearanceChecklist";

    private readonly IMediator _mediator;
    private readonly INotificationRecipientResolver _recipients;

    public ClearanceCompletedHandler(
        IApplicationDbContext context,
        IMediator mediator,
        INotificationRecipientResolver recipients,
        ILogger<ClearanceCompletedHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
        _recipients = recipients;
    }

    public async Task Handle(ClearanceCompletedEvent notification, CancellationToken cancellationToken)
    {
        var triggeredAtUtc = DateTime.UtcNow;
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ClearanceChecklistId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "Master kill-switch is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, notification.ClearanceChecklistId, AutoType, cancellationToken))
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ClearanceChecklistId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (settings is not { AutoEnableFinalSettlementCalcOnClearanceComplete: true })
        {
            // Notify HR that settlement is unblocked — but don't calculate automatically.
            await NotifyHrSettlementUnblockedAsync(notification, cancellationToken);
            await WriteAuditAsync(AutoType, SourceType, notification.ClearanceChecklistId,
                LifecycleAutomationStatus.Skipped, triggeredAtUtc,
                reason: "AutoEnableFinalSettlementCalcOnClearanceComplete is off — HR notified only.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        try
        {
            var result = await _mediator.Send(new CalculateFinalSettlementCommand(
                notification.TerminationRecordId), cancellationToken);

            if (result.IsFailure)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.ClearanceChecklistId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    triggeredByUserId: notification.TriggeredByUserId,
                    ct: cancellationToken);
                return;
            }

            await WriteAuditAsync(AutoType, SourceType, notification.ClearanceChecklistId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "FinalSettlement",
                targetEntityId: result.Value,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "ClearanceCompletedHandler failed for ChecklistId={Id}", notification.ClearanceChecklistId);
            await WriteAuditAsync(AutoType, SourceType, notification.ClearanceChecklistId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
    }

    private async Task NotifyHrSettlementUnblockedAsync(ClearanceCompletedEvent ev, CancellationToken ct)
    {
        try
        {
            var recipients = await _recipients.GetRecipientUserIdsAsync(ct);
            foreach (var userId in recipients)
            {
                Context.Notifications.Add(new Notification
                {
                    UserId = userId,
                    Type = NotificationType.ApprovalReminder,
                    TitleEn = "Clearance complete — final settlement unblocked",
                    TitleAr = "اكتمال الإخلاء — التسوية النهائية متاحة",
                    MessageEn = $"Clearance {ev.ClearanceChecklistId} for termination {ev.TerminationRecordId} is complete. HR may now calculate and approve the final settlement.",
                    MessageAr = $"تم إتمام إخلاء الطرف {ev.ClearanceChecklistId} للإنهاء {ev.TerminationRecordId}. يمكن الآن حساب التسوية النهائية واعتمادها.",
                    EntityType = "FinalSettlement",
                    EntityId = ev.TerminationRecordId,
                    IsRead = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "LIFECYCLE-AUTOMATION"
                });
            }
            await Context.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            Logger.LogWarning(ex, "Failed to notify HR of clearance completion");
        }
    }
}
