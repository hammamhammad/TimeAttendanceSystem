using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Analytics;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that pre-computes daily analytics snapshots from existing entity data.
/// Runs daily at 1:00 AM. Captures headcount, attrition, recruitment, training,
/// leave, overtime, payroll, and engagement metrics for the previous day.
/// </summary>
public class AnalyticsSnapshotJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AnalyticsSnapshotJob> _logger;

    public AnalyticsSnapshotJob(IApplicationDbContext context, ILogger<AnalyticsSnapshotJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting analytics snapshot job at {Time}", DateTime.UtcNow);

        try
        {
            var snapshotDate = DateTime.UtcNow.Date.AddDays(-1); // Yesterday

            // Check if snapshot already exists for this date
            var existsForDate = await _context.AnalyticsSnapshots
                .AnyAsync(s => s.SnapshotDate == snapshotDate
                    && s.PeriodType == AnalyticsPeriodType.Daily
                    && !s.IsDeleted);

            if (existsForDate)
            {
                _logger.LogDebug("Snapshot already exists for {Date}, skipping", snapshotDate);
                return;
            }

            var snapshots = new List<AnalyticsSnapshot>();

            // --- Headcount Total ---
            var totalActive = await _context.Employees
                .CountAsync(e => e.IsActive && !e.IsDeleted);
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.HeadcountTotal, null, null, totalActive));

            // --- Headcount by Department ---
            var deptCounts = await _context.Employees
                .Where(e => e.IsActive && !e.IsDeleted && e.DepartmentId != null)
                .GroupBy(e => e.DepartmentId)
                .Select(g => new { DepartmentId = g.Key, Count = g.Count() })
                .ToListAsync();
            foreach (var dc in deptCounts)
            {
                snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.HeadcountByDepartment, null, dc.DepartmentId, dc.Count));
            }

            // --- Headcount by Gender ---
            var genderCounts = await _context.Employees
                .Where(e => e.IsActive && !e.IsDeleted && e.Gender != null)
                .GroupBy(e => e.Gender)
                .Select(g => new { Gender = g.Key, Count = g.Count() })
                .ToListAsync();
            var genderJson = System.Text.Json.JsonSerializer.Serialize(
                genderCounts.Select(g => new { gender = g.Gender.ToString(), count = g.Count }));
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.HeadcountByGender, null, null, genderCounts.Sum(g => g.Count), genderJson));

            // --- Attrition Rate ---
            var terminationCount = await _context.TerminationRecords
                .CountAsync(t => t.TerminationDate.Date == snapshotDate && !t.IsDeleted);
            var resignationCount = await _context.ResignationRequests
                .CountAsync(r => r.Status == ResignationStatus.Approved && !r.IsDeleted
                    && r.LastWorkingDate.Date == snapshotDate);
            var totalAttrition = terminationCount + resignationCount;
            var attritionRate = totalActive > 0 ? Math.Round((decimal)totalAttrition / totalActive * 100, 2) : 0;
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.AttritionRate, null, null, attritionRate));

            // --- New Hires ---
            var newHires = await _context.Employees
                .CountAsync(e => e.HireDate.Date == snapshotDate && !e.IsDeleted);
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.NewHires, null, null, newHires));

            // --- Overtime Hours ---
            var overtimeData = await _context.AttendanceRecords
                .Where(a => a.AttendanceDate.Date == snapshotDate && !a.IsDeleted)
                .GroupBy(a => 1)
                .Select(g => new { TotalOT = g.Sum(a => a.OvertimeHours) })
                .FirstOrDefaultAsync();
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.OvertimeHours, null, null, overtimeData?.TotalOT ?? 0));

            // --- Leave Utilization ---
            var leaveCount = await _context.EmployeeVacations
                .CountAsync(v => v.StartDate <= snapshotDate && v.EndDate >= snapshotDate
                    && v.IsApproved && !v.IsDeleted);
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.LeaveUtilization, null, null, leaveCount));

            // --- Training Completion Rate ---
            var totalEnrollments = await _context.TrainingEnrollments
                .CountAsync(te => !te.IsDeleted);
            var completedEnrollments = await _context.TrainingEnrollments
                .CountAsync(te => te.Status == TrainingEnrollmentStatus.Completed && !te.IsDeleted);
            var completionRate = totalEnrollments > 0
                ? Math.Round((decimal)completedEnrollments / totalEnrollments * 100, 2)
                : 0;
            snapshots.Add(CreateSnapshot(snapshotDate, AnalyticsMetricType.TrainingCompletionRate, null, null, completionRate));

            await _context.AnalyticsSnapshots.AddRangeAsync(snapshots);
            await _context.SaveChangesAsync(default);

            _logger.LogInformation("Created {Count} analytics snapshots for {Date}", snapshots.Count, snapshotDate);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running analytics snapshot job");
            throw;
        }
    }

    private static AnalyticsSnapshot CreateSnapshot(
        DateTime date, AnalyticsMetricType metricType,
        long? branchId, long? departmentId, decimal value,
        string? additionalDataJson = null)
    {
        return new AnalyticsSnapshot
        {
            SnapshotDate = date,
            MetricType = metricType,
            BranchId = branchId,
            DepartmentId = departmentId,
            Value = value,
            PeriodType = AnalyticsPeriodType.Daily,
            AdditionalDataJson = additionalDataJson,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };
    }
}
