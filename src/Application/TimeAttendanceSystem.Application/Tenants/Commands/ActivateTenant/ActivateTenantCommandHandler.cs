using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Application.Tenants.Commands.ActivateTenant;

public class ActivateTenantCommandHandler : BaseHandler<ActivateTenantCommand, Result>
{
    public ActivateTenantCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(ActivateTenantCommand request, CancellationToken cancellationToken)
    {
        var tenant = await Context.Tenants
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (tenant == null)
        {
            return Result.Failure("Tenant not found");
        }

        if (tenant.Status == TenantStatus.Active && tenant.IsActive)
        {
            return Result.Failure("Tenant is already active");
        }

        tenant.Status = TenantStatus.Active;
        tenant.IsActive = true;
        tenant.ModifiedAtUtc = DateTime.UtcNow;
        tenant.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
