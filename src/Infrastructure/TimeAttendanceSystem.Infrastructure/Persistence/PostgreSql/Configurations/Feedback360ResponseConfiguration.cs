using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class Feedback360ResponseConfiguration : IEntityTypeConfiguration<Feedback360Response>
{
    public void Configure(EntityTypeBuilder<Feedback360Response> builder)
    {
        builder.ToTable("Feedback360Responses");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Ratings)
            .HasMaxLength(4000);

        builder.Property(x => x.Strengths)
            .HasMaxLength(2000);

        builder.Property(x => x.AreasForImprovement)
            .HasMaxLength(2000);

        builder.Property(x => x.AdditionalComments)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.FeedbackRequest)
            .WithOne(x => x.Response)
            .HasForeignKey<Feedback360Response>(x => x.FeedbackRequest360Id)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.FeedbackRequest360Id).IsUnique().HasDatabaseName("IX_Feedback360Responses_RequestId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
