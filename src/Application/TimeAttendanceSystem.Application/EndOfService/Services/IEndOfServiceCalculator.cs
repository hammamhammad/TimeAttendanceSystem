using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EndOfService.Services;

/// <summary>
/// Computes an end-of-service (EOS) benefit using the applicable <c>EndOfServicePolicy</c>
/// resolved by effective date and (optional) country. Replaces the previously hardcoded
/// Saudi-specific formula baked into <c>CalculateEndOfServiceCommandHandler</c>.
/// </summary>
public interface IEndOfServiceCalculator
{
    /// <summary>
    /// Computes the benefit for a given termination. The resolver picks the policy whose
    /// effective range covers <paramref name="terminationDate"/>. If a policy is found with a
    /// matching <c>CountryCode</c>, it is preferred over a null-country one.
    /// </summary>
    Task<EndOfServiceComputation> CalculateAsync(
        DateTime hireDate,
        DateTime terminationDate,
        TerminationType terminationType,
        decimal baseSalary,
        decimal totalAllowances,
        string? countryCode = null,
        CancellationToken ct = default);
}

/// <summary>Result of an EOS computation, with a breakdown suitable for forensic audit.</summary>
public sealed class EndOfServiceComputation
{
    public decimal TotalServiceYears { get; set; }
    public int ServiceYears { get; set; }
    public int ServiceMonths { get; set; }
    public int ServiceDays { get; set; }

    public decimal CalculationBasis { get; set; }

    public decimal TotalAmountBeforeDeduction { get; set; }
    public decimal DeductionAmount { get; set; }
    public decimal NetAmount { get; set; }

    public long? AppliedPolicyId { get; set; }
    public string? AppliedPolicyName { get; set; }
    public string? AppliedPolicySnapshotJson { get; set; }
    public string CalculationDetails { get; set; } = string.Empty;

    /// <summary>True if the calculator fell back to defaults because no policy was found.</summary>
    public bool UsedFallback { get; set; }
}
