using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TalentProfileConfiguration : IEntityTypeConfiguration<TalentProfile>
{
    public void Configure(EntityTypeBuilder<TalentProfile> builder)
    {
        builder.ToTable("TalentProfiles");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PerformanceRating)
            .HasConversion<int?>();

        builder.Property(x => x.PotentialRating)
            .HasConversion<int>();

        builder.Property(x => x.NineBoxPosition)
            .HasConversion<int>();

        builder.Property(x => x.ReadinessLevel)
            .HasConversion<int>();

        builder.Property(x => x.RetentionRisk)
            .HasConversion<int>();

        builder.Property(x => x.CareerAspiration)
            .HasMaxLength(2000);

        builder.Property(x => x.CareerAspirationAr)
            .HasMaxLength(2000);

        builder.Property(x => x.StrengthsSummary)
            .HasMaxLength(2000);

        builder.Property(x => x.DevelopmentAreas)
            .HasMaxLength(2000);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Skills)
            .WithOne(x => x.TalentProfile)
            .HasForeignKey(x => x.TalentProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .IsUnique()
            .HasDatabaseName("IX_TalentProfiles_EmployeeId_Unique")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.NineBoxPosition)
            .HasDatabaseName("IX_TalentProfiles_NineBoxPosition");

        builder.HasIndex(x => x.IsHighPotential)
            .HasDatabaseName("IX_TalentProfiles_IsHighPotential");

        builder.HasIndex(x => x.RetentionRisk)
            .HasDatabaseName("IX_TalentProfiles_RetentionRisk");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
