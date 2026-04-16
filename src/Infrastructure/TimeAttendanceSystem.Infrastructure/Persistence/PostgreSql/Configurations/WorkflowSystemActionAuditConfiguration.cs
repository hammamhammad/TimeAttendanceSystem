using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// EF configuration for <see cref="WorkflowSystemActionAudit"/> — append-only audit trail
/// of system-triggered workflow actions (timeouts, escalations, auto-approvals, fallback
/// routing, expirations). Added in v13.6.
/// </summary>
public class WorkflowSystemActionAuditConfiguration : IEntityTypeConfiguration<WorkflowSystemActionAudit>
{
    public void Configure(EntityTypeBuilder<WorkflowSystemActionAudit> builder)
    {
        builder.ToTable("WorkflowSystemActionAudits");
        builder.HasKey(a => a.Id);

        builder.Property(a => a.WorkflowInstanceId).IsRequired();
        builder.Property(a => a.StepExecutionId);
        builder.Property(a => a.ActionType).IsRequired().HasConversion<int>();
        builder.Property(a => a.TriggeredAtUtc).IsRequired().HasColumnType("timestamp with time zone");
        builder.Property(a => a.SystemUserId).IsRequired()
            .HasComment("Resolved via ISystemUserResolver at the moment the action fired — never 0");
        builder.Property(a => a.Reason).HasMaxLength(500);
        builder.Property(a => a.DetailsJson).HasColumnType("jsonb");

        // WorkflowInstance relationship is configured from the WorkflowInstanceConfiguration side.

        builder.HasOne(a => a.StepExecution)
            .WithMany()
            .HasForeignKey(a => a.StepExecutionId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_WorkflowSystemActionAudits_StepExecution");

        builder.HasOne(a => a.SystemUser)
            .WithMany()
            .HasForeignKey(a => a.SystemUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowSystemActionAudits_SystemUser");

        builder.HasIndex(a => new { a.WorkflowInstanceId, a.TriggeredAtUtc })
            .HasDatabaseName("IX_WorkflowSystemActionAudits_Instance_TriggeredAt");
        builder.HasIndex(a => a.ActionType)
            .HasDatabaseName("IX_WorkflowSystemActionAudits_ActionType");

        builder.HasQueryFilter(a => !a.IsDeleted);

        builder.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        builder.Property(e => e.CreatedBy).HasMaxLength(100);
        builder.Property(e => e.ModifiedAtUtc);
        builder.Property(e => e.ModifiedBy).HasMaxLength(100);
        builder.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
