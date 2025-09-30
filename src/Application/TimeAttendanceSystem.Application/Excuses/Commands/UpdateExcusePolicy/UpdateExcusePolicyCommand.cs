using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.UpdateExcusePolicy;

/// <summary>
/// CQRS command for updating an existing excuse policy configuration.
/// Handles excuse policy updates with validation and business rule enforcement.
/// </summary>
/// <param name="Id">Excuse policy identifier to update</param>
/// <param name="BranchId">Optional branch identifier for branch-specific policy (null for organization-wide)</param>
/// <param name="MaxPersonalExcusesPerMonth">Maximum personal excuses allowed per month</param>
/// <param name="MaxPersonalExcuseHoursPerMonth">Maximum personal excuse hours allowed per month</param>
/// <param name="MaxPersonalExcuseHoursPerDay">Maximum personal excuse hours allowed per day</param>
/// <param name="MaxHoursPerExcuse">Maximum hours allowed per individual excuse</param>
/// <param name="RequiresApproval">Whether personal excuses require approval</param>
/// <param name="AllowPartialHourExcuses">Whether partial hour excuses are allowed</param>
/// <param name="MinimumExcuseDuration">Minimum duration in hours for an excuse</param>
/// <param name="MaxRetroactiveDays">Maximum days in the past for retroactive excuse requests</param>
/// <param name="AllowSelfServiceRequests">Whether employees can request excuses via self-service</param>
/// <param name="IsActive">Whether this policy is active</param>
/// <remarks>
/// Command Processing:
/// - Validates excuse policy exists and is not deleted
/// - Validates branch exists if BranchId is provided
/// - Validates business rule consistency (daily vs monthly limits)
/// - Updates policy with provided values
/// - Maintains audit trail for changes
///
/// Business Rules Enforced:
/// - Daily limit must not exceed monthly limit
/// - Single excuse limit must not exceed daily limit
/// - Minimum duration must not exceed maximum hours per excuse
/// - Cannot change branch scope of existing policy
/// - Only one active policy per branch allowed
///
/// Security Considerations:
/// - Requires appropriate permissions to update policies
/// - Branch-scoped access control for multi-tenant environments
/// - Audit trail maintained for compliance
/// </remarks>
public record UpdateExcusePolicyCommand(
    long Id,
    long? BranchId,
    int MaxPersonalExcusesPerMonth,
    decimal MaxPersonalExcuseHoursPerMonth,
    decimal MaxPersonalExcuseHoursPerDay,
    decimal MaxHoursPerExcuse,
    bool RequiresApproval = true,
    bool AllowPartialHourExcuses = true,
    decimal MinimumExcuseDuration = 0.5m,
    int MaxRetroactiveDays = 7,
    bool AllowSelfServiceRequests = true,
    bool IsActive = true
) : IRequest<Result<bool>>;