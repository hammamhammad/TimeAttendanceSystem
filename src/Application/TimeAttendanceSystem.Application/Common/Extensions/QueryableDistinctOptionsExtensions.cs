using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace TecAxle.Hrms.Application.Common.Extensions;

/// <summary>
/// Helpers for the <c>/filter-options</c> endpoint — returns distinct string
/// values from a dotted path on an <see cref="IQueryable{T}"/>.
/// </summary>
public static class QueryableDistinctOptionsExtensions
{
    public static async Task<List<string>> GetDistinctStringsAsync<T>(
        this IQueryable<T> query,
        string dottedPath,
        string? search = null,
        int limit = 50,
        CancellationToken cancellationToken = default)
    {
        var param = Expression.Parameter(typeof(T), "x");
        Expression expr = param;
        foreach (var part in dottedPath.Split('.', StringSplitOptions.RemoveEmptyEntries))
        {
            var prop = expr.Type.GetProperty(part, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
            if (prop is null) return new List<string>();
            expr = Expression.Property(expr, prop);
        }

        // Coerce to string if not already
        if (expr.Type != typeof(string))
        {
            var toStringMethod = expr.Type.GetMethod(nameof(object.ToString), Type.EmptyTypes);
            if (toStringMethod is not null)
                expr = Expression.Call(expr, toStringMethod);
            else
                expr = Expression.Convert(expr, typeof(string));
        }

        var lambda = Expression.Lambda<Func<T, string?>>(expr, param);
        var projected = query.Select(lambda).Where(v => v != null && v != "");

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.ToLowerInvariant();
            projected = projected.Where(v => v!.ToLower().Contains(s));
        }

        var distinct = await projected.Distinct().OrderBy(v => v).Take(limit).ToListAsync(cancellationToken);
        return distinct!.OfType<string>().ToList();
    }
}
