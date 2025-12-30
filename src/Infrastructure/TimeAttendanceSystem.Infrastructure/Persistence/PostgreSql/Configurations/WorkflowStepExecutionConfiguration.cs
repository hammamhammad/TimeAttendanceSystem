using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the WorkflowStepExecution entity.
/// Defines database mapping, relationships, constraints, and indexes for step executions.
/// </summary>
public class WorkflowStepExecutionConfiguration : IEntityTypeConfiguration<WorkflowStepExecution>
{
    public void Configure(EntityTypeBuilder<WorkflowStepExecution> builder)
    {
        // Table mapping
        builder.ToTable("WorkflowStepExecutions");

        // Primary key
        builder.HasKey(wse => wse.Id);

        // Properties configuration
        builder.Property(wse => wse.WorkflowInstanceId)
            .IsRequired()
            .HasComment("Parent workflow instance");

        builder.Property(wse => wse.StepId)
            .IsRequired()
            .HasComment("Workflow step being executed");

        builder.Property(wse => wse.AssignedToUserId)
            .IsRequired()
            .HasComment("User assigned to approve");

        builder.Property(wse => wse.AssignedAt)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("When step was assigned");

        builder.Property(wse => wse.ActionTakenByUserId)
            .HasComment("User who took the action");

        builder.Property(wse => wse.ActionTakenAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When action was taken");

        builder.Property(wse => wse.Action)
            .HasConversion<int?>()
            .HasComment("Action taken on this step");

        builder.Property(wse => wse.Comments)
            .HasMaxLength(2000)
            .IsUnicode(true)
            .HasComment("Comments provided with action");

        builder.Property(wse => wse.DelegatedToUserId)
            .HasComment("User delegated to");

        builder.Property(wse => wse.DueAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("Due date for action");

        builder.Property(wse => wse.IsDelegated)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether created by delegation");

        builder.Property(wse => wse.DelegatedFromExecutionId)
            .HasComment("Original execution delegated from");

        builder.Property(wse => wse.ReminderSent)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether reminder was sent");

        builder.Property(wse => wse.ReminderSentAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When reminder was sent");

        // Relationships
        builder.HasOne(wse => wse.AssignedToUser)
            .WithMany()
            .HasForeignKey(wse => wse.AssignedToUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowStepExecutions_AssignedToUser");

        builder.HasOne(wse => wse.ActionTakenByUser)
            .WithMany()
            .HasForeignKey(wse => wse.ActionTakenByUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowStepExecutions_ActionTakenByUser");

        builder.HasOne(wse => wse.DelegatedToUser)
            .WithMany()
            .HasForeignKey(wse => wse.DelegatedToUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowStepExecutions_DelegatedToUser");

        builder.HasOne(wse => wse.DelegatedFromExecution)
            .WithMany()
            .HasForeignKey(wse => wse.DelegatedFromExecutionId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowStepExecutions_DelegatedFromExecution");

        // Indexes
        builder.HasIndex(wse => wse.WorkflowInstanceId)
            .HasDatabaseName("IX_WorkflowStepExecutions_WorkflowInstanceId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wse => wse.AssignedToUserId)
            .HasDatabaseName("IX_WorkflowStepExecutions_AssignedToUserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wse => new { wse.AssignedToUserId, wse.Action })
            .HasDatabaseName("IX_WorkflowStepExecutions_AssignedTo_Action")
            .HasFilter("\"IsDeleted\" = false AND \"Action\" IS NULL"); // Pending actions

        builder.HasIndex(wse => wse.DueAt)
            .HasDatabaseName("IX_WorkflowStepExecutions_DueAt")
            .HasFilter("\"IsDeleted\" = false AND \"Action\" IS NULL AND \"DueAt\" IS NOT NULL");

        builder.HasIndex(wse => wse.StepId)
            .HasDatabaseName("IX_WorkflowStepExecutions_StepId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wse => wse.ActionTakenAt)
            .HasDatabaseName("IX_WorkflowStepExecutions_ActionTakenAt")
            .HasFilter("\"IsDeleted\" = false AND \"ActionTakenAt\" IS NOT NULL")
            .IsDescending();

        // Query filter for soft delete
        builder.HasQueryFilter(wse => !wse.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<WorkflowStepExecution> builder)
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
            .ValueGeneratedOnAddOrUpdate()
            .HasComment("Concurrency control timestamp");
    }
}
