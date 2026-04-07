using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Succession;

public class TalentSkill : BaseEntity
{
    public long TalentProfileId { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public string? SkillNameAr { get; set; }
    public ProficiencyLevel ProficiencyLevel { get; set; }
    public int? YearsOfExperience { get; set; }
    public bool IsVerified { get; set; }
    public long? VerifiedByUserId { get; set; }
    public DateTime? VerifiedDate { get; set; }

    // Navigation
    public TalentProfile TalentProfile { get; set; } = null!;
}
