using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Company;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CompanySettingsConfiguration : IEntityTypeConfiguration<CompanySettings>
{
    public void Configure(EntityTypeBuilder<CompanySettings> builder)
    {
        builder.ToTable("CompanySettings");
        builder.HasKey(e => e.Id);

        // General settings
        builder.Property(e => e.FiscalYearStartMonth).HasMaxLength(2).HasDefaultValue("01");
        builder.Property(e => e.WeekStartDay).HasMaxLength(20).HasDefaultValue("Sunday");
        builder.Property(e => e.DateFormat).HasMaxLength(20).HasDefaultValue("dd/MM/yyyy");
        builder.Property(e => e.TimeFormat).HasMaxLength(20).HasDefaultValue("HH:mm");
        builder.Property(e => e.NumberFormat).HasMaxLength(10).HasDefaultValue("en-US");

        // Leave settings
        builder.Property(e => e.LeaveYearStart).HasMaxLength(5);

        // Payroll settings
        builder.Property(e => e.PayrollCurrency).HasMaxLength(3);
        builder.Property(e => e.SalaryCalculationBasis).HasMaxLength(20).HasDefaultValue("Calendar");

        // v13.3: Tenant-configurable business thresholds (previously hardcoded)
        builder.Property(e => e.PasswordMinLength).IsRequired().HasDefaultValue(8);
        builder.Property(e => e.LoginLockoutPolicyJson).HasColumnType("jsonb");
        builder.Property(e => e.ContractExpiryAlertDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("30,15,7");
        builder.Property(e => e.VisaExpiryAlertDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("90,60,30,15,7");
        builder.Property(e => e.ReviewReminderDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("7,3,1");
        builder.Property(e => e.LoanRepaymentReminderDays).IsRequired().HasDefaultValue(7);
        builder.Property(e => e.FrozenWorkflowCleanupDays).IsRequired().HasDefaultValue(90);
        builder.Property(e => e.DefaultProbationDays).IsRequired().HasDefaultValue(90);
        builder.Property(e => e.MaxUploadSizeMb).IsRequired().HasDefaultValue(10);
        builder.Property(e => e.MaxVacationDaysPerRequest).IsRequired().HasDefaultValue(365);
        builder.Property(e => e.MaxVacationFuturePlanningYears).IsRequired().HasDefaultValue(2);
        builder.Property(e => e.MaxShiftGracePeriodMinutes).IsRequired().HasDefaultValue(120);
        builder.Property(e => e.ExcuseBackwardWindowDays).IsRequired().HasDefaultValue(365);
        builder.Property(e => e.ExcuseForwardWindowDays).IsRequired().HasDefaultValue(30);
        builder.Property(e => e.OvertimeConfigMaxFutureDays).IsRequired().HasDefaultValue(30);

        // v13.4: Reminder/alert windows + notification recipients
        builder.Property(e => e.AttendanceCorrectionMaxRetroactiveDays).IsRequired().HasDefaultValue(30);
        builder.Property(e => e.DocumentExpiryAlertDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("30,15,7");
        builder.Property(e => e.AssetWarrantyExpiryAlertDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("30,15,7,1");
        builder.Property(e => e.AssetOverdueReturnAlertDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("1,3,7,14,30");
        builder.Property(e => e.TrainingSessionReminderDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("7,3,1");
        builder.Property(e => e.SuccessionPlanReminderDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("30,7,1");
        builder.Property(e => e.TimesheetSubmissionReminderDaysBefore).IsRequired().HasDefaultValue(2);
        builder.Property(e => e.GrievanceSlaAlertDaysCsv).IsRequired().HasMaxLength(100).HasDefaultValue("3,1");
        builder.Property(e => e.NotificationRecipientRolesCsv).IsRequired().HasMaxLength(500).HasDefaultValue("HRManager,SystemAdmin");

        // v13.6: Workflow Routing Hardening
        builder.Property(e => e.WorkflowFallbackApproverRole).IsRequired().HasMaxLength(100).HasDefaultValue("HRManager");
        builder.Property(e => e.WorkflowFallbackApproverUserId);
        builder.Property(e => e.MaxWorkflowDelegationDepth).IsRequired().HasDefaultValue(2);
        builder.Property(e => e.MaxWorkflowResubmissions).IsRequired().HasDefaultValue(3);

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> builder) where T : class
    {
        builder.Property("CreatedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("ModifiedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("CreatedBy").HasMaxLength(100);
        builder.Property("ModifiedBy").HasMaxLength(100);
        builder.Property("IsDeleted").IsRequired().HasDefaultValue(false);
        builder.Property("RowVersion").IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
