using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.DeletePolicyTemplate;

public class DeletePolicyTemplateCommandHandler : BaseHandler<DeletePolicyTemplateCommand, Result>
{
    private readonly IMasterDbContext _masterContext;
    private readonly ITenantContext _tenantContext;

    public DeletePolicyTemplateCommandHandler(
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

    public override async Task<Result> Handle(DeletePolicyTemplateCommand request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure("Tenant context not resolved");

        var template = await _masterContext.PolicyTemplates
            .Include(t => t.Items.Where(i => !i.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (template == null)
            return Result.Failure("Policy template not found");

        // System templates cannot be deleted
        if (template.IsSystemTemplate)
            return Result.Failure("System templates cannot be deleted");

        // Only the owning tenant can delete
        if (template.TenantId != tenantId)
            return Result.Failure("Template not accessible");

        var username = CurrentUser.Username ?? "SYSTEM";
        var now = DateTime.UtcNow;

        // Soft-delete template and its items
        template.IsDeleted = true;
        template.ModifiedAtUtc = now;
        template.ModifiedBy = username;

        foreach (var item in template.Items)
        {
            item.IsDeleted = true;
            item.ModifiedAtUtc = now;
            item.ModifiedBy = username;
        }

        await _masterContext.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
