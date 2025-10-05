using MediatR;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.CreateRemoteWorkPolicy;

/// <summary>
/// Command to create a new remote work policy for a branch or company-wide.
/// </summary>
public class CreateRemoteWorkPolicyCommand : IRequest<long>
{
    /// <summary>
    /// Branch ID for branch-specific policy, or null for company-wide policy.
    /// </summary>
    public long? BranchId { get; set; }
    public int? MaxDaysPerWeek { get; set; }
    public int? MaxDaysPerMonth { get; set; }
    public int? MaxDaysPerYear { get; set; }
    public bool RequiresManagerApproval { get; set; }
    public bool AllowConsecutiveDays { get; set; }
    public int? MaxConsecutiveDays { get; set; }
    public int? MinAdvanceNoticeDays { get; set; }
    public string? BlackoutPeriods { get; set; }
    public bool CountForOvertime { get; set; }
    public bool EnforceShiftTimes { get; set; }
    public bool IsActive { get; set; }
}