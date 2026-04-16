using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Lifecycle;

/// <summary>
/// Append-only audit row describing one lifecycle automation attempt.
/// Written by every lifecycle event handler (success, skip, duplicate, failure, disabled, missing-prerequisite).
/// Lets HR see at a glance whether a transition fired, was suppressed, or failed — and why.
/// </summary>
public class LifecycleAutomationAudit : BaseEntity
{
    public LifecycleAutomationType AutomationType { get; set; }

    /// <summary>Source entity that triggered the automation (e.g. "OfferLetter", "ResignationRequest").</summary>
    public string SourceEntityType { get; set; } = string.Empty;
    public long SourceEntityId { get; set; }

    /// <summary>Target entity created/updated by the automation (e.g. "OnboardingProcess"). Null when nothing was produced.</summary>
    public string? TargetEntityType { get; set; }
    public long? TargetEntityId { get; set; }

    public LifecycleAutomationStatus Status { get; set; }

    /// <summary>Human-readable reason for skipped / disabled / duplicate-suppressed / missing-prerequisite outcomes.</summary>
    public string? Reason { get; set; }

    /// <summary>Exception message when <see cref="Status"/> is Failed.</summary>
    public string? ErrorMessage { get; set; }

    public DateTime TriggeredAtUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }

    /// <summary>User who triggered the source command; null for background-job-driven transitions.</summary>
    public long? TriggeredByUserId { get; set; }

    /// <summary>JSON snapshot of decision inputs (config flag values, resolved template id, policy snapshot). Optional, forensic only.</summary>
    public string? ContextJson { get; set; }
}
