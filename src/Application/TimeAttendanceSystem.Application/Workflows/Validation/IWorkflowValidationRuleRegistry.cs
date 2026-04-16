namespace TecAxle.Hrms.Application.Workflows.Validation;

/// <summary>
/// Registry of <see cref="IWorkflowValidationRule"/> instances keyed by their <c>RuleCode</c>.
/// </summary>
public interface IWorkflowValidationRuleRegistry
{
    /// <summary>
    /// Returns the rule for the given code, or <c>null</c> if no rule is registered.
    /// Unregistered codes cause the workflow engine to fail closed (AutoReject) — never silent pass.
    /// </summary>
    IWorkflowValidationRule? Find(string? ruleCode);

    /// <summary>
    /// Returns all registered rules. Used by the admin UI to populate the
    /// "Validation Rule" dropdown on the workflow-step form.
    /// </summary>
    IReadOnlyList<IWorkflowValidationRule> All();
}

/// <summary>
/// Default registry — resolves rules from DI.
/// </summary>
public sealed class WorkflowValidationRuleRegistry : IWorkflowValidationRuleRegistry
{
    private readonly IReadOnlyDictionary<string, IWorkflowValidationRule> _byCode;
    private readonly IReadOnlyList<IWorkflowValidationRule> _all;

    public WorkflowValidationRuleRegistry(IEnumerable<IWorkflowValidationRule> rules)
    {
        var list = rules.ToList();
        _all = list;
        _byCode = list
            .GroupBy(r => r.RuleCode, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
    }

    public IWorkflowValidationRule? Find(string? ruleCode)
    {
        if (string.IsNullOrWhiteSpace(ruleCode)) return null;
        return _byCode.TryGetValue(ruleCode, out var rule) ? rule : null;
    }

    public IReadOnlyList<IWorkflowValidationRule> All() => _all;
}
