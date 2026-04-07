using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class InvestigationNote : BaseEntity
{
    public long InvestigationId { get; set; }
    public long AuthorUserId { get; set; }
    public string Content { get; set; } = string.Empty;
    public bool IsInternal { get; set; } = true;

    // Navigation
    public Investigation Investigation { get; set; } = null!;
}
