namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries;

/// <summary>
/// DTO for remote work policy information.
/// </summary>
public class RemoteWorkPolicyDto
{
    public long Id { get; set; }
    public long? BranchId { get; set; } // Nullable - null means company-wide
    public string? BranchName { get; set; }
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
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
}