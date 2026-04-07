using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Documents;

public class DocumentCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<EmployeeDocument> Documents { get; set; } = new List<EmployeeDocument>();
    public ICollection<CompanyPolicy> Policies { get; set; } = new List<CompanyPolicy>();
}
