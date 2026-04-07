using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Application.Tenants.Commands.SuspendTenant;

public class SuspendTenantCommandHandler : BaseHandler<SuspendTenantCommand, Result>
{
    public SuspendTenantCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(SuspendTenantCommand request, CancellationToken cancellationToken)
    {
        var tenant = await Context.Tenants
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (tenant == null)
        {
            return Result.Failure("Tenant not found");
        }

        if (tenant.Status == TenantStatus.Suspended)
        {
            return Result.Failure("Tenant is already suspended");
        }

        tenant.Status = TenantStatus.Suspended;
        tenant.IsActive = false;
        tenant.ModifiedAtUtc = DateTime.UtcNow;
        tenant.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
