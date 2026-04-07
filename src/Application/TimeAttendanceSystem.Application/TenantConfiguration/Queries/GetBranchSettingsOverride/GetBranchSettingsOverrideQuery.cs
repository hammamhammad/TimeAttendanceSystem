using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.TenantConfiguration.Queries.GetBranchSettingsOverride;

public record GetBranchSettingsOverrideQuery(long BranchId) : ICommand<Result<BranchSettingsOverrideDto>>;
