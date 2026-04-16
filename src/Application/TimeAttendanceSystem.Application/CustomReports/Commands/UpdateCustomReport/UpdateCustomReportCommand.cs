using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Commands.UpdateCustomReport;

/// <summary>
/// Command to update an existing custom report definition.
/// </summary>
public record UpdateCustomReportCommand(
    long Id,
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
) : ICommand<Result>;
