using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class VisaDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public VisaType VisaType { get; set; }
    public string? VisaNumber { get; set; }
    public string? SponsorName { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string? IssuingCountry { get; set; }
    public VisaStatus Status { get; set; }
    public string? DocumentUrl { get; set; }
    public string? Notes { get; set; }
}
