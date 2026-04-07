namespace TecAxle.Hrms.Domain.Reports;

/// <summary>
/// Enumeration defining the available output formats for scheduled and generated reports.
/// </summary>
public enum ReportFormat
{
    /// <summary>
    /// Microsoft Excel (.xlsx) format.
    /// </summary>
    Excel = 1,

    /// <summary>
    /// Comma-separated values (.csv) format.
    /// </summary>
    Csv = 2,

    /// <summary>
    /// Portable Document Format (.pdf) format.
    /// </summary>
    Pdf = 3
}
