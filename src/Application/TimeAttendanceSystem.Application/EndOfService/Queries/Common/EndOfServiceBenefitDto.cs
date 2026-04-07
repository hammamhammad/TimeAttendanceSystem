namespace TecAxle.Hrms.Application.EndOfService.Queries.Common;

public class EndOfServiceBenefitDto
{
    public long Id { get; set; }
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public int ServiceYears { get; set; }
    public int ServiceMonths { get; set; }
    public int ServiceDays { get; set; }
    public decimal BasicSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal CalculationBasis { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal DeductionAmount { get; set; }
    public decimal NetAmount { get; set; }
    public string? CalculationDetails { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
