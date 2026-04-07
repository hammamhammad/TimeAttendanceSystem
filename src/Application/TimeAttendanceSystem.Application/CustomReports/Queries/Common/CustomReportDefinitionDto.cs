using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Queries.Common;

/// <summary>
/// DTO representing a custom report definition with associated metadata.
/// </summary>
public record CustomReportDefinitionDto(
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
    long CreatedByUserId,
    string CreatedByUsername,
    bool IsPublic,
    bool IsActive,
    int ScheduledReportCount,
    DateTime CreatedAtUtc,
    DateTime? ModifiedAtUtc
);
