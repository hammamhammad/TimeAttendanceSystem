using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

public class FinalSettlementPaidHandler
    : LifecycleAutomationBase, INotificationHandler<FinalSettlementPaidEvent>
{
    private const LifecycleAutomationType AutoType = LifecycleAutomationType.FinalSettlementPaidDeactivateEmployee;
    private const string SourceType = "FinalSettlement";

    private readonly IMediator _mediator;

    public FinalSettlementPaidHandler(
        IApplicationDbContext context,
        IMediator mediator,
        ILogger<FinalSettlementPaidHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
    }

    public async Task Handle(FinalSettlementPaidEvent notification, CancellationToken cancellationToken)
    {
        var triggeredAtUtc = DateTime.UtcNow;
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "Master kill-switch is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (settings is not { AutoDeactivateEmployeeOnFinalSettlementPaid: true })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "AutoDeactivateEmployeeOnFinalSettlementPaid is off.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, notification.FinalSettlementId, AutoType, cancellationToken))
        {
            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        // Skip when the employee is already fully inactive.
        var employee = await Context.Employees.FirstOrDefaultAsync(
            e => e.Id == notification.EmployeeId && !e.IsDeleted, cancellationToken);
        if (employee == null)
        {
            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: "Linked employee not found.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        if (!employee.IsActive && !employee.IsSuspended)
        {
            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.Skipped, triggeredAtUtc,
                reason: "Employee already fully deactivated.",
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
            return;
        }

        try
        {
            var result = await _mediator.Send(new DeactivateEmployeeCommand(
                notification.EmployeeId,
                $"Final settlement {notification.FinalSettlementId} paid.",
                notification.TriggeredByUserId), cancellationToken);

            if (result.IsFailure)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    triggeredByUserId: notification.TriggeredByUserId,
                    ct: cancellationToken);
                return;
            }

            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "Employee",
                targetEntityId: notification.EmployeeId,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "FinalSettlementPaidHandler failed for SettlementId={Id}", notification.FinalSettlementId);
            await WriteAuditAsync(AutoType, SourceType, notification.FinalSettlementId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                triggeredByUserId: notification.TriggeredByUserId,
                ct: cancellationToken);
        }
    }
}
