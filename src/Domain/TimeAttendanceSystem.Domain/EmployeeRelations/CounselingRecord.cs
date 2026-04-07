using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class CounselingRecord : BaseEntity
{
    public long EmployeeId { get; set; }
    public long CounselorUserId { get; set; }
    public DateTime SessionDate { get; set; }
    public CounselingType SessionType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string? Notes { get; set; }
    public bool IsConfidential { get; set; } = true;
    public bool FollowUpRequired { get; set; } = false;
    public DateTime? FollowUpDate { get; set; }
    public bool FollowUpCompleted { get; set; } = false;
    public long? RelatedDisciplinaryActionId { get; set; }
    public long? RelatedGrievanceId { get; set; }
    public string? Outcome { get; set; }
    public string? OutcomeAr { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public DisciplinaryAction? RelatedDisciplinaryAction { get; set; }
    public Grievance? RelatedGrievance { get; set; }
}
