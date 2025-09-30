using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteExcusePolicy;

/// <summary>
/// CQRS command for deleting an excuse policy (soft delete).
/// Handles policy deletion with validation and dependency checking.
/// </summary>
/// <param name="Id">Excuse policy identifier to delete</param>
/// <remarks>
/// Command Processing:
/// - Validates excuse policy exists and is not already deleted
/// - Checks for active excuse requests using this policy
/// - Performs soft delete to preserve historical data
/// - Maintains audit trail for deletion
///
/// Business Rules Enforced:
/// - Cannot delete policy with active excuse requests
/// - Soft delete preserves historical data integrity
/// - Audit trail maintained for compliance
///
/// Security Considerations:
/// - Requires appropriate permissions to delete policies
/// - Branch-scoped access control for multi-tenant environments
/// - Audit trail maintained for compliance
/// </remarks>
public record DeleteExcusePolicyCommand(
    long Id
) : IRequest<Result<bool>>;