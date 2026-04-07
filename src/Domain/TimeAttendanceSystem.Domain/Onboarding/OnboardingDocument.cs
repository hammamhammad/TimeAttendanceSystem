using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Onboarding;

public class OnboardingDocument : BaseEntity
{
    public long OnboardingProcessId { get; set; }
    public string DocumentType { get; set; } = string.Empty;
    public string? DocumentTypeAr { get; set; }
    public string? DocumentName { get; set; }
    public bool IsRequired { get; set; } = true;
    public DocumentCollectionStatus Status { get; set; } = DocumentCollectionStatus.Pending;
    public string? FileUrl { get; set; }
    public DateTime? SubmittedDate { get; set; }
    public DateTime? VerifiedDate { get; set; }
    public long? VerifiedByUserId { get; set; }
    public string? RejectionReason { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public OnboardingProcess OnboardingProcess { get; set; } = null!;
}
