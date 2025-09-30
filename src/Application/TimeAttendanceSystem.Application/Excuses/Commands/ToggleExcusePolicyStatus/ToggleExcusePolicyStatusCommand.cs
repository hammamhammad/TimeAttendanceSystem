using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ToggleExcusePolicyStatus;

/// <summary>
/// CQRS command for toggling an excuse policy's active status.
/// Handles policy activation/deactivation with validation and conflict resolution.
/// </summary>
/// <param name="Id">Excuse policy identifier to toggle</param>
/// <remarks>
/// Command Processing:
/// - Validates excuse policy exists and is not deleted
/// - Checks for activation conflicts (only one active policy per branch)
/// - Toggles the IsActive status
/// - Maintains audit trail for status changes
///
/// Business Rules Enforced:
/// - Only one active policy per branch allowed
/// - Cannot activate if another policy is already active for the same scope
/// - Deactivation is always allowed
///
/// Security Considerations:
/// - Requires appropriate permissions to toggle policy status
/// - Branch-scoped access control for multi-tenant environments
/// - Audit trail maintained for compliance
/// </remarks>
public record ToggleExcusePolicyStatusCommand(
    long Id
) : IRequest<Result<bool>>;