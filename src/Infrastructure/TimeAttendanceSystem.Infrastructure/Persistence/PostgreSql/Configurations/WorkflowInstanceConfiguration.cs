using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the WorkflowInstance entity.
/// Defines database mapping, relationships, constraints, and indexes for workflow instances.
/// </summary>
public class WorkflowInstanceConfiguration : IEntityTypeConfiguration<WorkflowInstance>
{
    public void Configure(EntityTypeBuilder<WorkflowInstance> builder)
    {
        // Table mapping
        builder.ToTable("WorkflowInstances");

        // Primary key
        builder.HasKey(wi => wi.Id);

        // Properties configuration
        builder.Property(wi => wi.WorkflowDefinitionId)
            .IsRequired()
            .HasComment("Workflow definition being executed");

        builder.Property(wi => wi.EntityType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of entity being processed");

        builder.Property(wi => wi.EntityId)
            .IsRequired()
            .HasComment("ID of the entity being processed");

        builder.Property(wi => wi.CurrentStepId)
            .HasComment("Current step in workflow (null if completed)");

        builder.Property(wi => wi.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Current workflow status");

        builder.Property(wi => wi.RequestedByUserId)
            .IsRequired()
            .HasComment("User who initiated the workflow");

        builder.Property(wi => wi.RequestedAt)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("When workflow was initiated");

        builder.Property(wi => wi.CompletedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When workflow was completed");

        builder.Property(wi => wi.FinalOutcome)
            .HasConversion<int?>()
            .HasComment("Final outcome of workflow");

        builder.Property(wi => wi.ContextJson)
            .HasColumnType("jsonb")
            .HasComment("Runtime context variables");

        builder.Property(wi => wi.FinalComments)
            .HasMaxLength(2000)
            .IsUnicode(true)
            .HasComment("Comments from final action");

        builder.Property(wi => wi.CompletedByUserId)
            .HasComment("User who completed the workflow");

        // Relationships
        builder.HasOne(wi => wi.CurrentStep)
            .WithMany()
            .HasForeignKey(wi => wi.CurrentStepId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowInstances_CurrentStep");

        builder.HasOne(wi => wi.RequestedByUser)
            .WithMany()
            .HasForeignKey(wi => wi.RequestedByUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowInstances_RequestedByUser");

        builder.HasOne(wi => wi.CompletedByUser)
            .WithMany()
            .HasForeignKey(wi => wi.CompletedByUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowInstances_CompletedByUser");

        builder.HasMany(wi => wi.StepExecutions)
            .WithOne(wse => wse.WorkflowInstance)
            .HasForeignKey(wse => wse.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_WorkflowStepExecutions_WorkflowInstances");

        // Indexes
        builder.HasIndex(wi => new { wi.EntityType, wi.EntityId })
            .HasDatabaseName("IX_WorkflowInstances_EntityType_EntityId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wi => wi.Status)
            .HasDatabaseName("IX_WorkflowInstances_Status")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wi => wi.RequestedByUserId)
            .HasDatabaseName("IX_WorkflowInstances_RequestedByUserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wi => new { wi.Status, wi.CurrentStepId })
            .HasDatabaseName("IX_WorkflowInstances_Status_CurrentStep")
            .HasFilter("\"IsDeleted\" = false AND \"Status\" = 2"); // InProgress status

        builder.HasIndex(wi => wi.RequestedAt)
            .HasDatabaseName("IX_WorkflowInstances_RequestedAt")
            .HasFilter("\"IsDeleted\" = false")
            .IsDescending();

        builder.HasIndex(wi => wi.WorkflowDefinitionId)
            .HasDatabaseName("IX_WorkflowInstances_WorkflowDefinitionId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(wi => !wi.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<WorkflowInstance> builder)
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
