using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetResolvedSettings;

public record GetResolvedSettingsQuery(long? BranchId, long? DepartmentId) : ICommand<Result<ResolvedSettingsDto>>;
