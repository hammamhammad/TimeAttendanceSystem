using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Announcements;

public class Announcement : BaseEntity
{
    public long? AnnouncementCategoryId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ContentAr { get; set; }
    public AnnouncementPriority Priority { get; set; } = AnnouncementPriority.Normal;
    public AnnouncementStatus Status { get; set; } = AnnouncementStatus.Draft;
    public AnnouncementTargetAudience TargetAudience { get; set; } = AnnouncementTargetAudience.All;
    public string? TargetIds { get; set; } // JSON array of branch/department/role IDs
    public long? PublishedByUserId { get; set; }
    public DateTime? PublishedAt { get; set; }
    public DateTime? ScheduledPublishDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public bool IsPinned { get; set; }
    public bool RequiresAcknowledgment { get; set; }
    public bool SendNotification { get; set; } = true;

    public AnnouncementCategory? Category { get; set; }
    public ICollection<AnnouncementAcknowledgment> Acknowledgments { get; set; } = new List<AnnouncementAcknowledgment>();
    public ICollection<AnnouncementAttachment> Attachments { get; set; } = new List<AnnouncementAttachment>();
}
