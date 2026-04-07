using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Recruitment;

public class JobPosting : BaseEntity
{
    public long JobRequisitionId { get; set; }
    public string PostingTitle { get; set; } = string.Empty;
    public string? PostingTitleAr { get; set; }
    public string? ExternalDescription { get; set; }
    public string? ExternalDescriptionAr { get; set; }
    public string? Responsibilities { get; set; }
    public string? ResponsibilitiesAr { get; set; }
    public string? Benefits { get; set; }
    public string? BenefitsAr { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public bool IsInternal { get; set; }
    public bool IsPublished { get; set; }
    public DateTime? PublishDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public int ApplicationCount { get; set; }
    public JobPostingStatus Status { get; set; } = JobPostingStatus.Draft;
    public string? Notes { get; set; }

    // Navigation
    public JobRequisition JobRequisition { get; set; } = null!;
    public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
}
