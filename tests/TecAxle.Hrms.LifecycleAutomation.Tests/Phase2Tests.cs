using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;
using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Lifecycle;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Infrastructure.BackgroundJobs;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 2 (v14.2) tests: timezone service, surfacer job, payroll side-effect reverser.
/// </summary>
public class Phase2Tests
{
    // ---------- Helpers ----------

    private static ICompanySettingsResolver StubResolver(string defaultTz = "UTC", int dedupSeconds = 30)
    {
        var resolved = new ResolvedSettingsDto
        {
            DefaultTimeZoneId = defaultTz,
            AttendanceDuplicateSuppressionSeconds = dedupSeconds
        };
        var mock = new Mock<ICompanySettingsResolver>();
        mock.Setup(r => r.GetSettingsAsync(It.IsAny<long?>(), It.IsAny<long?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(resolved);
        return mock.Object;
    }

    private static IFailureAlertService BuildAlerts(TecAxleDbContext db)
    {
        var notifs = new Mock<IInAppNotificationService>();
        notifs.Setup(n => n.SendBulkNotificationsAsync(
                It.IsAny<IEnumerable<CreateNotificationRequest>>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        var recipients = TestHarness.StubRecipients(42);
        return new FailureAlertService(
            new ApplicationDbContextAdapter(db),
            notifs.Object,
            recipients,
            NullLogger<FailureAlertService>.Instance);
    }

    // ===========================================================================
    // 1) Timezone service
    // ===========================================================================

    [Fact]
    public void GetBranchTimeZone_from_entity_returns_correct_tz()
    {
        using var db = TestHarness.NewDb();
        var svc = new TimezoneService(new ApplicationDbContextAdapter(db), StubResolver(), NullLogger<TimezoneService>.Instance);
        var branch = new Branch { TimeZone = "UTC" };
        svc.GetBranchTimeZone(branch).Id.Should().Be("UTC");
    }

    [Fact]
    public void GetBranchTimeZone_falls_back_to_UTC_on_unknown_id()
    {
        using var db = TestHarness.NewDb();
        var svc = new TimezoneService(new ApplicationDbContextAdapter(db), StubResolver(), NullLogger<TimezoneService>.Instance);
        var branch = new Branch { TimeZone = "Totally/Bogus" };
        svc.GetBranchTimeZone(branch).Should().Be(TimeZoneInfo.Utc);
    }

    [Fact]
    public async Task ToBranchLocalAsync_falls_back_to_tenant_default_when_branch_tz_is_empty()
    {
        using var db = TestHarness.NewDb();
        var branch = new Branch
        {
            Name = "B1", 
            TimeZone = "", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.Branches.Add(branch);
        db.SaveChanges();

        var svc = new TimezoneService(new ApplicationDbContextAdapter(db),
            StubResolver("UTC"), NullLogger<TimezoneService>.Instance);

        // 2026-05-01 12:00 UTC in UTC tz is still 12:00 local.
        var local = await svc.ToBranchLocalAsync(new DateTime(2026, 5, 1, 12, 0, 0, DateTimeKind.Utc), branch.Id);
        local.Should().Be(new DateTime(2026, 5, 1, 12, 0, 0));
        local.Kind.Should().Be(DateTimeKind.Unspecified);
    }

    [Fact]
    public async Task GetAttendanceDateAsync_buckets_midnight_crossover_correctly()
    {
        using var db = TestHarness.NewDb();
        // Use a real system tz that most platforms ship (UTC+3 Saudi/Qatar). If not present,
        // the service falls back to UTC, so both values would be "2026-05-01" — we check both.
        var tzId = TimeZoneInfo.GetSystemTimeZones()
            .Any(t => t.Id == "Asia/Riyadh") ? "Asia/Riyadh"
            : (TimeZoneInfo.GetSystemTimeZones().Any(t => t.Id == "Arab Standard Time")
                ? "Arab Standard Time" : "UTC");

        var branch = new Branch
        {
            Name = "HQ", 
            TimeZone = tzId, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.Branches.Add(branch);
        db.SaveChanges();

        var svc = new TimezoneService(new ApplicationDbContextAdapter(db),
            StubResolver(tzId), NullLogger<TimezoneService>.Instance);

        // 2026-05-01 22:30 UTC: in Riyadh (+3) that is 2026-05-02 01:30 local → next day bucket.
        var punchUtc = new DateTime(2026, 5, 1, 22, 30, 0, DateTimeKind.Utc);
        var attDate = await svc.GetAttendanceDateAsync(punchUtc, branch.Id);

        if (tzId == "UTC")
        {
            attDate.Should().Be(new DateTime(2026, 5, 1));
        }
        else
        {
            attDate.Should().Be(new DateTime(2026, 5, 2), "UTC+3 shifts 22:30 UTC into the next day locally");
        }
        attDate.Kind.Should().Be(DateTimeKind.Unspecified);
    }

    [Fact]
    public async Task ToBranchLocalAsync_rejects_non_existent_branch_to_tenant_default()
    {
        using var db = TestHarness.NewDb();
        var svc = new TimezoneService(new ApplicationDbContextAdapter(db),
            StubResolver("UTC"), NullLogger<TimezoneService>.Instance);

        // branch 9999 doesn't exist → should fall through to tenant default (UTC) without throwing.
        var local = await svc.ToBranchLocalAsync(new DateTime(2026, 5, 1, 0, 0, 0, DateTimeKind.Utc), 9999);
        local.Should().Be(new DateTime(2026, 5, 1));
    }

    // ===========================================================================
    // 2) OperationalFailureSurfacerJob
    // ===========================================================================

    [Fact]
    public async Task SurfacerJob_raises_alert_for_Failed_audit_without_existing_open_alert()
    {
        using var db = TestHarness.NewDb();
        db.LifecycleAutomationAudits.Add(new LifecycleAutomationAudit
        {
            AutomationType = LifecycleAutomationType.OfferAcceptedCreateOnboarding,
            SourceEntityType = "OfferLetter",
            SourceEntityId = 77,
            Status = LifecycleAutomationStatus.Failed,
            Reason = "No onboarding template resolved",
            ErrorMessage = "Template lookup returned null",
            TriggeredAtUtc = DateTime.UtcNow.AddMinutes(-5),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "system"
        });
        db.SaveChanges();

        var alerts = BuildAlerts(db);
        var job = new OperationalFailureSurfacerJob(
            new ApplicationDbContextAdapter(db), alerts, NullLogger<OperationalFailureSurfacerJob>.Instance);

        await job.Invoke();

        var raised = db.OperationalFailureAlerts.ToList();
        raised.Should().HaveCount(1);
        raised[0].Category.Should().Be(OperationalFailureCategory.LifecycleAutomation);
        raised[0].SourceEntityType.Should().Be("OfferLetter");
        raised[0].SourceEntityId.Should().Be(77);
        raised[0].FailureCode.Should().Be("HandlerFailed");
        raised[0].IsRetryable.Should().BeTrue();
    }

    [Fact]
    public async Task SurfacerJob_is_idempotent_on_second_run()
    {
        using var db = TestHarness.NewDb();
        db.LifecycleAutomationAudits.Add(new LifecycleAutomationAudit
        {
            AutomationType = LifecycleAutomationType.TerminationCreateClearance,
            SourceEntityType = "TerminationRecord",
            SourceEntityId = 11,
            Status = LifecycleAutomationStatus.MissingPrerequisite,
            Reason = "No default clearance template configured",
            TriggeredAtUtc = DateTime.UtcNow.AddMinutes(-10),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "system"
        });
        db.SaveChanges();

        var alerts = BuildAlerts(db);
        var job = new OperationalFailureSurfacerJob(
            new ApplicationDbContextAdapter(db), alerts, NullLogger<OperationalFailureSurfacerJob>.Instance);

        await job.Invoke();
        await job.Invoke();

        var raised = db.OperationalFailureAlerts.ToList();
        raised.Should().HaveCount(1, "surfacer must dedupe — second run skips the already-open alert");
        raised[0].FailureCode.Should().Be("MissingPrerequisite");
        raised[0].IsRetryable.Should().BeFalse("MissingPrerequisite is not retryable from an alert");
    }

    [Fact]
    public async Task SurfacerJob_ignores_audits_superseded_by_a_successful_retry()
    {
        using var db = TestHarness.NewDb();
        // Earlier Failed audit, then later Succeeded audit for the same key → skip.
        db.LifecycleAutomationAudits.Add(new LifecycleAutomationAudit
        {
            AutomationType = LifecycleAutomationType.OfferAcceptedCreateOnboarding,
            SourceEntityType = "OfferLetter",
            SourceEntityId = 500,
            Status = LifecycleAutomationStatus.Failed,
            Reason = "initial failure",
            TriggeredAtUtc = DateTime.UtcNow.AddMinutes(-60),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "system"
        });
        db.LifecycleAutomationAudits.Add(new LifecycleAutomationAudit
        {
            AutomationType = LifecycleAutomationType.OfferAcceptedCreateOnboarding,
            SourceEntityType = "OfferLetter",
            SourceEntityId = 500,
            Status = LifecycleAutomationStatus.Succeeded,
            TriggeredAtUtc = DateTime.UtcNow.AddMinutes(-5),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "system"
        });
        db.SaveChanges();

        var alerts = BuildAlerts(db);
        var job = new OperationalFailureSurfacerJob(
            new ApplicationDbContextAdapter(db), alerts, NullLogger<OperationalFailureSurfacerJob>.Instance);

        await job.Invoke();

        db.OperationalFailureAlerts.Count().Should().Be(0,
            "the retry succeeded; surfacer must not resurface an already-resolved failure");
    }

    // ===========================================================================
    // 3) PayrollSideEffectReverser
    // ===========================================================================

    [Fact]
    public async Task Reverser_unlinks_loan_repayment_and_restores_balance_and_Active_status()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var lt = new LoanType { Name = "P", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanTypes.Add(lt);
        db.SaveChanges();

        var loan = new LoanApplication
        {
            EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 1200m, ApprovedAmount = 1200m, RepaymentMonths = 12, InterestRate = 0m,
            Status = LoanApplicationStatus.FullyPaid, // simulate earlier full payment
            OutstandingBalance = 0m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.LoanApplications.Add(loan);
        db.SaveChanges();

        var period = new PayrollPeriod
        {
            BranchId = 1, Name = "M", StartDate = new DateTime(2026,5,1), EndDate = new DateTime(2026,5,31),
            PeriodType = PayrollPeriodType.Monthly,
            Status = PayrollPeriodStatus.Paid,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PayrollPeriods.Add(period);
        db.SaveChanges();
        var record = new PayrollRecord
        {
            PayrollPeriodId = period.Id, EmployeeId = emp.Id,
            BaseSalary = 5000m, GrossEarnings = 5000m, TotalDeductions = 100m, NetSalary = 4900m,
            Status = PayrollRecordStatus.Finalized, CalculationVersion = 1,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PayrollRecords.Add(record);
        db.SaveChanges();

        var rep = new LoanRepayment
        {
            LoanApplicationId = loan.Id, InstallmentNumber = 1, Amount = 100m,
            DueDate = new DateTime(2026,5,15), Status = LoanRepaymentStatus.Paid,
            PaidDate = DateTime.UtcNow, PayrollRecordId = record.Id, BalanceRemaining = 0m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.LoanRepayments.Add(rep);
        db.SaveChanges();

        var reverser = new PayrollSideEffectReverser(
            new ApplicationDbContextAdapter(db), NullLogger<PayrollSideEffectReverser>.Instance);
        await reverser.ReverseAsync(record.Id, "unit test");
        await db.SaveChangesAsync();

        db.LoanRepayments.Find(rep.Id)!.Status.Should().Be(LoanRepaymentStatus.Scheduled);
        db.LoanRepayments.Find(rep.Id)!.PayrollRecordId.Should().BeNull();
        db.LoanRepayments.Find(rep.Id)!.PaidDate.Should().BeNull();
        db.LoanApplications.Find(loan.Id)!.OutstandingBalance.Should().Be(100m);
        db.LoanApplications.Find(loan.Id)!.Status.Should().Be(LoanApplicationStatus.Active);
    }

    [Fact]
    public async Task Reverser_unlinks_salary_advance()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var period = new PayrollPeriod
        {
            BranchId = 1, Name = "M", StartDate = new DateTime(2026,5,1), EndDate = new DateTime(2026,5,31),
            PeriodType = PayrollPeriodType.Monthly,
            Status = PayrollPeriodStatus.Paid,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PayrollPeriods.Add(period); db.SaveChanges();
        var record = new PayrollRecord
        {
            PayrollPeriodId = period.Id, EmployeeId = emp.Id,
            BaseSalary = 5000m, NetSalary = 4000m,
            Status = PayrollRecordStatus.Finalized, CalculationVersion = 1,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PayrollRecords.Add(record); db.SaveChanges();
        var adv = new SalaryAdvance
        {
            EmployeeId = emp.Id, Amount = 500m,
            Status = SalaryAdvanceStatus.Deducted, PayrollRecordId = record.Id,
            DeductionStartDate = new DateTime(2026, 5, 1, 0, 0, 0, DateTimeKind.Utc),
            DeductionEndDate = new DateTime(2026, 5, 31, 0, 0, 0, DateTimeKind.Utc),
            RequestDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.SalaryAdvances.Add(adv); db.SaveChanges();

        var reverser = new PayrollSideEffectReverser(
            new ApplicationDbContextAdapter(db), NullLogger<PayrollSideEffectReverser>.Instance);
        await reverser.ReverseAsync(record.Id, "test");
        await db.SaveChangesAsync();

        db.SalaryAdvances.Find(adv.Id)!.Status.Should().Be(SalaryAdvanceStatus.Approved);
        db.SalaryAdvances.Find(adv.Id)!.PayrollRecordId.Should().BeNull();
    }

    [Fact]
    public async Task CascadeDeleteDetailsAsync_soft_deletes_orphan_details()
    {
        using var db = TestHarness.NewDb();
        var period = new PayrollPeriod
        {
            BranchId = 1, Name = "M", StartDate = new DateTime(2026,5,1), EndDate = new DateTime(2026,5,31),
            PeriodType = PayrollPeriodType.Monthly,
            Status = PayrollPeriodStatus.Processed,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PayrollPeriods.Add(period); db.SaveChanges();
        var rec = new PayrollRecord
        {
            PayrollPeriodId = period.Id, EmployeeId = 1,
            BaseSalary = 100m, NetSalary = 90m,
            Status = PayrollRecordStatus.Calculated, CalculationVersion = 1,
            IsDeleted = true,   // already soft-deleted (orphan scenario)
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PayrollRecords.Add(rec); db.SaveChanges();
        db.PayrollRecordDetails.Add(new PayrollRecordDetail
        {
            PayrollRecordId = rec.Id,
            ComponentName = "Orphan", ComponentType = SalaryComponentType.OtherDeduction,
            Amount = -10m, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var reverser = new PayrollSideEffectReverser(
            new ApplicationDbContextAdapter(db), NullLogger<PayrollSideEffectReverser>.Instance);
        await reverser.CascadeDeleteDetailsAsync(period.Id);
        await db.SaveChangesAsync();

        db.PayrollRecordDetails.Count(d => !d.IsDeleted).Should().Be(0,
            "orphan detail row belonging to a soft-deleted parent must be cascade-soft-deleted");
    }
}
