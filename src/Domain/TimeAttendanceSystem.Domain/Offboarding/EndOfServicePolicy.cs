using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Offboarding;

/// <summary>
/// Tenant-configurable end-of-service (EOS) policy.
/// Replaces the previously hardcoded Saudi labor law formula in CalculateEndOfServiceCommandHandler.
/// Effective-dated: a termination uses the policy whose EffectiveFromDate &lt;= terminationDate
/// (and EffectiveToDate is null or &gt;= terminationDate).
/// Optional CountryCode lets a tenant keep multiple regional policies side by side.
/// </summary>
public class EndOfServicePolicy : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    /// <summary>ISO 3166-1 alpha-2 country code this policy applies to (e.g. "SA", "AE"). Null = any.</summary>
    public string? CountryCode { get; set; }

    public bool IsActive { get; set; } = true;
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }

    /// <summary>
    /// Minimum years of service required to qualify for any EOS benefit.
    /// Below this threshold the benefit is zero regardless of tiers. Default 0.
    /// </summary>
    public decimal MinimumServiceYearsForEligibility { get; set; } = 0m;

    public ICollection<EndOfServicePolicyTier> Tiers { get; set; } = new List<EndOfServicePolicyTier>();
    public ICollection<EndOfServiceResignationDeductionTier> ResignationDeductions { get; set; } = new List<EndOfServiceResignationDeductionTier>();
}
