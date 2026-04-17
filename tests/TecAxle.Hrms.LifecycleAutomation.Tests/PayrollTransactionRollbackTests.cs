using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 1 (v14.1) + Phase 6 (v14.6): Production-grade verification of the payroll
/// transactional boundary introduced by <c>ProcessPayrollPeriodCommandHandler</c>.
/// Phase 6 replaced the Phase 1 SQLite harness — which could never materialize a
/// Postgres-configured DbContext — with <see cref="PostgresTestHarness"/>, which
/// provisions a disposable real-Postgres database and applies the full EF migration
/// chain. Transactions, FK constraints, and default-value semantics now all match prod.
///
/// These tests mirror the handler's per-employee write sequence (create PayrollRecord →
/// flip linked LoanRepayment to Paid → decrement loan balance) under an explicit transaction
/// and verify:
///
/// 1. Commit path: all writes persist and the loan appears in LinkedToPayroll state.
/// 2. Rollback path: a simulated failure after the loan-state flip leaves NEITHER the
///    PayrollRecord NOR the loan repayment in a "Paid/Deducted" state; the loan balance
///    is unchanged; a subsequent rerun can re-apply the same linkage idempotently.
/// </summary>
public class PayrollTransactionRollbackTests
{
    // All Postgres `timestamp with time zone` columns require Kind=Utc. Local helpers below
    // construct UTC DateTimes at midnight for calendar values.
    private static DateTime Utc(int y, int m, int d) => new(y, m, d, 0, 0, 0, DateTimeKind.Utc);

