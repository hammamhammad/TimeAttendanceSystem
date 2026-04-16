using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EndOfServicePolicies.Dtos;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Commands.CreateEndOfServicePolicy;

public record CreateEndOfServicePolicyCommand(
    string Name,
    string? Description,
    string? CountryCode,
    bool IsActive,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    decimal MinimumServiceYearsForEligibility,
    List<UpsertEndOfServicePolicyTier> Tiers,
    List<UpsertEndOfServiceResignationDeductionTier> ResignationDeductions
) : ICommand<Result<long>>;
