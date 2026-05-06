namespace TecAxle.Hrms.Application.Common.QueryParameters;

/// <summary>
/// Supported filter operators across the 12 column types (ERP spec §7D, §15).
/// </summary>
public enum FilterOperator
{
    // string
    Contains,
    NotContains,
    StartsWith,
    EndsWith,

    // comparable (string/number/date)
    Equals,
    NotEquals,
    GreaterThan,
    GreaterOrEqual,
    LessThan,
    LessOrEqual,
    Between,

    // date-specific
    Before,
    After,
    Today,
    ThisWeek,
    ThisMonth,
    ThisYear,

    // boolean
    IsTrue,
    IsFalse,

    // set
    IsAnyOf,

    // universal
    IsEmpty,
    IsNotEmpty
}

/// <summary>
/// One filter clause. `Field` supports dotted paths (e.g. "Account.AccountName")
/// resolved via reflection in `QueryableFilterExtensions`.
/// </summary>
public record FilterDescriptor(
    string Field,
    FilterOperator Operator,
    string? Value,
    string? Value2);

/// <summary>
/// AND-combined list of filter descriptors.
/// </summary>
public record FilterSpec(List<FilterDescriptor>? Filters);

/// <summary>
/// Sort direction + dotted field path.
/// </summary>
public record SortSpec(string Field, bool Descending);

/// <summary>
/// Canonical list-query input shared by every paged endpoint.
/// </summary>
public class PageQuery
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 25;
    public string? Search { get; set; }
    public SortSpec? Sort { get; set; }
    public FilterSpec? Filter { get; set; }
}
