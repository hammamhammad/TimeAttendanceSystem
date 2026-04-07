using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OfferLetterConfiguration : IEntityTypeConfiguration<OfferLetter>
{
    public void Configure(EntityTypeBuilder<OfferLetter> builder)
    {
        builder.ToTable("OfferLetters");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.JobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.JobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.OfferedSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

        builder.Property(x => x.ContractType)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.BenefitsDescription)
            .HasMaxLength(2000);

        builder.Property(x => x.BenefitsDescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.SpecialConditions)
            .HasMaxLength(2000);

        builder.Property(x => x.DocumentUrl)
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
        builder.HasOne(x => x.JobApplication)
            .WithOne(x => x.OfferLetter)
            .HasForeignKey<OfferLetter>(x => x.JobApplicationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Candidate)
            .WithMany()
            .HasForeignKey(x => x.CandidateId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.JobGrade)
            .WithMany()
            .HasForeignKey(x => x.JobGradeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.CreatedEmployee)
            .WithMany()
            .HasForeignKey(x => x.CreatedEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.JobApplicationId).IsUnique().HasDatabaseName("IX_OfferLetters_JobApplicationId");
        builder.HasIndex(x => x.CandidateId).HasDatabaseName("IX_OfferLetters_CandidateId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_OfferLetters_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
