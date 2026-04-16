namespace TecAxle.Hrms.Application.EndOfServicePolicies.Dtos;

public class EndOfServicePolicyDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CountryCode { get; set; }
    public bool IsActive { get; set; }
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }
    public decimal MinimumServiceYearsForEligibility { get; set; }

    public List<EndOfServicePolicyTierDto> Tiers { get; set; } = new();
    public List<EndOfServiceResignationDeductionTierDto> ResignationDeductions { get; set; } = new();
}

public class EndOfServicePolicyTierDto
{
    public long Id { get; set; }
    public decimal MinYearsInclusive { get; set; }
    public decimal? MaxYearsExclusive { get; set; }
    public decimal MonthsPerYearMultiplier { get; set; }
    public int SortOrder { get; set; }
}

public class EndOfServiceResignationDeductionTierDto
{
    public long Id { get; set; }
    public decimal MinYearsInclusive { get; set; }
    public decimal? MaxYearsExclusive { get; set; }
    public decimal DeductionFraction { get; set; }
    public int SortOrder { get; set; }
}

public record UpsertEndOfServicePolicyTier(
    decimal MinYearsInclusive,
    decimal? MaxYearsExclusive,
    decimal MonthsPerYearMultiplier,
    int SortOrder);

public record UpsertEndOfServiceResignationDeductionTier(
    decimal MinYearsInclusive,
    decimal? MaxYearsExclusive,
    decimal DeductionFraction,
    int SortOrder);
