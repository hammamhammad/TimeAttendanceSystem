using MediatR;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// <see cref="ILifecycleEventPublisher"/> backed by MediatR <see cref="IPublisher"/>.
/// Catches every exception so a handler bug can't poison the triggering command.
/// </summary>
public class LifecycleEventPublisher : ILifecycleEventPublisher
{
    private readonly IPublisher _mediator;
    private readonly ILogger<LifecycleEventPublisher> _logger;

    public LifecycleEventPublisher(IPublisher mediator, ILogger<LifecycleEventPublisher> logger)
    {
        _mediator = mediator;
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
            // Intentional swallow. Handlers record their own Failed audit rows.
        }
    }
}
