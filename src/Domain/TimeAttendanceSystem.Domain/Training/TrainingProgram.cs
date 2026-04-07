using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingProgram : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? TargetAudience { get; set; }
    public string? TargetAudienceAr { get; set; }
    public decimal TotalDurationHours { get; set; }
    public TrainingProgramStatus Status { get; set; } = TrainingProgramStatus.Draft;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<TrainingProgramCourse> ProgramCourses { get; set; } = new List<TrainingProgramCourse>();
    public ICollection<TrainingEnrollment> Enrollments { get; set; } = new List<TrainingEnrollment>();
}
