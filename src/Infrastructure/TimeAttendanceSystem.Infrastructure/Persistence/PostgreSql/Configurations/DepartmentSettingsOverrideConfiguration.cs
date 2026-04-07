using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Departments;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class DepartmentSettingsOverrideConfiguration : IEntityTypeConfiguration<DepartmentSettingsOverride>
{
    public void Configure(EntityTypeBuilder<DepartmentSettingsOverride> builder)
    {
        builder.ToTable("DepartmentSettingsOverrides");
        builder.HasKey(e => e.Id);

        // One-to-one with Department
        builder.HasOne(e => e.Department)
            .WithOne()
            .HasForeignKey<DepartmentSettingsOverride>(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Optional FK to Shift
        builder.HasOne(e => e.DefaultShift)
            .WithMany()
            .HasForeignKey(e => e.DefaultShiftId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Unique constraint on DepartmentId
        builder.HasIndex(e => e.DepartmentId)
            .IsUnique()
            .HasDatabaseName("IX_DepartmentSettingsOverrides_DepartmentId");

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> builder) where T : class
    {
        builder.Property("CreatedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("ModifiedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("CreatedBy").HasMaxLength(100);
        builder.Property("ModifiedBy").HasMaxLength(100);
        builder.Property("IsDeleted").IsRequired().HasDefaultValue(false);
        builder.Property("RowVersion").IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
