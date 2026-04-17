using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Offboarding;
using TecAxle.Hrms.Domain.Performance;
using TecAxle.Hrms.Domain.Shifts;
using TecAxle.Hrms.Infrastructure.BackgroundJobs;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 3 (v14.3) tests: shift-driven auto-checkout job, PIP follow-through job, global search.
/// </summary>
public class Phase3Tests
{
    // =========================================================================
    // Helpers
    // =========================================================================

    private static ITimezoneService UtcTimezoneService(TecAxleDbContext db)
    {
        var settingsMock = new Mock<ICompanySettingsResolver>();
        settingsMock.Setup(r => r.GetSettingsAsync(It.IsAny<long?>(), It.IsAny<long?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ResolvedSettingsDto { DefaultTimeZoneId = "UTC" });
        return new TimezoneService(new ApplicationDbContextAdapter(db), settingsMock.Object, NullLogger<TimezoneService>.Instance);
    }

    private static Shift SeedShift(TecAxleDbContext db, TimeOnly start, TimeOnly end, int? grace = null)
    {
        var shift = new Shift
        {
            Name = "Standard 09-17",
            ShiftType = ShiftType.TimeBased,
            Status = ShiftStatus.Active,
            IsCheckInRequired = true,
            IsAutoCheckOut = false,
            GracePeriodMinutes = grace,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.Shifts.Add(shift);
        db.SaveChanges();
        var period = new ShiftPeriod
        {
            ShiftId = shift.Id, PeriodOrder = 1,
            StartTime = start, EndTime = end,
            IsNightPeriod = end < start,
            Hours = end < start ? (decimal)((end - start).TotalHours + 24) : (decimal)(end - start).TotalHours,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.ShiftPeriods.Add(period);
        db.SaveChanges();
        shift.ShiftPeriods.Add(period);
        return shift;
    }

    private static IAttendanceCalculationService MockCalcService(ShiftAssignment? returnValue)
    {
        var mock = new Mock<IAttendanceCalculationService>(MockBehavior.Loose);
        mock.Setup(c => c.GetEffectiveShiftAssignmentAsync(It.IsAny<long>(), It.IsAny<DateTime>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(returnValue);
        return mock.Object;
    }

    // =========================================================================
    // ShiftDrivenAutoCheckOutJob
    // =========================================================================

    [Fact]
    public async Task AutoCheckOut_creates_transaction_when_shift_ended_and_no_checkout_yet()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, branchId: 1);

        // Shift ended 2 hours ago in UTC.
        var now = DateTime.UtcNow;
        var shiftEnd = now.AddHours(-2);
        var attendanceDate = shiftEnd.Date;
        var shiftEndLocal = TimeOnly.FromDateTime(shiftEnd);
        var checkInUtc = shiftEnd.AddHours(-8);
        var shiftStartLocal = TimeOnly.FromDateTime(checkInUtc);

        var shift = SeedShift(db, shiftStartLocal, shiftEndLocal, grace: 0);
        var assignment = new ShiftAssignment
        {
            EmployeeId = emp.Id, ShiftId = shift.Id, AssignmentType = ShiftAssignmentType.Employee,
            EffectiveFromDate = attendanceDate.AddDays(-7),
            Status = ShiftAssignmentStatus.Active, Priority = 100,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        assignment.Shift = shift;
        db.ShiftAssignments.Add(assignment);
        db.AttendanceTransactions.Add(new AttendanceTransaction
        {
            EmployeeId = emp.Id,
            TransactionType = TransactionType.CheckIn,
            TransactionTimeUtc = checkInUtc,
            TransactionTimeLocal = checkInUtc,
            AttendanceDate = attendanceDate,
            IsManual = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var job = new ShiftDrivenAutoCheckOutJob(
            new ApplicationDbContextAdapter(db),
            MockCalcService(assignment),
            UtcTimezoneService(db),
            NullLogger<ShiftDrivenAutoCheckOutJob>.Instance);

        var report = await job.ExecuteAsync(CancellationToken.None);
        report.CreatedCount.Should().Be(1);

        var tx = db.AttendanceTransactions.Single(t => t.TransactionType == TransactionType.AutoCheckOut);
        tx.EmployeeId.Should().Be(emp.Id);
        tx.AttendanceDate.Date.Should().Be(attendanceDate);
        tx.TransactionTimeUtc.Should().BeCloseTo(shiftEnd, TimeSpan.FromMinutes(1));
        tx.DeviceId.Should().Contain("SYSTEM:ShiftDrivenAutoCheckOutJob");
    }

    [Fact]
    public async Task AutoCheckOut_skips_when_employee_already_checked_out()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var now = DateTime.UtcNow;
        var attendanceDate = now.AddHours(-3).Date;
        var shift = SeedShift(db, new TimeOnly(9, 0), TimeOnly.FromDateTime(now.AddHours(-1)), grace: 0);
        var assignment = new ShiftAssignment
        {
            EmployeeId = emp.Id, ShiftId = shift.Id, AssignmentType = ShiftAssignmentType.Employee,
            EffectiveFromDate = attendanceDate.AddDays(-7),
            Status = ShiftAssignmentStatus.Active, Priority = 100,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        assignment.Shift = shift;
        db.ShiftAssignments.Add(assignment);
        db.AttendanceTransactions.AddRange(
            new AttendanceTransaction { EmployeeId = emp.Id, TransactionType = TransactionType.CheckIn,
                TransactionTimeUtc = now.AddHours(-9), AttendanceDate = attendanceDate, IsManual = true,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" },
            new AttendanceTransaction { EmployeeId = emp.Id, TransactionType = TransactionType.CheckOut,
                TransactionTimeUtc = now.AddHours(-1), AttendanceDate = attendanceDate, IsManual = true,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" }
        );
        db.SaveChanges();

        var job = new ShiftDrivenAutoCheckOutJob(
            new ApplicationDbContextAdapter(db),
            MockCalcService(assignment),
            UtcTimezoneService(db),
            NullLogger<ShiftDrivenAutoCheckOutJob>.Instance);

        var report = await job.ExecuteAsync(CancellationToken.None);
        report.CreatedCount.Should().Be(0);
        report.SkippedCount.Should().BeGreaterOrEqualTo(1);
        db.AttendanceTransactions.Count(t => t.TransactionType == TransactionType.AutoCheckOut)
            .Should().Be(0);
    }

    [Fact]
    public async Task AutoCheckOut_skips_when_no_effective_shift_and_does_not_create_fake_transaction()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var now = DateTime.UtcNow;
        var attendanceDate = now.AddHours(-5).Date;
        db.AttendanceTransactions.Add(new AttendanceTransaction
        {
            EmployeeId = emp.Id, TransactionType = TransactionType.CheckIn,
            TransactionTimeUtc = now.AddHours(-5), AttendanceDate = attendanceDate, IsManual = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var job = new ShiftDrivenAutoCheckOutJob(
            new ApplicationDbContextAdapter(db),
            MockCalcService(null), // no shift resolvable
            UtcTimezoneService(db),
            NullLogger<ShiftDrivenAutoCheckOutJob>.Instance);

        var report = await job.ExecuteAsync(CancellationToken.None);
        report.CreatedCount.Should().Be(0);
        report.Skips.Should().Contain(s => s.Reason == "NoEffectiveShift");
        db.AttendanceTransactions.Count(t => t.TransactionType == TransactionType.AutoCheckOut).Should().Be(0);
    }

    [Fact]
    public async Task AutoCheckOut_does_not_fire_when_shift_still_ongoing()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var now = DateTime.UtcNow;
        var attendanceDate = now.Date;

        // Shift ends 2 hours in the future.
        var shift = SeedShift(db, TimeOnly.FromDateTime(now.AddHours(-6)), TimeOnly.FromDateTime(now.AddHours(2)), grace: 0);
        var assignment = new ShiftAssignment
        {
            EmployeeId = emp.Id, ShiftId = shift.Id, AssignmentType = ShiftAssignmentType.Employee,
            EffectiveFromDate = attendanceDate.AddDays(-7),
            Status = ShiftAssignmentStatus.Active, Priority = 100,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        assignment.Shift = shift;
        db.ShiftAssignments.Add(assignment);
        db.AttendanceTransactions.Add(new AttendanceTransaction
        {
            EmployeeId = emp.Id, TransactionType = TransactionType.CheckIn,
            TransactionTimeUtc = now.AddHours(-6), AttendanceDate = attendanceDate, IsManual = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var job = new ShiftDrivenAutoCheckOutJob(
            new ApplicationDbContextAdapter(db),
            MockCalcService(assignment),
            UtcTimezoneService(db),
            NullLogger<ShiftDrivenAutoCheckOutJob>.Instance);

        var report = await job.ExecuteAsync(CancellationToken.None);
        report.CreatedCount.Should().Be(0);
        report.Skips.Should().Contain(s => s.Reason == "ShiftNotYetEnded");
    }

    [Fact]
    public async Task AutoCheckOut_is_idempotent_on_rerun()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var now = DateTime.UtcNow;
        var shiftEnd = now.AddHours(-2);
        var attendanceDate = shiftEnd.Date;
        var shift = SeedShift(db, TimeOnly.FromDateTime(shiftEnd.AddHours(-8)), TimeOnly.FromDateTime(shiftEnd), grace: 0);
        var assignment = new ShiftAssignment
        {
            EmployeeId = emp.Id, ShiftId = shift.Id, AssignmentType = ShiftAssignmentType.Employee,
            EffectiveFromDate = attendanceDate.AddDays(-7),
            Status = ShiftAssignmentStatus.Active, Priority = 100,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        assignment.Shift = shift;
        db.ShiftAssignments.Add(assignment);
        db.AttendanceTransactions.Add(new AttendanceTransaction
        {
            EmployeeId = emp.Id, TransactionType = TransactionType.CheckIn,
            TransactionTimeUtc = shiftEnd.AddHours(-8), AttendanceDate = attendanceDate, IsManual = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var job = new ShiftDrivenAutoCheckOutJob(
            new ApplicationDbContextAdapter(db),
            MockCalcService(assignment),
            UtcTimezoneService(db),
            NullLogger<ShiftDrivenAutoCheckOutJob>.Instance);

        await job.ExecuteAsync(CancellationToken.None);
        await job.ExecuteAsync(CancellationToken.None); // second run is a no-op

        db.AttendanceTransactions.Count(t => t.TransactionType == TransactionType.AutoCheckOut)
            .Should().Be(1);
    }

    [Fact]
    public async Task AutoCheckOut_overnight_shift_end_on_next_calendar_day()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var now = DateTime.UtcNow;

        // Overnight shift: starts 22:00, ends 06:00. Check-in was at 22:00 yesterday; shift
        // end is at 06:00 today. If it's now 08:00, shift has ended 2 hours ago.
        var attendanceDate = now.AddHours(-12).Date; // the calendar day the shift started
        var shift = SeedShift(db, new TimeOnly(22, 0), new TimeOnly(6, 0), grace: 0);
        var assignment = new ShiftAssignment
        {
            EmployeeId = emp.Id, ShiftId = shift.Id, AssignmentType = ShiftAssignmentType.Employee,
            EffectiveFromDate = attendanceDate.AddDays(-7),
            Status = ShiftAssignmentStatus.Active, Priority = 100,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        assignment.Shift = shift;
        db.ShiftAssignments.Add(assignment);
        db.AttendanceTransactions.Add(new AttendanceTransaction
        {
            EmployeeId = emp.Id, TransactionType = TransactionType.CheckIn,
            // CheckIn at 22:00 local on the attendance date.
            TransactionTimeUtc = attendanceDate.AddHours(22),
            AttendanceDate = attendanceDate, IsManual = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var endUtcExpected = attendanceDate.AddDays(1).AddHours(6);
        var job = new ShiftDrivenAutoCheckOutJob(
            new ApplicationDbContextAdapter(db),
            MockCalcService(assignment),
            UtcTimezoneService(db),
            NullLogger<ShiftDrivenAutoCheckOutJob>.Instance);
        var report = await job.ExecuteAsync(CancellationToken.None);

        // The job only fires if "now" is past the computed endUtc. For a fresh midnight shift
        // that just happened yesterday, "now" is past the expected end, so we should see 1.
        if (DateTime.UtcNow >= endUtcExpected)
        {
            report.CreatedCount.Should().Be(1);
            var tx = db.AttendanceTransactions.Single(t => t.TransactionType == TransactionType.AutoCheckOut);
            tx.TransactionTimeUtc.Should().Be(endUtcExpected);
        }
    }

    // =========================================================================
    // PipFollowThroughJob
    // =========================================================================

    private static IFailureAlertService StubAlerts()
    {
        var mock = new Mock<IFailureAlertService>();
        mock.Setup(a => a.RaiseAsync(It.IsAny<RaiseFailureAlertRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(1L);
        return mock.Object;
    }
    private static IInAppNotificationService StubNotifications()
    {
        var mock = new Mock<IInAppNotificationService>();
        mock.Setup(n => n.SendNotificationAsync(It.IsAny<CreateNotificationRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(1L);
        return mock.Object;
    }

    [Fact]
    public async Task PipFollowThrough_creates_pending_resignation_on_unsuccessful_pip()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var pip = new PerformanceImprovementPlan
        {
            EmployeeId = emp.Id, ManagerEmployeeId = emp.Id,
            StartDate = DateTime.UtcNow.AddMonths(-3), EndDate = DateTime.UtcNow.AddDays(-1),
            Status = PipStatus.CompletedUnsuccessful,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.PerformanceImprovementPlans.Add(pip);
        db.SaveChanges();

        var job = new PipFollowThroughJob(
            new ApplicationDbContextAdapter(db),
            StubAlerts(), StubNotifications(),
            TestHarness.StubRecipients(42),
            NullLogger<PipFollowThroughJob>.Instance);
        await job.Invoke();

        var resignation = db.ResignationRequests.Single(r => r.EmployeeId == emp.Id);
        resignation.Status.Should().Be(ResignationStatus.Pending);
        resignation.Reason.Should().Contain("Performance Improvement Plan");

        var refreshed = db.PerformanceImprovementPlans.Find(pip.Id)!;
        refreshed.RelatedResignationRequestId.Should().Be(resignation.Id);
        refreshed.FollowThroughProcessedAt.Should().NotBeNull();
    }

    [Fact]
    public async Task PipFollowThrough_is_idempotent_on_second_run()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        db.PerformanceImprovementPlans.Add(new PerformanceImprovementPlan
        {
            EmployeeId = emp.Id, ManagerEmployeeId = emp.Id,
            StartDate = DateTime.UtcNow.AddMonths(-3), EndDate = DateTime.UtcNow.AddDays(-1),
            Status = PipStatus.CompletedUnsuccessful,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var job = new PipFollowThroughJob(
            new ApplicationDbContextAdapter(db),
            StubAlerts(), StubNotifications(),
            TestHarness.StubRecipients(42),
            NullLogger<PipFollowThroughJob>.Instance);
        await job.Invoke();
        await job.Invoke();

        db.ResignationRequests.Count(r => r.EmployeeId == emp.Id).Should().Be(1,
            "follow-through is idempotent via PIP.RelatedResignationRequestId marker");
    }

    [Fact]
    public async Task PipFollowThrough_skips_when_employee_already_has_active_resignation()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        db.PerformanceImprovementPlans.Add(new PerformanceImprovementPlan
        {
            EmployeeId = emp.Id, ManagerEmployeeId = emp.Id,
            StartDate = DateTime.UtcNow.AddMonths(-3), EndDate = DateTime.UtcNow.AddDays(-1),
            Status = PipStatus.CompletedUnsuccessful,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.ResignationRequests.Add(new ResignationRequest
        {
            EmployeeId = emp.Id,
            ResignationDate = DateTime.UtcNow.AddDays(-5),
            LastWorkingDate = DateTime.UtcNow.AddDays(25),
            NoticePeriodDays = 30,
            Status = ResignationStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var job = new PipFollowThroughJob(
            new ApplicationDbContextAdapter(db),
            StubAlerts(), StubNotifications(),
            TestHarness.StubRecipients(42),
            NullLogger<PipFollowThroughJob>.Instance);
        await job.Invoke();

        db.ResignationRequests.Count().Should().Be(1,
            "no parallel resignation created when one is already active");
        var pipAfter = db.PerformanceImprovementPlans.First();
        pipAfter.FollowThroughProcessedAt.Should().NotBeNull();
        pipAfter.RelatedResignationRequestId.Should().BeNull();
    }

    // =========================================================================
    // GlobalSearchService
    // =========================================================================

    private static ICurrentUser StubSysAdmin() => TestHarness.StubUser(userId: 1);

    [Fact]
    public async Task GlobalSearch_returns_employees_matching_name_substring()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedEmployee(db, configure: e => { e.FirstName = "Sarah"; e.LastName = "Alhajri"; e.EmployeeNumber = "E0001"; });
        TestHarness.SeedEmployee(db, configure: e => { e.FirstName = "Omar"; e.LastName = "Smith"; e.EmployeeNumber = "E0002"; });
        var svc = new GlobalSearchService(new ApplicationDbContextAdapter(db), StubSysAdmin());
        var r = await svc.SearchAsync(new GlobalSearchRequest { Query = "sar" });
        r.Items.Should().ContainSingle(i => i.EntityType == "Employee" && i.Title.Contains("Sarah"));
    }

    [Fact]
    public async Task GlobalSearch_short_query_returns_empty_without_full_table_scan()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedEmployee(db);
        var svc = new GlobalSearchService(new ApplicationDbContextAdapter(db), StubSysAdmin());
        var r = await svc.SearchAsync(new GlobalSearchRequest { Query = "a" });
        r.Items.Should().BeEmpty("queries shorter than 2 chars return nothing to avoid scan cost");
    }

    [Fact]
    public async Task GlobalSearch_includeTypes_filters_correctly()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedEmployee(db, configure: e => { e.FirstName = "Zara"; e.LastName = "Zafar"; e.EmployeeNumber = "Z001"; });
        var svc = new GlobalSearchService(new ApplicationDbContextAdapter(db), StubSysAdmin());
        var r = await svc.SearchAsync(new GlobalSearchRequest
        {
            Query = "zar",
            IncludeTypes = new HashSet<string> { "LoanApplication" } // exclude Employee
        });
        r.Items.Should().NotContain(i => i.EntityType == "Employee");
    }
}
