using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Commands.CreateCustomReport;

/// <summary>
/// Command to create a new custom report definition.
/// </summary>
[RequiresModule(SystemModule.CustomReports)]
public record CreateCustomReportCommand(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    ReportDataSource DataSource,
    string ColumnsJson,
    string? FiltersJson,
    string? SortingJson,
    long? BranchId,
    bool IsPublic
) : ICommand<Result<long>>;
