using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

public class OnboardingCompletedHandler
    : LifecycleAutomationBase, INotificationHandler<OnboardingCompletedEvent>
{
    private const LifecycleAutomationType AutoType = LifecycleAutomationType.OnboardingCompletedActivateEmployee;
    private const string SourceType = "OnboardingProcess";

    private readonly IMediator _mediator;

    public OnboardingCompletedHandler(
        IApplicationDbContext context,
        IMediator mediator,
        ILogger<OnboardingCompletedHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
    }

    public async Task Handle(OnboardingCompletedEvent notification, CancellationToken cancellationToken)
    {
        var triggeredAtUtc = DateTime.UtcNow;
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "Master kill-switch is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        // Always stamp the milestone on the employee, regardless of activation mode.
        var employee = await Context.Employees.FirstOrDefaultAsync(
            e => e.Id == notification.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
        {
            await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: "Linked employee not found.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (employee.OnboardingCompletedAt == null)
        {
            employee.OnboardingCompletedAt = DateTime.UtcNow;
            employee.ModifiedAtUtc = DateTime.UtcNow;
            employee.ModifiedBy = "LIFECYCLE-AUTOMATION";
            await Context.SaveChangesAsync(cancellationToken);
        }

        if (settings is not { AutoActivateEmployeeOnOnboardingComplete: true })
        {
            // Milestone-only mode (default).
            await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                LifecycleAutomationStatus.Skipped, triggeredAtUtc,
                targetEntityType: "Employee",
                targetEntityId: notification.EmployeeId,
                reason: "AutoActivateEmployeeOnOnboardingComplete is off — milestone-only mode.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, notification.OnboardingProcessId, AutoType, cancellationToken))
        {
            await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        try
        {
            var result = await _mediator.Send(new ActivateEmployeeCommand(
                notification.EmployeeId, notification.TriggeredByUserId), cancellationToken);

            if (result.IsFailure)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    triggeredByUserId: notification.TriggeredByUserId,
                    ct: cancellationToken);
                return;
            }

            await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "Employee",
                targetEntityId: notification.EmployeeId,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "OnboardingCompletedHandler failed for ProcessId={ProcessId}", notification.OnboardingProcessId);
            await WriteAuditAsync(AutoType, SourceType, notification.OnboardingProcessId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
    }
}
