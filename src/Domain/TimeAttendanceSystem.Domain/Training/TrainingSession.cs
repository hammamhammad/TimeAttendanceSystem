using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingSession : BaseEntity
{
    public long TrainingCourseId { get; set; }
    public long? TrainingProgramId { get; set; }
    public string? Title { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public string? InstructorName { get; set; }
    public string? InstructorNameAr { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }
    public int? MaxParticipants { get; set; }
    public TrainingSessionStatus Status { get; set; } = TrainingSessionStatus.Scheduled;
    public string? Notes { get; set; }
    public long? BranchId { get; set; }

    // Navigation
    public TrainingCourse Course { get; set; } = null!;
    public TrainingProgram? Program { get; set; }
    public Branch? Branch { get; set; }
    public ICollection<TrainingEnrollment> Enrollments { get; set; } = new List<TrainingEnrollment>();
    public ICollection<TrainingAttendance> Attendances { get; set; } = new List<TrainingAttendance>();
}
