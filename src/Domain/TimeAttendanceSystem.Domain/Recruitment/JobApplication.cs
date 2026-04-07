using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Recruitment;

public class JobApplication : BaseEntity
{
    public long CandidateId { get; set; }
    public long JobPostingId { get; set; }
    public ApplicationStatus Status { get; set; } = ApplicationStatus.New;
    public DateTime AppliedDate { get; set; }
    public string? CoverLetterUrl { get; set; }
    public string? ScreeningNotes { get; set; }
    public string? RejectionReason { get; set; }
    public string? RejectionReasonAr { get; set; }
    public long? ReviewedByUserId { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Candidate Candidate { get; set; } = null!;
    public JobPosting JobPosting { get; set; } = null!;
    public ICollection<InterviewSchedule> Interviews { get; set; } = new List<InterviewSchedule>();
    public OfferLetter? OfferLetter { get; set; }
}
