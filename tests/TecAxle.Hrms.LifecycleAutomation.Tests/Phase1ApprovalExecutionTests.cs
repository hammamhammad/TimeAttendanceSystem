using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Features.ApprovalExecution;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Documents;
using TecAxle.Hrms.Domain.Expenses;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 1 (v14.1): Tests the approval-to-execution layer + FailureAlertService idempotency +
/// SalaryAdvance date-range back-fill. Uses the existing <see cref="TestHarness"/> in-memory DB.
/// </summary>
public class Phase1ApprovalExecutionTests
{
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

    [Fact]
    public async Task AllowanceRequest_executor_creates_assignment_and_is_idempotent()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var emp = TestHarness.SeedEmployee(db);
        var type = new AllowanceType { Name = "Housing", IsActive = true,
            DefaultCalculationType = CalculationType.Fixed, DefaultAmount = 500m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.AllowanceTypes.Add(type);
        db.SaveChanges();
        var req = new AllowanceRequest
        {
            EmployeeId = emp.Id,
            AllowanceTypeId = type.Id,
            RequestType = AllowanceRequestType.NewAllowance,
            RequestedAmount = 750m,
            EffectiveFromDate = new DateTime(2026, 5, 1),
            Status = AllowanceRequestStatus.Approved,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.AllowanceRequests.Add(req);
        db.SaveChanges();

        var exec = new AllowanceRequestExecutor(new ApplicationDbContextAdapter(db));

        var r1 = await exec.ExecuteAsync(req.Id, 42L);
        r1.Outcome.Should().Be(ExecutionOutcome.Succeeded);

        db.AllowanceAssignments.Count(a => a.EmployeeId == emp.Id).Should().Be(1);
        db.AllowanceRequests.Find(req.Id)!.IsExecuted.Should().BeTrue();
        db.AllowanceRequests.Find(req.Id)!.Status.Should().Be(AllowanceRequestStatus.Applied);

        // Idempotent: second call does NOT create a duplicate.
        var r2 = await exec.ExecuteAsync(req.Id, 42L);
        r2.Outcome.Should().Be(ExecutionOutcome.AlreadyExecuted);
        db.AllowanceAssignments.Count(a => a.EmployeeId == emp.Id).Should().Be(1);
    }

    [Fact]
    public async Task LoanApplication_executor_generates_repayment_schedule_once()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var lt = new LoanType { Name = "Personal", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanTypes.Add(lt);
        db.SaveChanges();
        var loan = new LoanApplication
        {
            EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 12000m, ApprovedAmount = 12000m, RepaymentMonths = 12,
            InterestRate = 0m,
            Status = LoanApplicationStatus.Approved,
            StartDate = new DateTime(2026, 5, 1),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.LoanApplications.Add(loan);
        db.SaveChanges();

        var exec = new LoanApplicationExecutor(new ApplicationDbContextAdapter(db));
        var r1 = await exec.ExecuteAsync(loan.Id, 42L);
        r1.Outcome.Should().Be(ExecutionOutcome.Succeeded);

        db.LoanRepayments.Count(r => r.LoanApplicationId == loan.Id).Should().Be(12);
        db.LoanApplications.Find(loan.Id)!.Status.Should().Be(LoanApplicationStatus.Active);
        db.LoanApplications.Find(loan.Id)!.ScheduleGenerated.Should().BeTrue();

        var r2 = await exec.ExecuteAsync(loan.Id, 42L);
        r2.Outcome.Should().Be(ExecutionOutcome.AlreadyExecuted);
        db.LoanRepayments.Count(r => r.LoanApplicationId == loan.Id).Should().Be(12);
    }

    // Phase 7 (v14.7): `SalaryAdvance_executor_backfills_date_range_from_legacy_yyyymm`
    // was removed together with the DeductionMonth column. The Phase-6-deprecation-test
    // suite covers the new default-window behavior.

    [Fact]
    public async Task ExpenseClaim_executor_creates_reimbursement_with_chosen_method()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var claim = new ExpenseClaim
        {
            EmployeeId = emp.Id, ClaimNumber = "EXP-1", TotalAmount = 250m,
            Status = ExpenseClaimStatus.Approved,
            ReimbursementMethod = ReimbursementMethod.Payroll,
            ApprovedAt = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.ExpenseClaims.Add(claim);
        db.SaveChanges();

        var exec = new ExpenseClaimExecutor(new ApplicationDbContextAdapter(db));
        var r = await exec.ExecuteAsync(claim.Id, 42L);
        r.Outcome.Should().Be(ExecutionOutcome.Succeeded);

        var reimb = db.ExpenseReimbursements.FirstOrDefault(x => x.ExpenseClaimId == claim.Id);
        reimb.Should().NotBeNull();
        reimb!.Method.Should().Be(ReimbursementMethod.Payroll);
        reimb.Amount.Should().Be(250m);
        reimb.ReimbursementDate.Should().BeNull();

        // Idempotent.
        var r2 = await exec.ExecuteAsync(claim.Id, 42L);
        r2.Outcome.Should().Be(ExecutionOutcome.AlreadyExecuted);
        db.ExpenseReimbursements.Count(x => x.ExpenseClaimId == claim.Id).Should().Be(1);
    }

    [Fact]
    public async Task BenefitEnrollment_executor_enables_payroll_deduction()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var plan = new BenefitPlan { Name = "Medical",
            PlanYear = 2026,
            EffectiveStartDate = new DateTime(2026, 1, 1), EffectiveEndDate = new DateTime(2026, 12, 31),
            EmployeePremiumAmount = 150m, EmployerPremiumAmount = 250m, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.BenefitPlans.Add(plan);
        db.SaveChanges();
        var en = new BenefitEnrollment
        {
            EmployeeId = emp.Id, BenefitPlanId = plan.Id,
            Status = BenefitEnrollmentStatus.PendingApproval,
            EnrollmentDate = DateTime.UtcNow,
            EffectiveDate = new DateTime(2026, 5, 1),
            EmployeeMonthlyContribution = 150m,
            EmployerMonthlyContribution = 250m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.BenefitEnrollments.Add(en);
        db.SaveChanges();

        var exec = new BenefitEnrollmentExecutor(new ApplicationDbContextAdapter(db));
        var r = await exec.ExecuteAsync(en.Id, 42L);
        r.Outcome.Should().Be(ExecutionOutcome.Succeeded);

        var refreshed = db.BenefitEnrollments.Find(en.Id)!;
        refreshed.Status.Should().Be(BenefitEnrollmentStatus.Active);
        refreshed.PayrollDeductionEnabled.Should().BeTrue();
        refreshed.IsExecuted.Should().BeTrue();
    }

    [Fact]
    public async Task LetterRequest_executor_fails_visibly_when_template_missing()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var req = new LetterRequest
        {
            EmployeeId = emp.Id, LetterType = LetterType.SalaryCertificate,
            Status = LetterRequestStatus.Approved,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.LetterRequests.Add(req);
        db.SaveChanges();

        var files = new Mock<IFileStorageService>();
        var exec = new LetterRequestExecutor(new ApplicationDbContextAdapter(db), files.Object);
        var r = await exec.ExecuteAsync(req.Id, 42L);
        r.Outcome.Should().Be(ExecutionOutcome.ValidationFailed);
        r.FailureCode.Should().Be("MissingTemplate");
    }

    [Fact]
    public async Task FailureAlertService_deduplicates_unresolved_matching_alerts()
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);

        var req = new RaiseFailureAlertRequest
        {
            Category = OperationalFailureCategory.ApprovalExecution,
            SourceEntityType = "AllowanceRequest",
            SourceEntityId = 7,
            FailureCode = "ExecutorException",
            Reason = "first try",
            IsRetryable = true
        };
        var id1 = await alerts.RaiseAsync(req);
        var id2 = await alerts.RaiseAsync(req);

        id1.Should().Be(id2);
        db.OperationalFailureAlerts.Count().Should().Be(1);
        db.OperationalFailureAlerts.Find(id1)!.RetryCount.Should().Be(1);
    }

    [Fact]
    public async Task FailureAlertService_resolve_flips_flag_and_preserves_row()
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);
        var id = await alerts.RaiseAsync(new RaiseFailureAlertRequest
        {
            Category = OperationalFailureCategory.PayrollProcessing,
            SourceEntityType = "PayrollPeriod",
            SourceEntityId = 99,
            FailureCode = "UnhandledException",
            Reason = "boom"
        });

        await alerts.ResolveAsync(id, 42, "Root cause fixed");
        var refreshed = db.OperationalFailureAlerts.Find(id)!;
        refreshed.IsResolved.Should().BeTrue();
        refreshed.ResolvedByUserId.Should().Be(42);
        refreshed.ResolutionNotes.Should().Be("Root cause fixed");
    }
}
