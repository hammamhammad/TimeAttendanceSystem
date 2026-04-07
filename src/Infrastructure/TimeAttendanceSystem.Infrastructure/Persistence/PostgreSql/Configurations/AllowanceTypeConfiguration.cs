using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AllowanceTypeConfiguration : IEntityTypeConfiguration<AllowanceType>
{
    public void Configure(EntityTypeBuilder<AllowanceType> builder)
    {
        builder.ToTable("AllowanceTypes");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Code)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(500);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(500);

        builder.Property(x => x.Category)
            .HasConversion<int>();

        builder.Property(x => x.DefaultCalculationType)
            .HasConversion<int>();

        builder.Property(x => x.DefaultAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.DefaultPercentage)
            .HasColumnType("decimal(8,4)");

        // Audit fields
        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Unique index on Code
        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasDatabaseName("IX_AllowanceTypes_Code_Unique")
            .HasFilter("\"IsDeleted\" = false");

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasMany(x => x.Policies)
            .WithOne(x => x.AllowanceType)
            .HasForeignKey(x => x.AllowanceTypeId);

        builder.HasMany(x => x.Assignments)
            .WithOne(x => x.AllowanceType)
            .HasForeignKey(x => x.AllowanceTypeId);

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
