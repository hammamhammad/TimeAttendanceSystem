using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class DisciplinaryAttachment : BaseEntity
{
    public long DisciplinaryActionId { get; set; }
    public long FileAttachmentId { get; set; }

    // Navigation
    public DisciplinaryAction DisciplinaryAction { get; set; } = null!;
    public FileAttachment FileAttachment { get; set; } = null!;
}
