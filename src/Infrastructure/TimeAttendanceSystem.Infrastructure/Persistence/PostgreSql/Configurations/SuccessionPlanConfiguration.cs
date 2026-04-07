using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SuccessionPlanConfiguration : IEntityTypeConfiguration<SuccessionPlan>
{
    public void Configure(EntityTypeBuilder<SuccessionPlan> builder)
    {
        builder.ToTable("SuccessionPlans");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(300)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(300);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.KeyPosition)
            .WithMany(x => x.SuccessionPlans)
            .HasForeignKey(x => x.KeyPositionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Candidates)
            .WithOne(x => x.SuccessionPlan)
            .HasForeignKey(x => x.SuccessionPlanId);

        // Indexes
        builder.HasIndex(x => x.KeyPositionId)
            .HasDatabaseName("IX_SuccessionPlans_KeyPositionId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_SuccessionPlans_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
