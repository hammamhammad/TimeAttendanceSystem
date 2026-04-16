using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EndOfServicePolicies.Dtos;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Commands.UpdateEndOfServicePolicy;

public record UpdateEndOfServicePolicyCommand(
    long Id,
    string Name,
    string? Description,
    string? CountryCode,
    bool IsActive,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    decimal MinimumServiceYearsForEligibility,
    List<UpsertEndOfServicePolicyTier> Tiers,
    List<UpsertEndOfServiceResignationDeductionTier> ResignationDeductions
) : ICommand<Result>;
