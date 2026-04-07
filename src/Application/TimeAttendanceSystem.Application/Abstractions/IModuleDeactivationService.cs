using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Orchestrates safe module deactivation and reactivation for a tenant.
/// When a module is deactivated, in-flight workflows are frozen and entitlement changes are logged.
/// When reactivated, frozen workflows resume.
/// </summary>
public interface IModuleDeactivationService
{
    /// <summary>
    /// Deactivates a module for a tenant: freezes in-flight workflows, logs the change.
    /// </summary>
    Task DeactivateModuleAsync(long tenantId, SystemModule module, string reason, string performedBy, long? performedByUserId, CancellationToken ct = default);

    /// <summary>
    /// Reactivates a module for a tenant: unfreezes workflows, logs the change.
    /// </summary>
    Task ReactivateModuleAsync(long tenantId, SystemModule module, string performedBy, long? performedByUserId, CancellationToken ct = default);
}
