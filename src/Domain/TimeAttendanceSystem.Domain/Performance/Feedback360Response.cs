using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Performance;

public class Feedback360Response : BaseEntity
{
    public long FeedbackRequest360Id { get; set; }
    public string? Ratings { get; set; }  // JSON: {competencyId: rating, ...}
    public string? Strengths { get; set; }
    public string? AreasForImprovement { get; set; }
    public string? AdditionalComments { get; set; }
    public bool IsAnonymous { get; set; } = true;

    // Navigation
    public FeedbackRequest360 FeedbackRequest { get; set; } = null!;
}
