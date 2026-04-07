using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PolicyTemplates.Dtos;

namespace TecAxle.Hrms.Application.PolicyTemplates.Queries.GetPolicyTemplateById;

public class GetPolicyTemplateByIdQueryHandler : BaseHandler<GetPolicyTemplateByIdQuery, Result<PolicyTemplateDto>>
{
    private readonly ITenantContext _tenantContext;

    public GetPolicyTemplateByIdQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
    }

    public override async Task<Result<PolicyTemplateDto>> Handle(GetPolicyTemplateByIdQuery request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);

        var template = await Context.PolicyTemplates
            .AsNoTracking()
            .Include(t => t.Items.Where(i => !i.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (template == null)
            return Result.Failure<PolicyTemplateDto>("Policy template not found");

        // Verify access: system template or owned by tenant
        if (!template.IsSystemTemplate && template.TenantId != tenantId)
            return Result.Failure<PolicyTemplateDto>("Template not accessible");

        var dto = new PolicyTemplateDto
        {
            Id = template.Id,
            Code = template.Code,
            Name = template.Name,
            NameAr = template.NameAr,
            Description = template.Description,
            DescriptionAr = template.DescriptionAr,
            Region = template.Region,
            Industry = template.Industry,
            IsSystemTemplate = template.IsSystemTemplate,
            IsActive = template.IsActive,
            ItemCount = template.Items.Count,
            Items = template.Items.OrderBy(i => i.SortOrder).Select(i => new PolicyTemplateItemDto
            {
                Id = i.Id,
                PolicyType = i.PolicyType,
                ConfigurationJson = i.ConfigurationJson,
                SortOrder = i.SortOrder
            }).ToList()
        };

        return Result.Success(dto);
    }
}
