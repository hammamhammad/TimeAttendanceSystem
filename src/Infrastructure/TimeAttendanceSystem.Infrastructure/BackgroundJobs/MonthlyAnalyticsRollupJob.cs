using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Analytics;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that aggregates daily analytics snapshots into monthly summaries.
/// Runs on the 1st of each month at 2:00 AM UTC. Computes averages and totals
/// from the previous month's daily snapshots.
/// </summary>
public class MonthlyAnalyticsRollupJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<MonthlyAnalyticsRollupJob> _logger;

    public MonthlyAnalyticsRollupJob(IApplicationDbContext context, ILogger<MonthlyAnalyticsRollupJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting monthly analytics rollup job at {Time}", DateTime.UtcNow);

        try
        {
            // Aggregate the previous month
            var today = DateTime.UtcNow.Date;
            var previousMonth = today.AddMonths(-1);
            var monthStart = new DateTime(previousMonth.Year, previousMonth.Month, 1);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);

            // Check if monthly rollup already exists
            var existsForMonth = await _context.AnalyticsSnapshots
                .AnyAsync(s => s.SnapshotDate == monthStart
                    && s.PeriodType == AnalyticsPeriodType.Monthly
                    && !s.IsDeleted);

            if (existsForMonth)
            {
                _logger.LogDebug("Monthly rollup already exists for {Month}, skipping", monthStart.ToString("yyyy-MM"));
                return;
            }

            // Get all daily snapshots for the previous month grouped by metric type, branch, department
            var dailySnapshots = await _context.AnalyticsSnapshots
                .Where(s => s.SnapshotDate >= monthStart
                    && s.SnapshotDate <= monthEnd
                    && s.PeriodType == AnalyticsPeriodType.Daily
                    && !s.IsDeleted)
                .GroupBy(s => new { s.MetricType, s.BranchId, s.DepartmentId })
                .Select(g => new
                {
                    g.Key.MetricType,
                    g.Key.BranchId,
                    g.Key.DepartmentId,
                    AvgValue = g.Average(s => s.Value),
                    SumValue = g.Sum(s => s.Value),
                    MaxValue = g.Max(s => s.Value),
                    Count = g.Count()
                })
                .ToListAsync();

            if (!dailySnapshots.Any())
            {
                _logger.LogDebug("No daily snapshots found for {Month}, skipping rollup", monthStart.ToString("yyyy-MM"));
                return;
            }

            var monthlies = new List<AnalyticsSnapshot>();

            foreach (var group in dailySnapshots)
            {
                // For rate metrics (attrition, completion rate) use average; for counts/hours use the last value or sum
                var value = IsRateMetric(group.MetricType) ? group.AvgValue : IsSumMetric(group.MetricType) ? group.SumValue : group.MaxValue;

                monthlies.Add(new AnalyticsSnapshot
                {
                    SnapshotDate = monthStart,
                    MetricType = group.MetricType,
                    BranchId = group.BranchId,
                    DepartmentId = group.DepartmentId,
                    Value = Math.Round(value, 4),
                    PeriodType = AnalyticsPeriodType.Monthly,
                    AdditionalDataJson = System.Text.Json.JsonSerializer.Serialize(new { dailyCount = group.Count }),
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                });
            }

            await _context.AnalyticsSnapshots.AddRangeAsync(monthlies);
            await _context.SaveChangesAsync(default);

            _logger.LogInformation("Created {Count} monthly rollup snapshots for {Month}",
                monthlies.Count, monthStart.ToString("yyyy-MM"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running monthly analytics rollup job");
            throw;
        }
    }

    private static bool IsRateMetric(AnalyticsMetricType metricType)
    {
        return metricType is AnalyticsMetricType.AttritionRate
            or AnalyticsMetricType.TrainingCompletionRate
            or AnalyticsMetricType.LeaveUtilization
            or AnalyticsMetricType.EngagementScore
            or AnalyticsMetricType.ENPSScore
            or AnalyticsMetricType.AverageSalary;
    }

    private static bool IsSumMetric(AnalyticsMetricType metricType)
    {
        return metricType is AnalyticsMetricType.OvertimeHours
            or AnalyticsMetricType.OvertimeCost
            or AnalyticsMetricType.NewHires
            or AnalyticsMetricType.PayrollCostTotal;
    }
}
