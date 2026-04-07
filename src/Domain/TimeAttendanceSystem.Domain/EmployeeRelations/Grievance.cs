using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class Grievance : BaseEntity
{
    public string GrievanceNumber { get; set; } = string.Empty;
    public long EmployeeId { get; set; }
    public GrievanceType GrievanceType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public GrievancePriority Priority { get; set; }
    public GrievanceStatus Status { get; set; } = GrievanceStatus.Filed;
    public bool IsConfidential { get; set; } = false;
    public long? AssignedToUserId { get; set; }
    public long? AgainstEmployeeId { get; set; }
    public string? ResolutionSummary { get; set; }
    public string? ResolutionSummaryAr { get; set; }
    public DateTime? ResolutionDate { get; set; }
    public DateTime FiledDate { get; set; }
    public DateTime? DueDate { get; set; }
    public long? ClosedByUserId { get; set; }
    public long? EscalatedToUserId { get; set; }
    public DateTime? EscalationDate { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Employee? AgainstEmployee { get; set; }
    public ICollection<GrievanceNote> GrievanceNotes { get; set; } = new List<GrievanceNote>();
    public ICollection<GrievanceAttachment> GrievanceAttachments { get; set; } = new List<GrievanceAttachment>();
}
