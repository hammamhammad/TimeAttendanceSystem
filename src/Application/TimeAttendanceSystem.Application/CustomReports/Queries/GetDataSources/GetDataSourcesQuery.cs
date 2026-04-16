using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetDataSources;

/// <summary>
/// Query to get metadata about available report data sources and their columns.
/// Returns static metadata describing each data source and its queryable columns.
/// </summary>
public record GetDataSourcesQuery() : IRequest<Result<List<DataSourceMetadata>>>;

/// <summary>
/// Metadata describing an available report data source.
/// </summary>
public record DataSourceMetadata(
    string Name,
    string DisplayName,
    List<DataSourceColumn> Columns
);

/// <summary>
/// Metadata describing a column available in a report data source.
/// </summary>
public record DataSourceColumn(
    string Name,
    string DisplayName,
    string DataType
);
