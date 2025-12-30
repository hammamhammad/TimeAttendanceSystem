using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveTransactionHistory;

/// <summary>
/// Data Transfer Object representing a leave balance transaction.
/// Provides complete audit trail information for balance changes.
/// </summary>
public class LeaveTransactionDto
{
    public long Id { get; set; }
    public long LeaveBalanceId { get; set; }
    public LeaveTransactionType TransactionType { get; set; }
    public string TransactionTypeName { get; set; } = string.Empty;
    public decimal Days { get; set; }
    public string? ReferenceType { get; set; }
    public long? ReferenceId { get; set; }
    public string? Notes { get; set; }
    public DateTime TransactionDate { get; set; }
    public decimal? BalanceAfterTransaction { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string? CreatedBy { get; set; }
}
