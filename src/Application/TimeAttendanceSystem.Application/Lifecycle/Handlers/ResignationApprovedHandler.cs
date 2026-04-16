using MediatR;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

public class ResignationApprovedHandler
    : LifecycleAutomationBase, INotificationHandler<ResignationApprovedEvent>
{
    private const LifecycleAutomationType AutoType = LifecycleAutomationType.ResignationApprovedCreateTermination;
    private const string SourceType = "ResignationRequest";

    private readonly IMediator _mediator;

    public ResignationApprovedHandler(
        IApplicationDbContext context,
        IMediator mediator,
        ILogger<ResignationApprovedHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
    }

    public async Task Handle(ResignationApprovedEvent notification, CancellationToken cancellationToken)
    {
        var triggeredAtUtc = DateTime.UtcNow;
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "Master kill-switch is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (settings is not { AutoCreateTerminationOnResignationApproved: true })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "AutoCreateTerminationOnResignationApproved is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, notification.ResignationRequestId, AutoType, cancellationToken))
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        try
        {
            var result = await _mediator.Send(new CreateTerminationFromResignationCommand(
                notification.ResignationRequestId, notification.TriggeredByUserId), cancellationToken);

            if (result.IsFailure)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    triggeredByUserId: notification.TriggeredByUserId,
                    ct: cancellationToken);
                return;
            }

            if (result.Value == null)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                    LifecycleAutomationStatus.Skipped, triggeredAtUtc,
                    reason: "Termination record already exists for this resignation.",
                    triggeredByUserId: notification.TriggeredByUserId,
                    ct: cancellationToken);
                return;
            }

            await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "TerminationRecord",
                targetEntityId: result.Value,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "ResignationApprovedHandler failed for ResignationId={Id}", notification.ResignationRequestId);
            await WriteAuditAsync(AutoType, SourceType, notification.ResignationRequestId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
    }
}
