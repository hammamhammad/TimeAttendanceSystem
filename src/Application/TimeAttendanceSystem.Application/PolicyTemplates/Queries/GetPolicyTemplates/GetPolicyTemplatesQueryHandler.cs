using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PolicyTemplates.Dtos;

namespace TecAxle.Hrms.Application.PolicyTemplates.Queries.GetPolicyTemplates;

public class GetPolicyTemplatesQueryHandler : BaseHandler<GetPolicyTemplatesQuery, Result<List<PolicyTemplateDto>>>
{
    private readonly ITenantContext _tenantContext;

    public GetPolicyTemplatesQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
    }

    public override async Task<Result<List<PolicyTemplateDto>>> Handle(GetPolicyTemplatesQuery request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);

        var query = Context.PolicyTemplates
            .AsNoTracking()
            .Include(t => t.Items.Where(i => !i.IsDeleted))
            .Where(t => !t.IsDeleted && t.IsActive);

        // Show system templates + templates owned by current tenant
        query = query.Where(t => t.IsSystemTemplate || t.TenantId == tenantId);

        if (!string.IsNullOrWhiteSpace(request.Region))
            query = query.Where(t => t.Region == request.Region);

        if (!string.IsNullOrWhiteSpace(request.Industry))
            query = query.Where(t => t.Industry == request.Industry);

        var templates = await query
            .OrderBy(t => t.IsSystemTemplate ? 0 : 1)
            .ThenBy(t => t.Name)
            .ToListAsync(cancellationToken);

        var dtos = templates.Select(t => new PolicyTemplateDto
        {
            Id = t.Id,
            Code = t.Code,
            Name = t.Name,
            NameAr = t.NameAr,
            Description = t.Description,
            DescriptionAr = t.DescriptionAr,
            Region = t.Region,
            Industry = t.Industry,
            IsSystemTemplate = t.IsSystemTemplate,
            IsActive = t.IsActive,
            ItemCount = t.Items.Count,
            Items = t.Items.OrderBy(i => i.SortOrder).Select(i => new PolicyTemplateItemDto
            {
                Id = i.Id,
                PolicyType = i.PolicyType,
                ConfigurationJson = i.ConfigurationJson,
                SortOrder = i.SortOrder
            }).ToList()
        }).ToList();

        return Result.Success(dtos);
    }
}
