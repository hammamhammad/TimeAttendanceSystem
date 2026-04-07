using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class InvestigationAttachment : BaseEntity
{
    public long InvestigationId { get; set; }
    public long FileAttachmentId { get; set; }

    // Navigation
    public Investigation Investigation { get; set; } = null!;
    public FileAttachment FileAttachment { get; set; } = null!;
}
