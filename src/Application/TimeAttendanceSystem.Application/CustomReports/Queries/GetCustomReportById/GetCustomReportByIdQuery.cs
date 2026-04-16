using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReportById;

/// <summary>
/// Query to get a specific custom report definition by ID.
/// </summary>
public record GetCustomReportByIdQuery(long Id) : IRequest<Result<CustomReportDefinitionDto>>;
