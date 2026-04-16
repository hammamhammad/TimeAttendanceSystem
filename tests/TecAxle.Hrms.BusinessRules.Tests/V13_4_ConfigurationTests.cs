using FluentAssertions;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.BusinessRules.Tests;

/// <summary>
/// Guardrails against regressing the v13.4 "every alert window is configurable" rule.
/// Each new <see cref="TenantSettings"/> field must have the exact default that preserves
/// pre-v13.4 behavior. If any of these assertions fail, someone accidentally changed a
/// hardcoded behavior during deploy — reject the change.
/// </summary>
public class V13_4_ConfigurationTests
{
    [Fact]
    public void TenantSettings_new_fields_have_the_exact_pre_v13_4_defaults()
    {
        var s = new TenantSettings();

        s.AttendanceCorrectionMaxRetroactiveDays.Should().Be(30);
        s.DocumentExpiryAlertDaysCsv.Should().Be("30,15,7");
        s.AssetWarrantyExpiryAlertDaysCsv.Should().Be("30,15,7,1");
        s.AssetOverdueReturnAlertDaysCsv.Should().Be("1,3,7,14,30");
        s.TrainingSessionReminderDaysCsv.Should().Be("7,3,1");
        s.SuccessionPlanReminderDaysCsv.Should().Be("30,7,1");
        s.TimesheetSubmissionReminderDaysBefore.Should().Be(2);
        s.GrievanceSlaAlertDaysCsv.Should().Be("3,1");
        s.NotificationRecipientRolesCsv.Should().Be("HRManager,SystemAdmin");
    }

    [Theory]
    [InlineData("30,15,7", new[] { 30, 15, 7 })]
    [InlineData("30,15,7,1", new[] { 30, 15, 7, 1 })]
    [InlineData("1,3,7,14,30", new[] { 30, 14, 7, 3, 1 })]
    [InlineData("7,3,1", new[] { 7, 3, 1 })]
    [InlineData("30,7,1", new[] { 30, 7, 1 })]
    [InlineData("3,1", new[] { 3, 1 })]
    public void ParseCsvDays_handles_each_new_default_shape(string csv, int[] expectedDesc)
    {
        var asm = typeof(TenantSettings).Assembly;
        // Access the helper via the Infrastructure assembly (it's internal to BackgroundJobs namespace)
        var infraAsm = System.Reflection.Assembly.Load("TecAxle.Hrms.Infrastructure");
        var helperType = infraAsm.GetType("TecAxle.Hrms.Infrastructure.BackgroundJobs.BackgroundJobSettingsHelper")!;
        var method = helperType.GetMethod("ParseCsvDays",
            System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.NonPublic)!;

        var result = (int[])method.Invoke(null, new object?[] { csv, new int[] { 999 } })!;
        result.Should().Equal(expectedDesc);
    }
}
