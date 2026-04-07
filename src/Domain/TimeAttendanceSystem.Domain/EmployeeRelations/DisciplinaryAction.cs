using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class DisciplinaryAction : BaseEntity
{
    public string ActionNumber { get; set; } = string.Empty;
    public long EmployeeId { get; set; }
    public DisciplinaryActionType ActionType { get; set; }
    public DisciplinarySeverity Severity { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public DisciplinaryActionStatus Status { get; set; } = DisciplinaryActionStatus.Draft;
    public DateTime IncidentDate { get; set; }
    public DateTime ActionDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsConfidential { get; set; } = true;
    public long? RelatedGrievanceId { get; set; }
    public long? RelatedInvestigationId { get; set; }
    public long IssuedByUserId { get; set; }
    public bool AcknowledgedByEmployee { get; set; } = false;
    public DateTime? AcknowledgedAt { get; set; }
    public bool AppealSubmitted { get; set; } = false;
    public string? AppealNotes { get; set; }
    public DateTime? AppealDate { get; set; }
    public DateTime? AppealResolvedDate { get; set; }
    public string? AppealOutcome { get; set; }
    public long? RelatedTerminationId { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Grievance? RelatedGrievance { get; set; }
    public Investigation? RelatedInvestigation { get; set; }
    public ICollection<DisciplinaryAttachment> DisciplinaryAttachments { get; set; } = new List<DisciplinaryAttachment>();
}
