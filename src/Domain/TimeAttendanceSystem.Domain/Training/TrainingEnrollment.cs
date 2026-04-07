using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingEnrollment : BaseEntity
{
    public long EmployeeId { get; set; }
    public long? TrainingSessionId { get; set; }
    public long? TrainingProgramId { get; set; }
    public TrainingEnrollmentStatus Status { get; set; } = TrainingEnrollmentStatus.Pending;
    public long? EnrolledByUserId { get; set; }
    public DateTime EnrolledAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public string? CancellationReason { get; set; }
    public long? WorkflowInstanceId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public TrainingSession? Session { get; set; }
    public TrainingProgram? Program { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
