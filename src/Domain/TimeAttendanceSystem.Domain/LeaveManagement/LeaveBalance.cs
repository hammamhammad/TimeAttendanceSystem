using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Domain.LeaveManagement;

/// <summary>
/// Represents the current leave balance for an employee for a specific vacation type.
/// Tracks accrued, used, and pending leave days.
/// </summary>
public class LeaveBalance
{
    /// <summary>
    /// Unique identifier for the leave balance.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Employee ID this balance belongs to.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Navigation property to Employee.
    /// </summary>
    public Employee Employee { get; set; } = null!;

    /// <summary>
    /// Vacation type ID this balance is for.
    /// </summary>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Navigation property to VacationType.
    /// </summary>
    public VacationType VacationType { get; set; } = null!;

    /// <summary>
    /// Year this balance applies to (e.g., 2025).
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Total entitled days for the year (annual + carry-over).
    /// </summary>
    public decimal EntitledDays { get; set; }

    /// <summary>
    /// Days accrued so far through monthly accrual.
    /// </summary>
    public decimal AccruedDays { get; set; } = 0;

    /// <summary>
    /// Days used (approved vacations).
    /// </summary>
    public decimal UsedDays { get; set; } = 0;

    /// <summary>
    /// Days reserved for pending vacation requests.
    /// </summary>
    public decimal PendingDays { get; set; } = 0;

    /// <summary>
    /// Manual adjustments (positive or negative).
    /// </summary>
    public decimal AdjustedDays { get; set; } = 0;

    /// <summary>
    /// Current available balance.
    /// Calculated as: AccruedDays + AdjustedDays - UsedDays - PendingDays
    /// </summary>
    public decimal CurrentBalance => AccruedDays + AdjustedDays - UsedDays - PendingDays;

    /// <summary>
    /// Date of last accrual processing.
    /// </summary>
    public DateTime? LastAccrualDate { get; set; }

    /// <summary>
    /// Timestamp when the balance was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Timestamp when the balance was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// Navigation property to leave transactions.
    /// </summary>
    public ICollection<LeaveTransaction> Transactions { get; set; } = new List<LeaveTransaction>();

    /// <summary>
    /// Checks if employee has sufficient balance for a vacation request.
    /// </summary>
    /// <param name="requestedDays">Number of days requested</param>
    /// <returns>True if balance is sufficient</returns>
    public bool HasSufficientBalance(decimal requestedDays)
    {
        return CurrentBalance >= requestedDays;
    }

    /// <summary>
    /// Reserves balance for a pending vacation request.
    /// </summary>
    /// <param name="days">Number of days to reserve</param>
    public void ReserveBalance(decimal days)
    {
        if (days < 0)
            throw new ArgumentException("Days to reserve cannot be negative", nameof(days));

        if (!HasSufficientBalance(days))
            throw new InvalidOperationException($"Insufficient balance. Available: {CurrentBalance}, Requested: {days}");

        PendingDays += days;
        ModifiedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Releases reserved balance (when vacation is cancelled or rejected).
    /// </summary>
    /// <param name="days">Number of days to release</param>
    public void ReleaseReservedBalance(decimal days)
    {
        if (days < 0)
            throw new ArgumentException("Days to release cannot be negative", nameof(days));

        if (days > PendingDays)
            throw new InvalidOperationException($"Cannot release more than reserved. Reserved: {PendingDays}, Requested: {days}");

        PendingDays -= days;
        ModifiedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Confirms usage of balance (when vacation is approved).
    /// Moves from pending to used.
    /// </summary>
    /// <param name="days">Number of days to confirm as used</param>
    public void ConfirmUsage(decimal days)
    {
        if (days < 0)
            throw new ArgumentException("Days to confirm cannot be negative", nameof(days));

        if (days > PendingDays)
            throw new InvalidOperationException($"Cannot confirm more than reserved. Reserved: {PendingDays}, Requested: {days}");

        PendingDays -= days;
        UsedDays += days;
        ModifiedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Processes monthly accrual.
    /// </summary>
    /// <param name="monthlyAccrualAmount">Amount to accrue this month</param>
    public void ProcessMonthlyAccrual(decimal monthlyAccrualAmount)
    {
        if (monthlyAccrualAmount < 0)
            throw new ArgumentException("Monthly accrual amount cannot be negative", nameof(monthlyAccrualAmount));

        // Don't accrue more than entitled (with adjustments)
        var maxAllowedAccrual = EntitledDays + AdjustedDays;
        var newAccruedTotal = AccruedDays + monthlyAccrualAmount;

        if (newAccruedTotal > maxAllowedAccrual)
        {
            // Cap at max allowed
            monthlyAccrualAmount = Math.Max(0, maxAllowedAccrual - AccruedDays);
        }

        AccruedDays += monthlyAccrualAmount;
        LastAccrualDate = DateTime.UtcNow.Date;
        ModifiedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Applies manual adjustment to balance.
    /// </summary>
    /// <param name="adjustmentDays">Adjustment amount (positive or negative)</param>
    public void ApplyAdjustment(decimal adjustmentDays)
    {
        AdjustedDays += adjustmentDays;
        ModifiedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Validates the leave balance.
    /// </summary>
    /// <returns>Validation result with errors if any</returns>
    public (bool IsValid, List<string> Errors) Validate()
    {
        var errors = new List<string>();

        if (EmployeeId <= 0)
            errors.Add("Employee ID is required");

        if (VacationTypeId <= 0)
            errors.Add("Vacation Type ID is required");

        if (Year < 2000 || Year > 2100)
            errors.Add("Year must be between 2000 and 2100");

        if (EntitledDays < 0)
            errors.Add("Entitled days cannot be negative");

        if (AccruedDays < 0)
            errors.Add("Accrued days cannot be negative");

        if (UsedDays < 0)
            errors.Add("Used days cannot be negative");

        if (PendingDays < 0)
            errors.Add("Pending days cannot be negative");

        // Accrued should not exceed entitled (unless adjustments are very large)
        var maxExpected = EntitledDays + Math.Abs(AdjustedDays) + 100; // Allow some buffer for adjustments
        if (AccruedDays > maxExpected)
            errors.Add($"Accrued days ({AccruedDays}) exceeds expected maximum ({maxExpected})");

        return (errors.Count == 0, errors);
    }
}
