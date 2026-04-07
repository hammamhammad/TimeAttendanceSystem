using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CustomReports.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReportById;

/// <summary>
/// Query to get a specific custom report definition by ID.
/// </summary>
[RequiresModule(SystemModule.CustomReports, AllowReadWhenDisabled = true)]
public record GetCustomReportByIdQuery(long Id) : IRequest<Result<CustomReportDefinitionDto>>;
