using MediatR;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// <see cref="ILifecycleEventPublisher"/> backed by MediatR <see cref="IPublisher"/>.
/// Catches every exception so a handler bug can't poison the triggering command.
///
/// Phase 1 (v14.1): additionally raises an <see cref="OperationalFailureAlert"/> via
/// <see cref="IFailureAlertService"/> so the failure is visible to HR instead of being
/// audit-only in <c>LifecycleAutomationAudit</c>.
/// </summary>
public class LifecycleEventPublisher : ILifecycleEventPublisher
{
    private readonly IPublisher _mediator;
    private readonly IFailureAlertService _alerts;
    private readonly ILogger<LifecycleEventPublisher> _logger;

    public LifecycleEventPublisher(
        IPublisher mediator,
        IFailureAlertService alerts,
        ILogger<LifecycleEventPublisher> logger)
    {
        _mediator = mediator;
        _alerts = alerts;
        _logger = logger;
    }

    public async Task PublishAsync<TEvent>(TEvent @event, CancellationToken ct = default)
        where TEvent : INotification
    {
        try
        {
            await _mediator.Publish(@event, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Lifecycle event {EventType} handler failed. Originating command is unaffected. Payload: {@Event}",
                typeof(TEvent).Name, @event);

            try
            {
                await _alerts.RaiseAsync(new RaiseFailureAlertRequest
                {
                    Category = OperationalFailureCategory.LifecycleAutomation,
                    SourceEntityType = typeof(TEvent).Name,
                    SourceEntityId = 0,
                    FailureCode = "PublisherException",
                    Reason = $"Lifecycle event {typeof(TEvent).Name} publisher threw an unhandled exception.",
                    ErrorMessage = ex.Message,
                    Severity = OperationalFailureSeverity.Error,
                    IsRetryable = false
                }, ct);
            }
            catch (Exception alertEx)
            {
                _logger.LogWarning(alertEx, "Could not persist operational failure alert for lifecycle event {EventType}.", typeof(TEvent).Name);
            }
            // Intentional swallow of original exception. Handlers also record their own Failed audit rows.
        }
    }
}
