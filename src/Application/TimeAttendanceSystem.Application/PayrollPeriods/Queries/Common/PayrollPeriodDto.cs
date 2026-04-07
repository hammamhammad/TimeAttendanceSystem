namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;

public class PayrollPeriodDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }
    public string? BranchName { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public int PeriodType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Status { get; set; }
    public decimal TotalGross { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TotalNet { get; set; }
    public int EmployeeCount { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class PayrollRecordDto
{
    public long Id { get; set; }
    public long PayrollPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public decimal BaseSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal GrossEarnings { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal SocialInsuranceEmployee { get; set; }
    public decimal OvertimePay { get; set; }
    public decimal AbsenceDeduction { get; set; }
    public decimal LoanDeduction { get; set; }
    public decimal NetSalary { get; set; }
    public int WorkingDays { get; set; }
    public int PaidDays { get; set; }
    public int Status { get; set; }
    public List<PayrollRecordDetailDto> Details { get; set; } = new();
}

public class PayrollRecordDetailDto
{
    public long Id { get; set; }
    public long? SalaryComponentId { get; set; }
    public string ComponentName { get; set; } = string.Empty;
    public string? ComponentNameAr { get; set; }
    public int ComponentType { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
}
