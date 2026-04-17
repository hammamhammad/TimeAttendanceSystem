using MediatR;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

/// <summary>
/// Two independent sub-steps are performed sequentially, each with its own audit row:
/// (1) clearance checklist creation — gated by <c>AutoCreateClearanceOnTermination</c>,
/// (2) employee suspension — gated by <c>AutoSuspendEmployeeOnTerminationCreated</c>.
/// Failure of one does not block the other.
/// </summary>
public class TerminationCreatedHandler
    : LifecycleAutomationBase, INotificationHandler<TerminationCreatedEvent>
{
    private const string SourceType = "TerminationRecord";

    private readonly IMediator _mediator;

    public TerminationCreatedHandler(
        IApplicationDbContext context,
        IMediator mediator,
        ILogger<TerminationCreatedHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
    }

    public async Task Handle(TerminationCreatedEvent notification, CancellationToken cancellationToken)
    {
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            // Record one "Disabled" row against each sub-type for clarity.
            await WriteDisabledAsync(LifecycleAutomationType.TerminationCreateClearance, notification,
                "Master kill-switch is off.", cancellationToken);
            await WriteDisabledAsync(LifecycleAutomationType.TerminationSuspendEmployee, notification,
                "Master kill-switch is off.", cancellationToken);
            return;
        }

        await RunClearanceSubStepAsync(notification, settings, cancellationToken);
        await RunSuspendSubStepAsync(notification, settings, cancellationToken);
    }

    private async Task RunClearanceSubStepAsync(
        TerminationCreatedEvent ev, Domain.Company.CompanySettings? settings, CancellationToken ct)
    {
        const LifecycleAutomationType sub = LifecycleAutomationType.TerminationCreateClearance;
        var triggeredAtUtc = DateTime.UtcNow;

        if (settings is not { AutoCreateClearanceOnTermination: true })
        {
            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "AutoCreateClearanceOnTermination is off.",
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, ev.TerminationRecordId, sub, ct))
        {
            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
            return;
        }

        try
        {
            var result = await _mediator.Send(new CreateClearanceFromTemplateCommand(
                ev.TerminationRecordId, settings.DefaultClearanceTemplateId, ev.TriggeredByUserId), ct);

            if (result.IsFailure)
            {
                await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    triggeredByUserId: ev.TriggeredByUserId, ct: ct);
                return;
            }

            if (result.Value == null)
            {
                await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                    LifecycleAutomationStatus.Skipped, triggeredAtUtc,
                    reason: "Clearance checklist already exists.",
                    triggeredByUserId: ev.TriggeredByUserId, ct: ct);
                return;
            }

            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "ClearanceChecklist",
                targetEntityId: result.Value,
                triggeredByUserId: ev.TriggeredByUserId,
                context: new
                {
                    usedTemplate = settings.DefaultClearanceTemplateId.HasValue,
                    templateId = settings.DefaultClearanceTemplateId,
                    itemSource = settings.DefaultClearanceTemplateId.HasValue
                        ? "template"
                        : "hardcoded-8-item-default"
                },
                ct: ct);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Clearance sub-step failed for TerminationId={Id}", ev.TerminationRecordId);
            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
        }
    }

    private async Task RunSuspendSubStepAsync(
        TerminationCreatedEvent ev, Domain.Company.CompanySettings? settings, CancellationToken ct)
    {
        const LifecycleAutomationType sub = LifecycleAutomationType.TerminationSuspendEmployee;
        var triggeredAtUtc = DateTime.UtcNow;

        if (settings is not { AutoSuspendEmployeeOnTerminationCreated: true })
        {
            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "AutoSuspendEmployeeOnTerminationCreated is off.",
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, ev.TerminationRecordId, sub, ct))
        {
            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
            return;
        }

        try
        {
            var result = await _mediator.Send(new SuspendEmployeeCommand(
                ev.EmployeeId, $"Termination record {ev.TerminationRecordId} created.", ev.TriggeredByUserId), ct);

            if (result.IsFailure)
            {
                await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    triggeredByUserId: ev.TriggeredByUserId, ct: ct);
                return;
            }

            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "Employee",
                targetEntityId: ev.EmployeeId,
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Suspend sub-step failed for TerminationId={Id}", ev.TerminationRecordId);
            await WriteAuditAsync(sub, SourceType, ev.TerminationRecordId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: ev.TriggeredByUserId, ct: ct);
        }
    }

    private Task WriteDisabledAsync(LifecycleAutomationType type, TerminationCreatedEvent ev, string reason, CancellationToken ct)
        => WriteAuditAsync(type, SourceType, ev.TerminationRecordId,
            LifecycleAutomationStatus.Disabled, DateTime.UtcNow,
            reason: reason,
            triggeredByUserId: ev.TriggeredByUserId, ct: ct);
}
