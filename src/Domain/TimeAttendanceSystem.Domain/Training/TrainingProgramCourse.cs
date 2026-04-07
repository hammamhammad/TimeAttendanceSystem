using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingProgramCourse : BaseEntity
{
    public long TrainingProgramId { get; set; }
    public long TrainingCourseId { get; set; }
    public int SequenceOrder { get; set; }
    public bool IsRequired { get; set; } = true;

    // Navigation
    public TrainingProgram Program { get; set; } = null!;
    public TrainingCourse Course { get; set; } = null!;
}
