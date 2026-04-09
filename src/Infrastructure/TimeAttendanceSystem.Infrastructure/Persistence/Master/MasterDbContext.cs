using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Configuration;
using TecAxle.Hrms.Domain.Platform;
using TecAxle.Hrms.Domain.Subscriptions;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Infrastructure.Persistence.Master;

/// <summary>
/// EF Core DbContext for the master (platform-level) database.
/// Contains tenant registry, subscription management, platform users,
/// and email-to-tenant lookup tables. Separate from per-tenant business data.
/// </summary>
public class MasterDbContext : DbContext, IMasterDbContext
{
    public MasterDbContext(DbContextOptions<MasterDbContext> options) : base(options) { }

    // ── Platform Users ──
    public DbSet<PlatformUser> PlatformUsers => Set<PlatformUser>();

    // ── Tenant Registry ──
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<TenantUserEmail> TenantUserEmails => Set<TenantUserEmail>();

    // ── Subscription & Entitlements ──
    public DbSet<SubscriptionPlan> SubscriptionPlans => Set<SubscriptionPlan>();
    public DbSet<PlanModuleEntitlement> PlanModuleEntitlements => Set<PlanModuleEntitlement>();
    public DbSet<PlanFeatureFlag> PlanFeatureFlags => Set<PlanFeatureFlag>();
    public DbSet<PlanLimit> PlanLimits => Set<PlanLimit>();
    public DbSet<TenantSubscription> TenantSubscriptions => Set<TenantSubscription>();
    public DbSet<TenantModuleAddOn> TenantModuleAddOns => Set<TenantModuleAddOn>();
    public DbSet<TenantFeatureOverride> TenantFeatureOverrides => Set<TenantFeatureOverride>();
    public DbSet<EntitlementChangeLog> EntitlementChangeLogs => Set<EntitlementChangeLog>();

    // ── System Policy Templates ──
    public DbSet<PolicyTemplate> PolicyTemplates => Set<PolicyTemplate>();
    public DbSet<PolicyTemplateItem> PolicyTemplateItems => Set<PolicyTemplateItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Platform Users
        modelBuilder.Entity<PlatformUser>(entity =>
        {
            entity.ToTable("PlatformUsers");
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Username).IsUnique();
            entity.Property(e => e.Role).HasConversion<string>();
        });

        // Tenant User Email mapping
        modelBuilder.Entity<TenantUserEmail>(entity =>
        {
            entity.ToTable("TenantUserEmails");
            entity.HasIndex(e => new { e.Email, e.TenantId }).IsUnique();
            entity.HasIndex(e => e.Email); // for lookup by email
            entity.HasOne(e => e.Tenant)
                .WithMany()
                .HasForeignKey(e => e.TenantId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.ToTable("Tenants");
            entity.HasIndex(e => e.Subdomain).IsUnique();
            entity.HasQueryFilter(e => !e.IsDeleted);
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(50).HasDefaultValue(TenantStatus.Active);
            entity.Property(e => e.IsActive).IsRequired().HasDefaultValue(true);
            entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
            entity.Property(e => e.Country).HasMaxLength(10).HasDefaultValue("SA");
            entity.Property(e => e.DefaultTimezone).HasMaxLength(100).HasDefaultValue("Asia/Riyadh");
            entity.Property(e => e.DefaultLanguage).HasMaxLength(10).HasDefaultValue("en");
            entity.Property(e => e.DefaultCurrency).HasMaxLength(10).HasDefaultValue("SAR");
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
        });

        // Subscription Plan
        modelBuilder.Entity<SubscriptionPlan>(entity =>
        {
            entity.ToTable("SubscriptionPlans");
            entity.HasIndex(e => e.Code).IsUnique();
            entity.Property(e => e.Tier).IsRequired().HasConversion<string>().HasMaxLength(50);
        });

        modelBuilder.Entity<PlanModuleEntitlement>(entity =>
        {
            entity.ToTable("PlanModuleEntitlements");
            entity.Property(e => e.Module).IsRequired().HasConversion<string>().HasMaxLength(100);
        });

        modelBuilder.Entity<PlanFeatureFlag>(entity =>
        {
            entity.ToTable("PlanFeatureFlags");
        });

        modelBuilder.Entity<PlanLimit>(entity =>
        {
            entity.ToTable("PlanLimits");
            entity.Property(e => e.LimitType).IsRequired().HasConversion<string>().HasMaxLength(50);
        });

        // Tenant Subscription
        modelBuilder.Entity<TenantSubscription>(entity =>
        {
            entity.ToTable("TenantSubscriptions");
            entity.Property(e => e.Status).IsRequired().HasConversion<string>().HasMaxLength(50);
            entity.Property(e => e.BillingCycle).IsRequired().HasConversion<string>().HasMaxLength(50);
        });

        modelBuilder.Entity<TenantModuleAddOn>(entity =>
        {
            entity.ToTable("TenantModuleAddOns");
        });

        modelBuilder.Entity<TenantFeatureOverride>(entity =>
        {
            entity.ToTable("TenantFeatureOverrides");
        });

        modelBuilder.Entity<EntitlementChangeLog>(entity =>
        {
            entity.ToTable("EntitlementChangeLogs");
        });

        // Policy Templates (system templates) — ignore Tenant navigation to prevent graph discovery
        modelBuilder.Entity<PolicyTemplate>(entity =>
        {
            entity.ToTable("PolicyTemplates");
            entity.Ignore(e => e.Tenant);
        });

        modelBuilder.Entity<PolicyTemplateItem>(entity =>
        {
            entity.ToTable("PolicyTemplateItems");
        });
    }
}
