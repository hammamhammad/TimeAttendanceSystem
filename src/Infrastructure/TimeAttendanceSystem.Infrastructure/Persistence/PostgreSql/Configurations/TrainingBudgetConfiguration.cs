using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingBudgetConfiguration : IEntityTypeConfiguration<TrainingBudget>
{
    public void Configure(EntityTypeBuilder<TrainingBudget> builder)
    {
        builder.ToTable("TrainingBudgets");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.AllocatedBudget).HasColumnType("decimal(18,2)");
        builder.Property(x => x.SpentAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Currency).HasMaxLength(10);
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.FiscalYear).HasDatabaseName("IX_TrainingBudgets_FiscalYear");
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_TrainingBudgets_BranchId");
        builder.HasIndex(x => x.DepartmentId).HasDatabaseName("IX_TrainingBudgets_DepartmentId");
        builder.HasIndex(x => new { x.FiscalYear, x.BranchId, x.DepartmentId })
            .HasDatabaseName("IX_TrainingBudgets_Year_Branch_Dept");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
