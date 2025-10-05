using MediatR;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.UpdateRemoteWorkPolicy;

/// <summary>
/// Command to update an existing remote work policy.
/// </summary>
public class UpdateRemoteWorkPolicyCommand : IRequest<Unit>
{
    public long Id { get; set; }
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
}