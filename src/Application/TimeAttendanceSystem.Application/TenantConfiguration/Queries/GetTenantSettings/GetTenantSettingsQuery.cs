using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.TenantConfiguration.Queries.GetTenantSettings;

public record GetTenantSettingsQuery : ICommand<Result<TenantSettingsDto>>;
