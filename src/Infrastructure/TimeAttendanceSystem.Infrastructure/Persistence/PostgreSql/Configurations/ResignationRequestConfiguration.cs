using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the ResignationRequest entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class ResignationRequestConfiguration : IEntityTypeConfiguration<ResignationRequest>
{
    public void Configure(EntityTypeBuilder<ResignationRequest> builder)
    {
        // Table mapping
        builder.ToTable("ResignationRequests");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.ResignationDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Date resignation was submitted");

        builder.Property(x => x.LastWorkingDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Last working date for the employee");

        builder.Property(x => x.NoticePeriodDays)
            .IsRequired()
            .HasComment("Required notice period in days");

        builder.Property(x => x.WaivedNoticeDays)
            .IsRequired()
            .HasComment("Number of notice days waived");

        builder.Property(x => x.Reason)
            .HasMaxLength(1000)
            .HasComment("Reason for resignation");

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000)
            .HasComment("Reason for resignation in Arabic");

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Resignation request status");

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500)
            .HasComment("Reason for rejection if applicable");

        builder.Property(x => x.ApprovedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When the resignation was approved");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        // Workflow integration
        builder.Property(x => x.WorkflowInstanceId)
            .IsRequired(false)
            .HasComment("Workflow instance ID for approval tracking");

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_ResignationRequests_Employees");

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_ResignationRequests_WorkflowInstances");

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_ResignationRequests_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_ResignationRequests_Status")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<ResignationRequest> builder)
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
