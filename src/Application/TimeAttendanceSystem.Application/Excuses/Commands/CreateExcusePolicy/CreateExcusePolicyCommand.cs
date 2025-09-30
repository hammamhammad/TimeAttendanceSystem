using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.CreateExcusePolicy;

/// <summary>
/// CQRS command for creating a new excuse policy configuration.
/// Handles excuse policy creation with validation and business rule enforcement.
/// </summary>
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
/// <remarks>
/// Command Processing:
/// - Validates branch exists if BranchId is provided
/// - Validates business rule consistency (daily vs monthly limits)
/// - Checks for conflicting active policies for same branch
/// - Creates policy with automatic activation
/// - Deactivates previous policy if replacing
///
/// Business Rules Enforced:
/// - Daily limit must not exceed monthly limit
/// - Single excuse limit must not exceed daily limit
/// - Minimum duration must not exceed maximum hours per excuse
/// - Only one active policy per branch allowed
/// - Organization-wide policy conflicts with branch-specific policies
///
/// Integration Effects:
/// - Active policy used for excuse validation
/// - Previous policies deactivated automatically
/// - Policy hierarchy: Branch-specific overrides organization-wide
/// </remarks>
public record CreateExcusePolicyCommand(
    long? BranchId,
    int MaxPersonalExcusesPerMonth,
    decimal MaxPersonalExcuseHoursPerMonth,
    decimal MaxPersonalExcuseHoursPerDay,
    decimal MaxHoursPerExcuse,
    bool RequiresApproval = true,
    bool AllowPartialHourExcuses = true,
    decimal MinimumExcuseDuration = 0.5m,
    int MaxRetroactiveDays = 7,
    bool AllowSelfServiceRequests = true
) : IRequest<Result<long>>;