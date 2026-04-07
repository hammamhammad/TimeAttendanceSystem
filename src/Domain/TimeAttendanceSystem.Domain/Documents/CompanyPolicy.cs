using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Documents;

public class CompanyPolicy : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? DocumentCategoryId { get; set; }
    public string? DocumentUrl { get; set; }
    public string? Version { get; set; }
    public DateTime? EffectiveDate { get; set; }
    public PolicyStatus Status { get; set; } = PolicyStatus.Draft;
    public bool RequiresAcknowledgment { get; set; }
    public long? PublishedByUserId { get; set; }

    // Navigation
    public DocumentCategory? DocumentCategory { get; set; }
    public ICollection<PolicyAcknowledgment> Acknowledgments { get; set; } = new List<PolicyAcknowledgment>();
}
