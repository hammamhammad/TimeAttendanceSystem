using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SurveyParticipantConfiguration : IEntityTypeConfiguration<SurveyParticipant>
{
    public void Configure(EntityTypeBuilder<SurveyParticipant> builder)
    {
        builder.ToTable("SurveyParticipants");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.AnonymousToken).HasMaxLength(100);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Distribution)
            .WithMany(d => d.Participants)
            .HasForeignKey(x => x.SurveyDistributionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.AnonymousToken).IsUnique().HasDatabaseName("IX_SurveyParticipants_AnonymousToken")
            .HasFilter("\"AnonymousToken\" IS NOT NULL");
        builder.HasIndex(x => x.SurveyDistributionId).HasDatabaseName("IX_SurveyParticipants_SurveyDistributionId");
        builder.HasIndex(x => new { x.SurveyDistributionId, x.EmployeeId }).IsUnique().HasDatabaseName("IX_SurveyParticipants_Distribution_Employee");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_SurveyParticipants_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
