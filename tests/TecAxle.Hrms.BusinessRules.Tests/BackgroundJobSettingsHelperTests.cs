using System.Reflection;
using FluentAssertions;

namespace TecAxle.Hrms.BusinessRules.Tests;

/// <summary>
/// The helper is internal to the Infrastructure assembly; access via reflection so the tests
/// stay independent of internal-visibility tweaks.
/// </summary>
public class BackgroundJobSettingsHelperTests
{
    private static int[] Parse(string? csv, int[] fallback)
    {
        var asm = Assembly.Load("TecAxle.Hrms.Infrastructure");
        var type = asm.GetType("TecAxle.Hrms.Infrastructure.BackgroundJobs.BackgroundJobSettingsHelper")!;
        var method = type.GetMethod("ParseCsvDays", BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public)!;
        return (int[])method.Invoke(null, new object?[] { csv, fallback })!;
    }

    [Fact]
    public void Parses_simple_csv_in_desc_order()
    {
        var r = Parse("30,15,7", new[] { 1, 2, 3 });
        r.Should().Equal(30, 15, 7);
    }

    [Fact]
    public void Dedupes_and_trims()
    {
        var r = Parse(" 7 , 7,  3 ", new[] { 1 });
        r.Should().Equal(7, 3);
    }

    [Fact]
    public void Rejects_non_numeric_and_zero_but_keeps_valid()
    {
        var r = Parse("abc,7,0,-1,15", new[] { 1 });
        r.Should().Equal(15, 7);
    }

    [Fact]
    public void Returns_fallback_when_null_empty_or_all_invalid()
    {
        Parse(null, new[] { 30, 15, 7 }).Should().Equal(30, 15, 7);
        Parse("", new[] { 30, 15, 7 }).Should().Equal(30, 15, 7);
        Parse("abc,xyz", new[] { 30, 15, 7 }).Should().Equal(30, 15, 7);
    }

    [Fact]
    public void Rejects_absurdly_large_values()
    {
        // 10 years = 3650 is the accepted ceiling; 999999 is rejected.
        var r = Parse("999999,7", new[] { 1 });
        r.Should().Equal(7);
    }
}
