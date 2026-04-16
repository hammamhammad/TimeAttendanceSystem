using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

public class OfferAcceptedHandler : LifecycleAutomationBase, INotificationHandler<OfferAcceptedEvent>
{
    private const LifecycleAutomationType AutoType = LifecycleAutomationType.OfferAcceptedCreateOnboarding;
    private const string SourceType = "OfferLetter";

    private readonly IMediator _mediator;
    private readonly INotificationRecipientResolver _recipients;

    public OfferAcceptedHandler(
        IApplicationDbContext context,
        IMediator mediator,
        INotificationRecipientResolver recipients,
        ILogger<OfferAcceptedHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
        _recipients = recipients;
    }

    public async Task Handle(OfferAcceptedEvent notification, CancellationToken cancellationToken)
    {
        var triggeredAtUtc = DateTime.UtcNow;
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "Master kill-switch (LifecycleAutomationEnabled) is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (settings is { AutoCreateOnboardingOnOfferAcceptance: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "AutoCreateOnboardingOnOfferAcceptance is disabled for this tenant.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, notification.OfferLetterId, AutoType, cancellationToken))
        {
            await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                reason: "A succeeded audit row already exists for this offer.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        try
        {
            var result = await _mediator.Send(new CreateOnboardingProcessFromOfferCommand(
                notification.OfferLetterId,
                settings?.DefaultOnboardingTemplateId,
                notification.TriggeredByUserId), cancellationToken);

            if (result.IsFailure)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                    LifecycleAutomationStatus.MissingPrerequisite, triggeredAtUtc,
                    reason: result.Error,
                    triggeredByUserId: notification.TriggeredByUserId,
                    context: new { settings?.DefaultOnboardingTemplateId },
                    ct: cancellationToken);
                await NotifyHrFailureAsync(notification, result.Error, cancellationToken);
                return;
            }

            if (result.Value == null)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                    LifecycleAutomationStatus.Skipped, triggeredAtUtc,
                    reason: "Employee already has an active onboarding process.",
                    triggeredByUserId: notification.TriggeredByUserId,
                    ct: cancellationToken);
                return;
            }

            await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "OnboardingProcess",
                targetEntityId: result.Value,
                triggeredByUserId: notification.TriggeredByUserId,
                context: new { settings?.DefaultOnboardingTemplateId },
                ct: cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "OfferAcceptedHandler failed for OfferLetterId={OfferId}", notification.OfferLetterId);
            await WriteAuditAsync(AutoType, SourceType, notification.OfferLetterId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            await NotifyHrFailureAsync(notification, ex.Message, cancellationToken);
        }
    }

    private async Task NotifyHrFailureAsync(OfferAcceptedEvent ev, string reason, CancellationToken ct)
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
                    TitleEn = "Onboarding auto-create failed",
                    TitleAr = "فشل إنشاء التهيئة تلقائياً",
                    MessageEn = $"Onboarding could not be created automatically for offer {ev.OfferLetterId}: {reason}",
                    MessageAr = $"تعذّر إنشاء عملية التهيئة تلقائيًا للعرض {ev.OfferLetterId}: {reason}",
                    EntityType = "OfferLetter",
                    EntityId = ev.OfferLetterId,
                    IsRead = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "LIFECYCLE-AUTOMATION"
                });
            }
            await Context.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            Logger.LogWarning(ex, "Failed to notify HR of onboarding auto-create failure");
        }
    }
}
