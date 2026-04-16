using FluentAssertions;
using TecAxle.Hrms.Application.Workflows.Validation;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Workflow.Tests;

/// <summary>
/// v13.6 — IWorkflowValidationRuleRegistry lookup semantics.
/// </summary>
public class ValidationRegistryTests
{
    private sealed class AlwaysPassRule : IWorkflowValidationRule
    {
        public string RuleCode => "always_pass";
        public string DisplayName => "Always Pass (test)";
        public Task<ValidationRuleResult> EvaluateAsync(WorkflowInstance _, WorkflowStep __, IReadOnlyDictionary<string, object?> ___, CancellationToken ____)
            => Task.FromResult(new ValidationRuleResult(true, "ok"));
    }

    private sealed class AlwaysFailRule : IWorkflowValidationRule
    {
        public string RuleCode => "always_fail";
        public string DisplayName => "Always Fail (test)";
        public Task<ValidationRuleResult> EvaluateAsync(WorkflowInstance _, WorkflowStep __, IReadOnlyDictionary<string, object?> ___, CancellationToken ____)
            => Task.FromResult(new ValidationRuleResult(false, "bad input"));
    }

    [Fact]
    public void Find_KnownCode_ReturnsRule()
    {
        var registry = new WorkflowValidationRuleRegistry(new IWorkflowValidationRule[] { new AlwaysPassRule(), new AlwaysFailRule() });
        registry.Find("always_pass").Should().NotBeNull();
        registry.Find("always_fail").Should().NotBeNull();
    }

    [Fact]
    public void Find_UnknownCode_ReturnsNull_ForFailClosedBehavior()
    {
        var registry = new WorkflowValidationRuleRegistry(new IWorkflowValidationRule[] { new AlwaysPassRule() });
        registry.Find("not_registered").Should().BeNull();
        registry.Find(null).Should().BeNull();
        registry.Find("").Should().BeNull();
    }

    [Fact]
    public void Find_IsCaseInsensitive()
    {
        var registry = new WorkflowValidationRuleRegistry(new IWorkflowValidationRule[] { new AlwaysPassRule() });
        registry.Find("ALWAYS_PASS").Should().NotBeNull();
        registry.Find("Always_Pass").Should().NotBeNull();
    }

    [Fact]
    public void All_ReturnsEveryRegisteredRule()
    {
        var registry = new WorkflowValidationRuleRegistry(new IWorkflowValidationRule[] { new AlwaysPassRule(), new AlwaysFailRule() });
        registry.All().Should().HaveCount(2);
        registry.All().Select(r => r.RuleCode).Should().BeEquivalentTo(new[] { "always_pass", "always_fail" });
    }
}
