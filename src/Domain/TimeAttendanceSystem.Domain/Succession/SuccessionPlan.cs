using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Succession;

public class SuccessionPlan : BaseEntity
{
    public long KeyPositionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public SuccessionPlanStatus Status { get; set; }
    public DateTime EffectiveDate { get; set; }
    public DateTime? ReviewDate { get; set; }
    public long? ReviewedByUserId { get; set; }
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public KeyPosition KeyPosition { get; set; } = null!;
    public ICollection<SuccessionCandidate> Candidates { get; set; } = new List<SuccessionCandidate>();
}
