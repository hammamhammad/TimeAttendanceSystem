using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the PayrollRecord entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class PayrollRecordConfiguration : IEntityTypeConfiguration<PayrollRecord>
{
    public void Configure(EntityTypeBuilder<PayrollRecord> builder)
    {
        // Table mapping
        builder.ToTable("PayrollRecords");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PayrollPeriodId)
            .IsRequired()
            .HasComment("Payroll period identifier");

        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.BaseSalary)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Employee base salary for this period");

        builder.Property(x => x.TotalAllowances)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total allowances amount");

        builder.Property(x => x.GrossEarnings)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Gross earnings before deductions");

        builder.Property(x => x.TotalDeductions)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total deductions amount");

        builder.Property(x => x.TaxAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Tax deduction amount");

        builder.Property(x => x.SocialInsuranceEmployee)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Employee social insurance contribution");

        builder.Property(x => x.SocialInsuranceEmployer)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Employer social insurance contribution");

        builder.Property(x => x.OvertimePay)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Overtime pay amount");

        builder.Property(x => x.AbsenceDeduction)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Deduction for absences");

        builder.Property(x => x.LoanDeduction)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Loan repayment deduction");

        builder.Property(x => x.OtherDeductions)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Other miscellaneous deductions");

        builder.Property(x => x.NetSalary)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Net salary after all deductions");

        builder.Property(x => x.WorkingDays)
            .IsRequired()
            .HasComment("Number of working days in period");

        builder.Property(x => x.PaidDays)
            .IsRequired()
            .HasComment("Number of paid days");

        builder.Property(x => x.OvertimeHours)
            .IsRequired()
            .HasColumnType("decimal(8,2)")
            .HasComment("Total overtime hours worked");

        builder.Property(x => x.AbsentDays)
            .IsRequired()
            .HasComment("Number of absent days");

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Payroll record status");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        builder.Property(x => x.PaySlipGeneratedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When pay slip was generated");

        // Relationships
        builder.HasOne(x => x.PayrollPeriod)
            .WithMany(x => x.Records)
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PayrollRecords_PayrollPeriods");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_PayrollRecords_Employees");

        builder.HasMany(x => x.Details)
            .WithOne(x => x.PayrollRecord)
            .HasForeignKey(x => x.PayrollRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PayrollRecordDetails_PayrollRecords");

        // Indexes
        builder.HasIndex(x => new { x.PayrollPeriodId, x.EmployeeId })
            .IsUnique()
            .HasDatabaseName("IX_PayrollRecords_PayrollPeriodId_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_PayrollRecords_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_PayrollRecords_Status")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<PayrollRecord> builder)
    {
        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()")
            .HasComment("UTC timestamp when record was created");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(100)
            .HasComment("User who created the record");

        builder.Property(e => e.ModifiedAtUtc)
            .HasComment("UTC timestamp when record was last modified");

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(100)
            .HasComment("User who last modified the record");

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Soft delete flag");

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 })
            .HasComment("Concurrency control timestamp");
    }
}
