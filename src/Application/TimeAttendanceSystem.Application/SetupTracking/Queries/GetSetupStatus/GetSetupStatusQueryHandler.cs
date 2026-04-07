using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SetupTracking.Dtos;

namespace TecAxle.Hrms.Application.SetupTracking.Queries.GetSetupStatus;

public class GetSetupStatusQueryHandler : BaseHandler<GetSetupStatusQuery, Result<SetupStatusDto>>
{
    private readonly ITenantContext _tenantContext;

    public GetSetupStatusQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
    }

    public override async Task<Result<SetupStatusDto>> Handle(GetSetupStatusQuery request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure<SetupStatusDto>("Tenant context not resolved");

        var steps = await Context.SetupSteps
            .AsNoTracking()
            .Where(s => s.TenantId == tenantId.Value && !s.IsDeleted)
            .OrderBy(s => s.SortOrder)
            .ToListAsync(cancellationToken);

        if (!steps.Any())
        {
            // Return empty status — steps haven't been initialized yet
            return Result.Success(new SetupStatusDto { TenantId = tenantId.Value });
        }

        var dto = new SetupStatusDto
        {
            TenantId = tenantId.Value,
            TotalSteps = steps.Count,
            CompletedSteps = steps.Count(s => s.IsCompleted),
            RequiredSteps = steps.Count(s => s.IsRequired),
            CompletedRequiredSteps = steps.Count(s => s.IsRequired && s.IsCompleted),
            Steps = steps.Select(s => new SetupStepDto
            {
                Id = s.Id,
                StepKey = s.StepKey,
                Category = s.Category,
                IsCompleted = s.IsCompleted,
                CompletedAtUtc = s.CompletedAtUtc,
                IsRequired = s.IsRequired,
                SortOrder = s.SortOrder
            }).ToList()
        };

        dto.CompletionPercentage = dto.TotalSteps > 0
            ? Math.Round((double)dto.CompletedSteps / dto.TotalSteps * 100, 1)
            : 0;

        // Next recommended step
        var nextStep = steps.FirstOrDefault(s => !s.IsCompleted && s.IsRequired)
            ?? steps.FirstOrDefault(s => !s.IsCompleted);
        dto.NextRecommendedStep = nextStep?.StepKey;

        // Category breakdown
        dto.Categories = steps
            .GroupBy(s => s.Category)
            .Select(g => new SetupCategoryDto
            {
                Category = g.Key,
                Total = g.Count(),
                Completed = g.Count(s => s.IsCompleted),
                Percentage = g.Count() > 0 ? Math.Round((double)g.Count(s => s.IsCompleted) / g.Count() * 100, 1) : 0
            }).ToList();

        return Result.Success(dto);
    }
}
