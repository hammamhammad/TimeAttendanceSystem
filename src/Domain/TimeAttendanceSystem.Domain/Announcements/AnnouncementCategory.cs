using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Announcements;

public class AnnouncementCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Icon { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();
}
