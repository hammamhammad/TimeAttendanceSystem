using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.TenantConfiguration.Queries.GetResolvedSettings;

public class GetResolvedSettingsQueryHandler : BaseHandler<GetResolvedSettingsQuery, Result<ResolvedSettingsDto>>
{
    private readonly ITenantContext _tenantContext;
    private readonly ITenantSettingsResolver _resolver;

    public GetResolvedSettingsQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext,
        ITenantSettingsResolver resolver)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
        _resolver = resolver;
    }

    public override async Task<Result<ResolvedSettingsDto>> Handle(GetResolvedSettingsQuery request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure<ResolvedSettingsDto>("Tenant context not resolved");

        var resolved = await _resolver.GetSettingsAsync(tenantId.Value, request.BranchId, request.DepartmentId, cancellationToken);
        return Result.Success(resolved);
    }
}
