using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Application.Workflows.Validation;

/// <summary>
/// Outcome of a validation-rule evaluation.
/// </summary>
/// <param name="Passed">True if the rule permits the workflow to advance.</param>
/// <param name="Reason">Short human-readable reason, surfaced in UI and audit.</param>
/// <param name="Details">Optional structured details persisted into
/// <c>WorkflowStepExecution.ValidationDetailsJson</c>.</param>
public sealed record ValidationRuleResult(
    bool Passed,
    string? Reason = null,
    Dictionary<string, object?>? Details = null);

/// <summary>
/// Contract for a workflow validation rule. Implementations are resolved by
/// <c>WorkflowStep.ValidationRuleCode</c> via <see cref="IWorkflowValidationRuleRegistry"/>.
/// Rules must be stateless; configuration arrives in <c>step.ValidationConfigJson</c>.
/// </summary>
/// <remarks>
/// Added in v13.6 to replace the previous stubbed <c>PerformValidationAsync</c> that always
/// returned <c>true</c> regardless of step configuration.
///
/// Design principles:
/// - <b>Fail closed</b>: if a rule is required but its code is not registered, the workflow engine
///   treats that as auto-rejection rather than silently passing.
/// - <b>Deterministic</b>: rules do not mutate state; they only read and return a verdict.
/// - <b>Discoverable</b>: rules are registered into DI via assembly scanning so new rules are
///   picked up automatically.
/// </remarks>
public interface IWorkflowValidationRule
{
    /// <summary>
    /// Stable identifier matched against <c>WorkflowStep.ValidationRuleCode</c>.
    /// Convention: lower-case snake case, e.g. <c>"vacation_balance"</c>, <c>"shift_conflict"</c>.
    /// </summary>
    string RuleCode { get; }

    /// <summary>
    /// Human-readable display name for admin UI dropdowns.
    /// </summary>
    string DisplayName { get; }

    /// <summary>
    /// Executes the rule.
    /// </summary>
    /// <param name="instance">The workflow instance being evaluated.</param>
    /// <param name="step">The validation step currently being processed.</param>
    /// <param name="context">The dynamic context dictionary deserialized from
    /// <c>WorkflowInstance.ContextJson</c>.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>A <see cref="ValidationRuleResult"/> describing the outcome.</returns>
    Task<ValidationRuleResult> EvaluateAsync(
        WorkflowInstance instance,
        WorkflowStep step,
        IReadOnlyDictionary<string, object?> context,
        CancellationToken ct);
}
