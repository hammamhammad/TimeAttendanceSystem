using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Commands.CreateCustomReport;

/// <summary>
/// Command to create a new custom report definition.
/// </summary>
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
