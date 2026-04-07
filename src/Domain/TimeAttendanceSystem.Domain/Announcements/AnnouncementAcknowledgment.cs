using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Announcements;

public class AnnouncementAcknowledgment : BaseEntity
{
    public long AnnouncementId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime AcknowledgedAt { get; set; }
    public string? IpAddress { get; set; }

    public Announcement Announcement { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
