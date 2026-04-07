using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Common.Behaviors;

/// <summary>
/// Marks a MediatR request (typically create commands) as requiring a usage limit check.
/// Applied to command classes. Checked by UsageLimitBehavior in the MediatR pipeline.
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class RequiresLimitAttribute : Attribute
{
    public LimitType LimitType { get; }

    public RequiresLimitAttribute(LimitType limitType)
    {
        LimitType = limitType;
    }
}
