using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Benefits;

public class BenefitDependent : BaseEntity
{
    public long BenefitEnrollmentId { get; set; }
    public long? EmployeeDependentId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string? LastNameAr { get; set; }
    public DependentRelationship Relationship { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? NationalId { get; set; }
    public DateTime CoverageStartDate { get; set; }
    public DateTime? CoverageEndDate { get; set; }
    public decimal AdditionalPremium { get; set; }
    public string Currency { get; set; } = "SAR";
    public bool IsActive { get; set; } = true;

    // Navigation
    public BenefitEnrollment BenefitEnrollment { get; set; } = null!;
    public EmployeeDependent? EmployeeDependent { get; set; }
}
