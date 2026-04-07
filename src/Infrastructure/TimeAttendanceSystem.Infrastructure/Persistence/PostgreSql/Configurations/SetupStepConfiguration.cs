using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SetupStepConfiguration : IEntityTypeConfiguration<SetupStep>
{
    public void Configure(EntityTypeBuilder<SetupStep> builder)
    {
        builder.ToTable("SetupSteps");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.StepKey).IsRequired().HasMaxLength(50);
        builder.Property(e => e.Category).IsRequired().HasMaxLength(50);
        builder.Property(e => e.IsCompleted).HasDefaultValue(false);
        builder.Property(e => e.IsRequired).HasDefaultValue(true);
        builder.Property(e => e.CompletedByUserId).HasMaxLength(100);
        builder.Property(e => e.SortOrder).HasDefaultValue(0);

        builder.HasOne(e => e.Tenant)
            .WithMany()
            .HasForeignKey(e => e.TenantId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Unique step per tenant
        builder.HasIndex(e => new { e.TenantId, e.StepKey })
            .IsUnique()
            .HasDatabaseName("IX_SetupSteps_TenantId_StepKey");

        builder.HasIndex(e => e.TenantId)
            .HasDatabaseName("IX_SetupSteps_TenantId");

        builder.HasQueryFilter(e => !e.IsDeleted);

        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> builder) where T : class
    {
        builder.Property("CreatedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("ModifiedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("CreatedBy").HasMaxLength(100);
        builder.Property("ModifiedBy").HasMaxLength(100);
        builder.Property("IsDeleted").IsRequired().HasDefaultValue(false);
        builder.Property("RowVersion").IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
