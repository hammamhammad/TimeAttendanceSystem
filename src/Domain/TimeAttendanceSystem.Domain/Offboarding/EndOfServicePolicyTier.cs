using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Offboarding;

/// <summary>
/// Tier of an <see cref="EndOfServicePolicy"/> expressed as a months-of-salary-per-year multiplier
/// applied to the portion of service falling in the tier's range.
/// Example Saudi default: [0,5) =&gt; 0.5, [5,+inf) =&gt; 1.0
/// means "first 5 years earn 0.5 month/year; any year beyond earns 1 month/year."
/// </summary>
public class EndOfServicePolicyTier : BaseEntity
{
    public long EndOfServicePolicyId { get; set; }
    public EndOfServicePolicy EndOfServicePolicy { get; set; } = null!;

    /// <summary>Inclusive lower bound on years of service.</summary>
    public decimal MinYearsInclusive { get; set; }

    /// <summary>Exclusive upper bound on years of service. Null = unbounded (covers everything above MinYearsInclusive).</summary>
    public decimal? MaxYearsExclusive { get; set; }

    /// <summary>Months of salary earned per year of service that falls in this tier's range. e.g. 0.5, 1.0, 1.5.</summary>
    public decimal MonthsPerYearMultiplier { get; set; }

    public int SortOrder { get; set; }
}
