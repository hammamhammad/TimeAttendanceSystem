using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.TenantConfiguration.Queries.GetResolvedSettings;

public class GetResolvedSettingsQueryHandler : BaseHandler<GetResolvedSettingsQuery, Result<ResolvedSettingsDto>>
{
    private readonly ITenantSettingsResolver _resolver;

    public GetResolvedSettingsQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantSettingsResolver resolver)
        : base(context, currentUser)
    {
        _resolver = resolver;
    }

    public override async Task<Result<ResolvedSettingsDto>> Handle(GetResolvedSettingsQuery request, CancellationToken cancellationToken)
    {
        var resolved = await _resolver.GetSettingsAsync(request.BranchId, request.DepartmentId, cancellationToken);
        return Result.Success(resolved);
    }
}
