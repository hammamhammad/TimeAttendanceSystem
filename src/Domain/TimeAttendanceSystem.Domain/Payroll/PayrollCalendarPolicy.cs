using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

/// <summary>
/// Tenant/branch policy that controls how payroll derives the daily-rate basis and the hourly basis.
/// Eliminates the historical hardcoded 30-day / 8-hour assumptions in the payroll calculator.
/// Branch-level policies (BranchId set) override the tenant default (BranchId null) when both overlap the period.
/// </summary>
public class PayrollCalendarPolicy : BaseEntity
{
    public long? BranchId { get; set; }

    /// <summary>
    /// How the daily rate basis is derived:
    ///   CalendarDays  — actual calendar days in the period (28/29/30/31).
    ///   WorkingDays   — calendar days minus off-days and (optionally) unpaid public holidays.
    ///   FixedBasis    — a constant number of days (legacy 30-day compatibility uses this).
    /// </summary>
    public PayrollDailyBasisType BasisType { get; set; } = PayrollDailyBasisType.CalendarDays;

    /// <summary>
    /// Used only when <see cref="BasisType"/> is <see cref="PayrollDailyBasisType.FixedBasis"/>.
    /// Defaults to 30 to preserve pre-fix behavior when an admin opts into fixed basis.
    /// </summary>
    public int? FixedBasisDays { get; set; }

    /// <summary>
    /// Standard hours in one working day. Drives the hourly basis used by the overtime calculator.
    /// </summary>
    public decimal StandardHoursPerDay { get; set; } = 8m;

    /// <summary>
    /// When true, public holidays count as paid days and are not subtracted from the working-day basis.
    /// </summary>
    public bool TreatPublicHolidaysAsPaid { get; set; } = true;

    public DateTime EffectiveFromDate { get; set; } = DateTime.UtcNow;
    public DateTime? EffectiveToDate { get; set; }
    public bool IsActive { get; set; } = true;

    public Branch? Branch { get; set; }
}
