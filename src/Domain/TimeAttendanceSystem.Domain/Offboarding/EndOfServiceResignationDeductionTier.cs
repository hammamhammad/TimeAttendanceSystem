using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Offboarding;

/// <summary>
/// Defines, for a given service-year range, how much of the total EOS benefit is DEDUCTED
/// when the employee resigns (vs being terminated by the employer).
/// Fraction is in [0,1]. 1.0 = full deduction (no entitlement); 0.0 = no deduction (full entitlement).
/// Example Saudi default:
///   [0,2) =&gt; 1.0 (no entitlement on resignation)
///   [2,5) =&gt; 2/3  (keeps 1/3)
///   [5,10) =&gt; 1/3 (keeps 2/3)
///   [10,+inf) =&gt; 0 (keeps all)
/// </summary>
public class EndOfServiceResignationDeductionTier : BaseEntity
{
    public long EndOfServicePolicyId { get; set; }
    public EndOfServicePolicy EndOfServicePolicy { get; set; } = null!;

    public decimal MinYearsInclusive { get; set; }
    public decimal? MaxYearsExclusive { get; set; }

    /// <summary>Fraction of the total benefit deducted due to resignation in this tier. 0..1.</summary>
    public decimal DeductionFraction { get; set; }

    public int SortOrder { get; set; }
}
