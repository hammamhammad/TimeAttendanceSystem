using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Documents;

public class LetterTemplate : BaseEntity
{
    public LetterType LetterType { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Content { get; set; }
    public string? ContentAr { get; set; }
    public string? HeaderLogoUrl { get; set; }
    public string? FooterText { get; set; }
    public string? FooterTextAr { get; set; }
    public bool IsDefault { get; set; }
    public long? BranchId { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
}
