namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class WorkExperienceDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string? CompanyNameAr { get; set; }
    public string? JobTitle { get; set; }
    public string? JobTitleAr { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Responsibilities { get; set; }
    public string? ReasonForLeaving { get; set; }
    public string? Country { get; set; }
    public string? ReferenceContactName { get; set; }
    public string? ReferenceContactPhone { get; set; }
    public string? CertificateUrl { get; set; }
}
