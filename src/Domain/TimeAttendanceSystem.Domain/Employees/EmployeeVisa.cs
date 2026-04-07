using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeVisa : BaseEntity
{
    public long EmployeeId { get; set; }
    public VisaType VisaType { get; set; }
    public string? VisaNumber { get; set; }
    public string? SponsorName { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string? IssuingCountry { get; set; }
    public VisaStatus Status { get; set; } = VisaStatus.Active;
    public string? DocumentUrl { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
}
