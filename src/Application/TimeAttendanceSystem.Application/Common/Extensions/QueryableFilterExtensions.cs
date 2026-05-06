using System.Linq.Expressions;
using System.Reflection;
using TecAxle.Hrms.Application.Common.QueryParameters;

namespace TecAxle.Hrms.Application.Common.Extensions;

/// <summary>
/// Applies a <see cref="FilterSpec"/> to an <see cref="IQueryable{T}"/>, building
/// EF-translatable <see cref="Expression{TDelegate}"/> trees for all 22 operators
/// defined in the ERP spec (§7D, §15). Supports dotted navigation paths
/// (e.g. <c>Account.AccountName</c>) via reflection.
/// </summary>
public static class QueryableFilterExtensions
{
    public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, FilterSpec? spec)
    {
        if (spec?.Filters is null || spec.Filters.Count == 0) return query;

        var param = Expression.Parameter(typeof(T), "x");
        Expression? combined = null;

        foreach (var f in spec.Filters)
        {
            var predicate = BuildPredicate<T>(f, param);
            if (predicate is null) continue;
            combined = combined is null ? predicate : Expression.AndAlso(combined, predicate);
        }

        if (combined is null) return query;
        var lambda = Expression.Lambda<Func<T, bool>>(combined, param);
        return query.Where(lambda);
    }

    // --- Predicate builder ---

    private static Expression? BuildPredicate<T>(FilterDescriptor f, ParameterExpression param)
    {
        var property = ResolvePropertyPath(param, f.Field);
        if (property is null) return null;

        var underlyingType = Nullable.GetUnderlyingType(property.Type) ?? property.Type;

        // Universal operators work on any type
        if (f.Operator == FilterOperator.IsEmpty) return BuildIsEmpty(property, underlyingType);
        if (f.Operator == FilterOperator.IsNotEmpty) return Expression.Not(BuildIsEmpty(property, underlyingType));

        // Route to the appropriate type-specific builder
        if (underlyingType == typeof(string)) return BuildStringPredicate(property, f);
        if (IsNumericType(underlyingType)) return BuildNumericPredicate(property, underlyingType, f);
        if (underlyingType == typeof(DateTime) || underlyingType == typeof(DateOnly)) return BuildDatePredicate(property, underlyingType, f);
        if (underlyingType == typeof(bool)) return BuildBoolPredicate(property, f);
        if (underlyingType.IsEnum) return BuildEnumPredicate(property, underlyingType, f);
        if (underlyingType == typeof(Guid)) return BuildGuidPredicate(property, f);

        return null;
    }

    // --- Property resolution (dotted path via reflection) ---

    private static Expression? ResolvePropertyPath(Expression root, string path)
    {
        if (string.IsNullOrWhiteSpace(path)) return null;
        Expression expr = root;
        foreach (var part in path.Split('.', StringSplitOptions.RemoveEmptyEntries))
        {
            var prop = expr.Type.GetProperty(part, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
            if (prop is null) return null;
            expr = Expression.Property(expr, prop);
        }
        return expr;
    }

    // --- Per-type builders ---

    private static Expression? BuildStringPredicate(Expression property, FilterDescriptor f)
    {
        var value = f.Value ?? string.Empty;
        var ciValue = Expression.Constant(value.ToLowerInvariant());
        var propLower = Expression.Call(
            CoalesceString(property),
            typeof(string).GetMethod(nameof(string.ToLowerInvariant), Type.EmptyTypes)!);

        return f.Operator switch
        {
            FilterOperator.Contains => Expression.Call(propLower, nameof(string.Contains), Type.EmptyTypes, ciValue),
            FilterOperator.NotContains => Expression.Not(Expression.Call(propLower, nameof(string.Contains), Type.EmptyTypes, ciValue)),
            FilterOperator.StartsWith => Expression.Call(propLower, nameof(string.StartsWith), Type.EmptyTypes, ciValue),
            FilterOperator.EndsWith => Expression.Call(propLower, nameof(string.EndsWith), Type.EmptyTypes, ciValue),
            FilterOperator.Equals => Expression.Equal(propLower, ciValue),
            FilterOperator.NotEquals => Expression.NotEqual(propLower, ciValue),
            FilterOperator.IsAnyOf => BuildIsAnyOfString(propLower, f.Value),
            _ => null
        };
    }

    private static Expression CoalesceString(Expression property)
    {
        // EF Core translates `x.Name ?? ""` cleanly
        return Expression.Coalesce(property, Expression.Constant(string.Empty));
    }

    private static Expression? BuildIsAnyOfString(Expression propLower, string? csv)
    {
        if (string.IsNullOrWhiteSpace(csv)) return null;
        var values = csv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(v => v.ToLowerInvariant())
            .ToList();
        Expression? combined = null;
        foreach (var v in values)
        {
            var eq = Expression.Equal(propLower, Expression.Constant(v));
            combined = combined is null ? eq : Expression.OrElse(combined, eq);
        }
        return combined;
    }

    private static Expression? BuildNumericPredicate(Expression property, Type type, FilterDescriptor f)
    {
        var a = ConvertConstant(f.Value, type);
        if (a is null && f.Operator != FilterOperator.IsAnyOf) return null;

        var left = property.Type != type && Nullable.GetUnderlyingType(property.Type) is null
            ? property
            : property;

        return f.Operator switch
        {
            FilterOperator.Equals => Expression.Equal(left, LiftToPropertyType(a!, property.Type)),
            FilterOperator.NotEquals => Expression.NotEqual(left, LiftToPropertyType(a!, property.Type)),
            FilterOperator.GreaterThan => Expression.GreaterThan(left, LiftToPropertyType(a!, property.Type)),
            FilterOperator.GreaterOrEqual => Expression.GreaterThanOrEqual(left, LiftToPropertyType(a!, property.Type)),
            FilterOperator.LessThan => Expression.LessThan(left, LiftToPropertyType(a!, property.Type)),
            FilterOperator.LessOrEqual => Expression.LessThanOrEqual(left, LiftToPropertyType(a!, property.Type)),
            FilterOperator.Between => BuildBetween(left, property.Type, type, f.Value, f.Value2),
            FilterOperator.IsAnyOf => BuildIsAnyOfNumeric(left, property.Type, type, f.Value),
            _ => null
        };
    }

    private static Expression? BuildBetween(Expression property, Type propertyType, Type underlying, string? v1, string? v2)
    {
        var a = ConvertConstant(v1, underlying);
        var b = ConvertConstant(v2, underlying);
        if (a is null || b is null) return null;
        return Expression.AndAlso(
            Expression.GreaterThanOrEqual(property, LiftToPropertyType(a, propertyType)),
            Expression.LessThanOrEqual(property, LiftToPropertyType(b, propertyType))
        );
    }

    private static Expression? BuildIsAnyOfNumeric(Expression property, Type propertyType, Type underlying, string? csv)
    {
        if (string.IsNullOrWhiteSpace(csv)) return null;
        Expression? combined = null;
        foreach (var raw in csv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var v = ConvertConstant(raw, underlying);
            if (v is null) continue;
            var eq = Expression.Equal(property, LiftToPropertyType(v, propertyType));
            combined = combined is null ? eq : Expression.OrElse(combined, eq);
        }
        return combined;
    }

    private static Expression? BuildDatePredicate(Expression property, Type type, FilterDescriptor f)
    {
        var now = DateTime.UtcNow;
        switch (f.Operator)
        {
            case FilterOperator.Today:
                return BuildDateRange(property, type, now.Date, now.Date.AddDays(1).AddTicks(-1));
            case FilterOperator.ThisWeek:
                {
                    var start = now.Date.AddDays(-(int)now.DayOfWeek);
                    return BuildDateRange(property, type, start, start.AddDays(7).AddTicks(-1));
                }
            case FilterOperator.ThisMonth:
                {
                    var start = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
                    var end = start.AddMonths(1).AddTicks(-1);
                    return BuildDateRange(property, type, start, end);
                }
            case FilterOperator.ThisYear:
                {
                    var start = new DateTime(now.Year, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                    var end = new DateTime(now.Year, 12, 31, 23, 59, 59, DateTimeKind.Utc);
                    return BuildDateRange(property, type, start, end);
                }
        }

        var aParsed = ParseDate(f.Value, type);
        if (aParsed is null && f.Operator != FilterOperator.Between) return null;

        return f.Operator switch
        {
            FilterOperator.Equals =>
                BuildDateRange(property, type, aParsed!.Value.Date, aParsed.Value.Date.AddDays(1).AddTicks(-1)),
            FilterOperator.Before => Expression.LessThan(property, DateConstant(aParsed!.Value, type, property.Type)),
            FilterOperator.After => Expression.GreaterThan(property, DateConstant(aParsed!.Value, type, property.Type)),
            FilterOperator.Between => BuildDateBetween(property, type, f.Value, f.Value2),
            _ => null
        };
    }

    private static Expression? BuildDateBetween(Expression property, Type type, string? v1, string? v2)
    {
        var a = ParseDate(v1, type);
        var b = ParseDate(v2, type);
        if (a is null || b is null) return null;
        var lo = a.Value < b.Value ? a.Value : b.Value;
        var hi = a.Value < b.Value ? b.Value : a.Value;
        return BuildDateRange(property, type, lo.Date, hi.Date.AddDays(1).AddTicks(-1));
    }

    private static Expression BuildDateRange(Expression property, Type type, DateTime from, DateTime to)
    {
        return Expression.AndAlso(
            Expression.GreaterThanOrEqual(property, DateConstant(from, type, property.Type)),
            Expression.LessThanOrEqual(property, DateConstant(to, type, property.Type))
        );
    }

    private static Expression DateConstant(DateTime v, Type underlying, Type propertyType)
    {
        if (underlying == typeof(DateOnly))
        {
            var date = DateOnly.FromDateTime(v);
            return LiftToPropertyType(Expression.Constant(date, typeof(DateOnly)), propertyType);
        }
        return LiftToPropertyType(Expression.Constant(DateTime.SpecifyKind(v, DateTimeKind.Utc), typeof(DateTime)), propertyType);
    }

    private static DateTime? ParseDate(string? s, Type type)
    {
        if (string.IsNullOrWhiteSpace(s)) return null;
        if (DateTime.TryParse(s, null, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dt))
            return dt;
        return null;
    }

    private static Expression? BuildBoolPredicate(Expression property, FilterDescriptor f)
    {
        return f.Operator switch
        {
            FilterOperator.IsTrue => Expression.Equal(property, LiftToPropertyType(Expression.Constant(true), property.Type)),
            FilterOperator.IsFalse => Expression.Equal(property, LiftToPropertyType(Expression.Constant(false), property.Type)),
            _ => null
        };
    }

    private static Expression? BuildEnumPredicate(Expression property, Type enumType, FilterDescriptor f)
    {
        var single = ParseEnum(f.Value, enumType);
        return f.Operator switch
        {
            FilterOperator.Equals when single is not null => Expression.Equal(property, LiftToPropertyType(Expression.Constant(single, enumType), property.Type)),
            FilterOperator.NotEquals when single is not null => Expression.NotEqual(property, LiftToPropertyType(Expression.Constant(single, enumType), property.Type)),
            FilterOperator.IsAnyOf => BuildIsAnyOfEnum(property, enumType, f.Value),
            _ => null
        };
    }

    private static Expression? BuildIsAnyOfEnum(Expression property, Type enumType, string? csv)
    {
        if (string.IsNullOrWhiteSpace(csv)) return null;
        Expression? combined = null;
        foreach (var raw in csv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var v = ParseEnum(raw, enumType);
            if (v is null) continue;
            var eq = Expression.Equal(property, LiftToPropertyType(Expression.Constant(v, enumType), property.Type));
            combined = combined is null ? eq : Expression.OrElse(combined, eq);
        }
        return combined;
    }

    private static object? ParseEnum(string? s, Type enumType)
    {
        if (string.IsNullOrWhiteSpace(s)) return null;
        if (Enum.TryParse(enumType, s, ignoreCase: true, out var v)) return v;
        return null;
    }

    private static Expression? BuildGuidPredicate(Expression property, FilterDescriptor f)
    {
        if (!Guid.TryParse(f.Value, out var g)) return null;
        return f.Operator switch
        {
            FilterOperator.Equals => Expression.Equal(property, LiftToPropertyType(Expression.Constant(g), property.Type)),
            FilterOperator.NotEquals => Expression.NotEqual(property, LiftToPropertyType(Expression.Constant(g), property.Type)),
            _ => null
        };
    }

    // --- IsEmpty helper ---

    private static Expression BuildIsEmpty(Expression property, Type underlying)
    {
        if (underlying == typeof(string))
        {
            var isNull = Expression.Equal(property, Expression.Constant(null, typeof(string)));
            var isEmpty = Expression.Equal(property, Expression.Constant(string.Empty));
            return Expression.OrElse(isNull, isEmpty);
        }
        if (Nullable.GetUnderlyingType(property.Type) is not null)
        {
            return Expression.Equal(property, Expression.Constant(null, property.Type));
        }
        // Value types without Nullable wrapper can't be empty — always false
        return Expression.Constant(false);
    }

    // --- Type helpers ---

    private static readonly HashSet<Type> NumericTypes = new()
    {
        typeof(byte), typeof(sbyte),
        typeof(short), typeof(ushort),
        typeof(int), typeof(uint),
        typeof(long), typeof(ulong),
        typeof(float), typeof(double), typeof(decimal)
    };

    private static bool IsNumericType(Type t) => NumericTypes.Contains(t);

    private static Expression? ConvertConstant(string? value, Type targetType)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        try
        {
            var v = Convert.ChangeType(value, targetType, System.Globalization.CultureInfo.InvariantCulture);
            return Expression.Constant(v, targetType);
        }
        catch { return null; }
    }

    /// <summary>Lifts a non-nullable expression into the nullable wrapper of the property type when needed.</summary>
    private static Expression LiftToPropertyType(Expression expr, Type propertyType)
    {
        if (expr.Type == propertyType) return expr;
        if (Nullable.GetUnderlyingType(propertyType) is Type underlying && underlying == expr.Type)
        {
            return Expression.Convert(expr, propertyType);
        }
        return Expression.Convert(expr, propertyType);
    }
}
