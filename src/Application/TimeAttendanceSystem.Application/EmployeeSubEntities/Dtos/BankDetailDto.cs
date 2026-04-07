namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class BankDetailDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string BankName { get; set; } = string.Empty;
    public string? BankNameAr { get; set; }
    public string AccountHolderName { get; set; } = string.Empty;
    public string AccountNumber { get; set; } = string.Empty;
    public string? IBAN { get; set; }
    public string? SwiftCode { get; set; }
    public string? BranchName { get; set; }
    public string? Currency { get; set; }
    public bool IsPrimary { get; set; }
    public bool IsActive { get; set; }
}
