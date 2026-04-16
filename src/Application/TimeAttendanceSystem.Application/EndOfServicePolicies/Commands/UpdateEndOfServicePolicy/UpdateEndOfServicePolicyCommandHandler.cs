using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Commands.UpdateEndOfServicePolicy;

public class UpdateEndOfServicePolicyCommandHandler : BaseHandler<UpdateEndOfServicePolicyCommand, Result>
{
    public UpdateEndOfServicePolicyCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateEndOfServicePolicyCommand request, CancellationToken cancellationToken)
    {
        if (request.EffectiveToDate.HasValue && request.EffectiveToDate.Value < request.EffectiveFromDate)
            return Result.Failure("EffectiveToDate cannot be before EffectiveFromDate.");

        var policy = await Context.EndOfServicePolicies
            .Include(p => p.Tiers)
            .Include(p => p.ResignationDeductions)
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (policy == null)
            return Result.Failure("End-of-service policy not found.");

        if (request.IsActive)
        {
            var overlap = await HasActiveOverlapAsync(request.CountryCode, request.EffectiveFromDate, request.EffectiveToDate, request.Id, cancellationToken);
            if (overlap)
                return Result.Failure("An active EOS policy already exists with an overlapping effective range for this country.");
        }

        policy.Name = request.Name.Trim();
        policy.Description = request.Description;
        policy.CountryCode = string.IsNullOrWhiteSpace(request.CountryCode) ? null : request.CountryCode.ToUpperInvariant();
        policy.IsActive = request.IsActive;
        policy.EffectiveFromDate = DateTime.SpecifyKind(request.EffectiveFromDate, DateTimeKind.Utc);
        policy.EffectiveToDate = request.EffectiveToDate.HasValue
            ? DateTime.SpecifyKind(request.EffectiveToDate.Value, DateTimeKind.Utc)
            : (DateTime?)null;
        policy.MinimumServiceYearsForEligibility = request.MinimumServiceYearsForEligibility;
        policy.ModifiedAtUtc = DateTime.UtcNow;
        policy.ModifiedBy = CurrentUser.Username ?? "system";

        // Replace tiers wholesale — simple and correct for a low-frequency admin operation.
        foreach (var t in policy.Tiers.ToList())
            Context.EndOfServicePolicyTiers.Remove(t);
        foreach (var t in policy.ResignationDeductions.ToList())
            Context.EndOfServiceResignationDeductionTiers.Remove(t);

        foreach (var t in (request.Tiers ?? new()).OrderBy(x => x.SortOrder).ThenBy(x => x.MinYearsInclusive))
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

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }

    private async Task<bool> HasActiveOverlapAsync(string? countryCode, DateTime fromDate, DateTime? toDate, long excludeId, CancellationToken ct)
    {
        var cc = string.IsNullOrWhiteSpace(countryCode) ? null : countryCode.ToUpperInvariant();
        var query = Context.EndOfServicePolicies
            .AsNoTracking()
            .Where(p => p.IsActive && !p.IsDeleted && p.Id != excludeId);

        if (cc != null)
            query = query.Where(p => p.CountryCode != null && p.CountryCode.ToUpper() == cc);
        else
            query = query.Where(p => p.CountryCode == null);

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
