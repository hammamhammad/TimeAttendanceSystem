using System.Linq.Expressions;
using System.Reflection;
using TecAxle.Hrms.Application.Common.QueryParameters;

namespace TecAxle.Hrms.Application.Common.Extensions;

/// <summary>
/// Applies a <see cref="SortSpec"/> (dotted-path field + direction) to an
/// <see cref="IQueryable{T}"/> via reflection.
/// </summary>
public static class QueryableSortExtensions
{
    public static IQueryable<T> ApplySort<T>(this IQueryable<T> query, SortSpec? sort)
    {
        if (sort is null || string.IsNullOrWhiteSpace(sort.Field)) return query;

        var param = Expression.Parameter(typeof(T), "x");
        Expression expr = param;
        foreach (var part in sort.Field.Split('.', StringSplitOptions.RemoveEmptyEntries))
        {
            var prop = expr.Type.GetProperty(part, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
            if (prop is null) return query;
            expr = Expression.Property(expr, prop);
        }

        var lambda = Expression.Lambda(expr, param);
        var methodName = sort.Descending ? nameof(Queryable.OrderByDescending) : nameof(Queryable.OrderBy);

        var call = Expression.Call(
            typeof(Queryable),
            methodName,
            new[] { typeof(T), expr.Type },
            query.Expression,
            Expression.Quote(lambda));

        return query.Provider.CreateQuery<T>(call);
    }
}
