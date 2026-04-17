using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetResolvedSettings;

public class GetResolvedSettingsQueryHandler : BaseHandler<GetResolvedSettingsQuery, Result<ResolvedSettingsDto>>
{
    private readonly ICompanySettingsResolver _resolver;

    public GetResolvedSettingsQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ICompanySettingsResolver resolver)
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
