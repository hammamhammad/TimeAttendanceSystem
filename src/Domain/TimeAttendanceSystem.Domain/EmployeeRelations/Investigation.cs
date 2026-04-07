using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class Investigation : BaseEntity
{
    public string InvestigationNumber { get; set; } = string.Empty;
    public long SubjectEmployeeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public InvestigationStatus Status { get; set; } = InvestigationStatus.Open;
    public bool IsConfidential { get; set; } = true;
    public long InvestigatorUserId { get; set; }
    public long? RelatedGrievanceId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public string? Findings { get; set; }
    public string? FindingsAr { get; set; }
    public string? Recommendation { get; set; }
    public string? RecommendationAr { get; set; }

    // Navigation
    public Employee SubjectEmployee { get; set; } = null!;
    public Grievance? RelatedGrievance { get; set; }
    public ICollection<InvestigationNote> InvestigationNotes { get; set; } = new List<InvestigationNote>();
    public ICollection<InvestigationAttachment> InvestigationAttachments { get; set; } = new List<InvestigationAttachment>();
}
