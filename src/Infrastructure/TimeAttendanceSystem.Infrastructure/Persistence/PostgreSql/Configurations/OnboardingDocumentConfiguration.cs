using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OnboardingDocumentConfiguration : IEntityTypeConfiguration<OnboardingDocument>
{
    public void Configure(EntityTypeBuilder<OnboardingDocument> builder)
    {
        builder.ToTable("OnboardingDocuments");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.DocumentType)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.DocumentTypeAr)
            .HasMaxLength(100);

        builder.Property(x => x.DocumentName)
            .HasMaxLength(200);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.FileUrl)
            .HasMaxLength(500);

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.OnboardingProcess)
            .WithMany(x => x.Documents)
            .HasForeignKey(x => x.OnboardingProcessId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.OnboardingProcessId).HasDatabaseName("IX_OnboardingDocuments_ProcessId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_OnboardingDocuments_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
