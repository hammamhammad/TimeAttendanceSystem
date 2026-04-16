using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

public class ContractExpiredHandler
    : LifecycleAutomationBase, INotificationHandler<ContractExpiredEvent>
{
    private const LifecycleAutomationType AutoType = LifecycleAutomationType.ContractExpiredAction;
    private const string SourceType = "EmployeeContract";

    private readonly IMediator _mediator;

    public ContractExpiredHandler(
        IApplicationDbContext context,
        IMediator mediator,
        ILogger<ContractExpiredHandler> logger)
        : base(context, logger)
    {
        _mediator = mediator;
    }

    public async Task Handle(ContractExpiredEvent notification, CancellationToken cancellationToken)
    {
        var triggeredAtUtc = DateTime.UtcNow;
        var settings = await LoadSettingsAsync(cancellationToken);

        if (settings is { LifecycleAutomationEnabled: false })
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ContractId,
                LifecycleAutomationStatus.Disabled, triggeredAtUtc,
                reason: "Master kill-switch is off.",
                ct: cancellationToken);
            return;
        }

        if (await AlreadySucceededAsync(SourceType, notification.ContractId, AutoType, cancellationToken))
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ContractId,
                LifecycleAutomationStatus.DuplicateSuppressed, triggeredAtUtc,
                ct: cancellationToken);
            return;
        }

        var actionStr = settings?.ContractExpiredAction ?? "AutoMarkExpired";
        if (!Enum.TryParse<ContractExpiredAction>(actionStr, ignoreCase: true, out var action))
            action = ContractExpiredAction.AutoMarkExpired;

        // Skip deactivate/suspend actions if the employee is already inactive, but still
        // mark the contract as expired if it hasn't been.
        var employee = await Context.Employees.FirstOrDefaultAsync(
            e => e.Id == notification.EmployeeId && !e.IsDeleted, cancellationToken);
        if (employee == null)
        {
            await WriteAuditAsync(AutoType, SourceType, notification.ContractId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: "Linked employee not found.",
                ct: cancellationToken);
            return;
        }

        if (!employee.IsActive && (action == ContractExpiredAction.Suspend || action == ContractExpiredAction.Deactivate))
        {
            // Degrade to AutoMarkExpired so we at least clean up the contract status.
            action = ContractExpiredAction.AutoMarkExpired;
        }

        try
        {
            var result = await _mediator.Send(new ApplyContractExpiredActionCommand(
                notification.ContractId, action), cancellationToken);

            if (result.IsFailure)
            {
                await WriteAuditAsync(AutoType, SourceType, notification.ContractId,
                    LifecycleAutomationStatus.Failed, triggeredAtUtc,
                    errorMessage: result.Error,
                    context: new { action = action.ToString() },
                    ct: cancellationToken);
                return;
            }

            await WriteAuditAsync(AutoType, SourceType, notification.ContractId,
                LifecycleAutomationStatus.Succeeded, triggeredAtUtc,
                targetEntityType: "EmployeeContract",
                targetEntityId: notification.ContractId,
                reason: result.Value,
                context: new { action = action.ToString() },
                ct: cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "ContractExpiredHandler failed for ContractId={Id}", notification.ContractId);
            await WriteAuditAsync(AutoType, SourceType, notification.ContractId,
                LifecycleAutomationStatus.Failed, triggeredAtUtc,
                errorMessage: ex.Message,
                context: new { action = action.ToString() },
                ct: cancellationToken);
        }
    }
}
