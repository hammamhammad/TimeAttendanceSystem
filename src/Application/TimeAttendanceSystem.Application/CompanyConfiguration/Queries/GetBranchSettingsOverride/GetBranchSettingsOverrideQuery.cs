using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetBranchSettingsOverride;

public record GetBranchSettingsOverrideQuery(long BranchId) : ICommand<Result<BranchSettingsOverrideDto>>;
