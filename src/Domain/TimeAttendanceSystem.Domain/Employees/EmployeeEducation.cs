using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeEducation : BaseEntity
{
    public long EmployeeId { get; set; }
    public EducationLevel Level { get; set; }
    public string InstitutionName { get; set; } = string.Empty;
    public string? InstitutionNameAr { get; set; }
    public string? Degree { get; set; }
    public string? DegreeAr { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? FieldOfStudyAr { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Grade { get; set; }
    public string? CertificateUrl { get; set; }
    public string? Country { get; set; }
    public bool IsHighestDegree { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
}
