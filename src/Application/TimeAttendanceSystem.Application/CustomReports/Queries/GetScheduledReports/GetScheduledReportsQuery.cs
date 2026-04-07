using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetScheduledReports;

/// <summary>
/// Query to get all scheduled reports for a specific custom report definition.
/// </summary>
[RequiresModule(SystemModule.CustomReports, AllowReadWhenDisabled = true)]
public record GetScheduledReportsQuery(long CustomReportDefinitionId) : IRequest<Result<List<ScheduledReportDto>>>;
