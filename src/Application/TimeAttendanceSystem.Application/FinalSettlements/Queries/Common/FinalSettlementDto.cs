using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Queries.Common;

public class FinalSettlementDto
{
    public long Id { get; set; }
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public decimal BasicSalaryDue { get; set; }
    public decimal AllowancesDue { get; set; }
    public decimal LeaveEncashmentAmount { get; set; }
    public int LeaveEncashmentDays { get; set; }
    public decimal EndOfServiceAmount { get; set; }
    public decimal OvertimeDue { get; set; }
    public decimal LoanOutstanding { get; set; }
    public decimal AdvanceOutstanding { get; set; }
    public decimal OtherDeductions { get; set; }
    public decimal OtherAdditions { get; set; }
    public decimal GrossSettlement { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetSettlement { get; set; }
    public SettlementStatus Status { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? CalculationDetails { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
