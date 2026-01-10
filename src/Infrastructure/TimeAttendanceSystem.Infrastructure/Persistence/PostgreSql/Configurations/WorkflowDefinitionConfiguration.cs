using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the WorkflowDefinition entity.
/// Defines database mapping, relationships, constraints, and indexes for workflow definitions.
/// </summary>
public class WorkflowDefinitionConfiguration : IEntityTypeConfiguration<WorkflowDefinition>
{
    public void Configure(EntityTypeBuilder<WorkflowDefinition> builder)
    {
        // Table mapping
        builder.ToTable("WorkflowDefinitions");

        // Primary key
        builder.HasKey(wd => wd.Id);

        // Properties configuration
        builder.Property(wd => wd.Name)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Display name of the workflow definition");

        builder.Property(wd => wd.NameAr)
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Arabic display name of the workflow definition");

        builder.Property(wd => wd.Description)
            .HasMaxLength(1000)
            .IsUnicode(true)
            .HasComment("Description of the workflow purpose");

        builder.Property(wd => wd.DescriptionAr)
            .HasMaxLength(1000)
            .IsUnicode(true)
            .HasComment("Arabic description of the workflow");

        builder.Property(wd => wd.EntityType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of entity this workflow applies to");

        builder.Property(wd => wd.IsActive)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether workflow is active for new requests");

        builder.Property(wd => wd.IsDefault)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether this is the default workflow for entity type");

        builder.Property(wd => wd.BranchId)
            .HasComment("Branch scope (null = organization-wide)");

        builder.Property(wd => wd.Version)
            .IsRequired()
            .HasDefaultValue(1)
            .HasComment("Version number incremented on modifications");

        builder.Property(wd => wd.Priority)
            .IsRequired()
            .HasDefaultValue(0)
            .HasComment("Priority for workflow selection");

        // Relationships
        builder.HasOne(wd => wd.Branch)
            .WithMany()
            .HasForeignKey(wd => wd.BranchId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowDefinitions_Branches");

        builder.HasMany(wd => wd.Steps)
            .WithOne(ws => ws.WorkflowDefinition)
            .HasForeignKey(ws => ws.WorkflowDefinitionId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_WorkflowSteps_WorkflowDefinitions");

        builder.HasMany(wd => wd.Instances)
            .WithOne(wi => wi.WorkflowDefinition)
            .HasForeignKey(wi => wi.WorkflowDefinitionId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_WorkflowInstances_WorkflowDefinitions");

        // Indexes
        builder.HasIndex(wd => wd.EntityType)
            .HasDatabaseName("IX_WorkflowDefinitions_EntityType")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wd => new { wd.EntityType, wd.BranchId, wd.IsDefault })
            .HasDatabaseName("IX_WorkflowDefinitions_EntityType_Branch_Default")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        builder.HasIndex(wd => new { wd.EntityType, wd.IsActive })
            .HasDatabaseName("IX_WorkflowDefinitions_EntityType_Active")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(wd => wd.BranchId)
            .HasDatabaseName("IX_WorkflowDefinitions_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(wd => !wd.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<WorkflowDefinition> builder)
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
