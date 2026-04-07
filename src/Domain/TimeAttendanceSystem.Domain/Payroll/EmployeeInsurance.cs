using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Payroll;

public class EmployeeInsurance : BaseEntity
{
    public long EmployeeId { get; set; }
    public long InsuranceProviderId { get; set; }
    public string? MembershipNumber { get; set; }
    public InsuranceClass InsuranceClass { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? MonthlyPremium { get; set; }
    public decimal? EmployeeContribution { get; set; }
    public decimal? EmployerContribution { get; set; }
    public bool IncludesDependents { get; set; }
    public int? CoveredDependentsCount { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public InsuranceProvider InsuranceProvider { get; set; } = null!;
}
