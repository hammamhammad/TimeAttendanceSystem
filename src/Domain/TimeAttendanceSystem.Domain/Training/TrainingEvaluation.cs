using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingEvaluation : BaseEntity
{
    public long TrainingSessionId { get; set; }
    public long EmployeeId { get; set; }
    public int OverallRating { get; set; }
    public int? ContentRating { get; set; }
    public int? InstructorRating { get; set; }
    public int? MaterialRating { get; set; }
    public string? Comments { get; set; }
    public string? CommentsAr { get; set; }
    public DateTime SubmittedAt { get; set; }

    // Navigation
    public TrainingSession Session { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
