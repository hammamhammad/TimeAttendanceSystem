using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class JobGradeConfiguration : IEntityTypeConfiguration<JobGrade>
{
    public void Configure(EntityTypeBuilder<JobGrade> builder)
    {
        builder.ToTable("JobGrades");

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
            .HasMaxLength(1000);

        builder.Property(x => x.MinSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.MidSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.MaxSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

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
            .HasDatabaseName("IX_JobGrades_Code");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
