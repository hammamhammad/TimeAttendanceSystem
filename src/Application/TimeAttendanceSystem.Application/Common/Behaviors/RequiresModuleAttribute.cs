using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Common.Behaviors;

/// <summary>
/// Marks a MediatR request as requiring a specific module to be enabled in the tenant's subscription.
/// Applied to command/query classes. Checked by ModuleEntitlementBehavior in the MediatR pipeline.
/// </summary>
/// <remarks>
/// When <see cref="AllowReadWhenDisabled"/> is true (intended for queries), the request is allowed
/// even when the module is disabled — enabling read-only access to historical data after a downgrade.
/// Commands should always use the default (false) to fully block writes for disabled modules.
/// </remarks>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class RequiresModuleAttribute : Attribute
{
    public SystemModule Module { get; }

    /// <summary>
    /// When true, the request is allowed even when the module is disabled (for read-only historical access).
    /// Defaults to false (fully blocked).
    /// </summary>
    public bool AllowReadWhenDisabled { get; set; }

    public RequiresModuleAttribute(SystemModule module)
    {
        Module = module;
    }
}
