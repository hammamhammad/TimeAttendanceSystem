using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Commands.CreateEndOfServicePolicy;

public class CreateEndOfServicePolicyCommandHandler : BaseHandler<CreateEndOfServicePolicyCommand, Result<long>>
{
    public CreateEndOfServicePolicyCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateEndOfServicePolicyCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return Result.Failure<long>("Policy name is required.");

        if (request.EffectiveToDate.HasValue && request.EffectiveToDate.Value < request.EffectiveFromDate)
            return Result.Failure<long>("EffectiveToDate cannot be before EffectiveFromDate.");

        if (request.Tiers == null || request.Tiers.Count == 0)
            return Result.Failure<long>("At least one earning tier is required.");

        var overlap = await HasActiveOverlapAsync(request.CountryCode, request.EffectiveFromDate, request.EffectiveToDate, excludeId: null, cancellationToken);
        if (overlap)
            return Result.Failure<long>("An active EOS policy already exists with an overlapping effective range for this country.");

        var policy = new EndOfServicePolicy
        {
            Name = request.Name.Trim(),
            Description = request.Description,
            CountryCode = string.IsNullOrWhiteSpace(request.CountryCode) ? null : request.CountryCode.ToUpperInvariant(),
            IsActive = request.IsActive,
            EffectiveFromDate = DateTime.SpecifyKind(request.EffectiveFromDate, DateTimeKind.Utc),
            EffectiveToDate = request.EffectiveToDate.HasValue
                ? DateTime.SpecifyKind(request.EffectiveToDate.Value, DateTimeKind.Utc)
                : (DateTime?)null,
            MinimumServiceYearsForEligibility = request.MinimumServiceYearsForEligibility,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        foreach (var t in request.Tiers.OrderBy(x => x.SortOrder).ThenBy(x => x.MinYearsInclusive))
        {
            policy.Tiers.Add(new EndOfServicePolicyTier
            {
                MinYearsInclusive = t.MinYearsInclusive,
                MaxYearsExclusive = t.MaxYearsExclusive,
                MonthsPerYearMultiplier = t.MonthsPerYearMultiplier,
                SortOrder = t.SortOrder,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "system"
            });
        }

        foreach (var d in (request.ResignationDeductions ?? new()).OrderBy(x => x.SortOrder).ThenBy(x => x.MinYearsInclusive))
        {
            policy.ResignationDeductions.Add(new EndOfServiceResignationDeductionTier
            {
                MinYearsInclusive = d.MinYearsInclusive,
                MaxYearsExclusive = d.MaxYearsExclusive,
                DeductionFraction = Math.Clamp(d.DeductionFraction, 0m, 1m),
                SortOrder = d.SortOrder,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "system"
            });
        }

        Context.EndOfServicePolicies.Add(policy);
        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success(policy.Id);
    }

    private async Task<bool> HasActiveOverlapAsync(string? countryCode, DateTime fromDate, DateTime? toDate, long? excludeId, CancellationToken ct)
    {
        var cc = string.IsNullOrWhiteSpace(countryCode) ? null : countryCode.ToUpperInvariant();
        var query = Context.EndOfServicePolicies
            .AsNoTracking()
            .Where(p => p.IsActive && !p.IsDeleted);

        if (cc != null)
            query = query.Where(p => p.CountryCode != null && p.CountryCode.ToUpper() == cc);
        else
            query = query.Where(p => p.CountryCode == null);

        if (excludeId.HasValue)
            query = query.Where(p => p.Id != excludeId.Value);

        var candidates = await query.Select(p => new { p.EffectiveFromDate, p.EffectiveToDate }).ToListAsync(ct);
        foreach (var c in candidates)
        {
            var cFrom = c.EffectiveFromDate;
            var cTo = c.EffectiveToDate ?? DateTime.MaxValue;
            var rFrom = fromDate;
            var rTo = toDate ?? DateTime.MaxValue;
            if (cFrom <= rTo && rFrom <= cTo) return true;
        }
        return false;
    }
}
