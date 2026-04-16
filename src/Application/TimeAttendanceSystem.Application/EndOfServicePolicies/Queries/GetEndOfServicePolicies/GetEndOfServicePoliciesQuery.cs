using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EndOfServicePolicies.Dtos;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Queries.GetEndOfServicePolicies;

public record GetEndOfServicePoliciesQuery(
    bool? ActiveOnly = null,
    string? CountryCode = null
) : IRequest<Result<List<EndOfServicePolicyDto>>>;

public class GetEndOfServicePoliciesQueryHandler : BaseHandler<GetEndOfServicePoliciesQuery, Result<List<EndOfServicePolicyDto>>>
{
    public GetEndOfServicePoliciesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<List<EndOfServicePolicyDto>>> Handle(GetEndOfServicePoliciesQuery request, CancellationToken cancellationToken)
    {
        var q = Context.EndOfServicePolicies
            .AsNoTracking()
            .Include(p => p.Tiers)
            .Include(p => p.ResignationDeductions)
            .Where(p => !p.IsDeleted);

        if (request.ActiveOnly == true) q = q.Where(p => p.IsActive);
        if (!string.IsNullOrWhiteSpace(request.CountryCode))
        {
            var cc = request.CountryCode.ToUpperInvariant();
            q = q.Where(p => p.CountryCode != null && p.CountryCode.ToUpper() == cc);
        }

        var policies = await q
            .OrderByDescending(p => p.IsActive)
            .ThenByDescending(p => p.EffectiveFromDate)
            .ToListAsync(cancellationToken);

        var list = policies.Select(MapToDto).ToList();
        return Result.Success(list);
    }

    internal static EndOfServicePolicyDto MapToDto(Domain.Offboarding.EndOfServicePolicy p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Description = p.Description,
        CountryCode = p.CountryCode,
        IsActive = p.IsActive,
        EffectiveFromDate = p.EffectiveFromDate,
        EffectiveToDate = p.EffectiveToDate,
        MinimumServiceYearsForEligibility = p.MinimumServiceYearsForEligibility,
        Tiers = p.Tiers
            .OrderBy(t => t.SortOrder).ThenBy(t => t.MinYearsInclusive)
            .Select(t => new EndOfServicePolicyTierDto
            {
                Id = t.Id,
                MinYearsInclusive = t.MinYearsInclusive,
                MaxYearsExclusive = t.MaxYearsExclusive,
                MonthsPerYearMultiplier = t.MonthsPerYearMultiplier,
                SortOrder = t.SortOrder
            }).ToList(),
        ResignationDeductions = p.ResignationDeductions
            .OrderBy(t => t.SortOrder).ThenBy(t => t.MinYearsInclusive)
            .Select(t => new EndOfServiceResignationDeductionTierDto
            {
                Id = t.Id,
                MinYearsInclusive = t.MinYearsInclusive,
                MaxYearsExclusive = t.MaxYearsExclusive,
                DeductionFraction = t.DeductionFraction,
                SortOrder = t.SortOrder
            }).ToList()
    };
}
