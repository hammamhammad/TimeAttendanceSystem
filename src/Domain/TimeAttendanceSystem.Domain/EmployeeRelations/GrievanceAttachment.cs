using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class GrievanceAttachment : BaseEntity
{
    public long GrievanceId { get; set; }
    public long FileAttachmentId { get; set; }

    // Navigation
    public Grievance Grievance { get; set; } = null!;
    public FileAttachment FileAttachment { get; set; } = null!;
}
