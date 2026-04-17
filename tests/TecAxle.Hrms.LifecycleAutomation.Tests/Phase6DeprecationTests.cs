using FluentAssertions;
using TecAxle.Hrms.Application.Features.ApprovalExecution;
using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Company;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 6–7 deprecation-retirement tests. Each test pins the boundary of a retirement
/// so a future contributor can't silently re-introduce the removed path.
/// </summary>
public class Phase6DeprecationTests
{
    // =======================================================================
    // SalaryAdvance.DeductionMonth — Phase 7: FULLY REMOVED
    // =======================================================================

    [Fact]
    public void SalaryAdvance_entity_has_no_DeductionMonth_property()
    {
        var names = typeof(SalaryAdvance).GetProperties().Select(p => p.Name).ToList();
        names.Should().NotContain("DeductionMonth",
            "Phase 7 fully retired DeductionMonth (schema + entity + executor).");
        names.Should().Contain("DeductionStartDate");
        names.Should().Contain("DeductionEndDate");
    }

    [Fact]
    public async Task SalaryAdvanceExecutor_defaults_to_month_after_approval_when_dates_missing()
    {
        // Phase 7 behavior: no legacy YYYYMM back-fill. When the caller doesn't supply a
        // date range, default to the first calendar month after ApprovedAt.
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var adv = new SalaryAdvance
        {
            EmployeeId = emp.Id, Amount = 250m, Status = SalaryAdvanceStatus.Approved,
            DeductionStartDate = null, DeductionEndDate = null,
            RequestDate = DateTime.UtcNow,
            ApprovedAt = new DateTime(2026, 4, 10, 0, 0, 0, DateTimeKind.Utc),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.SalaryAdvances.Add(adv);
        db.SaveChanges();

        var exec = new SalaryAdvanceExecutor(new ApplicationDbContextAdapter(db));
        var r = await exec.ExecuteAsync(adv.Id, 99L);

        r.Outcome.Should().Be(ExecutionOutcome.Succeeded);
        var refreshed = db.SalaryAdvances.Find(adv.Id)!;
        refreshed.DeductionStartDate.Should().Be(new DateTime(2026, 5, 1, 0, 0, 0, DateTimeKind.Utc));
        refreshed.DeductionEndDate.Should().Be(new DateTime(2026, 5, 31, 0, 0, 0, DateTimeKind.Utc));
    }

    [Fact]
    public async Task SalaryAdvanceExecutor_preserves_caller_supplied_date_range()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var adv = new SalaryAdvance
        {
            EmployeeId = emp.Id, Amount = 400m, Status = SalaryAdvanceStatus.Approved,
            DeductionStartDate = new DateTime(2026, 7, 1, 0, 0, 0, DateTimeKind.Utc),
            DeductionEndDate = new DateTime(2026, 7, 31, 0, 0, 0, DateTimeKind.Utc),
            RequestDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.SalaryAdvances.Add(adv);
        db.SaveChanges();

        var exec = new SalaryAdvanceExecutor(new ApplicationDbContextAdapter(db));
        var r = await exec.ExecuteAsync(adv.Id, 99L);

        r.Outcome.Should().Be(ExecutionOutcome.Succeeded);
        var refreshed = db.SalaryAdvances.Find(adv.Id)!;
        refreshed.DeductionStartDate.Should().Be(new DateTime(2026, 7, 1, 0, 0, 0, DateTimeKind.Utc));
        refreshed.DeductionEndDate.Should().Be(new DateTime(2026, 7, 31, 0, 0, 0, DateTimeKind.Utc));
    }

    // =======================================================================
    // CompanySettings.AutoCheckOutEnabled / AutoCheckOutTime — REMOVED
    // =======================================================================

    [Fact]
    public void CompanySettings_entity_has_no_AutoCheckOut_properties()
    {
        var names = typeof(CompanySettings).GetProperties().Select(p => p.Name).ToList();
        names.Should().NotContain("AutoCheckOutEnabled");
        names.Should().NotContain("AutoCheckOutTime");
    }

    [Fact]
    public void BranchSettingsOverride_entity_has_no_AutoCheckOut_properties()
    {
        var names = typeof(BranchSettingsOverride).GetProperties().Select(p => p.Name).ToList();
        names.Should().NotContain("AutoCheckOutEnabled");
        names.Should().NotContain("AutoCheckOutTime");
    }

    [Fact]
    public void UpdateCompanySettingsCommand_does_not_accept_AutoCheckOut_fields()
    {
        var t = typeof(TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateCompanySettings.UpdateCompanySettingsCommand);
        var names = t.GetProperties().Select(p => p.Name).ToList();
        names.Should().NotContain("AutoCheckOutEnabled");
        names.Should().NotContain("AutoCheckOutTime");
    }
}
