using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.CreatePolicyTemplate;

public class CreatePolicyTemplateCommandHandler : BaseHandler<CreatePolicyTemplateCommand, Result<long>>
{
    private readonly IMasterDbContext _masterContext;
    private readonly ITenantContext _tenantContext;

    public CreatePolicyTemplateCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMasterDbContext masterContext,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
        _tenantContext = tenantContext;
    }

    protected override IMasterDbContext? GetMasterContext() => _masterContext;

    public override async Task<Result<long>> Handle(CreatePolicyTemplateCommand request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure<long>("Tenant context not resolved");

        // Validate code uniqueness within tenant scope
        var codeExists = await _masterContext.PolicyTemplates
            .AnyAsync(t => t.Code == request.Code && !t.IsDeleted
                && (t.TenantId == tenantId || t.IsSystemTemplate), cancellationToken);

        if (codeExists)
            return Result.Failure<long>("A template with this code already exists");

        if (string.IsNullOrWhiteSpace(request.Name))
            return Result.Failure<long>("Template name is required");

        if (string.IsNullOrWhiteSpace(request.Code))
            return Result.Failure<long>("Template code is required");

        var username = CurrentUser.Username ?? "SYSTEM";
        var now = DateTime.UtcNow;

        var template = new PolicyTemplate
        {
            Code = request.Code,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Region = request.Region,
            Industry = request.Industry,
            IsSystemTemplate = false, // Tenant-created templates are never system templates
            TenantId = tenantId,
            IsActive = true,
            CreatedAtUtc = now,
            CreatedBy = username
        };

        if (request.Items != null)
        {
            foreach (var item in request.Items)
            {
                template.Items.Add(new PolicyTemplateItem
                {
                    PolicyType = item.PolicyType,
                    ConfigurationJson = item.ConfigurationJson,
                    SortOrder = item.SortOrder,
                    CreatedAtUtc = now,
                    CreatedBy = username
                });
            }
        }

        _masterContext.PolicyTemplates.Add(template);
        await _masterContext.SaveChangesAsync(cancellationToken);

        return Result.Success(template.Id);
    }
}
