using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;
using TecAxle.Hrms.Domain.Reports;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReports;

/// <summary>
/// Query to get a paginated list of custom report definitions.
/// Returns reports created by the current user or public reports in the user's branch.
/// </summary>
[RequiresModule(SystemModule.CustomReports, AllowReadWhenDisabled = true)]
public record GetCustomReportsQuery(
    int Page,
    int PageSize,
    long? BranchId,
    bool? IsPublic,
    ReportDataSource? DataSource
) : IRequest<Result<PagedResult<CustomReportDefinitionDto>>>;
