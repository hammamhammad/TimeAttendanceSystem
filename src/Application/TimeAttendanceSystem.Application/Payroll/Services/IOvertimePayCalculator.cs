using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Settings;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Overtime pay calculator — reuses the existing <c>OvertimeConfiguration</c>'s rates and methods.
/// Classifies each attendance day by <c>DayType</c> (Normal / PublicHoliday / OffDay) and applies
/// the corresponding multiplier per day. NEVER hardcodes 1.5x.
/// </summary>
public interface IOvertimePayCalculator
{
    void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result, decimal hourlyBasis);
}

public sealed class OvertimePayCalculator : IOvertimePayCalculator
{
    public void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result, decimal hourlyBasis)
    {
        if (hourlyBasis <= 0m)
        {
            result.OvertimePay = 0m;
            return;
        }

        var holidayDates = ctx.PublicHolidayDates;

        decimal totalPay = 0m;
        decimal totalRoundedHours = 0m;
        var perDayTypeHours = new Dictionary<DayType, decimal>
        {
            [DayType.Normal] = 0m,
            [DayType.PublicHoliday] = 0m,
            [DayType.OffDay] = 0m
        };

        foreach (var att in ctx.AttendanceRecords)
        {
            if (att.OvertimeHours <= 0) continue;

            // Normalize to Unspecified kind to match resolver's date set / map keys.
            var date = DateTime.SpecifyKind(att.AttendanceDate.Date, DateTimeKind.Unspecified);
            if (!ctx.OvertimeConfigByDate.TryGetValue(date, out var config))
            {
                result.Warnings.Add($"No overtime configuration active on {date:yyyy-MM-dd}; day skipped for OT.");
                continue;
            }

            // Day-type classification. Weekend-as-off-day comes from the overtime policy itself.
            DayType dayType;
            if (holidayDates.Contains(date))
                dayType = DayType.PublicHoliday;
            else if (config.WeekendAsOffDay && (date.DayOfWeek == DayOfWeek.Friday || date.DayOfWeek == DayOfWeek.Saturday))
                dayType = DayType.OffDay;
            else
                dayType = DayType.Normal;

            // Apply min-threshold and rounding using the entity's own methods (no duplication of logic).
            var rawMinutes = (int)(att.OvertimeHours * 60m);
            if (!config.MeetsMinimumThreshold(rawMinutes)) continue;

            var roundedHours = config.RoundOvertimeHours(att.OvertimeHours);
            if (roundedHours <= 0) continue;

            var rate = config.GetOvertimeRate(dayType);
            var pay = Math.Round(roundedHours * hourlyBasis * rate, 2, MidpointRounding.AwayFromZero);

            totalPay += pay;
            totalRoundedHours += roundedHours;
            perDayTypeHours[dayType] += roundedHours;
        }

        result.OvertimePay = totalPay;
        result.OvertimeHours = totalRoundedHours;

        // Line-itemize per day type — auditable breakdown.
        foreach (var kvp in perDayTypeHours.Where(k => k.Value > 0))
        {
            var hours = kvp.Value;
            var dayTypeLabel = kvp.Key switch
            {
                DayType.PublicHoliday => "Public-Holiday",
                DayType.OffDay => "Off-Day",
                _ => "Normal-Day"
            };
            var nameAr = kvp.Key switch
            {
                DayType.PublicHoliday => "إضافي - عطلة رسمية",
                DayType.OffDay => "إضافي - يوم راحة",
                _ => "إضافي - يوم عمل"
            };

            // Recompute pay portion for this day type using *weighted* OT pay (all days of same type share the same rate).
            var firstConfig = ctx.OvertimeConfigByDate.Values.FirstOrDefault();
            var rate = firstConfig?.GetOvertimeRate(kvp.Key) ?? 1m;
            var pay = Math.Round(hours * hourlyBasis * rate, 2, MidpointRounding.AwayFromZero);

            result.Details.Add(new PayrollRecordDetail
            {
                ComponentName = $"Overtime Pay ({dayTypeLabel})",
                ComponentNameAr = nameAr,
                ComponentType = SalaryComponentType.OtherAllowance,
                Amount = pay,
                Notes = $"{hours:F2}h @ {hourlyBasis:F2}/hr × {rate:F2}"
            });
        }
    }
}
