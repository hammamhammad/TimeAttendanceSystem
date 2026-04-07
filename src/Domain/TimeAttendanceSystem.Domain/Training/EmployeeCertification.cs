using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Training;

public class EmployeeCertification : BaseEntity
{
    public long EmployeeId { get; set; }
    public long? TrainingCourseId { get; set; }
    public string CertificationName { get; set; } = string.Empty;
    public string? CertificationNameAr { get; set; }
    public string? IssuingAuthority { get; set; }
    public string? IssuingAuthorityAr { get; set; }
    public string? CertificationNumber { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public CertificationStatus Status { get; set; } = CertificationStatus.Active;
    public string? DocumentUrl { get; set; }
    public bool RenewalRequired { get; set; }
    public int? RenewalReminderDays { get; set; } = 30;
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public TrainingCourse? Course { get; set; }
}
