using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CandidateConfiguration : IEntityTypeConfiguration<Candidate>
{
    public void Configure(EntityTypeBuilder<Candidate> builder)
    {
        builder.ToTable("Candidates");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.FirstNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.LastNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.Email)
            .HasMaxLength(200);

        builder.Property(x => x.Phone)
            .HasMaxLength(50);

        builder.Property(x => x.NationalId)
            .HasMaxLength(50);

        builder.Property(x => x.Gender)
            .HasConversion<int>();

        builder.Property(x => x.Nationality)
            .HasMaxLength(100);

        builder.Property(x => x.NationalityAr)
            .HasMaxLength(100);

        builder.Property(x => x.ResumeUrl)
            .HasMaxLength(500);

        builder.Property(x => x.LinkedInUrl)
            .HasMaxLength(500);

        builder.Property(x => x.PortfolioUrl)
            .HasMaxLength(500);

        builder.Property(x => x.Source)
            .HasConversion<int>();

        builder.Property(x => x.CurrentCompany)
            .HasMaxLength(200);

        builder.Property(x => x.CurrentJobTitle)
            .HasMaxLength(200);

        builder.Property(x => x.Skills)
            .HasMaxLength(2000);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.ReferredByEmployee)
            .WithMany()
            .HasForeignKey(x => x.ReferredByEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.ConvertedToEmployee)
            .WithMany()
            .HasForeignKey(x => x.ConvertedToEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.Email).HasDatabaseName("IX_Candidates_Email");
        builder.HasIndex(x => x.NationalId).HasDatabaseName("IX_Candidates_NationalId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