    private static async Task<(PayrollPeriod period, LoanApplication loan, LoanRepayment repayment, TecAxle.Hrms.Domain.Employees.Employee emp)>
        SeedBaseAsync(TecAxleDbContext db)
    {
        // Real Postgres enforces the FK (Employees.BranchId → Branches.Id) — the
        // removed SQLite/InMemory harnesses ignored it.
        var branch = new TecAxle.Hrms.Domain.Branches.Branch
        {
            Name = "HQ", TimeZone = "UTC", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        db.Branches.Add(branch);
        await db.SaveChangesAsync();

        var emp = new TecAxle.Hrms.Domain.Employees.Employee
        {
            EmployeeNumber = "E1001", FirstName = "TX", LastName = "Test",
            BranchId = branch.Id, HireDate = Utc(2020, 1, 1),
            EmploymentStatus = EmploymentStatus.Active, IsActive = true,
            JobTitle = "Tester",
            WorkLocationType = TecAxle.Hrms.Domain.Common.WorkLocationType.OnSite,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        db.Employees.Add(emp);

        var period = new PayrollPeriod
        {
            BranchId = branch.Id, Name = "May 2026",
            StartDate = Utc(2026, 5, 1), EndDate = Utc(2026, 5, 31),
            PeriodType = PayrollPeriodType.Monthly,
            Status = PayrollPeriodStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        db.PayrollPeriods.Add(period);

        var loanType = new LoanType
        {
            Name = "Personal", IsActive = true,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        db.LoanTypes.Add(loanType);
        await db.SaveChangesAsync();

        var loan = new LoanApplication
        {
            EmployeeId = emp.Id, LoanTypeId = loanType.Id,
            RequestedAmount = 12000m, ApprovedAmount = 12000m,
            RepaymentMonths = 12, InterestRate = 0m,
            Status = LoanApplicationStatus.Active,
            StartDate = Utc(2026, 5, 1),
            EndDate = Utc(2027, 4, 1),
            OutstandingBalance = 12000m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        db.LoanApplications.Add(loan);
        await db.SaveChangesAsync();

        var repayment = new LoanRepayment
        {
            LoanApplicationId = loan.Id,
            InstallmentNumber = 1,
            Amount = 1000m, PrincipalAmount = 1000m, InterestAmount = 0m,
            DueDate = Utc(2026, 5, 15),
            Status = LoanRepaymentStatus.Scheduled,
            BalanceRemaining = 11000m,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        db.LoanRepayments.Add(repayment);
        await db.SaveChangesAsync();

        return (period, loan, repayment, emp);
    }

    [PostgresRequiredFact]
    public async Task Commit_path_persists_payroll_record_and_marks_loan_paid()
    {
        using var harness = new PostgresTestHarness();
        using var db = harness.NewDb();
        var (period, loan, repayment, emp) = await SeedBaseAsync(db);

        using (var tx = await db.BeginTransactionAsync())
        {
            tx.Should().NotBeNull("SQLite must support real transactions");

            var record = new PayrollRecord
            {
                PayrollPeriodId = period.Id,
                EmployeeId = emp.Id,
                BaseSalary = 5000m, GrossEarnings = 5000m,
                TotalAllowances = 0m, TotalDeductions = 1000m,
                NetSalary = 4000m, LoanDeduction = 1000m,
                Status = PayrollRecordStatus.Calculated, CalculationVersion = 1,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
            };
            db.PayrollRecords.Add(record);
            await db.SaveChangesAsync();

            repayment.PayrollRecordId = record.Id;
            repayment.Status = LoanRepaymentStatus.Paid;
            repayment.PaidDate = DateTime.UtcNow;
            loan.OutstandingBalance = (loan.OutstandingBalance ?? 0m) - repayment.Amount;
            await db.SaveChangesAsync();

            await tx!.CommitAsync();
        }

        // Fresh context to bypass any in-memory change tracker state.
        await using var verify = harness.NewDb();
        verify.PayrollRecords.Count(r => r.EmployeeId == emp.Id).Should().Be(1);
        var refreshedRep = verify.LoanRepayments.First(r => r.Id == repayment.Id);
        refreshedRep.Status.Should().Be(LoanRepaymentStatus.Paid);
        refreshedRep.PayrollRecordId.Should().NotBeNull();
        var refreshedLoan = verify.LoanApplications.First(l => l.Id == loan.Id);
        refreshedLoan.OutstandingBalance.Should().Be(11000m);
    }

    [PostgresRequiredFact]
    public async Task Rollback_path_leaves_no_payroll_record_and_loan_remains_scheduled()
    {
        using var harness = new PostgresTestHarness();
        using var db = harness.NewDb();
        var (period, loan, repayment, emp) = await SeedBaseAsync(db);

        // Scope replicating the handler: create payroll record + flip loan repayment.
        // Then simulate a side-effect failure after the state change and roll back.
        using (var tx = await db.BeginTransactionAsync())
        {
            tx.Should().NotBeNull();

            var record = new PayrollRecord
            {
                PayrollPeriodId = period.Id,
                EmployeeId = emp.Id,
                BaseSalary = 5000m, GrossEarnings = 5000m,
                TotalAllowances = 0m, TotalDeductions = 1000m,
                NetSalary = 4000m, LoanDeduction = 1000m,
                Status = PayrollRecordStatus.Calculated, CalculationVersion = 1,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
            };
            db.PayrollRecords.Add(record);
            await db.SaveChangesAsync();

            repayment.PayrollRecordId = record.Id;
            repayment.Status = LoanRepaymentStatus.Paid;
            repayment.PaidDate = DateTime.UtcNow;
            loan.OutstandingBalance = (loan.OutstandingBalance ?? 0m) - repayment.Amount;
            await db.SaveChangesAsync();

            // Simulated failure after the state change — e.g. a downstream benefit lookup throws.
            await tx!.RollbackAsync();
        }

        await using var verify = harness.NewDb();
        verify.PayrollRecords.Count(r => r.EmployeeId == emp.Id)
            .Should().Be(0, "PayrollRecord must be rolled back on any failure during the scope");
        var refreshedRep = verify.LoanRepayments.First(r => r.Id == repayment.Id);
        refreshedRep.Status.Should().Be(LoanRepaymentStatus.Scheduled,
            "Loan repayment must NOT remain in Paid state after rollback");
        refreshedRep.PayrollRecordId.Should().BeNull(
            "Loan repayment must NOT remain linked to a PayrollRecord that does not exist");
        var refreshedLoan = verify.LoanApplications.First(l => l.Id == loan.Id);
        refreshedLoan.OutstandingBalance.Should().Be(12000m,
            "Outstanding balance must NOT be decremented when payroll rolls back");
    }

    [PostgresRequiredFact]
    public async Task Rerun_after_rollback_re_links_same_loan_idempotently()
    {
        using var harness = new PostgresTestHarness();
        using var db = harness.NewDb();
        var (period, loan, repayment, emp) = await SeedBaseAsync(db);

        // First attempt fails and rolls back.
        using (var tx = await db.BeginTransactionAsync())
        {
            var doomedRecord = new PayrollRecord
            {
                PayrollPeriodId = period.Id,
                EmployeeId = emp.Id,
                BaseSalary = 5000m, GrossEarnings = 5000m,
                TotalDeductions = 1000m, NetSalary = 4000m,
                LoanDeduction = 1000m,
                Status = PayrollRecordStatus.Calculated, CalculationVersion = 1,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
            };
            db.PayrollRecords.Add(doomedRecord);
            await db.SaveChangesAsync();

            repayment.PayrollRecordId = doomedRecord.Id;
            repayment.Status = LoanRepaymentStatus.Paid;
            await db.SaveChangesAsync();

            await tx!.RollbackAsync();
        }

        // Detach rolled-back entities from the change tracker so the rerun sees fresh state.
        db.ChangeTracker.Clear();

        // Second attempt succeeds — idempotent rerun against the SAME source records.
        using (var tx = await db.BeginTransactionAsync())
        {
            // Rehydrate entities in the new scope.
            var rep = await db.LoanRepayments.FirstAsync(r => r.Id == repayment.Id);
            var loanRef = await db.LoanApplications.FirstAsync(l => l.Id == loan.Id);

            rep.Status.Should().Be(LoanRepaymentStatus.Scheduled,
                "Rollback must leave the repayment re-runnable");
            rep.PayrollRecordId.Should().BeNull();

            var record = new PayrollRecord
            {
                PayrollPeriodId = period.Id,
                EmployeeId = emp.Id,
                BaseSalary = 5000m, GrossEarnings = 5000m,
                TotalDeductions = 1000m, NetSalary = 4000m,
                LoanDeduction = 1000m,
                Status = PayrollRecordStatus.Calculated, CalculationVersion = 2,
                CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
            };
            db.PayrollRecords.Add(record);
            await db.SaveChangesAsync();

            rep.PayrollRecordId = record.Id;
            rep.Status = LoanRepaymentStatus.Paid;
            rep.PaidDate = DateTime.UtcNow;
            loanRef.OutstandingBalance = (loanRef.OutstandingBalance ?? 0m) - rep.Amount;
            await db.SaveChangesAsync();

            await tx!.CommitAsync();
        }

        await using var verify = harness.NewDb();
        verify.PayrollRecords.Count(r => r.EmployeeId == emp.Id).Should().Be(1,
            "Exactly one PayrollRecord after rollback + successful rerun — no duplicates");
        verify.LoanRepayments.First(r => r.Id == repayment.Id)
            .Status.Should().Be(LoanRepaymentStatus.Paid);
        verify.LoanApplications.First(l => l.Id == loan.Id)
            .OutstandingBalance.Should().Be(11000m);
    }
}
