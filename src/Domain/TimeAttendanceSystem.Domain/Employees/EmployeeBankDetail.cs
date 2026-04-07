using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeBankDetail : BaseEntity
{
    public long EmployeeId { get; set; }
    public string BankName { get; set; } = string.Empty;
    public string? BankNameAr { get; set; }
    public string AccountHolderName { get; set; } = string.Empty;
    public string AccountNumber { get; set; } = string.Empty;
    public string? IBAN { get; set; }
    public string? SwiftCode { get; set; }
    public string? BranchName { get; set; }
    public string? Currency { get; set; } = "SAR";
    public bool IsPrimary { get; set; } = true;
    public bool IsActive { get; set; } = true;

    // Navigation
    public Employee Employee { get; set; } = null!;
}
