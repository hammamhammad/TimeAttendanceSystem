using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Announcements;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AnnouncementAcknowledgmentConfiguration : IEntityTypeConfiguration<AnnouncementAcknowledgment>
{
    public void Configure(EntityTypeBuilder<AnnouncementAcknowledgment> builder)
    {
        builder.ToTable("AnnouncementAcknowledgments");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.IpAddress).HasMaxLength(50);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Announcement)
            .WithMany(a => a.Acknowledgments)
            .HasForeignKey(x => x.AnnouncementId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => new { x.AnnouncementId, x.EmployeeId })
            .IsUnique()
            .HasDatabaseName("IX_AnnouncementAcknowledgments_Announcement_Employee");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
