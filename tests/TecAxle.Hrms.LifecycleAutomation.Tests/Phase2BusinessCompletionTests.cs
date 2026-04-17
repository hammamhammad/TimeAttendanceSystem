using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.LeaveManagement;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Training;
using TecAxle.Hrms.Domain.VacationTypes;
using TecAxle.Hrms.Infrastructure.BackgroundJobs;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 2 (v14.2) business-completion tests: loan policy validator, benefit eligibility,
/// training prerequisite, leave carry-over expiry job.
/// </summary>
public class Phase2BusinessCompletionTests
{
    // =========================================================================
    // LoanPolicyValidator
    // =========================================================================

    private static (TecAxleDbContext db, Employee emp, LoanType lt) SeedLoanBase(
        DateTime hireDate, decimal currentSalary)
    {
        var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, configure: e => e.HireDate = hireDate);
        var lt = new LoanType { Name = "P", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanTypes.Add(lt);
        db.EmployeeSalaries.Add(new EmployeeSalary
        {
            EmployeeId = emp.Id,
            BaseSalary = currentSalary,
            Currency = "SAR",
            EffectiveDate = hireDate,
            IsCurrent = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();
        return (db, emp, lt);
    }

    [Fact]
    public async Task LoanPolicyValidator_blocks_when_service_months_below_minimum()
    {
        var (db, emp, lt) = SeedLoanBase(hireDate: DateTime.UtcNow.AddMonths(-3), currentSalary: 10_000m);
        db.LoanPolicies.Add(new LoanPolicy { LoanTypeId = lt.Id, MinServiceMonths = 12,
            MaxPercentageOfSalary = 100m, MaxConcurrentLoans = 5, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        var loan = new LoanApplication { EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 1000m, RepaymentMonths = 6, InterestRate = 0m,
            Status = LoanApplicationStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanApplications.Add(loan);
        db.SaveChanges();

        var validator = new LoanPolicyValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(loan.Id);

        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("months of service");
        r.Error.Should().Contain("12");
    }

    [Fact]
    public async Task LoanPolicyValidator_blocks_when_amount_exceeds_percentage_of_salary()
    {
        var (db, emp, lt) = SeedLoanBase(hireDate: DateTime.UtcNow.AddYears(-2), currentSalary: 5_000m);
        db.LoanPolicies.Add(new LoanPolicy { LoanTypeId = lt.Id, MinServiceMonths = 0,
            MaxPercentageOfSalary = 300m, MaxConcurrentLoans = 5, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        // Requested 20000 but max = 300% × 5000 = 15000.
        var loan = new LoanApplication { EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 20_000m, RepaymentMonths = 12, InterestRate = 0m,
            Status = LoanApplicationStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanApplications.Add(loan);
        db.SaveChanges();

        var validator = new LoanPolicyValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(loan.Id);

        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("exceeds policy limit");
        r.Error.Should().Contain("15000");
    }

    [Fact]
    public async Task LoanPolicyValidator_blocks_when_concurrent_loans_at_limit()
    {
        var (db, emp, lt) = SeedLoanBase(hireDate: DateTime.UtcNow.AddYears(-5), currentSalary: 10_000m);
        db.LoanPolicies.Add(new LoanPolicy { LoanTypeId = lt.Id, MinServiceMonths = 0,
            MaxPercentageOfSalary = 1000m, MaxConcurrentLoans = 1, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        // Existing active loan takes the single allowed slot.
        db.LoanApplications.Add(new LoanApplication { EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 1000m, RepaymentMonths = 6, InterestRate = 0m,
            Status = LoanApplicationStatus.Active,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        var draft = new LoanApplication { EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 500m, RepaymentMonths = 6, InterestRate = 0m,
            Status = LoanApplicationStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanApplications.Add(draft);
        db.SaveChanges();

        var validator = new LoanPolicyValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(draft.Id);
        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("active/pending loan");
    }

    [Fact]
    public async Task LoanPolicyValidator_passes_when_all_constraints_satisfied()
    {
        var (db, emp, lt) = SeedLoanBase(hireDate: DateTime.UtcNow.AddYears(-5), currentSalary: 10_000m);
        db.LoanPolicies.Add(new LoanPolicy { LoanTypeId = lt.Id, MinServiceMonths = 6,
            MaxPercentageOfSalary = 300m, MaxConcurrentLoans = 2, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        var loan = new LoanApplication { EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 15_000m, RepaymentMonths = 12, InterestRate = 0m,
            Status = LoanApplicationStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanApplications.Add(loan);
        db.SaveChanges();

        var validator = new LoanPolicyValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(loan.Id);
        r.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task LoanPolicyValidator_passes_when_no_policy_is_configured()
    {
        var (db, emp, lt) = SeedLoanBase(hireDate: DateTime.UtcNow.AddMonths(-1), currentSalary: 10_000m);
        var loan = new LoanApplication { EmployeeId = emp.Id, LoanTypeId = lt.Id,
            RequestedAmount = 1_000_000m, RepaymentMonths = 1, InterestRate = 0m,
            Status = LoanApplicationStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.LoanApplications.Add(loan);
        db.SaveChanges();

        var validator = new LoanPolicyValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(loan.Id);
        r.IsSuccess.Should().BeTrue("no-policy is a documented pass-through");
    }

    // =========================================================================
    // BenefitEligibilityEvaluator
    // =========================================================================

    [Fact]
    public async Task BenefitEligibility_with_no_rules_allows_anyone()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var plan = new BenefitPlan { Name = "Medical", PlanYear = 2026,
            EffectiveStartDate = new DateTime(2026,1,1), EffectiveEndDate = new DateTime(2026,12,31),
            EmployeePremiumAmount = 100m, EmployerPremiumAmount = 100m, IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.BenefitPlans.Add(plan);
        db.SaveChanges();

        var evaluator = new BenefitEligibilityEvaluator(new ApplicationDbContextAdapter(db));
        var r = await evaluator.EvaluateAsync(emp.Id, plan.Id);
        r.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task BenefitEligibility_blocks_when_service_length_rule_fails()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, configure: e => e.HireDate = DateTime.UtcNow.AddMonths(-2));
        var plan = new BenefitPlan { Name = "M", PlanYear = 2026,
            EffectiveStartDate = new DateTime(2026,1,1), EffectiveEndDate = new DateTime(2026,12,31),
            IsActive = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.BenefitPlans.Add(plan);
        db.SaveChanges();
        db.BenefitEligibilityRules.Add(new BenefitEligibilityRule
        {
            BenefitPlanId = plan.Id,
            RuleType = EligibilityRuleType.ServiceLength,
            MinServiceMonths = 12,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var evaluator = new BenefitEligibilityEvaluator(new ApplicationDbContextAdapter(db));
        var r = await evaluator.EvaluateAsync(emp.Id, plan.Id);
        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("Service length");
        r.Error.Should().Contain("12");
    }

    [Fact]
    public async Task BenefitEligibility_blocks_when_branch_rule_mismatches()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, branchId: 1);
        var plan = new BenefitPlan { Name = "X", PlanYear = 2026,
            EffectiveStartDate = new DateTime(2026,1,1), EffectiveEndDate = new DateTime(2026,12,31),
            IsActive = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.BenefitPlans.Add(plan);
        db.SaveChanges();
        db.BenefitEligibilityRules.Add(new BenefitEligibilityRule
        {
            BenefitPlanId = plan.Id,
            RuleType = EligibilityRuleType.Branch,
            BranchId = 999, // mismatch
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var evaluator = new BenefitEligibilityEvaluator(new ApplicationDbContextAdapter(db));
        var r = await evaluator.EvaluateAsync(emp.Id, plan.Id);
        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("branch");
    }

    [Fact]
    public async Task BenefitEligibility_aggregates_multiple_violations()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, branchId: 1,
            configure: e => { e.HireDate = DateTime.UtcNow.AddMonths(-1); e.DepartmentId = null; });
        var plan = new BenefitPlan { Name = "X", PlanYear = 2026,
            EffectiveStartDate = new DateTime(2026,1,1), EffectiveEndDate = new DateTime(2026,12,31),
            IsActive = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.BenefitPlans.Add(plan);
        db.SaveChanges();
        db.BenefitEligibilityRules.AddRange(
            new BenefitEligibilityRule { BenefitPlanId = plan.Id, RuleType = EligibilityRuleType.ServiceLength,
                MinServiceMonths = 6, IsActive = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" },
            new BenefitEligibilityRule { BenefitPlanId = plan.Id, RuleType = EligibilityRuleType.Branch,
                BranchId = 999, IsActive = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" }
        );
        db.SaveChanges();

        var evaluator = new BenefitEligibilityEvaluator(new ApplicationDbContextAdapter(db));
        var r = await evaluator.EvaluateAsync(emp.Id, plan.Id);
        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("Service length");
        r.Error.Should().Contain("branch");
    }

    // =========================================================================
    // TrainingEnrollmentValidator
    // =========================================================================

    [Fact]
    public async Task TrainingValidator_blocks_when_earlier_required_course_is_not_satisfied()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var program = new TrainingProgram { Title = "Onboarding", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        var level1 = new TrainingCourse { Code = "L1", Title = "Level 1", IsActive = true,
            DeliveryMethod = TrainingDeliveryMethod.Online, DurationHours = 1m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        var level2 = new TrainingCourse { Code = "L2", Title = "Level 2", IsActive = true,
            DeliveryMethod = TrainingDeliveryMethod.Online, DurationHours = 1m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.TrainingPrograms.Add(program);
        db.TrainingCourses.AddRange(level1, level2);
        db.SaveChanges();
        db.TrainingProgramCourses.AddRange(
            new TrainingProgramCourse { TrainingProgramId = program.Id, TrainingCourseId = level1.Id,
                SequenceOrder = 1, IsRequired = true,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" },
            new TrainingProgramCourse { TrainingProgramId = program.Id, TrainingCourseId = level2.Id,
                SequenceOrder = 2, IsRequired = true,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        var session2 = new TrainingSession { TrainingCourseId = level2.Id,
            StartDate = new DateTime(2026,5,1), EndDate = new DateTime(2026,5,2),
            Status = TrainingSessionStatus.Scheduled,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.TrainingSessions.Add(session2);
        db.SaveChanges();

        var validator = new TrainingEnrollmentValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(emp.Id, session2.Id, null);

        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("prerequisites not satisfied");
        r.Error.Should().Contain("L1");
    }

    [Fact]
    public async Task TrainingValidator_passes_when_prerequisite_is_completed()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var program = new TrainingProgram { Title = "P", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        var c1 = new TrainingCourse { Code = "C1", Title = "C1", IsActive = true,
            DeliveryMethod = TrainingDeliveryMethod.Online, DurationHours = 1m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        var c2 = new TrainingCourse { Code = "C2", Title = "C2", IsActive = true,
            DeliveryMethod = TrainingDeliveryMethod.Online, DurationHours = 1m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.TrainingPrograms.Add(program);
        db.TrainingCourses.AddRange(c1, c2);
        db.SaveChanges();
        db.TrainingProgramCourses.AddRange(
            new TrainingProgramCourse { TrainingProgramId = program.Id, TrainingCourseId = c1.Id,
                SequenceOrder = 1, IsRequired = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" },
            new TrainingProgramCourse { TrainingProgramId = program.Id, TrainingCourseId = c2.Id,
                SequenceOrder = 2, IsRequired = true, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" });
        var session1 = new TrainingSession { TrainingCourseId = c1.Id,
            StartDate = new DateTime(2026,4,1), EndDate = new DateTime(2026,4,2),
            Status = TrainingSessionStatus.Completed,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        var session2 = new TrainingSession { TrainingCourseId = c2.Id,
            StartDate = new DateTime(2026,5,1), EndDate = new DateTime(2026,5,2),
            Status = TrainingSessionStatus.Scheduled,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.TrainingSessions.AddRange(session1, session2);
        db.SaveChanges();
        db.TrainingEnrollments.Add(new TrainingEnrollment
        {
            EmployeeId = emp.Id, TrainingSessionId = session1.Id,
            Status = TrainingEnrollmentStatus.Completed,
            EnrolledAt = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var validator = new TrainingEnrollmentValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(emp.Id, session2.Id, null);
        r.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task TrainingValidator_blocks_duplicate_active_program_enrollment()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var program = new TrainingProgram { Title = "P", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.TrainingPrograms.Add(program);
        db.SaveChanges();
        db.TrainingEnrollments.Add(new TrainingEnrollment
        {
            EmployeeId = emp.Id, TrainingProgramId = program.Id,
            Status = TrainingEnrollmentStatus.Approved,
            EnrolledAt = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        });
        db.SaveChanges();

        var validator = new TrainingEnrollmentValidator(new ApplicationDbContextAdapter(db));
        var r = await validator.ValidateAsync(emp.Id, null, program.Id);
        r.IsSuccess.Should().BeFalse();
        r.Error.Should().Contain("already has an active enrollment in this program");
    }

    // =========================================================================
    // LeaveCarryoverExpiryJob
    // =========================================================================

    [Fact]
    public async Task CarryoverExpiryJob_claws_back_expired_carryover_and_writes_transaction()
    {
        using var db = TestHarness.NewDb();
        // Current date: Jun 1 of current year — 5 months in. Policy expires after 3 months.
        // So as of today the carry-over from last year should already be clawed back.
        var today = DateTime.UtcNow.Date;
        var currentYear = today.Year;

        var vt = new VacationType { Name = "Annual", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.VacationTypes.Add(vt);
        db.SaveChanges();
        db.LeaveAccrualPolicies.Add(new LeaveAccrualPolicy
        {
            VacationTypeId = vt.Id,
            Name = "Standard",
            AccrualFrequency = "Monthly",
            AllowsCarryOver = true,
            MaxCarryOverDays = 5m,
            CarryOverExpiryMonths = 3
        });
        var balance = new LeaveBalance
        {
            EmployeeId = 1,
            VacationTypeId = vt.Id,
            Year = currentYear,
            AccruedDays = 10m,
            AdjustedDays = 5m, // represents carried-over days
            UsedDays = 0m,
            PendingDays = 0m,
            CreatedAtUtc = DateTime.UtcNow
        };
        db.LeaveBalances.Add(balance);
        db.SaveChanges();
        db.LeaveTransactions.Add(new LeaveTransaction
        {
            LeaveBalanceId = balance.Id,
            TransactionType = LeaveTransactionType.CarryOver,
            Days = 5m,
            ReferenceType = "YearEndCarryOver",
            TransactionDate = new DateTime(currentYear, 1, 1),
            Notes = $"Carry-over from {currentYear - 1}",
            CreatedBy = "seed",
            CreatedAtUtc = DateTime.UtcNow
        });
        db.SaveChanges();

        // Only run the job if we're already past the cutoff month for this year.
        var cutoff = new DateTime(currentYear, 1, 1).AddMonths(3);
        if (today < cutoff)
        {
            // In-test date shift is not possible without abstracting DateTime; assert the
            // job is a no-op and skip the expiry assertions in that narrow case (Jan/Feb/Mar).
            var job = new LeaveCarryoverExpiryJob(
                new ApplicationDbContextAdapter(db), NullLogger<LeaveCarryoverExpiryJob>.Instance);
            await job.Invoke();
            db.LeaveBalances.Find(balance.Id)!.AdjustedDays.Should().Be(5m, "job must not run before cutoff");
            return;
        }

        var job2 = new LeaveCarryoverExpiryJob(
            new ApplicationDbContextAdapter(db), NullLogger<LeaveCarryoverExpiryJob>.Instance);
        await job2.Invoke();

        var refreshed = db.LeaveBalances.Find(balance.Id)!;
        refreshed.AdjustedDays.Should().Be(0m, "expired carry-over is clawed back entirely");
        var expiryTx = db.LeaveTransactions
            .Single(t => t.LeaveBalanceId == balance.Id && t.ReferenceType == "CarryOverExpiry");
        expiryTx.Days.Should().Be(-5m);
        expiryTx.TransactionType.Should().Be(LeaveTransactionType.Adjustment);
    }

    [Fact]
    public async Task CarryoverExpiryJob_is_idempotent_on_second_run()
    {
        using var db = TestHarness.NewDb();
        var today = DateTime.UtcNow.Date;
        var currentYear = today.Year;
        var cutoff = new DateTime(currentYear, 1, 1).AddMonths(3);
        if (today < cutoff) return; // test only meaningful past cutoff month

        var vt = new VacationType { Name = "A", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t" };
        db.VacationTypes.Add(vt);
        db.SaveChanges();
        db.LeaveAccrualPolicies.Add(new LeaveAccrualPolicy
        {
            VacationTypeId = vt.Id, Name = "P", AccrualFrequency = "Monthly",
            AllowsCarryOver = true, CarryOverExpiryMonths = 3
        });
        var balance = new LeaveBalance
        {
            EmployeeId = 1, VacationTypeId = vt.Id, Year = currentYear,
            AccruedDays = 10m, AdjustedDays = 3m,
            CreatedAtUtc = DateTime.UtcNow
        };
        db.LeaveBalances.Add(balance);
        db.SaveChanges();
        db.LeaveTransactions.Add(new LeaveTransaction
        {
            LeaveBalanceId = balance.Id,
            TransactionType = LeaveTransactionType.CarryOver,
            Days = 3m,
            TransactionDate = new DateTime(currentYear, 1, 1),
            CreatedBy = "seed", CreatedAtUtc = DateTime.UtcNow
        });
        db.SaveChanges();

        var job = new LeaveCarryoverExpiryJob(
            new ApplicationDbContextAdapter(db), NullLogger<LeaveCarryoverExpiryJob>.Instance);
        await job.Invoke();
        await job.Invoke(); // second run must be a no-op

        db.LeaveTransactions
            .Count(t => t.LeaveBalanceId == balance.Id && t.ReferenceType == "CarryOverExpiry")
            .Should().Be(1, "idempotency: second run must not double-write the expiry transaction");
        db.LeaveBalances.Find(balance.Id)!.AdjustedDays.Should().Be(0m);
    }
}
