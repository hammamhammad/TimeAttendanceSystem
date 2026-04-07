using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TalentSkillConfiguration : IEntityTypeConfiguration<TalentSkill>
{
    public void Configure(EntityTypeBuilder<TalentSkill> builder)
    {
        builder.ToTable("TalentSkills");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.SkillName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.SkillNameAr)
            .HasMaxLength(200);

        builder.Property(x => x.ProficiencyLevel)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.TalentProfile)
            .WithMany(x => x.Skills)
            .HasForeignKey(x => x.TalentProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.TalentProfileId)
            .HasDatabaseName("IX_TalentSkills_TalentProfileId");

        builder.HasIndex(x => new { x.TalentProfileId, x.SkillName })
            .HasDatabaseName("IX_TalentSkills_Profile_Skill");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
