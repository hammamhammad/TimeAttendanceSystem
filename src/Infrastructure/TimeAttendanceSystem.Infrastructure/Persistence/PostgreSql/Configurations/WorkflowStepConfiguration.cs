using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the WorkflowStep entity.
/// Defines database mapping, relationships, constraints, and indexes for workflow steps.
/// </summary>
public class WorkflowStepConfiguration : IEntityTypeConfiguration<WorkflowStep>
{
    public void Configure(EntityTypeBuilder<WorkflowStep> builder)
    {
        // Table mapping
        builder.ToTable("WorkflowSteps");

        // Primary key
        builder.HasKey(ws => ws.Id);

        // Properties configuration
        builder.Property(ws => ws.WorkflowDefinitionId)
            .IsRequired()
            .HasComment("Parent workflow definition");

        builder.Property(ws => ws.StepOrder)
            .IsRequired()
            .HasComment("Sequential order within workflow");

        builder.Property(ws => ws.Name)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Display name of the step");

        builder.Property(ws => ws.NameAr)
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Arabic display name");

        builder.Property(ws => ws.StepType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of workflow step");

        builder.Property(ws => ws.ApproverType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("How approver is determined");

        builder.Property(ws => ws.ApproverRoleId)
            .HasComment("Role ID for role-based approval");

        builder.Property(ws => ws.ApproverUserId)
            .HasComment("User ID for specific user approval");

        builder.Property(ws => ws.ConditionJson)
            .HasColumnType("jsonb")
            .HasComment("JSON condition for conditional steps");

        builder.Property(ws => ws.TimeoutHours)
            .HasComment("Hours before escalation");

        builder.Property(ws => ws.EscalationStepId)
            .HasComment("Step to escalate to on timeout");

        builder.Property(ws => ws.OnApproveNextStepId)
            .HasComment("Next step on approval");

        builder.Property(ws => ws.OnRejectNextStepId)
            .HasComment("Next step on rejection");

        builder.Property(ws => ws.AllowDelegation)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether step allows delegation");

        builder.Property(ws => ws.NotifyOnAction)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Send notifications for actions");

        builder.Property(ws => ws.NotifyRequesterOnReach)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Notify requester when step is reached");

        builder.Property(ws => ws.ApproverInstructions)
            .HasMaxLength(2000)
            .IsUnicode(true)
            .HasComment("Instructions for approver");

        builder.Property(ws => ws.ApproverInstructionsAr)
            .HasMaxLength(2000)
            .IsUnicode(true)
            .HasComment("Arabic instructions for approver");

        builder.Property(ws => ws.RequireCommentsOnApprove)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Require comments when approving");

        builder.Property(ws => ws.RequireCommentsOnReject)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Require comments when rejecting");

        // Relationships
        builder.HasOne(ws => ws.ApproverRole)
            .WithMany()
            .HasForeignKey(ws => ws.ApproverRoleId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowSteps_Roles");

        builder.HasOne(ws => ws.ApproverUser)
            .WithMany()
            .HasForeignKey(ws => ws.ApproverUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowSteps_Users");

        builder.HasOne(ws => ws.EscalationStep)
            .WithMany()
            .HasForeignKey(ws => ws.EscalationStepId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowSteps_EscalationStep");

        builder.HasMany(ws => ws.Executions)
            .WithOne(wse => wse.Step)
            .HasForeignKey(wse => wse.StepId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowStepExecutions_WorkflowSteps");

        // Indexes
        builder.HasIndex(ws => ws.WorkflowDefinitionId)
            .HasDatabaseName("IX_WorkflowSteps_WorkflowDefinitionId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(ws => new { ws.WorkflowDefinitionId, ws.StepOrder })
            .HasDatabaseName("IX_WorkflowSteps_Definition_Order")
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(ws => ws.ApproverRoleId)
            .HasDatabaseName("IX_WorkflowSteps_ApproverRoleId")
            .HasFilter("\"IsDeleted\" = false AND \"ApproverRoleId\" IS NOT NULL");

        builder.HasIndex(ws => ws.ApproverUserId)
            .HasDatabaseName("IX_WorkflowSteps_ApproverUserId")
            .HasFilter("\"IsDeleted\" = false AND \"ApproverUserId\" IS NOT NULL");

        // Query filter for soft delete
        builder.HasQueryFilter(ws => !ws.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<WorkflowStep> builder)
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
