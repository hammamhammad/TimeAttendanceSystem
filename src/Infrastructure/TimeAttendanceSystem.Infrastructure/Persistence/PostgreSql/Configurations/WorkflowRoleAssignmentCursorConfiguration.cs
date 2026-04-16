using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// EF configuration for <see cref="WorkflowRoleAssignmentCursor"/> (v13.6).
/// </summary>
public class WorkflowRoleAssignmentCursorConfiguration : IEntityTypeConfiguration<WorkflowRoleAssignmentCursor>
{
    public void Configure(EntityTypeBuilder<WorkflowRoleAssignmentCursor> builder)
    {
        builder.ToTable("WorkflowRoleAssignmentCursors");
        builder.HasKey(c => c.Id);

        builder.Property(c => c.RoleId).IsRequired()
            .HasComment("Role whose user pool is rotated by this cursor");
        builder.Property(c => c.LastAssignedUserId)
            .HasComment("Most recently assigned user id (null before first rotation)");
        builder.Property(c => c.LastAssignedAtUtc)
            .HasColumnType("timestamp with time zone")
            .HasComment("UTC timestamp of the last advance — diagnostic only");

        builder.HasOne(c => c.Role)
            .WithMany()
            .HasForeignKey(c => c.RoleId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_WorkflowRoleAssignmentCursors_Roles");

        builder.HasOne(c => c.LastAssignedUser)
            .WithMany()
            .HasForeignKey(c => c.LastAssignedUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowRoleAssignmentCursors_Users");

        builder.HasIndex(c => c.RoleId)
            .IsUnique()
            .HasDatabaseName("UX_WorkflowRoleAssignmentCursors_RoleId");

        builder.HasQueryFilter(c => !c.IsDeleted);

        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<WorkflowRoleAssignmentCursor> builder)
    {
        builder.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        builder.Property(e => e.CreatedBy).HasMaxLength(100);
        builder.Property(e => e.ModifiedAtUtc);
        builder.Property(e => e.ModifiedBy).HasMaxLength(100);
        builder.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
