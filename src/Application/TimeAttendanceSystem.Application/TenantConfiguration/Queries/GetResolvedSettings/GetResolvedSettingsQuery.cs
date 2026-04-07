using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.TenantConfiguration.Queries.GetResolvedSettings;

public record GetResolvedSettingsQuery(long? BranchId, long? DepartmentId) : ICommand<Result<ResolvedSettingsDto>>;
