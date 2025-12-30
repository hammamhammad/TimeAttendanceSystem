using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for LeaveTransaction entity.
/// Defines database schema, constraints, and relationships for leave transactions.
/// </summary>
public class LeaveTransactionConfiguration : IEntityTypeConfiguration<LeaveTransaction>
{
    public void Configure(EntityTypeBuilder<LeaveTransaction> builder)
    {
        // Table configuration
        builder.ToTable("LeaveTransactions");

        // Primary key
        builder.HasKey(t => t.Id);

        // LeaveBalance relationship (required)
        builder.HasOne(t => t.LeaveBalance)
            .WithMany(b => b.Transactions)
            .HasForeignKey(t => t.LeaveBalanceId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Property configurations
        builder.Property(t => t.TransactionType)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(t => t.Days)
            .HasPrecision(5, 2)
            .IsRequired();

        builder.Property(t => t.ReferenceType)
            .HasMaxLength(100)
            .IsRequired(false);

        builder.Property(t => t.ReferenceId)
            .IsRequired(false);

        builder.Property(t => t.Notes)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(t => t.TransactionDate)
            .IsRequired();

        builder.Property(t => t.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property(t => t.CreatedBy)
            .HasMaxLength(255)
            .IsRequired(false);

        builder.Property(t => t.BalanceAfterTransaction)
            .HasPrecision(5, 2)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(t => t.LeaveBalanceId)
            .HasDatabaseName("IX_LeaveTransactions_LeaveBalanceId");

        builder.HasIndex(t => t.TransactionDate)
            .HasDatabaseName("IX_LeaveTransactions_TransactionDate");

        builder.HasIndex(t => t.TransactionType)
            .HasDatabaseName("IX_LeaveTransactions_TransactionType");

        builder.HasIndex(t => new { t.ReferenceType, t.ReferenceId })
            .HasDatabaseName("IX_LeaveTransactions_Reference");
    }
}
