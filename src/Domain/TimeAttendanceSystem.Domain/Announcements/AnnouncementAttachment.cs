using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Announcements;

public class AnnouncementAttachment : BaseEntity
{
    public long AnnouncementId { get; set; }
    public long FileAttachmentId { get; set; }
    public int SortOrder { get; set; }

    public Announcement Announcement { get; set; } = null!;
    public FileAttachment FileAttachment { get; set; } = null!;
}
