using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetScheduledReports;

/// <summary>
/// Query to get all scheduled reports for a specific custom report definition.
/// </summary>
public record GetScheduledReportsQuery(long CustomReportDefinitionId) : IRequest<Result<List<ScheduledReportDto>>>;
