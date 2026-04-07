using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class InsuranceProvider : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? ContactPerson { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? PolicyNumber { get; set; }
    public InsuranceType InsuranceType { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<EmployeeInsurance> EmployeeInsurances { get; set; } = new List<EmployeeInsurance>();
}
