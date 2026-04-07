using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingCourse : BaseEntity
{
    public long? TrainingCategoryId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Provider { get; set; }
    public string? ProviderAr { get; set; }
    public TrainingDeliveryMethod DeliveryMethod { get; set; }
    public decimal DurationHours { get; set; }
    public int? MaxParticipants { get; set; }
    public decimal? Cost { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Prerequisites { get; set; }
    public string? PrerequisitesAr { get; set; }
    public bool CertificationAwarded { get; set; }
    public string? CertificationName { get; set; }
    public int? CertificationValidityMonths { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public TrainingCategory? Category { get; set; }
    public ICollection<TrainingSession> Sessions { get; set; } = new List<TrainingSession>();
    public ICollection<TrainingProgramCourse> ProgramCourses { get; set; } = new List<TrainingProgramCourse>();
}
