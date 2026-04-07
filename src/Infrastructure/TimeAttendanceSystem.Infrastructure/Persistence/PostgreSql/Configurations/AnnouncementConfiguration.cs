using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Announcements;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AnnouncementConfiguration : IEntityTypeConfiguration<Announcement>
{
    public void Configure(EntityTypeBuilder<Announcement> builder)
    {
        builder.ToTable("Announcements");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).HasMaxLength(500).IsRequired();
        builder.Property(x => x.TitleAr).HasMaxLength(500);
        builder.Property(x => x.Content).IsRequired();
        builder.Property(x => x.ContentAr);
        builder.Property(x => x.Priority).HasConversion<int>();
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.TargetAudience).HasConversion<int>();
        builder.Property(x => x.TargetIds).HasMaxLength(2000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Category)
            .WithMany(c => c.Announcements)
            .HasForeignKey(x => x.AnnouncementCategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.Status).HasDatabaseName("IX_Announcements_Status");
        builder.HasIndex(x => x.Priority).HasDatabaseName("IX_Announcements_Priority");
        builder.HasIndex(x => x.ScheduledPublishDate).HasDatabaseName("IX_Announcements_ScheduledPublishDate");
        builder.HasIndex(x => x.ExpiryDate).HasDatabaseName("IX_Announcements_ExpiryDate");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
