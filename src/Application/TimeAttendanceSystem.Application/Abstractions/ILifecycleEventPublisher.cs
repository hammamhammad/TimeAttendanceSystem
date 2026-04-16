using MediatR;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Thin MediatR <see cref="IPublisher"/> wrapper for lifecycle-automation events.
/// Guarantees that a lifecycle-handler exception never propagates back to the
/// triggering command — handlers are best-effort and record their own failures
/// into <c>LifecycleAutomationAudit</c>.
/// </summary>
/// <remarks>
/// Why not use IPublisher directly:
/// - Several originating commands (e.g. <c>ApproveResignationCommandHandler</c>) run inside
///   an HTTP-level transaction. If a lifecycle handler threw, the whole transaction would
///   roll back and the user would see "approve failed" even though the approval itself
///   persisted. That hides automation bugs behind apparent business failures.
/// - Publishing via this wrapper catches + logs exceptions, so a missing tenant setting,
///   a misconfigured template, or any other downstream issue becomes a <c>Failed</c> audit
///   row visible to HR — never an HTTP 500.
/// - Handlers still have access to the full DI scope (including <c>IApplicationDbContext</c>),
///   so they can persist their own audit row + any successful downstream state.
/// </remarks>
public interface ILifecycleEventPublisher
{
    /// <summary>
    /// Dispatches the event to all registered handlers synchronously. Any handler exception
    /// is swallowed and logged; the caller always returns as if the publish succeeded.
    /// </summary>
    Task PublishAsync<TEvent>(TEvent @event, CancellationToken ct = default)
        where TEvent : INotification;
}
