using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Analytics;

public class AnalyticsSnapshot : BaseEntity
{
    public DateTime SnapshotDate { get; set; }
    public AnalyticsMetricType MetricType { get; set; }
    public long? BranchId { get; set; }
    public long? DepartmentId { get; set; }
    public decimal Value { get; set; }
    public string? AdditionalDataJson { get; set; }
    public AnalyticsPeriodType PeriodType { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public Department? Department { get; set; }
}
