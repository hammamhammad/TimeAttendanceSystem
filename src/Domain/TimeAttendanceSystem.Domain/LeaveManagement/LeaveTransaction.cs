namespace TimeAttendanceSystem.Domain.LeaveManagement;

/// <summary>
/// Represents a single transaction affecting leave balance.
/// Provides complete audit trail of all balance changes.
/// </summary>
public class LeaveTransaction
{
    /// <summary>
    /// Unique identifier for the transaction.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Leave balance ID this transaction affects.
    /// </summary>
    public long LeaveBalanceId { get; set; }

    /// <summary>
    /// Navigation property to LeaveBalance.
    /// </summary>
    public LeaveBalance LeaveBalance { get; set; } = null!;

    /// <summary>
    /// Type of transaction (Accrual, Usage, Adjustment, etc.).
    /// </summary>
    public LeaveTransactionType TransactionType { get; set; }

    /// <summary>
    /// Number of days affected (positive for accrual/adjustment in, negative for usage/adjustment out).
    /// </summary>
    public decimal Days { get; set; }

    /// <summary>
    /// Reference type that caused this transaction (e.g., "Vacation", "Adjustment", "MonthlyAccrual").
    /// </summary>
    public string? ReferenceType { get; set; }

    /// <summary>
    /// Reference ID of the entity that caused this transaction (e.g., Vacation ID).
    /// </summary>
    public long? ReferenceId { get; set; }

    /// <summary>
    /// Notes or comments about this transaction.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Date when the transaction occurred (business date, not timestamp).
    /// </summary>
    public DateTime TransactionDate { get; set; }

    /// <summary>
    /// Timestamp when the transaction was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// User ID who created this transaction.
    /// </summary>
    public string? CreatedBy { get; set; }

    /// <summary>
    /// Balance values after this transaction (for audit purposes).
    /// </summary>
    public decimal? BalanceAfterTransaction { get; set; }

    /// <summary>
    /// Creates a transaction record for monthly accrual.
    /// </summary>
    public static LeaveTransaction CreateAccrualTransaction(
        long leaveBalanceId,
        decimal days,
        DateTime accrualDate,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.Accrual,
            Days = days,
            ReferenceType = "MonthlyAccrual",
            TransactionDate = accrualDate,
            Notes = $"Monthly accrual for {accrualDate:MMMM yyyy}",
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Creates a transaction record for vacation usage.
    /// </summary>
    public static LeaveTransaction CreateUsageTransaction(
        long leaveBalanceId,
        decimal days,
        long vacationId,
        DateTime usageDate,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.Usage,
            Days = -days, // Negative for usage
            ReferenceType = "Vacation",
            ReferenceId = vacationId,
            TransactionDate = usageDate,
            Notes = $"Leave used for vacation #{vacationId}",
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Creates a transaction record for balance reservation (pending vacation).
    /// </summary>
    public static LeaveTransaction CreateReservationTransaction(
        long leaveBalanceId,
        decimal days,
        long vacationId,
        DateTime reservationDate,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.Reservation,
            Days = -days, // Negative for reservation
            ReferenceType = "Vacation",
            ReferenceId = vacationId,
            TransactionDate = reservationDate,
            Notes = $"Balance reserved for pending vacation #{vacationId}",
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Creates a transaction record for releasing reserved balance.
    /// </summary>
    public static LeaveTransaction CreateReservationReleaseTransaction(
        long leaveBalanceId,
        decimal days,
        long vacationId,
        DateTime releaseDate,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.ReservationRelease,
            Days = days, // Positive to release
            ReferenceType = "Vacation",
            ReferenceId = vacationId,
            TransactionDate = releaseDate,
            Notes = $"Balance released from cancelled/rejected vacation #{vacationId}",
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Creates a transaction record for manual adjustment.
    /// </summary>
    public static LeaveTransaction CreateAdjustmentTransaction(
        long leaveBalanceId,
        decimal days,
        DateTime adjustmentDate,
        string notes,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.Adjustment,
            Days = days, // Can be positive or negative
            ReferenceType = "ManualAdjustment",
            TransactionDate = adjustmentDate,
            Notes = notes,
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Creates a transaction record for carry-over from previous year.
    /// </summary>
    public static LeaveTransaction CreateCarryOverTransaction(
        long leaveBalanceId,
        decimal days,
        DateTime carryOverDate,
        int previousYear,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.CarryOver,
            Days = days,
            ReferenceType = "YearEndCarryOver",
            TransactionDate = carryOverDate,
            Notes = $"Carry-over from {previousYear}",
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Creates a transaction record for year-end reset.
    /// </summary>
    public static LeaveTransaction CreateResetTransaction(
        long leaveBalanceId,
        decimal days,
        DateTime resetDate,
        string? createdBy = null)
    {
        return new LeaveTransaction
        {
            LeaveBalanceId = leaveBalanceId,
            TransactionType = LeaveTransactionType.Reset,
            Days = -days, // Negative to remove
            ReferenceType = "YearEndReset",
            TransactionDate = resetDate,
            Notes = $"Year-end reset (use-it-or-lose-it)",
            CreatedBy = createdBy
        };
    }

    /// <summary>
    /// Validates the transaction.
    /// </summary>
    /// <returns>Validation result with errors if any</returns>
    public (bool IsValid, List<string> Errors) Validate()
    {
        var errors = new List<string>();

        if (LeaveBalanceId <= 0)
            errors.Add("Leave Balance ID is required");

        if (Days == 0)
            errors.Add("Transaction days cannot be zero");

        if (TransactionDate == default)
            errors.Add("Transaction date is required");

        if (TransactionDate > DateTime.UtcNow.AddDays(1))
            errors.Add("Transaction date cannot be in the future");

        return (errors.Count == 0, errors);
    }
}
