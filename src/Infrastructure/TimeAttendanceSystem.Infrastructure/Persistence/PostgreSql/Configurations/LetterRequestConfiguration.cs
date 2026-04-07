using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class LetterRequestConfiguration : IEntityTypeConfiguration<LetterRequest>
{
    public void Configure(EntityTypeBuilder<LetterRequest> builder)
    {
        builder.ToTable("LetterRequests");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.LetterType).HasConversion<int>();
        builder.Property(x => x.Purpose).HasMaxLength(1000);
        builder.Property(x => x.PurposeAr).HasMaxLength(1000);
        builder.Property(x => x.AdditionalNotes).HasMaxLength(2000);
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.RejectionReason).HasMaxLength(1000);
        builder.Property(x => x.GeneratedDocumentUrl).HasMaxLength(500);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Template)
            .WithMany()
            .HasForeignKey(x => x.TemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_LetterRequests_EmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_LetterRequests_Status");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
