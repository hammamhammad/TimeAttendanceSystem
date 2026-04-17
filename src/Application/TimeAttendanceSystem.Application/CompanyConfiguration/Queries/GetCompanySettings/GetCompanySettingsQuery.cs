using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetCompanySettings;

public record GetCompanySettingsQuery : ICommand<Result<CompanySettingsDto>>;
