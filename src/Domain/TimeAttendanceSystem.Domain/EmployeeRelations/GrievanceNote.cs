using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.EmployeeRelations;

public class GrievanceNote : BaseEntity
{
    public long GrievanceId { get; set; }
    public long AuthorUserId { get; set; }
    public string Content { get; set; } = string.Empty;
    public bool IsInternal { get; set; } = true;

    // Navigation
    public Grievance Grievance { get; set; } = null!;
}
