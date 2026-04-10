using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.UpdatePolicyTemplate;

public class UpdatePolicyTemplateCommandHandler : BaseHandler<UpdatePolicyTemplateCommand, Result>
{
    private readonly IMasterDbContext _masterContext;
    private readonly ITenantContext _tenantContext;

    public UpdatePolicyTemplateCommandHandler(
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

    public override async Task<Result> Handle(UpdatePolicyTemplateCommand request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure("Tenant context not resolved");

        var template = await _masterContext.PolicyTemplates
            .Include(t => t.Items.Where(i => !i.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (template == null)
            return Result.Failure("Policy template not found");

        // System templates cannot be edited by tenants
        if (template.IsSystemTemplate && !CurrentUser.IsSystemAdmin)
            return Result.Failure("System templates can only be edited by system administrators");

        // Tenant templates can only be edited by the owning tenant
        if (!template.IsSystemTemplate && template.TenantId != tenantId)
            return Result.Failure("Template not accessible");

        if (string.IsNullOrWhiteSpace(request.Name))
            return Result.Failure("Template name is required");

        var username = CurrentUser.Username ?? "SYSTEM";
        var now = DateTime.UtcNow;

        // Update template metadata
        template.Name = request.Name;
        template.NameAr = request.NameAr;
        template.Description = request.Description;
        template.DescriptionAr = request.DescriptionAr;
        template.Region = request.Region;
        template.Industry = request.Industry;
        template.ModifiedAtUtc = now;
        template.ModifiedBy = username;

        // Soft-delete existing items
        foreach (var existingItem in template.Items)
        {
            existingItem.IsDeleted = true;
            existingItem.ModifiedAtUtc = now;
            existingItem.ModifiedBy = username;
        }

        // Add new items
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

        await _masterContext.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
