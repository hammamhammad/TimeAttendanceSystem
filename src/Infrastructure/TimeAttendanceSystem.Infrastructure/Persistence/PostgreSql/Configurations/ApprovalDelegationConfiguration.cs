using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the ApprovalDelegation entity.
/// Defines database mapping, relationships, constraints, and indexes for approval delegations.
/// </summary>
public class ApprovalDelegationConfiguration : IEntityTypeConfiguration<ApprovalDelegation>
{
    public void Configure(EntityTypeBuilder<ApprovalDelegation> builder)
    {
        // Table mapping
        builder.ToTable("ApprovalDelegations");

        // Primary key
        builder.HasKey(ad => ad.Id);

        // Properties configuration
        builder.Property(ad => ad.DelegatorUserId)
            .IsRequired()
            .HasComment("User delegating their authority");

        builder.Property(ad => ad.DelegateUserId)
            .IsRequired()
            .HasComment("User receiving delegated authority");

        builder.Property(ad => ad.StartDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Start of delegation period");

        builder.Property(ad => ad.EndDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("End of delegation period");

        builder.Property(ad => ad.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether delegation is currently active");

        builder.Property(ad => ad.EntityTypesJson)
            .HasMaxLength(500)
            .HasComment("Comma-separated entity types (null = all)");

        builder.Property(ad => ad.Notes)
            .HasMaxLength(1000)
            .IsUnicode(true)
            .HasComment("Reason for delegation");

        // Relationships
        builder.HasOne(ad => ad.DelegatorUser)
            .WithMany()
            .HasForeignKey(ad => ad.DelegatorUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_ApprovalDelegations_DelegatorUser");

        builder.HasOne(ad => ad.DelegateUser)
            .WithMany()
            .HasForeignKey(ad => ad.DelegateUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_ApprovalDelegations_DelegateUser");

        // Indexes
        builder.HasIndex(ad => ad.DelegatorUserId)
            .HasDatabaseName("IX_ApprovalDelegations_DelegatorUserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(ad => ad.DelegateUserId)
            .HasDatabaseName("IX_ApprovalDelegations_DelegateUserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(ad => new { ad.DelegatorUserId, ad.IsActive, ad.StartDate, ad.EndDate })
            .HasDatabaseName("IX_ApprovalDelegations_Active_Dates")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        builder.HasIndex(ad => ad.StartDate)
            .HasDatabaseName("IX_ApprovalDelegations_StartDate")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(ad => ad.EndDate)
            .HasDatabaseName("IX_ApprovalDelegations_EndDate")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(ad => !ad.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<ApprovalDelegation> builder)
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
